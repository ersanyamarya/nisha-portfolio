# CLAUDE.md

This folder manages Nisha's Instagram: post design, short videos, and posting. It is not part of the Gatsby site.

## Layout

- `raw/`: source photos supplied by Nisha (committed).
- `posts/`: HyperFrames projects, one folder per post, e.g. `posts/latte-post/` (git-ignored).
- `videos/`: generated videos (git-ignored). Keep only generated videos here.

## Posting

- Before any post, run `opencli instagram whoami` and confirm the account with the user. opencli posts to whichever account is logged in inside Chrome.
- Confirm the caption and video file with the user, then post with `opencli instagram reel "<caption>" --video <path>`.
- Never enter Instagram credentials. The user logs in in their own browser (`opencli instagram login`).
- HTTP 429 means rate limiting. Wait and retry later; do not loop.

## Building posts

- Use HyperFrames (`/hyperframes`) and GSAP. Storyboard first, then render.
- Build and render with Node 22: `PATH=$HOME/.local/share/mise/installs/node/22.23.2/bin:$PATH`.
- Icons: Lucide (ISC) and Lucide Animated (MIT). Neither needs attribution. Do not use Lordicon free icons without crediting them.
