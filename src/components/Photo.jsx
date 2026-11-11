import { useState } from 'react'
import { cx } from '../utils/cx'

export default function Photo({ src, alt, className, priority = false }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span className={cx('photo-fallback', className)} role="img" aria-label={alt}>
        Photograph to be added
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}
