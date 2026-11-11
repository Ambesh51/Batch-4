import { useState } from 'react'
import father from '../data/father.json'
import Photo from './Photo'
import Reveal from './Reveal'
import SampleNote from './SampleNote'

export default function FatherIntroduction() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section intro" id="introduction">
      <div className="container">
        <Reveal>
          <SampleNote>
            Personal details in brackets are placeholders. Edit them in src/data/father.json, and replace the portrait files when you have photographs.
          </SampleNote>
          <div className="intro__grid">
            <div className="intro__frame-wrap">
              <figure className="intro__frame">
                <Photo
                  src={father.editorialImage || father.profileImage}
                  alt={`Editorial placeholder portrait of ${father.name}`}
                />
                <figcaption className="intro__badge">
                  <span>Experience</span>
                  <strong>{father.experience}</strong>
                </figcaption>
              </figure>
              <p className="intro__caption">{father.portraitCaption}</p>
            </div>

            <div className="intro__body">
              <p className="eyebrow">The astrologer</p>
              <h2>{father.introHeading}</h2>
              <p className="intro__name">{father.name}</p>
              <p className="intro__role">{father.title}</p>
              <p>{father.introduction}</p>
              <p>{father.passion}</p>
              <blockquote>
                <p>{father.philosophy}</p>
              </blockquote>
              <p>{father.approach}</p>
              <p>{father.commitment}</p>
              {open
                ? father.extended.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : null}
              <button
                type="button"
                className="btn btn--ghost"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? father.cta.readLess : father.cta.readMore}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
