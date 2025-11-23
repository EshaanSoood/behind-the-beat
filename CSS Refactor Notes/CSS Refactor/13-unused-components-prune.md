# Unused Component Selectors Prune

## Removed component selectors

- `.site-header__logo-wordmark` — unused, removed from `@layer components`
- `.card-actions--image-button` — unused, removed from `@layer components` (including nested `.button-trapezoid` rules)
- `.share-copy-button` — unused, removed from `@layer components` (including nested `.button-trapezoid` rules)

## Kept despite audit (discrepancies)

- `.entry-header-left` — audit said unused, but still used in `app/reviews/[slug]/components/ReviewHeader.tsx` (line 19)
- `.entry-header-right` — audit said unused, but still used in `app/reviews/[slug]/components/ReviewHeader.tsx` (line 38)


