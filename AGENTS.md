<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the shared navigation and section colors in semantic tokens and a single Header component so menu states and responsive styling remain consistent across pages.
- Editable content lives in Lovable Cloud tables; admin UI is generic and driven by src/lib/admin-sections.ts — add new managed content types there rather than new admin pages.
- Uploaded images go to the private `media` bucket and are served through /api/public/media/* — public buckets are blocked in this workspace.
- Admin access is checked with has_role() in the database; the first signed-in account can claim admin only while none exists.
