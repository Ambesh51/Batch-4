import father from '../data/father.json'
import { Icon } from './Icons'
import Reveal from './Reveal'
import SampleNote from './SampleNote'
import SectionHeading from './SectionHeading'

export default function WhyChoose() {
  const points = father.whyChoose?.points || []

  return (
    <section className="section section--raise" id="why">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="The consultation"
            title={father.whyChoose.title}
            lede={father.whyChoose.lede}
          />
          <SampleNote>
            Edit these six points in father.json so they describe the way consultations are actually conducted.
          </SampleNote>
          <div className="why-grid">
            {points.map((point, index) => (
              <article className="why-card" key={point.title}>
                <span className="why-card__index">{String(index + 1).padStart(2, '0')}</span>
                <Icon name={point.icon} />
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
