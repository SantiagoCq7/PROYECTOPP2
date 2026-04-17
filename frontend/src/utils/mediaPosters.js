const POSTER_BASE = 'https://media.themoviedb.org/t/p/w600_and_h900_face'

const POSTERS_BY_TITLE = {
  inception: `${POSTER_BASE}/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg`,
  interstellar: `${POSTER_BASE}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
  'blade runner 2049': `${POSTER_BASE}/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg`,
  dune: `${POSTER_BASE}/d5NXSklXo0qyIYkgV94XAgMIckC.jpg`,
  'the matrix': `${POSTER_BASE}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
  'breaking bad': `${POSTER_BASE}/ineLOBPG8AZsluYwnkMpHRyu7L.jpg`,
  'the bear': `${POSTER_BASE}/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg`,
  succession: `${POSTER_BASE}/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg`,
  parasite: `${POSTER_BASE}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
  mindhunter: `${POSTER_BASE}/fbKE87mojpIETWepSbD5Qt741fp.jpg`,
  'the last of us': `${POSTER_BASE}/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg`,
  'mad max: fury road': `${POSTER_BASE}/kqjL17yufvn9OVLyXYpvtyrFfak.jpg`,
}

const FALLBACK_BY_TYPE = {
  movie: `${POSTER_BASE}/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg`,
  series: `${POSTER_BASE}/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg`,
}

function normalizeTitle(title = '') {
  return title.trim().toLowerCase()
}

export function getFallbackPoster(contentType = 'movie') {
  return FALLBACK_BY_TYPE[contentType] ?? FALLBACK_BY_TYPE.movie
}

function escapeXml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function getLocalPosterFallback(title = 'Sin titulo', contentType = 'movie') {
  const safeTitle = escapeXml(String(title).slice(0, 44))
  const badge = contentType === 'series' ? 'SERIE' : 'PELICULA'
  const bgA = contentType === 'series' ? '#111827' : '#0f172a'
  const bgB = contentType === 'series' ? '#1f2937' : '#7f1d1d'

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750" role="img" aria-label="Poster ${safeTitle}">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${bgA}" />
      <stop offset="100%" stop-color="${bgB}" />
    </linearGradient>
  </defs>
  <rect width="500" height="750" fill="url(#g)" />
  <rect x="36" y="32" width="428" height="686" rx="16" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2" />
  <text x="250" y="180" fill="#ef4444" font-size="28" font-family="Arial, sans-serif" text-anchor="middle" font-weight="700">CINELOG</text>
  <text x="250" y="225" fill="#f8fafc" font-size="20" font-family="Arial, sans-serif" text-anchor="middle" letter-spacing="2">${badge}</text>
  <foreignObject x="56" y="300" width="388" height="220">
    <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;height:100%;align-items:center;justify-content:center;text-align:center;color:#fff;font-family:Arial, sans-serif;font-size:42px;font-weight:700;line-height:1.15;word-break:break-word;">
      ${safeTitle}
    </div>
  </foreignObject>
</svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getMediaPoster(item) {
  if (!item) {
    return getFallbackPoster('movie')
  }
  if (item.poster_url) {
    return item.poster_url
  }
  return POSTERS_BY_TITLE[normalizeTitle(item.title)] ?? getFallbackPoster(item.content_type)
}
