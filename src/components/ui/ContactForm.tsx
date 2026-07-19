"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { contactSchema } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

const inputBase =
  "w-full border-b border-line bg-transparent py-4 text-lg text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""), // honeypot
    };

    // Client-side validation first
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const mapped: FieldErrors = {};
      for (const [k, v] of Object.entries(fieldErrors)) {
        if (v && v[0]) mapped[k] = v[0];
      }
      setErrors(mapped);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError("Network error. Please check your connection and retry.");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start gap-4 py-8"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
              <Check className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="font-display text-3xl tracking-tight">
              Message sent — thank you.
            </h3>
            <p className="max-w-md text-ink-soft">
              I&rsquo;ll get back to you within a couple of days. In the meantime,
              feel free to explore more of the work.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            {/* Honeypot (hidden from humans) */}
            <div className="absolute left-[-9999px]" aria-hidden>
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Field label="Name" error={errors.name}>
              <input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                className={inputBase}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                placeholder="you@studio.com"
                autoComplete="email"
                className={inputBase}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Subject (optional)" error={errors.subject}>
                <input
                  name="subject"
                  placeholder="What's it about?"
                  className={inputBase}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Message" error={errors.message}>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project, timeline and goals…"
                  className={`${inputBase} resize-none`}
                />
              </Field>
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex h-14 items-center justify-center gap-2 bg-ink px-8 text-sm font-medium text-paper transition-colors disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>

              {serverError && (
                <p className="text-sm text-accent" role="alert">
                  {serverError}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-1 block">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-accent" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
