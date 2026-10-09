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

# Project rules

- Daily menu comes from the Facebook page via Graph API; the page token lives only in `fb_connection` (service-role only), posts in public-readable `fb_posts`. Why: the token must never reach the browser.
- `/api/public/facebook/sync` is called by a scheduled job and only re-reads the connected page's posts. Why: public routes must stay idempotent and harmless.
- `/meniul-zilei` shows, in priority order: published `daily_menus` (admin + AI), then `fb_posts`, then `DAILY_MENUS` in `src/lib/site.ts`. Why: the page is never empty.
- Admin actions (`/admin/meniu`, `/admin/facebook`) are gated by the `ADMIN_KEY` secret checked inside every server function. Why: there are no user accounts.
- Menu photos live in the private `menu-photos` bucket and are served via signed URLs, because the workspace blocks public buckets.
- AI menu extraction runs server-side in `src/lib/menu-ai.server.ts` through the Lovable AI Gateway with structured output. Why: keys and prompts stay on the server.
