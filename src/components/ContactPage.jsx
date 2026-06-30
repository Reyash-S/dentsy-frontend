import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { ArrowRightIcon } from './Icons'
import { TrustedSection } from './Integrations'
import { usePageSections, s } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

const API_URL = '/api/contact'
const CAPTURE_URL = '/api/email-capture'

export default function ContactPage() {
  const { sections, seo } = usePageSections('contact')
  useSEO(seo || { title: 'Contact Us — Dentsy' })
  const [form, setForm]             = useState({ name: '', agency: '', email: '', phone: '', message: '', website: '' })
  const [loading, setLoading]       = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState(null)
  const [ctaEmail, setCtaEmail]     = useState('')
  const [ctaLoading, setCtaLoading] = useState(false)
  const [ctaDone, setCtaDone]       = useState(false)
  const [ctaError, setCtaError]     = useState(null)

  const handleForm = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.website) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          agency: form.agency,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })
      const data = await res.json()
      console.log('[contact]', data)
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCtaSubmit(e) {
    e.preventDefault()
    if (!ctaEmail) return
    setCtaLoading(true)
    setCtaError(null)
    try {
      const res = await fetch(CAPTURE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ctaEmail, source: 'Contact CTA' }),
      })
      if (!res.ok) throw new Error('Failed')
      setCtaDone(true)
    } catch {
      setCtaError('Something went wrong. Please try again.')
    } finally {
      setCtaLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <Header />

      <section className="contact-hero">
        <div className="contact-hero-left">
          <div className="section-label">{s(sections, 'contact-hero', 'label', 'Contact Us')}</div>
          <h1>{s(sections, 'contact-hero', 'heading', "Let's Talk")}</h1>
          <p className="body">{s(sections, 'contact-hero', 'description', 'Whether you have questions about features, integrations, onboarding, pricing, or how Dentsy fits into your agency, our team is here to help.')}</p>

          <div className="contact-image" style={s(sections, 'contact-hero', 'heroImage', '') ? { backgroundImage: `url(${s(sections, 'contact-hero', 'heroImage', '')})` } : undefined}></div>

        </div>

        <div className="contact-hero-right">
          <h3>{s(sections, 'contact-hero', 'formHeading', 'Tell us a bit more about')} <em>{s(sections, 'contact-hero', 'formHeadingHighlight', 'yourself')}</em></h3>
          {submitted ? (
            <div className="contact-success">
              <h3>Thanks — we'll be in touch shortly.</h3>
              <p>A member of the Dentsy team will reach out as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input name="website" value={form.website} onChange={handleForm} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div className="contact-field">
                <input name="name" value={form.name} onChange={handleForm} placeholder="Name" required />
              </div>
              <div className="contact-field">
                <input name="agency" value={form.agency} onChange={handleForm} placeholder="Agency" required />
              </div>
              <div className="contact-field">
                <input name="email" type="email" value={form.email} onChange={handleForm} placeholder="Email" required />
              </div>
              <div className="contact-field">
                <input name="phone" type="tel" value={form.phone} onChange={handleForm} placeholder="Phone" required />
              </div>
              <div className="contact-field">
                <textarea name="message" value={form.message} onChange={handleForm} placeholder="Type your message here..." rows={4} />
              </div>
              {error && <p className="contact-error">{error}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-pri" type="submit" disabled={loading}>
                  <span className="text" data-front={loading ? 'Sending…' : 'Send'} data-back={loading ? 'Sending…' : 'Send'} />
                  <ArrowRightIcon size={18} />
                  <span className="bg-clr" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <TrustedSection />

      <section className="contact-cta">
        <h2>{s(sections, 'contact-cta', 'heading', 'Beyond the talk.')}<br />
        <span className="text-grad">{s(sections, 'contact-cta', 'gradientText', 'This is AI in action.')}</span></h2>
        <p className="body">{s(sections, 'contact-cta', 'description', 'Dentsy. Smarter calls, faster follow-ups, and more opportunities won for modern estate agencies.')}</p>
        {ctaDone ? (
          <p className="body" style={{ marginTop: 24 }}>Thanks — we'll be in touch shortly.</p>
        ) : (
          <form className="contact-cta-btns" onSubmit={handleCtaSubmit}>
            <div className="input-wrapper">
              <input type="email" placeholder="Your email address" value={ctaEmail} onChange={e => setCtaEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-pri" disabled={ctaLoading}>
              <span className="text" data-front={ctaLoading ? 'Sending…' : s(sections, 'contact-cta', 'buttonText', 'See Dentsy in action')} data-back={ctaLoading ? 'Sending…' : s(sections, 'contact-cta', 'buttonText', 'See Dentsy in action')} />
              <ArrowRightIcon size={18} />
              <span className="bg-clr" />
            </button>
            {ctaError && <p style={{ color: '#e53e3e', fontSize: '0.9rem', marginTop: 8 }}>{ctaError}</p>}
          </form>
        )}
      </section>

      <Footer />
    </div>
  )
}
