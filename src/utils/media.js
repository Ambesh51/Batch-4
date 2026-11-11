const EMBED_HOSTS = new Set([
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'player.vimeo.com',
])

export function extractYouTubeId(input) {
  const value = String(input || '').trim()
  if (!value) return ''
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0] || ''
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : ''
    }
    if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'm.youtube.com') {
      const watchId = url.searchParams.get('v')
      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) return watchId
      const match = url.pathname.match(/\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/)
      return match ? match[1] : ''
    }
  } catch {
    return ''
  }
  return ''
}

function isPlaceholder(value) {
  return /your_|placeholder|example|video_id/i.test(String(value || ''))
}

export function resolveEmbed(video) {
  const candidates = [video?.youtubeId, video?.url, video?.embedUrl]
  for (const candidate of candidates) {
    if (!candidate || isPlaceholder(candidate)) continue
    const id = extractYouTubeId(candidate)
    if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
  }
  const embed = String(video?.embedUrl || '').trim()
  if (!embed || isPlaceholder(embed)) return ''
  try {
    const url = new URL(embed)
    if (url.protocol !== 'https:' || !EMBED_HOSTS.has(url.hostname)) return ''
    return url.toString()
  } catch {
    return ''
  }
}

export function videoThumbnail(video) {
  if (video?.thumbnail) return video.thumbnail
  const id = extractYouTubeId(video?.youtubeId) || extractYouTubeId(video?.url)
  if (id && !isPlaceholder(video?.youtubeId) && !isPlaceholder(video?.url)) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  }
  return '/images/gallery/sky.svg'
}
