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

- Keep shared editorial continuation sections in site components and sample article data in a browser-safe module so pages share the same content and grid language.
- Product demos and approval previews are frontend-only state machines; never imply they edit a real model or call live AI.
- Mount the shared footer once in the root layout so all content pages have consistent navigation.
