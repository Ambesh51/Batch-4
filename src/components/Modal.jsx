import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useBodyLock } from '../hooks/useBodyLock'
import { cx } from '../utils/cx'

export default function Modal({ labelledBy, onClose, children, wide = false }) {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useBodyLock(true)

  useEffect(() => {
    const dialog = dialogRef.current
    const previous = document.activeElement
    dialog?.focus()

    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const items = [...dialog.querySelectorAll('a, button, input, select, textarea')]
        .filter((node) => !node.hasAttribute('disabled'))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  return createPortal(
    <div className="modal" onMouseDown={onClose}>
      <div
        className={cx('modal__dialog', wide && 'modal__dialog--wide')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
