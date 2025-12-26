# Sanity Client-Side Exception Fixes

This document outlines the fixes applied to prevent common Next.js + Sanity client-side exceptions.

## Issues Fixed

### 1. **Image URL Generation (Null/Undefined Handling)**

**Problem**: `urlFor()` and `getImageUrl()` could crash if passed `null` or `undefined` image sources from Sanity.

**Fix**: Added defensive checks in `lib/sanity/image.ts`:
- `urlFor()` now handles null/undefined sources gracefully
- `getImageUrl()` returns empty string if source is missing
- Added try-catch around URL generation

**Files Changed**:
- `lib/sanity/image.ts`

### 2. **Slug Handling**

**Problem**: GROQ queries return `slug.current`, which could be `null` or `undefined`, causing crashes when used in URLs.

**Fix**: Enhanced slug validation in `lib/content.ts`:
- Explicit type checking to ensure slug is always a string
- Warning logs when slugs are missing (helps debug data issues)
- Fallback to empty string (which will be caught by validation)

**Files Changed**:
- `lib/content.ts` (`mapSanityReviewToReview`, `mapSanityEpisodeToEpisode`)

### 3. **PortableText Image Rendering**

**Problem**: `reviewImage` blocks in PortableText could crash if image URL generation failed.

**Fix**: Added error handling in `components/PortableTextRenderer.tsx`:
- Try-catch around image URL generation
- Returns `null` (doesn't render) if URL generation fails
- Console warnings for debugging

**Files Changed**:
- `components/PortableTextRenderer.tsx`

### 4. **Date Formatting Hydration**

**Problem**: `toLocaleDateString()` can produce different results on server vs client, causing hydration mismatches.

**Fix**: Improved `formatDate()` in `lib/format.ts`:
- Added `timeZone: "UTC"` to ensure consistency
- Added error handling with fallback

**Files Changed**:
- `lib/format.ts`

### 5. **Array Type Safety**

**Problem**: Arrays from Sanity (tracklist, genreTags, body) could be `null` or non-arrays.

**Fix**: Added `Array.isArray()` checks in mapping functions:
- Ensures tracklist, genreTags, and body are always arrays
- Prevents `.map()` and `.filter()` crashes

**Files Changed**:
- `lib/content.ts`

### 6. **Environment Variable Validation**

**Problem**: Missing Sanity env vars could cause silent failures or unclear errors.

**Fix**: Added validation logging in `lib/sanity.ts`:
- Console errors when required env vars are missing
- Helps catch configuration issues early

**Files Changed**:
- `lib/sanity.ts`

## Common Causes Checklist

When debugging client-side exceptions, check these in order:

### 1. **Missing Environment Variables on Vercel**
- [ ] `SANITY_PROJECT_ID` is set in Vercel → Settings → Environment Variables
- [ ] `SANITY_DATASET` is set (usually `"production"`)
- [ ] `SANITY_API_VERSION` is set (usually `"2024-10-01"`)
- [ ] Values match your local `.env.local` file

**Symptom**: Console errors like "projectId is required" or 401/403 errors

### 2. **Server/Client Component Boundary**
- [ ] Components using `useState`, `useEffect`, `window`, `document` have `"use client"` directive
- [ ] Sanity client is only used in server components (not client components)
- [ ] No browser-only APIs in server components

**Symptom**: "window is not defined" or "document is not defined" errors

### 3. **Missing or Null Sanity Data**
- [ ] All required fields exist in Sanity documents (slug, title, cover, alt)
- [ ] Image assets are properly uploaded and referenced
- [ ] PortableText body fields are not null

**Symptom**: "Cannot read property X of undefined" or "null is not an object"

### 4. **Hydration Mismatches**
- [ ] Date formatting uses consistent timezone (UTC)
- [ ] No random values or timestamps in rendered output
- [ ] No `toLocaleString()` without timezone specified

**Symptom**: React hydration warnings in console

### 5. **Version Mismatches**
- [ ] `package-lock.json` is committed to git
- [ ] Vercel uses the same lockfile as local
- [ ] `@sanity/client` and `@sanity/image-url` versions match

**Symptom**: "is not a function" errors or stack traces in node_modules

## Testing Checklist

After deploying fixes:

1. **Check Browser Console** (Safari DevTools → Console):
   - No red errors
   - Check for warnings about missing data

2. **Test All Pages**:
   - Home page loads
   - Review listing page loads
   - Podcast listing page loads
   - Individual review pages load
   - Individual podcast pages load

3. **Test Edge Cases**:
   - Reviews/episodes with missing images
   - Reviews/episodes with empty PortableText
   - Reviews/episodes with missing optional fields

4. **Check Network Tab**:
   - Sanity API requests return 200 (not 401/403)
   - Image URLs are valid (not 404)

## Debugging Steps

If you still see client-side exceptions:

1. **Copy the exact error message** from Safari DevTools Console
2. **Check the stack trace** - it will show which file/line crashed
3. **Verify environment variables** in Vercel match local
4. **Check Sanity Studio** - ensure all documents have required fields
5. **Test locally** with `npm run build && npm start` to reproduce

## Related Files

- `lib/sanity.ts` - Sanity client configuration
- `lib/sanity/image.ts` - Image URL generation
- `lib/sanity/queries.ts` - GROQ queries
- `lib/content.ts` - Data fetching and mapping
- `components/PortableTextRenderer.tsx` - PortableText rendering
- `lib/format.ts` - Date formatting utilities

