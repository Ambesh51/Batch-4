import journey from '../data/journey.json'
import Reveal from './Reveal'
import SampleNote from './SampleNote'
import SectionHeading from './SectionHeading'
import { cx } from '../utils/cx'

export default function JourneyTimeline() {
  const milestones = Array.isArray(journey.milestones) ? journey.milestones : []

  return (
    <section className="section" id="journey">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Life"
            title={journey.heading}
            lede={journey.lede}
          />
          <SampleNote>
            Periods in brackets are not dates from his life. Replace each one before publishing the timeline as biography.
          </SampleNote>
          <ol className="timeline">
            {milestones.map((milestone, index) => (
              <li key={milestone.id} className={cx(index % 2 === 1 && 'is-right')}>
                <article>
                  <span className="timeline__period">{milestone.period}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
