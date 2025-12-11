# Sanity Webhook Setup for On-Demand Revalidation

This guide explains how to set up Sanity webhooks to trigger on-demand revalidation of your Next.js frontend when content changes in Sanity Studio.

## Overview

When content is updated in Sanity Studio, a webhook can automatically trigger Next.js to revalidate the affected pages, ensuring your frontend shows the latest content immediately.

## Setup Instructions

### 1. Get Your Revalidation Endpoint URL

Your webhook endpoint is located at:
```
https://your-domain.com/api/revalidate
```

For local development, you can use a tool like [ngrok](https://ngrok.com/) to expose your local server:
```bash
ngrok http 3000
```

### 2. Set Up Environment Variable

Add a secret token to your environment variables for webhook security:

**In your `.env.local` file:**
```env
SANITY_REVALIDATE_SECRET=your-secret-token-here
```

**In Vercel (or your hosting platform):**
1. Go to your project settings
2. Navigate to Environment Variables
3. Add `SANITY_REVALIDATE_SECRET` with a secure random string

Generate a secure token:
```bash
openssl rand -base64 32
```

### 3. Configure Webhook in Sanity Dashboard

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project (`74f8ikg7`)
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure the webhook:
   - **Name**: `Next.js Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=your-secret-token-here`
   - **Dataset**: `production`
   - **Trigger on**: Select:
     - ✅ Create
     - ✅ Update
     - ✅ Delete
   - **Filter**: Leave empty (or use `_type == "review" || _type == "podcastEpisode" || _type == "reviewImage"` to only trigger for these types)
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07` or later
   - **Include drafts**: ❌ (unchecked)
   - **Secret**: Leave empty (we're using query param instead)

6. Click **Save**

### 4. Test the Webhook

1. Make a change to a review or podcast episode in Sanity Studio
2. Check your Next.js logs (Vercel logs or local terminal) to see if the revalidation was triggered
3. Visit the affected page to verify it shows the updated content

### 5. Verify It's Working

You can check if revalidation is working by:

1. **Check Vercel logs** (if deployed):
   - Look for successful revalidation messages
   - Check for any errors

2. **Test locally**:
   - Make a change in Sanity Studio
   - Check your terminal for revalidation logs
   - Refresh the affected page

3. **Check the response**:
   - The webhook endpoint returns JSON with revalidation status
   - Example response:
     ```json
     {
       "revalidated": true,
       "now": 1234567890,
       "paths": ["/reviews", "/", "/reviews/example-slug"]
     }
     ```

## How It Works

1. **Content Update**: When you publish or update content in Sanity Studio
2. **Webhook Trigger**: Sanity sends a POST request to `/api/revalidate`
3. **Security Check**: The endpoint verifies the secret token
4. **Revalidation**: Next.js revalidates the affected pages:
   - Home page (`/`)
   - List pages (`/reviews`, `/podcast`)
   - Individual entry pages (`/reviews/[slug]`, `/podcast/[slug]`)
5. **Fresh Content**: The next request to those pages fetches fresh data from Sanity

## Fallback: Time-Based Revalidation

Even without webhooks, your site will automatically revalidate every 60 seconds (configured via `export const revalidate = 60` in your page files). This ensures content updates appear within a minute, even if webhooks fail.

## Troubleshooting

### Webhook Not Triggering

1. **Check the URL**: Ensure it's correct and accessible
2. **Check the secret**: Verify `SANITY_REVALIDATE_SECRET` matches in both Sanity webhook URL and your environment variables
3. **Check logs**: Look for errors in Sanity webhook logs and Next.js logs
4. **Test manually**: You can manually trigger revalidation by calling:
   ```bash
   curl -X POST "https://your-domain.com/api/revalidate?secret=your-secret-token"
   ```

### Content Still Not Updating

1. **Check CDN cache**: Sanity CDN may take a few seconds to clear
2. **Check Next.js cache**: Pages are cached for up to 60 seconds
3. **Hard refresh**: Try a hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
4. **Check revalidation logs**: Verify revalidation is actually happening

### 401 Unauthorized Error

- Ensure the `secret` query parameter in your webhook URL matches `SANITY_REVALIDATE_SECRET`
- Check that the environment variable is set correctly in your hosting platform

## Additional Resources

- [Next.js Revalidation Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Next.js on-demand Revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

