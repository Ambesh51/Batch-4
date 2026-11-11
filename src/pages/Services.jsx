import { useLocation } from 'react-router-dom'
import father from '../data/father.json'
import services from '../data/services.json'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle('Services')
  const { hash } = useLocation()
  const openId = decodeURIComponent(hash.replace('#', ''))

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Consultations, named plainly."
        lede="Ten ways to ask for a sitting. Learn what each one covers, then book the conversation that fits."
      />
      <section className="section">
        <div className="container">
          <p className="lede services-prepare">{father.contact.prepare}</p>
          <div className="service-list">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} startOpen={openId === service.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
