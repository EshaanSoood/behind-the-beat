# Global CSS Prune Notes

## Removed utilities

None - All utility classes are actively used in the codebase.

## Removed component classes

None - All component classes are actively used in the codebase.

## Kept despite "no usage" suspicion

None - All classes in `globals.css` were verified to be in use. The audit confirmed:

- All 10 utility classes are referenced in TSX/TS files
- All 50+ component classes are referenced in TSX/TS files
- Some classes are used in compound selectors (e.g., `.home-card img`) which are part of component styling
- Some classes are used dynamically (e.g., `nav-angle-1`, `nav-angle-2`) via template literals

## Summary

After a comprehensive audit of all class selectors in `globals.css`, no unused classes were found. All utilities and components are actively used throughout the codebase. This indicates that previous refactoring efforts were thorough and the codebase is clean.

