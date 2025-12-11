import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity (optional but recommended)
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      console.error('Webhook revalidation failed: Invalid secret')
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Webhook received:', JSON.stringify(body, null, 2))

    // Sanity webhooks can send data in different formats
    // Format 1: Direct document (from simple webhook config)
    // Format 2: Mutation format (from advanced webhook config)
    let documentType: string | null = null
    let slugValue: string | null = null

    // Try to extract document type and slug from different payload formats
    if (body._type) {
      // Direct document format
      documentType = body._type
      slugValue = body.slug?.current || body.slug
    } else if (body.mutations && Array.isArray(body.mutations)) {
      // Mutation format - extract from first mutation
      const mutation = body.mutations[0]
      if (mutation.create) {
        documentType = mutation.create._type
        slugValue = mutation.create.slug?.current || mutation.create.slug
      } else if (mutation.update) {
        documentType = mutation.update._type || mutation.update.set?._type
        slugValue = mutation.update.set?.slug?.current || mutation.update.set?.slug
      } else if (mutation.delete) {
        // For deletes, we might need to fetch the document or revalidate all
        documentType = mutation.delete._type
      }
    } else if (body.type) {
      // Alternative format
      documentType = body.type
      slugValue = body.slug?.current || body.slug
    }

    if (!documentType) {
      console.warn('Webhook payload format not recognized:', body)
      // Revalidate everything as fallback
      revalidatePath('/')
      revalidatePath('/reviews')
      revalidatePath('/podcast')
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: 'Revalidated all paths (unknown document type)',
        paths: ['/', '/reviews', '/podcast']
      })
    }

    const revalidatedPaths: string[] = []

    // Revalidate based on document type
    if (documentType === 'review') {
      revalidatePath('/reviews')
      revalidatePath('/')
      revalidatedPaths.push('/reviews', '/')
      if (slugValue) {
        revalidatePath(`/reviews/${slugValue}`)
        revalidatedPaths.push(`/reviews/${slugValue}`)
      }
    } else if (documentType === 'podcastEpisode') {
      revalidatePath('/podcast')
      revalidatePath('/')
      revalidatedPaths.push('/podcast', '/')
      if (slugValue) {
        revalidatePath(`/podcast/${slugValue}`)
        revalidatedPaths.push(`/podcast/${slugValue}`)
      }
    } else if (documentType === 'reviewImage') {
      // Review images are embedded, so revalidate all reviews
      revalidatePath('/reviews')
      revalidatePath('/')
      revalidatedPaths.push('/reviews', '/')
    } else {
      // Unknown type - revalidate everything
      revalidatePath('/')
      revalidatePath('/reviews')
      revalidatePath('/podcast')
      revalidatedPaths.push('/', '/reviews', '/podcast')
    }

    console.log(`Revalidated paths for ${documentType}:`, revalidatedPaths)

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type: documentType,
      slug: slugValue,
      paths: revalidatedPaths
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

