# Tokens Cleanup Notes

## Removed tokens

The following tokens were removed as they were truly unused (not referenced in `globals.css`, `tailwind.config.ts`, or any TS/TSX/JS/JSX files, and not referenced by other tokens):

- `--gradient-card-review` — Gradient token for review cards, never used
- `--gradient-card-podcast` — Gradient token for podcast cards, never used
- `--gradient-hero-title` — Gradient token for hero titles, never used
- `--asset-root` — Asset root path token, never used
- `--slant-1` — Slant angle variant (-14deg), never used
- `--slant-2` — Slant angle variant (-18deg), never used (duplicate of `--slant-base`)
- `--slant-3` — Slant angle variant (-22deg), never used
- `--gutter-horizontal` — Horizontal gutter spacing token, never used

## Kept (suspected unused / maybe)

None — All tokens that appeared potentially unused were verified to be truly unused and removed. All remaining tokens are actively used in the codebase.

## Summary

- **Total tokens audited**: 92 (including duplicates in `@supports` block)
- **Tokens removed**: 8
- **Tokens kept**: 84

All removed tokens were verified to have zero references outside of their own definition lines in `tokens.css`. The cleanup maintains the design system's integrity while removing dead code.

