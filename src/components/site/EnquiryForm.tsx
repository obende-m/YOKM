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

  if (sent) {
    return (
      <div className="mt-6 border border-primary/30 bg-card p-6" role="status">
        <p className="font-serif text-xl">{successText}</p>
        <button
          type="button"
          className="mt-4 text-xs uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
          onClick={() => setSent(false)}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate={false}>
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={id(f.name)} className="eyebrow text-muted-foreground">
            {f.label}
            {f.required ? " *" : ""}
          </label>
          <input
            id={id(f.name)}
            name={f.name}
            type={f.type ?? "text"}
            required={f.required}
            autoComplete={f.autoComplete}
            maxLength={f.name === "email" ? 255 : f.name === "phone" ? 50 : 200}
            disabled={sending}
            className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
          />
        </div>
      ))}
      <div>
        <label htmlFor={id("message")} className="eyebrow text-muted-foreground">
          {messageLabel} *
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          maxLength={5000}
          disabled={sending}
          className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
        />
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={sending}
        className={`w-full px-6 py-4 text-xs uppercase tracking-[0.18em] disabled:opacity-50 ${
          variant === "solid"
            ? "bg-primary text-primary-foreground"
            : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {sending ? "Sending…" : submitLabel}
      </button>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Your details are used only to reply to you. See our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
