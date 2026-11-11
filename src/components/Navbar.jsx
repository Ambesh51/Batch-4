import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import father from '../data/father.json'
import { NAV_LINKS, isNavActive } from '../nav'
import { useBodyLock } from '../hooks/useBodyLock'
import { cx } from '../utils/cx'
import { Seal } from './Icons'

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  useBodyLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1180px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const panel = panelRef.current
    const focusable = panel?.querySelector('a, button')
    focusable?.focus()

    function onKey(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll('a, button')]
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
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
      toggleRef.current?.focus()
    }
  }, [open])

  return (
    <header className={cx('nav', scrolled && 'is-scrolled')}>
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label={`${father.brandName} home`}>
          <Seal className="brand__seal" />
          <span>
            <strong className="brand__name">{father.brandName}</strong>
            <small className="brand__title">{father.title}</small>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={cx(isNavActive(link.key, pathname, hash) && 'is-active')}
              aria-current={isNavActive(link.key, pathname, hash) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn--gold nav__book" to="/contact">
          {father.cta.bookShort}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle icon-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open
        ? createPortal(
          <div id="mobile-menu" ref={panelRef} className="nav__panel is-open">
            <nav aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  to={link.to}
                  className={cx(isNavActive(link.key, pathname, hash) && 'is-active')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link className="btn btn--gold nav__panel-book" to="/contact">
              {father.cta.book}
            </Link>
          </div>,
          document.body,
        )
        : null}
    </header>
  )
}
