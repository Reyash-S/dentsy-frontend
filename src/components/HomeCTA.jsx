import { useState } from 'react'
import { ArrowRightIcon } from './Icons'

const API_URL = '/api/email-capture'

export default function HomeCTA({ cms }) {
  const c = cms || {}
  const [email, setEmail]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Home CTA' }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const btnText = c.buttonText || 'See Dentsy in action'

  return (
    <section className="home-cta-section">
      <div className="orb-wrapper"><img src="/images/orb.gif" alt="Dentsy AI" className="cta-orb" loading="lazy" /></div>
      <h2>{c.heading || "Don't just take our word for it."}<br /><span className="grad-text">{c.headingSecond || 'See what it actually does.'}</span></h2>
      <p className="body">{c.description || 'See how Dentsy works across your agency, from first call to final outcome.'}</p>

      {submitted ? (
        <p className="body" style={{ marginTop: 24 }}>Thanks — we'll be in touch shortly.</p>
      ) : (
        <form className="cta-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-pri" disabled={loading} aria-label={btnText}>
            <span className="icon btn-w-icon">
              {loading ? 'Sending…' : btnText} <ArrowRightIcon />
            </span>
          </button>
          {error && <p style={{ color: '#e53e3e', marginTop: 8, fontSize: '0.9rem' }}>{error}</p>}
        </form>
      )}
    </section>
  )
}
