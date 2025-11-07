# Social Sharing & Open Graph

## How Titles/Descriptions/Images Are Chosen

### Entry Pages (Reviews & Episodes)

**Title**: `{entry.title} | Behind the Beat`

**Description**: 
- Prefers `pullQuote` (if present)
- Falls back to `summary` (for reviews) or `notes` (for episodes)
- Truncated to 160 characters, newlines removed

**OG Image**:
- Prefers `ogImage` field (if present in front-matter)
- Falls back to `cover` image
- Final fallback: `/images/og-default.jpg`

**Published Time**: Uses entry `date` field

### Listing & Static Pages

**Title**: `Behind the Beat — {description}` or `{page} | Behind the Beat`

**Description**: Static page-specific descriptions

**OG Image**: Default `/images/og-default.jpg`

**Type**: `website` (not `article`)

## Updating Canonical Base

Before launching, update the `CANONICAL_BASE` constant in `/lib/seo.ts`:

```typescript
export const CANONICAL_BASE = "https://YOUR-PROD-DOMAIN.com";
```

Replace `YOUR-PROD-DOMAIN.com` with your actual production domain.

## Testing OG Previews

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Enter any entry URL to preview how it will appear when shared.

## Image Requirements

- **Recommended size**: 1200×630px (OG image standard)
- **Format**: JPG or PNG
- **Location**: Place under `/public/images/` (e.g., `/public/images/reviews/album-cover.jpg`)
- **Reference in front-matter**: Use `/images/reviews/album-cover.jpg` (leading slash required)

## Custom OG Images

To use a custom OG image for a specific entry (different from the cover):

```yaml
---
title: "Album Title"
artist: "Artist Name"
# ... other fields ...
cover: "/images/reviews/album-cover.jpg"  # Display image
ogImage: "/images/reviews/album-og.jpg"   # Social sharing image (optional)
---
```

If `ogImage` is not provided, the `cover` image will be used for social sharing.



