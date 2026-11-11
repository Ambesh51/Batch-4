import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <section className="section not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page is not in the chart.</h1>
        <p className="lede">The address may have changed. The consultation, the journal, and the photographs are still on the site.</p>
        <div className="hero__actions">
          <Link className="btn btn--gold" to="/">Return home</Link>
          <Link className="btn btn--ghost" to="/contact">Book a Consultation</Link>
        </div>
      </div>
    </section>
  )
}
