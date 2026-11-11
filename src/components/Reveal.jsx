import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { cx } from '../utils/cx'

export default function Reveal({ className, children, delay = 0 }) {
  const ref = useRef(null)
  const shown = useInView(ref)

  return (
    <div
      ref={ref}
      className={cx('reveal', shown && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
