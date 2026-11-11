import { Link } from 'react-router-dom'
import father from '../data/father.json'
import services from '../data/services.json'
import posts from '../data/blogs.json'
import Achievements from '../components/Achievements'
import { BlogCard } from '../components/BlogCards'
import FatherImageSlider from '../components/FatherImageSlider'
import FatherIntroduction from '../components/FatherIntroduction'
import Hero from '../components/Hero'
import JourneyTimeline from '../components/JourneyTimeline'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import TestimonialsSlider from '../components/TestimonialsSlider'
import VideoGallery from '../components/VideoGallery'
import WhyChoose from '../components/WhyChoose'
import ZodiacSection from '../components/ZodiacSection'
import { usePageTitle } from '../hooks/usePageTitle'
import { whatsappHref } from '../utils/contact'
import Reveal from '../components/Reveal'

export default function Home() {
  usePageTitle('')
  const whatsapp = whatsappHref(father.contact.whatsapp, father.contact.whatsappGreeting)
  const essays = (Array.isArray(posts) ? posts : []).slice(0, 3)

  return (
    <>
      <Hero />
      <FatherIntroduction />
      <FatherImageSlider />
      <JourneyTimeline />
      <Achievements />
      <section className="section" id="services">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Services"
              title="Ways to sit with a chart."
              lede="Each consultation is a private conversation. Choose the one that matches the question, then book a time."
            />
            <div className="service-list">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <WhyChoose />
      <TestimonialsSlider />
      <ZodiacSection mode="modal" />
      <section className="section section--raise" id="journal">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="09"
              eyebrow="Journal"
              title="Notes on the craft."
              lede="Sample essays for the journal. Replace them with his writing, or remove an entry from blogs.json."
            />
            <div className="blog-grid">
              {essays.map((post, index) => (
                <BlogCard key={post.slug} post={post} featured={index === 0} />
              ))}
            </div>
            <p className="section-more">
              <Link className="text-link text-link--gold" to="/blog">All essays</Link>
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section" id="watch">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="10"
              eyebrow="Videos"
              title="Spoken, not stored here."
              lede="Videos stay on YouTube. Add an ID or a link in videos.json and the card will play."
            />
            <VideoGallery limit={2} />
            <p className="section-more">
              <Link className="text-link text-link--gold" to="/videos">All videos</Link>
            </p>
          </Reveal>
        </div>
      </section>
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <p className="eyebrow">Consultation</p>
            <h2>A quiet hour with the chart.</h2>
            <p>
              Write with the questions you already have. {father.name} can say what the tradition speaks to, and what it leaves in your hands.
            </p>
          </div>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/contact">{father.cta.book}</Link>
            {whatsapp ? (
              <a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
