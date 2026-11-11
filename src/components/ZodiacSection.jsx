import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import zodiac from '../data/zodiac.json'
import { cx } from '../utils/cx'
import Modal from './Modal'
import Reveal from './Reveal'
import SampleNote from './SampleNote'
import SectionHeading from './SectionHeading'

const PERIODS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
]

function SignDetail({ sign, period, onPeriod, disclaimer, headingId }) {
  if (!sign) {
    return <p className="empty">Choose a sign to read the illustrative note.</p>
  }
  return (
    <div className="sign-detail" id="sign-detail">
      <p className="sign-detail__glyph" aria-hidden="true">{`${sign.symbol}\uFE0E`}</p>
      <h3 id={headingId}>{sign.name}</h3>
      <p className="sign-detail__meta">
        <span>{sign.dates}</span>
        <span>{sign.element}</span>
        <span>{sign.modality}</span>
      </p>
      <p>{sign.description}</p>
      <div className="period-tabs" role="tablist" aria-label="Illustrative period">
        {PERIODS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={period === item.id}
            className={cx(period === item.id && 'is-active')}
            onClick={() => onPeriod(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="sign-detail__period">{sign[period]}</p>
      <p className="modal__note">{disclaimer}</p>
    </div>
  )
}

export default function ZodiacSection({ mode = 'modal' }) {
  const signs = Array.isArray(zodiac.signs) ? zodiac.signs : []
  const [activeId, setActiveId] = useState(mode === 'panel' ? signs[0]?.id : null)
  const [period, setPeriod] = useState('daily')
  const titleId = useId()
  const active = signs.find((sign) => sign.id === activeId) || null

  function choose(id) {
    setActiveId(id)
    if (mode === 'panel' && window.innerWidth < 860) {
      window.requestAnimationFrame(() => {
        document.getElementById('sign-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <section className="section" id="zodiac">
      <div className="container">
        <Reveal>
          {mode === 'modal' ? (
            <SectionHeading
              index="08"
              eyebrow="Horoscope"
              title="Twelve signs, held as symbols."
              lede="Open a sign for a general note. It is not a reading of anyone’s chart."
            />
          ) : null}
          <SampleNote>{zodiac.disclaimer}</SampleNote>
          <div className={cx('zodiac-layout', mode === 'panel' && 'zodiac-layout--panel')}>
            <div className="sign-grid">
              {signs.map((sign) => (
                <button
                  key={sign.id}
                  type="button"
                  className={cx('sign', active?.id === sign.id && 'is-active')}
                  data-element={sign.element}
                  onClick={() => choose(sign.id)}
                  aria-pressed={active?.id === sign.id}
                >
                  <span className="sign__glyph">{`${sign.symbol}\uFE0E`}</span>
                  <strong>{sign.name}</strong>
                  <small>{sign.dates}</small>
                  <em>{sign.element}</em>
                </button>
              ))}
            </div>
            {mode === 'panel' ? (
              <SignDetail
                sign={active}
                period={period}
                onPeriod={setPeriod}
                disclaimer={zodiac.disclaimer}
              />
            ) : null}
          </div>
          {mode === 'modal' ? (
            <p className="section-more">
              <Link className="text-link text-link--gold" to="/horoscope">Read the signs on their own page</Link>
            </p>
          ) : null}
        </Reveal>
      </div>
      {mode === 'modal' && active ? (
        <Modal labelledBy={titleId} onClose={() => setActiveId(null)}>
          <SignDetail
            sign={active}
            period={period}
            onPeriod={setPeriod}
            disclaimer={zodiac.disclaimer}
            headingId={titleId}
          />
        </Modal>
      ) : null}
    </section>
  )
}
