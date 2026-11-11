import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import father from '../data/father.json'
import services from '../data/services.json'
import { whatsappHref } from '../utils/contact'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  subject: '',
  message: '',
}

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  if (!/^[\p{L}\s.'-]{2,80}$/u.test(name)) {
    errors.name = 'Enter your full name.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  const phoneDigits = values.phone.replace(/\D/g, '')
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Enter a phone number, with the country code if you have it.'
  }
  if (values.dob) {
    const date = new Date(`${values.dob}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (Number.isNaN(date.getTime()) || date > today) {
      errors.dob = 'Use a date of birth in the past, or leave this blank.'
    }
  }
  if (values.subject.trim().length < 2) {
    errors.subject = 'Choose or enter a subject.'
  }
  const message = values.message.trim()
  if (message.length < 20) {
    errors.message = 'Write a short message of at least a sentence.'
  } else if (message.length > 2000) {
    errors.message = 'Please keep the message under 2000 characters.'
  }
  return errors
}

export default function ContactForm() {
  const [params] = useSearchParams()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const successRef = useRef(null)
  const serviceNames = (Array.isArray(services) ? services : []).map((service) => service.name)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (submitted) successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [submitted])

  useEffect(() => {
    const next = params.get('service')
    if (next) {
      setValues((current) => ({ ...current, subject: next }))
      setSubmitted(null)
    }
  }, [params])

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setSubmitted(null)
      return
    }
    setSubmitted({ ...values })
  }

  const whatsappText = submitted
    ? `${father.contact.whatsappGreeting}\n\nName: ${submitted.name}\nEmail: ${submitted.email}\nPhone: ${submitted.phone}\nDate of birth: ${submitted.dob || 'Not provided'}\nSubject: ${submitted.subject}\n\n${submitted.message}`
    : father.contact.whatsappGreeting
  const whatsapp = whatsappHref(father.contact.whatsapp, whatsappText)
  const customSubject = values.subject
    && values.subject !== 'General question'
    && !serviceNames.includes(values.subject)
    ? [values.subject]
    : []
  const subjectOptions = [...customSubject, ...serviceNames]

  if (submitted) {
    return (
      <div className="form-success" role="status" ref={successRef}>
        <p className="eyebrow">Demo confirmation</p>
        <h2>This message is ready on this page only.</h2>
        <p>
          It has not been sent to {father.name}, and it has not been stored. The form will show a real delivery only after you connect a form service of your own.
        </p>
        <dl>
          <div><dt>Name</dt><dd>{submitted.name}</dd></div>
          <div><dt>Email</dt><dd>{submitted.email}</dd></div>
          <div><dt>Phone</dt><dd>{submitted.phone}</dd></div>
          <div><dt>Date of birth</dt><dd>{submitted.dob || 'Not provided'}</dd></div>
          <div><dt>Subject</dt><dd>{submitted.subject}</dd></div>
          <div><dt>Message</dt><dd>{submitted.message}</dd></div>
        </dl>
        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setSubmitted(null)}
          >
            Edit message
          </button>
          {whatsapp ? (
            <a className="btn btn--gold" href={whatsapp} target="_blank" rel="noreferrer">
              Continue on WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {Object.keys(errors).length ? (
        <p className="form-banner" role="alert">Please correct the highlighted fields.</p>
      ) : null}
      <div className="form__row">
        <label className={cxField(errors.name)}>
          Full name
          <input name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>
        <label className={cxField(errors.email)}>
          Email
          <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>
      </div>
      <div className="form__row">
        <label className={cxField(errors.phone)}>
          Phone
          <input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <small>{errors.phone}</small> : null}
        </label>
        <label className={cxField(errors.dob)}>
          Date of birth <span>optional</span>
          <input name="dob" type="date" autoComplete="bday" max={today} value={values.dob} onChange={update} aria-invalid={Boolean(errors.dob)} />
          {errors.dob ? <small>{errors.dob}</small> : null}
        </label>
      </div>
      <label className={cxField(errors.subject)}>
        Subject
        <select name="subject" value={values.subject} onChange={update} aria-invalid={Boolean(errors.subject)}>
          <option value="">Select a subject</option>
          {subjectOptions.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
          <option value="General question">General question</option>
        </select>
        {errors.subject ? <small>{errors.subject}</small> : null}
      </label>
      <label className={cxField(errors.message)}>
        Message
        <textarea name="message" rows="6" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>
      <button className="btn btn--gold" type="submit">Send message</button>
      <p className="form__hint">{father.contact.note}</p>
    </form>
  )
}

function cxField(error) {
  return error ? 'field has-error' : 'field'
}
