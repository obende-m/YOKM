import { createFileRoute } from "@tanstack/react-router";

import { SettingsForm } from "@/components/admin/SettingsForm";
import { PAGE_TEXT_FIELDS } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/page-text")({
  component: () => (
    <SettingsForm
      title="Page Text"
      intro="Headings, introductions and photographs on the website's pages. Leave a box empty to keep the standard wording. Vision, Mission and Areas of Work are edited in their own sections."
      fields={PAGE_TEXT_FIELDS}
    />
  ),
});
