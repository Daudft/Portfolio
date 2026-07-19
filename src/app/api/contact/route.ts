import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";

// Run on the Node.js runtime (Resend SDK needs it).
export const runtime = "nodejs";

/**
 * Very small in-memory rate limiter. Good enough for a personal site on a
 * single instance. For serverless/multi-instance, swap for Upstash Redis.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check the form and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, company } = parsed.data;

    // Honeypot tripped → pretend success, drop silently.
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || site.email;
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    // No key configured yet → log to server console so the form still "works"
    // in development. Add RESEND_API_KEY in .env.local to actually send.
    if (!apiKey) {
      console.warn(
        "[contact] RESEND_API_KEY not set — logging message instead of sending.",
      );
      console.info({ name, email, subject, message });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; color:#141310; line-height:1.6;">
        <h2 style="margin:0 0 16px;">New enquiry via your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap; padding:16px; background:#f6f5f1; border-radius:12px;">${escapeHtml(
          message,
        )}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subject
        ? `Portfolio enquiry — ${subject}`
        : `New portfolio enquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
