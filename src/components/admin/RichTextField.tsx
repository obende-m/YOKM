import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { renderRichText, uploadImage } from "@/lib/cms";

/** Plain textarea with simple formatting buttons and a preview tab. */
export function RichTextField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(false);

  function wrap(before: string, after = before, placeholder = "text") {
    const el = ta.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const sel = value.slice(s, e) || placeholder;
    onChange(value.slice(0, s) + before + sel + after + value.slice(e));
  }
  function block(prefix: string) {
    const el = ta.current;
    const s = el?.selectionStart ?? value.length;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    onChange(value.slice(0, lineStart) + prefix + value.slice(lineStart));
  }

  return (
    <div className="border border-input">
      <div className="flex flex-wrap gap-1 border-b border-input bg-muted/50 p-1">
        <Button type="button" size="sm" variant="ghost" onClick={() => wrap("**")}>
          <b>B</b>
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => wrap("*")}>
          <i>I</i>
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => block("## ")}>
          Heading
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => block("> ")}>
          Quote
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => block("- ")}>
          List
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            const url = window.prompt("Link address (https://…)");
            if (url) wrap("[", `](${url})`, "link text");
          }}
        >
          Link
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => file.current?.click()}>
          Image
        </Button>
        <input
          ref={file}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            try {
              const url = await uploadImage(f);
              onChange(`${value}\n\n![](${url})\n\n`);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Upload failed");
            }
            e.target.value = "";
          }}
        />
        <Button type="button" size="sm" variant={preview ? "secondary" : "ghost"} className="ml-auto" onClick={() => setPreview(!preview)}>
          {preview ? "Edit" : "Preview"}
        </Button>
      </div>
      {preview ? (
        <div className="prose-yokm min-h-[240px] p-4" dangerouslySetInnerHTML={{ __html: renderRichText(value) }} />
      ) : (
        <Textarea
          ref={ta}
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-none border-0 focus-visible:ring-0"
          placeholder="Write here. Leave an empty line between paragraphs."
        />
      )}
    </div>
  );
}
