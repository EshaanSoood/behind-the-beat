export const reviewFields = `
  _id,
  title,
  "slug": slug.current,
  reviewType,
  artist,
  author,
  "date": publishedAt,
  "cover": albumArt.asset->url,
  "alt": albumArt.alt,
  genreTags,
  pullQuote,
  body[]{
    ...,
    _type == "reviewImage" => {
      ...,
      asset->
    }
  },
  tracklist[]{
    title
  },
  streamingLinks{
    spotify,
    appleMusic,
    youtubeMusic,
    bandcamp
  },
  artistLinks{
    instagram,
    youtube,
    website
  }
`;

export const podcastEpisodeFields = `
  _id,
  title,
  "slug": slug.current,
  "date": publishedAt,
  guest,
  pullQuote,
  "cover": cover.asset->url,
  "alt": cover.alt,
  youtubeUrl,
  aboutTheArtist,
  artistLinks{
    instagram,
    youtube,
    website
  }
`;

export const allReviewsQuery = `*[_type == "review"] | order(publishedAt desc) {
  ${reviewFields}
}`;

export const allPodcastEpisodesQuery = `*[_type == "podcastEpisode"] | order(publishedAt desc) {
  ${podcastEpisodeFields}
}`;

export const reviewBySlugQuery = `*[_type == "review" && slug.current == $slug][0] {
  ${reviewFields}
}`;

export const podcastEpisodeBySlugQuery = `*[_type == "podcastEpisode" && slug.current == $slug][0] {
  ${podcastEpisodeFields}
}`;

