import { useMemo, useState } from 'react'
import images from '../data/images.json'
import father from '../data/father.json'
import { cx } from '../utils/cx'
import Lightbox from './Lightbox'
import Photo from './Photo'
import SampleNote from './SampleNote'

export default function ImageGallery() {
  const items = Array.isArray(images) ? images : []
  const categories = useMemo(() => {
    const names = []
    items.forEach((item) => {
      if (item.category && !names.includes(item.category)) names.push(item.category)
    })
    return names
  }, [items])
  const [category, setCategory] = useState('All')
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const visible = category === 'All' ? items : items.filter((item) => item.category === category)

  function openAt(item) {
    const next = visible.findIndex((entry) => entry.id === item.id)
    setIndex(next < 0 ? 0 : next)
    setOpen(true)
  }

  return (
    <div>
      <SampleNote>{father.mediaNote}</SampleNote>
      <div className="filters" role="group" aria-label="Filter photographs">
        {['All', ...categories].map((name) => (
          <button
            key={name}
            type="button"
            className={cx(category === name && 'is-active')}
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="gallery-grid">
          {visible.map((item) => (
            <figure key={item.id} className="gallery-card">
              <button type="button" onClick={() => openAt(item)} aria-label={`Open ${item.title}`}>
                <Photo src={item.imageUrl} alt={item.alt || item.title} />
              </button>
              <figcaption>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="empty">No photographs in this category yet. Add them to src/data/images.json.</p>
      )}
      {open ? (
        <Lightbox items={visible} index={index} onClose={() => setOpen(false)} onChange={setIndex} />
      ) : null}
    </div>
  )
}
