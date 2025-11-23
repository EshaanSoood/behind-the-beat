# Stack utilities → Tailwind space-y refactor

## Mapping

| old class  | new Tailwind utilities |
| ---------- | ---------------------- |
| `stack-lg` | `space-y-8`           |
| `stack-md` | `space-y-6`           |
| `stack-sm` | `space-y-4`           |

## Notes

- These were `> * + *` margin stacks that added vertical spacing between direct children.
- Tailwind's `space-y-*` utilities provide equivalent behavior using margin-top on direct children (except the first), which matches our use case.

## Files Changed

- `styles/globals.css` - Removed `.stack-lg`, `.stack-md`, and `.stack-sm` utility definitions from `@layer utilities`

## Unchanged Files

No component files were found using these stack utilities. The utilities were defined in `globals.css` but not actually used in any component code, so only the CSS definitions were removed.

