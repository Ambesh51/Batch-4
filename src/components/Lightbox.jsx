import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBodyLock } from '../hooks/useBodyLock'
import Photo from './Photo'

export default function Lightbox({ items, index, onClose, onChange }) {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const onChangeRef = useRef(onChange)
  onCloseRef.current = onClose
  onChangeRef.current = onChange
  useBodyLock(true)
  const item = items[index]

  useEffect(() => {
    const dialog = dialogRef.current
    const previous = document.activeElement
    dialog?.focus()

    function onKey(event) {
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key === 'ArrowRight') onChangeRef.current((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onChangeRef.current((index - 1 + items.length) % items.length)
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [index, items.length])

  if (!item) return null

  return createPortal(
    <div className="lightbox" onMouseDown={onClose}>
      <div
        className="lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={item.title || 'Photograph'}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="icon-btn lightbox__close" onClick={onClose} aria-label="Close preview">
          <X size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="icon-btn lightbox__nav lightbox__nav--prev"
          onClick={() => onChange((index - 1 + items.length) % items.length)}
          aria-label="Previous photograph"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <figure className="lightbox__figure">
          <Photo src={item.imageUrl} alt={item.alt || item.title || ''} />
          <figcaption>
            {item.category ? <span>{item.category}</span> : null}
            <strong>{item.title}</strong>
            {item.caption ? <p>{item.caption}</p> : null}
          </figcaption>
        </figure>
        <button
          type="button"
          className="icon-btn lightbox__nav lightbox__nav--next"
          onClick={() => onChange((index + 1) % items.length)}
          aria-label="Next photograph"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>,
    document.body,
  )
}
