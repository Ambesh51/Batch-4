import { Link } from 'react-router-dom'
import father from '../data/father.json'
import Achievements from '../components/Achievements'
import FatherIntroduction from '../components/FatherIntroduction'
import JourneyTimeline from '../components/JourneyTimeline'
import PageHero from '../components/PageHero'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('About My Father')

  return (
    <>
      <PageHero
        eyebrow="About my father"
        title={father.name}
        lede={`${father.title}. The portrait, the story, and the milestones on this page are ready for his own words and photographs.`}
      />
      <FatherIntroduction />
      <JourneyTimeline />
      <Achievements />
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <p className="eyebrow">Sit with him</p>
            <h2>Bring the question you actually have.</h2>
            <p>{father.contact.prepare}</p>
          </div>
          <Link className="btn btn--gold" to="/contact">{father.cta.book}</Link>
        </div>
      </section>
    </>
  )
}
