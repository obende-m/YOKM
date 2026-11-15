import { createFileRoute } from "@tanstack/react-router";

import { SettingsForm } from "@/components/admin/SettingsForm";
import { SETTING_FIELDS } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: () => (
    <SettingsForm
      title="Site Settings"
      intro="Contact details, social media and giving information. Anything left empty stays hidden on the website."
      fields={SETTING_FIELDS}
    />
  ),
});
