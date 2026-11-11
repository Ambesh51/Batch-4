import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import images from '../data/images.json'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { cx } from '../utils/cx'
import Lightbox from './Lightbox'
import Photo from './Photo'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const slides = (Array.isArray(images) ? images : []).filter((item) => item.showInSlider !== false)

export default function FatherImageSlider() {
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  const drag = useRef({ x: 0, moved: false })
  const count = slides.length
  const current = slides[index]

  useEffect(() => {
    if (hover || open || reduced || count < 2) return undefined
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [hover, open, reduced, count])

  function go(next) {
    if (!count) return
    setIndex((next + count) % count)
  }

  function onPointerDown(event) {
    drag.current = { x: event.clientX, moved: false }
  }

  function onPointerUp(event) {
    const delta = event.clientX - drag.current.x
    if (Math.abs(delta) > 48) {
      drag.current.moved = true
      go(index + (delta < 0 ? 1 : -1))
    }
  }

  if (!current) {
    return (
      <section className="section" id="portraits">
        <div className="container">
          <SectionHeading
            eyebrow="Photographs"
            title="A life in pictures"
            lede="Add photographs to src/data/images.json. Set showInSlider to true for the ones that belong here."
          />
        </div>
      </section>
    )
  }

  return (
    <section className="section section--raise" id="portraits">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Photographs"
            title="Moments from the work and the life."
            lede="These frames are illustrated placeholders. Replace imageUrl with your father's photographs, and keep a caption only where you have permission to publish the picture."
          />
          <div
            className="feature-slider"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            onKeyDown={(event) => {
              if (open) return
              if (event.key === 'ArrowRight') go(index + 1)
              if (event.key === 'ArrowLeft') go(index - 1)
            }}
            aria-roledescription="carousel"
            aria-label={`Photograph ${index + 1} of ${count}: ${current.title}`}
          >
            <div className="feature-slider__layout">
              <div
                className="feature-slider__viewport"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onClickCapture={(event) => {
                  if (drag.current.moved) {
                    event.preventDefault()
                    event.stopPropagation()
                    drag.current.moved = false
                  }
                }}
              >
                <div className="feature-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
                  {slides.map((slide) => (
                    <figure className="feature-slider__slide" key={slide.id}>
                      <button
                        type="button"
                        className="feature-slider__open"
                        onClick={() => setOpen(true)}
                        aria-label={`Open full preview of ${slide.title}`}
                      >
                        <Photo src={slide.imageUrl} alt={slide.alt || slide.title} />
                      </button>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="feature-slider__aside">
                <p className="eyebrow">{current.category}</p>
                <h3>{current.title}</h3>
                <p>{current.caption}</p>
                <div className="feature-slider__controls">
                  <button type="button" className="icon-btn" onClick={() => go(index - 1)} aria-label="Previous photograph">
                    <ChevronLeft size={18} strokeWidth={1.5} />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => go(index + 1)} aria-label="Next photograph">
                    <ChevronRight size={18} strokeWidth={1.5} />
                  </button>
                  <span className="feature-slider__count">{index + 1} / {count}</span>
                </div>
                <div className="dots" role="group" aria-label="Choose a photograph">
                  {slides.map((slide, slideIndex) => (
                    <button
                      key={slide.id}
                      type="button"
                      className={cx(slideIndex === index && 'is-active')}
                      aria-label={`Show ${slide.title}`}
                      aria-current={slideIndex === index ? 'true' : undefined}
                      onClick={() => setIndex(slideIndex)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      {open ? (
        <Lightbox
          items={slides}
          index={index}
          onClose={() => setOpen(false)}
          onChange={setIndex}
        />
      ) : null}
    </section>
  )
}
