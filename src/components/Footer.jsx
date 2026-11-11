import { Link } from 'react-router-dom'
import { Instagram, Youtube } from 'lucide-react'
import father from '../data/father.json'
import services from '../data/services.json'
import { NAV_LINKS } from '../nav'
import { externalHref, mailHref, telHref, whatsappHref } from '../utils/contact'
import { Seal, WhatsAppIcon } from './Icons'

function SocialLink({ href, label, children }) {
  if (!href) {
    return (
      <span className="socials__idle" title={`Add your ${label} link in src/data/father.json`}>
        {children}
        <span className="sr-only">{label} link has not been added yet</span>
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const phone = telHref(father.contact.phone)
  const email = mailHref(father.contact.email)
  const whatsapp = whatsappHref(father.contact.whatsapp)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="brand">
            <Seal className="brand__seal" />
            <span>
              <strong className="brand__name">{father.brandName}</strong>
              <small className="brand__title">{father.name}</small>
            </span>
          </Link>
          <p className="footer__intro">{father.footerIntro}</p>
          <div className="socials">
            <SocialLink href={externalHref(father.social.instagram)} label="Instagram">
              <Instagram size={18} strokeWidth={1.5} />
            </SocialLink>
            <SocialLink href={externalHref(father.social.youtube)} label="YouTube">
              <Youtube size={18} strokeWidth={1.5} />
            </SocialLink>
            <SocialLink href={whatsapp} label="WhatsApp">
              <WhatsAppIcon />
            </SocialLink>
          </div>
        </div>

        <div>
          <h2>Explore</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Consultations</h2>
          <ul>
            {services.slice(0, 6).map((service) => (
              <li key={service.id}>
                <Link to={`/services#${service.id}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="footer__contact">
            <li>{phone ? <a href={phone}>{father.contact.phone}</a> : father.contact.phone}</li>
            <li>{email ? <a href={email}>{father.contact.email}</a> : father.contact.email}</li>
            <li>{father.contact.address}</li>
            <li>{father.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <p>© {year} {father.name}. All rights reserved.</p>
        <p>
          Astrology here is a traditional consultation. It is not medical, legal, or financial advice.
          Placeholder names, numbers, photographs, and sample writing are marked for replacement.
        </p>
      </div>
    </footer>
  )
}
