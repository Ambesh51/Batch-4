import { cx } from '../utils/cx'

export default function SectionHeading({ index, eyebrow, title, lede, align = 'left' }) {
  return (
    <header className={cx('section-head', align === 'center' && 'section-head--center')}>
      {index ? <span className="section-head__index">{index}</span> : null}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  )
}
