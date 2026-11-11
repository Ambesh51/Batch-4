import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import father from '../data/father.json'
import { Icon } from './Icons'
import Modal from './Modal'

export default function ServiceCard({ service, startOpen = false }) {
  const [open, setOpen] = useState(startOpen)
  const titleId = useId()

  useEffect(() => {
    if (startOpen) setOpen(true)
  }, [startOpen])

  return (
    <article className="service-card" id={service.id}>
      <span className="service-card__icon">
        <Icon name={service.icon} />
      </span>
      <div>
        <h3>{service.name}</h3>
        <p>{service.summary}</p>
        <div className="service-card__actions">
          <button type="button" className="text-link" aria-haspopup="dialog" onClick={() => setOpen(true)}>
            {father.cta.learnMore}
          </button>
          <Link className="text-link text-link--gold" to={`/contact?service=${encodeURIComponent(service.name)}`}>
            {father.cta.bookShort}
          </Link>
        </div>
      </div>
      {open ? (
        <Modal labelledBy={titleId} onClose={() => setOpen(false)}>
          <p className="eyebrow">Consultation</p>
          <h2 id={titleId}>{service.name}</h2>
          <p>{service.detail}</p>
          {service.prepare ? <p className="modal__note">{service.prepare}</p> : null}
          <Link className="btn btn--gold" to={`/contact?service=${encodeURIComponent(service.name)}`}>
            {father.cta.book}
          </Link>
        </Modal>
      ) : null}
    </article>
  )
}
