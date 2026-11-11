import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

function stars(width, height, count, seed) {
  let state = seed
  const rand = () => {
    state = (state * 48271) % 2147483647
    return state / 2147483647
  }
  let markup = ''
  for (let index = 0; index < count; index += 1) {
    const x = (rand() * width).toFixed(1)
    const y = (rand() * height).toFixed(1)
    const radius = (rand() * 1.25 + 0.25).toFixed(2)
    const opacity = (rand() * 0.5 + 0.18).toFixed(2)
    markup += `<circle cx="${x}" cy="${y}" r="${radius}" fill="#F8F5EF" opacity="${opacity}"/>`
  }
  return markup
}

function ticks(cx, cy, radius, count = 12) {
  let markup = ''
  for (let index = 0; index < count; index += 1) {
    const angle = ((Math.PI * 2) / count) * index - Math.PI / 2
    const inner = radius - 10
    const x1 = cx + Math.cos(angle) * inner
    const y1 = cy + Math.sin(angle) * inner
    const x2 = cx + Math.cos(angle) * (radius + 4)
    const y2 = cy + Math.sin(angle) * (radius + 4)
    markup += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#E5CB91" stroke-width="1.2" opacity="0.75"/>`
  }
  return markup
}

const defs = `
  <defs>
    <radialGradient id="sky" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1B2444"/>
      <stop offset="58%" stop-color="#0D1224"/>
      <stop offset="100%" stop-color="#070A14"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F0D7A2"/>
      <stop offset="45%" stop-color="#C9A45C"/>
      <stop offset="100%" stop-color="#8C6A32"/>
    </linearGradient>
    <linearGradient id="cameo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8F1E4"/>
      <stop offset="100%" stop-color="#E4C9A1"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E7C9A0" stop-opacity="0"/>
      <stop offset="100%" stop-color="#C9A45C" stop-opacity="0.18"/>
    </linearGradient>
    <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.16"/>
      </feComponentTransfer>
    </filter>
    <radialGradient id="halo" cx="50%" cy="42%" r="36%">
      <stop offset="0%" stop-color="#E5CB91" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#E5CB91" stop-opacity="0"/>
    </radialGradient>
  </defs>
`

