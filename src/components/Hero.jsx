import { Link } from 'react-router-dom'
import father from '../data/father.json'
import Photo from './Photo'
import Starfield from './Starfield'

const GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((glyph) => `${glyph}\uFE0E`)

export default function Hero() {
  const [lead, rest] = father.heroHeading.split(',')

  return (
    <section className="hero">
      <Starfield className="hero__stars" count={72} />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{father.badge}</p>
          <h1>
            {lead.trim()},
            {rest ? <span>{rest.trim()}</span> : null}
          </h1>
          <p className="hero__lead">{father.heroIntro}</p>
          <p className="hero__meta">
            <span>{father.name}</span>
            <span>{father.title}</span>
            <span>{father.city}</span>
          </p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/contact">{father.cta.book}</Link>
            <Link className="btn btn--ghost" to="/about#journey">{father.cta.journey}</Link>
          </div>
        </div>

        <div className="hero__portrait">
          <div className="orbit" aria-hidden="true">
            <span className="orbit__planet" />
          </div>
          <ul className="zodiac-ring" aria-hidden="true">
            {GLYPHS.map((glyph, index) => (
              <li key={glyph} style={{ '--i': index }}>{glyph}</li>
            ))}
          </ul>
          <figure className="seal">
            <Photo
              src={father.profileImage}
              alt={`Illustrated placeholder portrait for ${father.name}. Replace with a photograph.`}
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
