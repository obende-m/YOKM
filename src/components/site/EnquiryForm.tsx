import { useState } from "react";

import { sendSubmission, type SubmissionInput } from "@/lib/cms";

type FieldDef = {
  name: "name" | "email" | "phone" | "organisation" | "subject";
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

/** A website form that stores its submission for administrators to read under Messages. */
export function EnquiryForm({
  kind,
  fields,
  messageLabel = "Message",
  submitLabel = "Send",
  successText = "Thank you — your message has been received by the ministry.",
  variant = "solid",
}: {
  kind: SubmissionInput["kind"];
  fields: FieldDef[];
  messageLabel?: string;
  submitLabel?: string;
  successText?: string;
  variant?: "solid" | "outline";
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = (n: string) => `${kind}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    // Hidden field that people never see; automated spam tends to fill it in.
    if (get("website")) {
      setSent(true);
      form.reset();
      return;
    }
    setSending(true);
    setError(null);
    const err = await sendSubmission({
      kind,
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      organisation: get("organisation"),
      subject: get("subject"),
      message: get("message"),
    });
    setSending(false);
    if (err) return void setError(err);
    setSent(true);
    form.reset();
  }

  const field =
    "mt-2 w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-[1.05rem] outline-none transition-colors placeholder:text-ink/35 focus:border-wine focus-visible:outline-none disabled:opacity-60";

  if (sent) {
    return (
      <div className="mt-8 border-l border-wine pl-8" role="status">
        <p className="eyebrow text-plum">Message received</p>
        <p className="mt-4 font-serif text-[clamp(1.8rem,2.6vw,2.4rem)] italic leading-tight">
          {successText}
        </p>
        <button type="button" className="text-link mt-6 text-wine" onClick={() => setSent(false)}>
          <span>Send another message</span>
        </button>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-8" onSubmit={onSubmit} noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={id(f.name)} className="eyebrow text-ink/60">
              {f.label}
              {f.required ? <span className="text-clay"> *</span> : ""}
            </label>
            <input
              id={id(f.name)}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              autoComplete={f.autoComplete}
              maxLength={f.name === "email" ? 255 : f.name === "phone" ? 50 : 200}
              disabled={sending}
              className={field}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor={id("message")} className="eyebrow text-ink/60">
          {messageLabel}
          <span className="text-clay"> *</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          maxLength={5000}
          disabled={sending}
          className={`${field} resize-y`}
        />
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <p className="border-l-2 border-destructive pl-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-ink/55">
          Your details are used only to reply to you. See the{" "}
          <a href="/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={sending}
          data-variant={variant === "solid" ? "solid" : "outline"}
          className="btn shrink-0"
        >
          <span>{sending ? "Sending…" : submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