function plate({ width, height, seed, motif, cameo = false }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img">
  ${defs}
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <rect width="${width}" height="${height}" fill="url(#halo)"/>
  ${stars(width, height, Math.round((width * height) / 14000), seed)}
  <circle cx="${width * 0.5}" cy="${height * 0.46}" r="${Math.min(width, height) * 0.34}" fill="none" stroke="#C9A45C" stroke-opacity="0.35" stroke-width="1"/>
  ${ticks(width * 0.5, height * 0.46, Math.min(width, height) * 0.34)}
  ${motif}
  ${cameo ? '' : ''}
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.45"/>
  <rect width="${width}" height="${height}" fill="url(#ground)"/>
</svg>`
}

const bustPath = [
  'M 120 980',
  'C 150 860, 190 760, 214 660',
  'C 230 560, 214 470, 236 390',
  'C 252 320, 300 250, 370 200',
  'C 450 142, 545 150, 590 214',
  'C 624 262, 600 318, 628 352',
  'C 668 378, 674 424, 612 438',
  'C 578 446, 598 470, 574 488',
  'C 546 508, 566 536, 536 558',
  'C 500 586, 528 640, 500 710',
  'C 470 790, 520 900, 680 980',
  'Z',
].join(' ')

function portrait(width, height) {
  const scale = Math.min(width / 860, height / 1120)
  const ox = width * 0.5 - 400 * scale
  const oy = height * 0.56 - 590 * scale
  return plate({
    width,
    height,
    seed: width * 13 + height,
    cameo: true,
    motif: `
      <g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${scale.toFixed(3)})">
        <path d="${bustPath}" fill="#120E0A" opacity="0.38" transform="translate(16 18)"/>
        <path d="${bustPath}" fill="url(#cameo)"/>
        <path d="${bustPath}" fill="none" stroke="#8C6A32" stroke-width="3"/>
        <path d="M520 318 C548 304 586 308 604 326" fill="none" stroke="#A9845C" stroke-width="3" stroke-linecap="round"/>
        <path d="M532 338 C558 330 586 336 598 350" fill="none" stroke="#8C623C" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M292 348 C262 372 260 438 304 468" fill="none" stroke="#C9A27A" stroke-width="3" stroke-linecap="round"/>
        <path d="M300 820 C360 760 430 770 470 830" fill="none" stroke="#C9A45C" stroke-width="2" opacity="0.55" stroke-linecap="round"/>
      </g>
    `,
  })
}

const motifs = {
  consultation: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 360)">
      <circle cx="0" cy="0" r="150" opacity="0.9"/>
      <path d="M0 -150 L0 150 M-150 0 L150 0 M-106 -106 L106 106 M106 -106 L-106 106" opacity="0.55"/>
      <circle cx="0" cy="0" r="46"/>
      <path d="M-250 210 H250" stroke-width="1"/>
      <path d="M-180 210 C-150 120 -80 90 -20 90" />
      <path d="M180 210 C150 130 90 100 30 96" />
      <circle cx="-20" cy="90" r="16" fill="#0D1224"/>
      <circle cx="34" cy="96" r="16" fill="#0D1224"/>
    </g>`,
  study: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 390)">
      <path d="M-220 80 L-20 10 L-20 200 L-220 250 Z" />
      <path d="M20 10 L220 80 L220 250 L20 200 Z" />
      <path d="M-20 10 L20 10" />
      <path d="M-180 70 H-60 M-190 110 H-70 M-200 150 H-80" opacity="0.7"/>
      <path d="M70 80 H180 M60 120 H190 M70 160 H180" opacity="0.7"/>
      <circle cx="0" cy="-120" r="70"/>
      <path d="M0 -190 V-50 M-70 -120 H70" opacity="0.6"/>
    </g>`,
  gathering: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 400)">
      <path d="M-180 180 V40 C-180 -80 -90 -150 0 -150 C90 -150 180 -80 180 40 V180" />
      <path d="M-120 180 V50 C-120 -20 -60 -70 0 -70 C60 -70 120 -20 120 50 V180" opacity="0.75"/>
      <path d="M0 20 C-18 20 -28 -8 -16 -28 C-8 -10 8 -10 16 -28 C28 -8 18 20 0 20 Z" fill="#E5CB91" fill-opacity="0.18"/>
      <path d="M0 20 V90" />
      <path d="M-70 200 H70" />
    </g>`,
  seminar: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 400)">
      <rect x="-70" y="-20" width="140" height="78" />
      <path d="M-24 -20 V-70 H24 V-20" />
      <circle cx="0" cy="-96" r="18" />
      <path d="M-230 150 H230" />
      <path d="M-190 110 H-90 M-170 70 H-110" opacity="0.65"/>
      <path d="M90 110 H190 M110 70 H170" opacity="0.65"/>
      <path d="M-250 190 H250" opacity="0.5"/>
    </g>`,
  appearance: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 390)">
      <rect x="-16" y="-10" width="32" height="150" rx="16"/>
      <circle cx="0" cy="-36" r="28"/>
      <path d="M-70 -10 H-28 M28 -10 H70" />
      <path d="M-120 180 H120" />
      <path d="M-200 -150 L-120 -70 L-40 -110 L40 -20" opacity="0.8"/>
      <circle cx="-200" cy="-150" r="3" fill="#E5CB91" stroke="none"/>
      <circle cx="-120" cy="-70" r="3" fill="#E5CB91" stroke="none"/>
      <circle cx="-40" cy="-110" r="3" fill="#E5CB91" stroke="none"/>
      <circle cx="40" cy="-20" r="3" fill="#E5CB91" stroke="none"/>
    </g>`,
  recognition: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 390)">
      <circle cx="0" cy="-20" r="120"/>
      <circle cx="0" cy="-20" r="86"/>
      <path d="M0 -78 L14 -40 L54 -40 L22 -14 L34 24 L0 2 L-34 24 L-22 -14 L-54 -40 L-14 -40 Z" />
      <path d="M-46 96 L0 150 L46 96" />
    </g>`,
  chart: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.4" transform="translate(600 390)">
      <rect x="-170" y="-170" width="340" height="340"/>
      <path d="M-170 -170 L170 170 M170 -170 L-170 170"/>
      <path d="M0 -170 V170 M-170 0 H170"/>
      <rect x="-56" y="-56" width="112" height="112"/>
      <circle cx="0" cy="0" r="8" fill="#E5CB91" stroke="none"/>
    </g>`,
  sky: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.3" transform="translate(600 390)">
      <ellipse cx="0" cy="0" rx="230" ry="90" opacity="0.8"/>
      <ellipse cx="0" cy="0" rx="160" ry="62" opacity="0.55"/>
      <circle cx="168" cy="-18" r="16" fill="#E5CB91" fill-opacity="0.85" stroke="none"/>
      <circle cx="-210" cy="20" r="5" fill="#F8F5EF" stroke="none"/>
      <path d="M-40 -150 L10 -80 L90 -60" opacity="0.8"/>
      <circle cx="-40" cy="-150" r="2.5" fill="#F8F5EF" stroke="none"/>
      <circle cx="10" cy="-80" r="2.5" fill="#F8F5EF" stroke="none"/>
      <circle cx="90" cy="-60" r="2.5" fill="#F8F5EF" stroke="none"/>
    </g>`,
}

write('/workspace/public/favicon.svg', `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#090D1C"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#C9A45C" stroke-width="1.4"/>
  <path d="M32 12 L40 32 L32 52 L24 32 Z" fill="none" stroke="#E5CB91" stroke-width="1.3"/>
  <circle cx="32" cy="32" r="2.4" fill="#E5CB91"/>
</svg>`)

write('/workspace/public/images/father/portrait.svg', portrait(900, 900))
write('/workspace/public/images/father/editorial.svg', portrait(900, 1120))
write('/workspace/public/images/father/cover.svg', plate({
  width: 1600,
  height: 900,
  seed: 42,
  motif: `
    <g fill="none" stroke="url(#gold)" stroke-width="1.3">
      <circle cx="1160" cy="450" r="250" opacity="0.85"/>
      <circle cx="1160" cy="450" r="180" opacity="0.45"/>
      ${ticks(1160, 450, 250)}
      <path d="M180 620 C420 520 680 700 980 560" opacity="0.7"/>
      <circle cx="420" cy="250" r="3" fill="#E5CB91" stroke="none"/>
      <circle cx="520" cy="180" r="2" fill="#F8F5EF" stroke="none"/>
      <circle cx="300" cy="320" r="1.6" fill="#F8F5EF" stroke="none"/>
    </g>
  `,
}))

const files = {
  consultation: motifs.consultation,
  study: motifs.study,
  gathering: motifs.gathering,
  seminar: motifs.seminar,
  appearance: motifs.appearance,
  recognition: motifs.recognition,
  chart: motifs.chart,
  sky: motifs.sky,
}

Object.entries(files).forEach(([name, motif], index) => {
  write(
    `/workspace/public/images/gallery/${name}.svg`,
    plate({ width: 1400, height: 1000, seed: 80 + index * 97, motif }),
  )
})

console.log('art written')
