import { useEffect, useRef } from 'react'

export default function Starfield({ className, count = 64 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.15 + 0.25,
      a: Math.random() * 0.45 + 0.15,
      s: Math.random() * 0.7 + 0.2,
    }))
    let frame = 0

    function resize() {
      const { width, height } = parent.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, width) * ratio
      canvas.height = Math.max(1, height) * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function draw(time) {
      const { width, height } = parent.getBoundingClientRect()
      context.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        const twinkle = reduced ? 1 : 0.62 + Math.sin(time * 0.001 * star.s + star.x * 10) * 0.38
        context.beginPath()
        context.fillStyle = `rgba(248, 245, 239, ${star.a * twinkle})`
        context.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2)
        context.fill()
      })
      if (!reduced && !document.hidden) frame = requestAnimationFrame(draw)
    }

    function onVisibility() {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduced) frame = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    frame = requestAnimationFrame(draw)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
