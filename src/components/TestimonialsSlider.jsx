import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import testimonials from '../data/testimonials.json'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { cx } from '../utils/cx'
import Photo from './Photo'
import Reveal from './Reveal'
import SampleNote from './SampleNote'
import SectionHeading from './SectionHeading'

function collection(data) {
  if (Array.isArray(data)) return { notice: '', items: data }
  return { notice: data?.notice || '', items: data?.items || [] }
}

function monogram(name) {
  const parts = String(name || '')
    .replace(/[^\p{L}\s]/gu, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return '•'
  return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

function Stars({ value }) {
  const count = Math.max(0, Math.min(5, Math.round(Number(value))))
  return (
    <span className="stars" aria-label={`${count} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={15} strokeWidth={1.5} fill={index < count ? 'currentColor' : 'none'} />
      ))}
    </span>
  )
}

export default function TestimonialsSlider() {
  const { notice, items } = collection(testimonials)
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const reduced = usePrefersReducedMotion()
  const count = items.length

  useEffect(() => {
    if (hover || reduced || count < 2) return undefined
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count)
    }, 6800)
    return () => window.clearInterval(timer)
  }, [hover, reduced, count])

  function go(next) {
    if (!count) return
    setIndex((next + count) % count)
  }

  return (
    <section className="section quotes" id="testimonials">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="07"
            align="center"
            eyebrow="Testimonials"
            title="Words of Trust and Gratitude."
            lede="Real words belong here, with permission. Until then, these cards are only a layout."
          />
          <SampleNote>{notice}</SampleNote>
          {count ? (
            <div
              className="quotes__panel"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
              aria-roledescription="carousel"
              aria-label="Sample testimonials"
            >
              <button type="button" className="icon-btn" onClick={() => go(index - 1)} aria-label="Previous testimonial">
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <div className="quotes__viewport">
                {items.map((item, itemIndex) => (
                  <figure
                    key={item.id}
                    className={cx('quotes__slide', itemIndex === index && 'is-active')}
                    aria-hidden={itemIndex === index ? undefined : true}
                  >
                    <Quote aria-hidden="true" />
                    {!item.verified ? <span className="chip">Sample — not a verified review</span> : null}
                    {item.verified && item.rating ? <Stars value={item.rating} /> : null}
                    <blockquote>
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption>
                      {item.image ? (
                        <Photo src={item.image} alt="" className="avatar" />
                      ) : (
                        <span className="avatar avatar--letter" aria-hidden="true">{monogram(item.name)}</span>
                      )}
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.city}</small>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <button type="button" className="icon-btn" onClick={() => go(index + 1)} aria-label="Next testimonial">
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
              <div className="dots quotes__dots" role="group" aria-label="Choose a testimonial">
                {items.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cx(itemIndex === index && 'is-active')}
                    aria-label={`Show testimonial from ${item.name}`}
                    aria-current={itemIndex === index ? 'true' : undefined}
                    onClick={() => setIndex(itemIndex)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="empty">Add testimonials to src/data/testimonials.json.</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
