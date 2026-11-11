import { Mail, MapPin, Phone } from 'lucide-react'
import father from '../data/father.json'
import ContactForm from '../components/ContactForm'
import { WhatsAppIcon } from '../components/Icons'
import PageHero from '../components/PageHero'
import SampleNote from '../components/SampleNote'
import { usePageTitle } from '../hooks/usePageTitle'
import { mailHref, telHref, whatsappHref } from '../utils/contact'

export default function Contact() {
  usePageTitle('Contact')
  const phone = telHref(father.contact.phone)
  const email = mailHref(father.contact.email)
  const whatsapp = whatsappHref(father.contact.whatsapp, father.contact.whatsappGreeting)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={`Write to ${father.name}.`}
        lede="Share the question and, if you have them, the birth details. The form below confirms on this page only."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SampleNote>{father.contact.note}</SampleNote>
            <ul className="contact-list">
              <li>
                <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span>Phone</span>
                  {phone ? <a href={phone}>{father.contact.phone}</a> : <strong>{father.contact.phone}</strong>}
                </div>
              </li>
              <li>
                <WhatsAppIcon />
                <div>
                  <span>WhatsApp</span>
                  {whatsapp ? (
                    <a href={whatsapp} target="_blank" rel="noreferrer">{father.contact.whatsapp}</a>
                  ) : (
                    <strong>{father.contact.whatsapp}</strong>
                  )}
                </div>
              </li>
              <li>
                <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span>Email</span>
                  {email ? <a href={email}>{father.contact.email}</a> : <strong>{father.contact.email}</strong>}
                </div>
              </li>
              <li>
                <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span>Address</span>
                  <strong>{father.contact.address}</strong>
                </div>
              </li>
            </ul>
            <dl className="contact-facts">
              <div>
                <dt>Hours</dt>
                <dd>{father.contact.hours}</dd>
              </div>
              <div>
                <dt>Fee</dt>
                <dd>{father.contact.fee}</dd>
              </div>
            </dl>
            <p>{father.contact.prepare}</p>
            {whatsapp ? (
              <a className="btn btn--gold" href={whatsapp} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            ) : (
              <p className="modal__note">Add a WhatsApp number in father.json to turn on the WhatsApp button.</p>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
