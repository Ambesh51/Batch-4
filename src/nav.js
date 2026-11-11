export const NAV_LINKS = [
  { label: 'Home', to: '/', key: 'home' },
  { label: 'About My Father', to: '/about', key: 'about' },
  { label: 'My Journey', to: '/about#journey', key: 'journey' },
  { label: 'Services', to: '/services', key: 'services' },
  { label: 'Horoscope', to: '/horoscope', key: 'horoscope' },
  { label: 'Gallery', to: '/gallery', key: 'gallery' },
  { label: 'Videos', to: '/videos', key: 'videos' },
  { label: 'Testimonials', to: '/#testimonials', key: 'testimonials' },
  { label: 'Contact', to: '/contact', key: 'contact' },
]

export function isNavActive(key, pathname, hash) {
  switch (key) {
    case 'home':
      return pathname === '/' && hash !== '#testimonials'
    case 'testimonials':
      return pathname === '/' && hash === '#testimonials'
    case 'about':
      return pathname === '/about' && hash !== '#journey'
    case 'journey':
      return pathname === '/about' && hash === '#journey'
    case 'services':
      return pathname.startsWith('/services')
    case 'horoscope':
      return pathname.startsWith('/horoscope')
    case 'gallery':
      return pathname.startsWith('/gallery')
    case 'videos':
      return pathname.startsWith('/videos')
    case 'contact':
      return pathname.startsWith('/contact')
    default:
      return false
  }
}
