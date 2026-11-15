# Yendel Ocha Kpeling Ministry — website

Public website and content management system (CMS) for **Yendel Ocha Kpeling Ministry (YOKM)**, Jos, Plateau State, Nigeria.

- **Hosting:** Vercel (server-rendered pages + static assets)
- **Backend:** Supabase (PostgreSQL database, Auth for administrators, Storage for photographs)
- **App:** TanStack Start (React 19, server-side rendering), Vite, Tailwind CSS 4, shadcn/ui

No other services are required.

---

## 1. Local development

Requirements: Node.js **20.19 or newer** (22 LTS recommended) and npm.

```sh
npm install
cp .env.example .env      # then fill in the two values (see section 3)
npm run dev               # http://localhost:8080
```

| Script                          | What it does                                                       |
| ------------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                   | Development server with hot reload                                 |
| `npm run build`                 | Production build (`.output/` locally, `.vercel/output/` on Vercel) |
| `npm run preview` / `npm start` | Run the production build locally                                   |
| `npm run lint`                  | ESLint + Prettier checks                                           |
| `npm run typecheck`             | TypeScript type check                                              |
| `npm run format`                | Format the code with Prettier                                      |

---

## 2. Supabase setup (one time)

1. **Create a project** at [supabase.com](https://supabase.com) (choose a region close to Nigeria, e.g. EU West / London).
2. **Run the migrations**, in order. Either:
   - **Dashboard:** open _SQL Editor_, paste the contents of each file and run it:
     1. `supabase/migrations/20261004000000_initial_schema.sql`
     2. `supabase/migrations/20261115000000_cms_completion.sql`
   - **CLI:** `npx supabase link --project-ref <your-project-ref>` then `npx supabase db push`.

   The migrations create every table, Row Level Security policy, function, index and the public `media` storage bucket. They seed the Vision, Mission and Areas of Work wording supplied by the ministry. The second migration is safe to re-run.

3. **Auth settings** (_Authentication → URL Configuration_):
   - **Site URL:** your live address, e.g. `https://yokm.org` (or the `*.vercel.app` address until a domain is connected).
   - **Redirect URLs:** add `https://<your-domain>/admin` and `http://localhost:8080/admin`.
   - Keep **Confirm email** turned on (_Authentication → Providers → Email_).
4. **Create the first administrator:**
   1. Deploy the site (section 4), open `https://<your-domain>/auth`, choose _Create an account_, and confirm the email.
   2. In the Supabase _SQL Editor_, run (with that email address):
      ```sql
      insert into public.user_roles (user_id, role)
      select id, 'admin' from auth.users where email = 'admin@example.org';
      ```
   3. Sign in at `/auth`. Further administrators can now be added in the CMS under **Administrators** (they create an account first, then an administrator adds their email).

> **Optional hardening:** once all administrators have accounts, you can turn off _Allow new users to sign up_ (_Authentication → Providers → Email_) and invite people from the Supabase dashboard (_Authentication → Users → Invite_) instead. Accounts without the admin role cannot read or change anything either way.

---

## 3. Environment variables

| Variable                        | Where             | Value                                                                                                    |
| ------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | `.env` and Vercel | Supabase → _Project Settings → API_ → Project URL                                                        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `.env` and Vercel | Supabase → _Project Settings → API Keys_ → publishable key (`sb_publishable_…`) or the legacy `anon` key |

These two values are public by design. Security is enforced in the database by Row Level Security, not by hiding keys.

**Never** add the `service_role` / secret key to this project, to a `VITE_` variable, or to Vercel. The website does not use it.

---

## 4. Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project →** import the repository.
3. Settings:
   - **Framework Preset:** _Other_
   - **Build Command:** `npm run build`
   - **Output Directory:** leave empty (the build writes Vercel's `.vercel/output` format automatically)
   - **Install Command:** `npm install` (default)
   - **Node.js Version** (_Settings → General_): 22.x
4. **Environment Variables:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for _Production_ and _Preview_.
5. **Deploy.** Every push to the main branch redeploys automatically.
6. **Custom domain:** _Settings → Domains_. Then update the Supabase **Site URL** and **Redirect URLs** (section 2.3) to the new domain.

Variables are built into the site, so **redeploy after changing them**.

---

## 5. Moving existing content from the previous host

The earlier version of this site stored its content in a Lovable Cloud database. If content was already entered there:

1. Export each content table (`posts`, `programs`, `events`, `impact_metrics`, `media`, `people`, `site_settings`, `submissions`) as CSV from that database and import it into the same tables in the new Supabase project (_Table Editor → Import data from CSV_). Run the migrations first.
2. Download the uploaded photographs from that project's `media` storage bucket and upload them to the new `media` bucket **with the same file names**. Older image addresses (`/api/public/media/<file>`) keep working: the site redirects them to the new bucket.
3. Administrator accounts cannot be copied; create them again (section 2.4).

What can be exported depends on what Lovable offers for that project. Check its database and storage views, or ask Lovable support for an export.

---

## 6. Using the CMS

Sign in at **`/auth`**. The admin area is at **`/admin`**.

| Section                              | What it manages                                                                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dashboard**                        | Counts and messages needing attention                                                                                                                              |
| **Messages**                         | Contact messages, volunteer offers and partnership enquiries. Filter by type and status (new, in progress, handled, archived), add internal notes, reply by email. |
| **Journal**                          | Articles: cover image, rich text with images, category, author, publication date, draft or published, search title/description                                     |
| **Stories**                          | Testimonies with photograph, name, location. Can only be published once the person's permission is recorded.                                                       |
| **Programs**                         | Programmes with description, photograph, status, featured flag, order                                                                                              |
| **Events**                           | Date, time, location, description, image, link. Only upcoming published events appear.                                                                             |
| **Journal Categories**               | Categories offered when writing articles                                                                                                                           |
| **Gallery**                          | Upload many photographs at once, create albums (title, date, description, cover), captions, dates, feature, hide, reorder, move between albums, delete             |
| **Page Text**                        | Home, About and other page headings, introductions and photographs, plus the visioner's biography and photograph. An empty box keeps the standard wording.         |
| **Vision / Mission / Areas of Work** | The statements shown on Home, About and Our Work                                                                                                                   |
| **People / Impact**                  | Team members (About page) and verified impact numbers (Home page). Sections stay hidden while empty.                                                               |
| **Site Settings**                    | Contact details, social media links, giving link, bank details, giving instructions, footer text                                                                   |
| **Administrators**                   | Add or remove administrators                                                                                                                                       |

Anything unpublished, or left empty, is not shown on the website.

---

## 7. How it works

```
src/
  routes/                 file-based routes (TanStack Router)
    index.tsx, about.tsx, our-work.tsx, stories.tsx, journal.tsx, post.$slug.tsx,
    gallery.tsx, get-involved.tsx, contact.tsx, donate.tsx, privacy.tsx, terms.tsx
    auth.tsx              administrator sign-in
    _authenticated/       signed-in area (client-rendered); admin.* = CMS screens
    api/public/media.$.ts redirect for older image addresses
  components/site/        public layout and page components
  components/admin/       CMS form components
  integrations/supabase/  Supabase client and generated database types
  lib/cms.ts              data hooks, editable page text, uploads, rich text
  lib/admin-sections.ts   configuration for the generic CMS list/edit screens
  lib/yokm.ts             fixed organisation facts and default wording
supabase/migrations/      database schema, security policies and storage setup
```

### Conventions

- **Security lives in the database.** Every table has Row Level Security. Visitors can read only published content and can only _create_ form submissions. Every change requires the `admin` role, checked by `public.has_role()`. Hiding admin pages is not the protection.
- **Adding a managed content type:** create the table (with RLS) in a new migration, add its types to `src/integrations/supabase/types.ts` (or regenerate with `npx supabase gen types typescript --project-id <ref>`), then add an entry to `SECTIONS` in `src/lib/admin-sections.ts`. The list, editor, publish, reorder and delete screens are generated from that entry.
- **Editable wording:** add a field to `PAGE_TEXT_FIELDS` in `src/lib/cms.ts` with a `default`, and read it with `useSiteText()`.
- **Images** are uploaded to the public `media` bucket (images only, up to 10 MB). Only administrators can upload, change or delete files.
- **Design:** Cormorant Garamond for headings, Manrope for text and interface. Colours are semantic tokens in `src/styles.css`. Keep the single shared `Header` and `Footer`.
- **Content integrity:** do not invent statistics, testimonies, partners or history. Leave sections empty (they hide themselves) until the ministry supplies verified content.
