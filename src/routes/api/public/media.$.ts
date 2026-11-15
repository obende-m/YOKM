import { createFileRoute } from "@tanstack/react-router";

import { storagePublicUrl } from "@/integrations/supabase/client";

/**
 * Backwards compatibility for images uploaded before the media bucket became public:
 * their stored URLs look like /api/public/media/<file>. Redirect to the public
 * Supabase Storage URL so no server-side secret is needed to serve them.
 */
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^[a-z0-9.-]+$/.test(path)) return new Response("Not found", { status: 404 });
        return new Response(null, {
          status: 308,
          headers: {
            location: storagePublicUrl(path),
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
