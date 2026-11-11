import achievements from '../data/achievements.json'
import { Icon } from './Icons'
import Reveal from './Reveal'
import SampleNote from './SampleNote'
import SectionHeading from './SectionHeading'

export default function Achievements() {
  return (
    <section className="section section--raise" id="experience">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Practice"
            title="Experience, held lightly until the numbers are his."
            lede="The measures below are blanks. A figure belongs here only when it is true."
          />
          <SampleNote>{achievements.notice}</SampleNote>
          <div className="stats">
            {achievements.stats.map((stat) => (
              <article className="stat" key={stat.id}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                {stat.placeholder ? <small>{stat.placeholder}</small> : null}
              </article>
            ))}
          </div>

          <div className="achieve">
            {achievements.groups.map((group) => (
              <section className="achieve__group" key={group.id} aria-labelledby={`group-${group.id}`}>
                <h3 id={`group-${group.id}`}>
                  <Icon name={group.icon} size={18} />
                  {group.title}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.title}>
                      {item.placeholder ? <span className="chip">Placeholder</span> : null}
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
