# Duplicate utilities → Tailwind built-ins

## Mapping table

| old class       | new Tailwind usage              | notes                                      |
| ----------------| -------------------------------- |-------------------------------------------|
| `.line-clamp-2` | `line-clamp-2`                  | Uses Tailwind line-clamp plugin           |
| `.line-clamp-3` | `line-clamp-3`                  | Uses Tailwind line-clamp plugin           |
| `.ratio-1x1`    | `relative aspect-square`        | Uses Tailwind aspect utilities            |
| `.sr-only`      | `sr-only` (Tailwind built-in)   | Same classname, but Tailwind implementation|

For `sr-only` and `line-clamp-*` the class names stay the same; we're just removing redundant global CSS once we're sure the Tailwind utilities/plugins are available.

## Plugin check

- `line-clamp plugin: NOT present` - The `tailwind.config.ts` has an empty `plugins: []` array, so the `@tailwindcss/line-clamp` plugin is not installed. Therefore, `.line-clamp-2` and `.line-clamp-3` CSS rules will remain in `globals.css` until the plugin is added.

## Files updated

- `app/(home)/components/HomeCard.tsx` - Changed `ratio-1x1` → `relative aspect-square` on line 180

## CSS changes

- `.ratio-1x1` rules removed from `globals.css` (including the `@supports not (aspect-ratio: 1 / 1)` fallback block)
- `.sr-only` removed from `globals.css`
- `.line-clamp-2/3` left in place in `globals.css` because the line-clamp plugin is not present

## Deferred

The `.line-clamp-2` and `.line-clamp-3` utilities remain in `globals.css` because the `@tailwindcss/line-clamp` plugin is not installed. Once the plugin is added to `tailwind.config.ts`, these CSS rules can be removed.


