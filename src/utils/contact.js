export function digits(value) {
  return String(value || '').replace(/\D/g, '')
}

export function whatsappHref(number, text) {
  const phone = digits(number)
  if (phone.length < 8) return ''
  const base = `https://wa.me/${phone}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function telHref(number) {
  const phone = digits(number)
  if (phone.length < 8) return ''
  return `tel:+${phone}`
}

export function mailHref(email) {
  const value = String(email || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return ''
  return `mailto:${value}`
}

export function externalHref(url) {
  const value = String(url || '').trim()
  if (!value) return ''
  try {
    const parsed = new URL(value)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return ''
    return parsed.toString()
  } catch {
    return ''
  }
}
