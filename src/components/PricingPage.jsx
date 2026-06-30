import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { CheckIcon, CircleRightIcon, PhoneIcon, RobotIcon, ChartIcon, ArrowRightIcon } from './Icons'
import { usePageSections } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

const PRODUCTS = [
  {
    id: 'phone',
    label: 'AI Phone System',
    tag: '',
    desc: 'The system behind every call, handling, capturing & organising every interaction.',
    icon: <PhoneIcon width={20} height={20} />,
    bullets: ['Smart Caller Pop-Up', 'One-Click File Access', 'Call Recording', 'Real-Time Transcription', 'Automatic Note Taking', 'Notes Synced Directly to CRM', 'AI Call Summaries', 'Sentiment Analysis', 'Intelligent Dashboards', 'Agent Scoring and Coaching'],
  },
  {
    id: 'receptionist',
    label: 'AI Receptionist',
    tag: null,
    desc: 'Answering calls, handling inquiries, taking payments & booking appointments naturally & accurately.',
    icon: <RobotIcon width={20} height={20} />,
    bullets: ['24/7 Call Answering', 'Books Appointments', 'Takes Payments', 'Handles FAQs', 'Call Summaries', 'Speaks Like Your Agency', 'Call Summaries', 'Sentiment Analysis', 'Integrated With CRM', 'Intelligence Dashboards', 'Reporting'],
  },
  {
    id: 'both',
    label: 'Both',
    tag: 'Recommended',
    desc: 'The complete platform — combining the AI Phone System & AI Receptionist for full visibility & performance.',
    icon: <ChartIcon width={20} height={20} />,
    bullets: ['Everything Included in AI Phone System', 'Everything Included in AI Receptionist'],
  },
]

const API_URL = '/api/pricing'

const AGENCY_MARKS = [1, 5, 10, 15, 20]
const USER_MARKS   = [1, 10, 20, 30, 40, 50]

const TRUSTED = [
  { name: 'The Stow Brothers', img: '/images/stow.png',             height: null },
  { name: 'Grey & Co',         img: '/images/grey-white.png',        height: 80 },
  { name: 'Oscar James',       img: '/images/oscar-james-white.png', height: null },
  { name: 'Pinewood',       img: '/images/pinewood-white.png',    height: null },
  { name: 'Shortland Horne',   img: '/images/corrie.png',            height: null },
]

const PRODUCT_IDS = ['phone', 'receptionist', 'both']
const PRODUCT_ICONS = [
  <PhoneIcon width={20} height={20} />,
  <RobotIcon width={20} height={20} />,
  <ChartIcon width={20} height={20} />,
]

export default function PricingPage() {
  const { sections, seo } = usePageSections('pricing')
  useSEO(seo || { title: 'Pricing — Dentsy' })
  const hero = sections['prc-hero'] || {}
  const tagline = sections['prc-tagline'] || {}

  const productsSection = sections['prc-products'] || {}
  const cmsProducts = productsSection.products || []
  const displayProducts = cmsProducts.length ? cmsProducts.map((p, i) => ({
    id: PRODUCT_IDS[i] || `product-${i}`,
    label: p.name || PRODUCTS[i]?.label || '',
    tag: p.tag || PRODUCTS[i]?.tag || null,
    desc: p.description || PRODUCTS[i]?.desc || '',
    icon: PRODUCT_ICONS[i] || null,
    bullets: p.features || PRODUCTS[i]?.bullets || [],
  })) : PRODUCTS

  const trustedLogos = []
  for (let i = 1; i <= 10; i++) {
    const name = tagline[`trusted${i}Name`]
    if (!name) break
    trustedLogos.push({
      name,
      img: tagline[`trusted${i}Image`] || '',
      height: tagline[`trusted${i}Height`] ? parseInt(tagline[`trusted${i}Height`]) : null,
    })
  }
  const displayTrusted = trustedLogos.length ? trustedLogos : TRUSTED
  const [product,   setProduct]   = useState('both')
  const [agencies,  setAgencies]  = useState(1)
  const [users,     setUsers]     = useState(1)
  const [form,      setForm]      = useState({
    firstName: '', lastName: '', agencyName: '', email: '', phone: '', website: '',
  })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState(null)

  const agencyVal = agencies
  const userVal   = users

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
          ...form,
          product,
          agencies: agencyVal,
          users: userVal,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pricing-page">
      <Header />

      {/* Hero */}
      <section className="pricing-hero">
        <p className="section-label">{hero.label || 'Pricing'}</p>
        <h1>{hero.heading || 'Put Dentsy to work'}</h1>
        <p className="body w70">{hero.description || 'Tell us about your estate agency and we\'ll show you exactly how Dentsy would work for you, along with tailored pricing based on your setup. No obligation. Takes less than 30 seconds to get started:'}</p>
      </section>

      {/* Configurator */}
      <section className="pricing-config-wrap">
        {!submitted && (
        <div className="pricing-config">

          {/* Step 1 — Product */}
          <div className="pricing-step">
            <div className="section-label">{hero.step1Label || '01 — Choose what you need'}</div>
            <div className="pricing-products">
              {displayProducts.map(p => (
                <button
                  key={p.id}
                  className={`pricing-product-card${product === p.id ? ' selected' : ''}`}
                  onClick={() => setProduct(p.id)}
                >
                  <div>
                  <div className="ppc-top">
                    <div className="ppc-icon">{p.icon}</div>
                    {p.tag && <span className="ppc-tag">{p.tag}</span>}
                    <div className="ppc-check">{product === p.id && <CheckIcon width={12} height={12} />}</div>
                  </div>
                  <div className="ppc-label">{p.label}</div>
                  </div>
                  <ul className="ppc-bullets">
                    {p.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="ppc-desc">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {!submitted && (
        <div className="pricing-config">
          {/* Step 2 — Sliders */}
          <div className="pricing-step">
            <div className="section-label">{hero.step2Label || '02 — Your setup'}</div>
            <div className="pricing-sliders">
              <div className="pricing-slider-group">
                <div className="pricing-slider-header">
                  <span>How many Estate Agencies?</span>
                  <span className="pricing-slider-val">{agencyVal === 20 ? '20+' : agencyVal}</span>
                </div>
                <input
                  type="range" min={1} max={20} step={1}
                  value={agencies} onChange={e => setAgencies(Number(e.target.value))}
                  className="pricing-range"
                />
                <div className="pricing-range-marks">
                  {AGENCY_MARKS.map(m => (
                    <span key={m} style={{ position: 'absolute', left: `calc(10px + ${(m - 1) / 19} * (100% - 20px))`, transform: 'translateX(-50%)' }}>
                      {m === 20 ? '20+' : m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pricing-slider-group">
                <div className="pricing-slider-header">
                  <span>How many users?</span>
                  <span className="pricing-slider-val">{userVal}</span>
                </div>
                <input
                  type="range" min={1} max={50} step={1}
                  value={users} onChange={e => setUsers(Number(e.target.value))}
                  className="pricing-range"
                />
                <div className="pricing-range-marks">
                  {USER_MARKS.map(m => (
                    <span key={m} style={{ position: 'absolute', left: `calc(10px + ${(m - 1) / 49} * (100% - 20px))`, transform: 'translateX(-50%)' }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

          <div className="pricing-config">
          {/* Step 3 — Contact */}
          <div className="pricing-step">
            {!submitted && <div className="section-label">{hero.step3Label || '03 — Your details'}</div>}
            {submitted ? (
              <div className="pricing-success">
                <h3>Thanks — we'll be in touch shortly.</h3>
                <p className="body">A member of the Dentsy team will reach out to walk you through your tailored quote.</p>

                {/* What happens next */}
                <section className="pricing-next">
                  <h3>What happens next</h3>
                  <p className="body">We'll walk you through how Dentsy works, show how it fits your agency, and provide a tailored quote — with no obligation.</p>
                  <p className="body pricing-next-note">Dentsy demo typically takes approximately 20–30 mins.</p>
                </section>
                        
              </div>
            ) : (
            <form className="pricing-form" onSubmit={handleSubmit}>
              <input name="website" value={form.website} onChange={handleForm} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div className="pricing-form-row">
                <div className="pricing-field">
                  <label>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleForm} placeholder="First name" required />
                </div>
                <div className="pricing-field">
                  <label>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleForm} placeholder="Last name" required />
                </div>
              </div>
              <div className="pricing-field">
                <label>Estate Agency Name</label>
                <input name="agencyName" value={form.agencyName} onChange={handleForm} placeholder="Your agency name" required />
              </div>
              <div className="pricing-form-row">
                <div className="pricing-field">
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleForm} placeholder="Email Address" required />
                </div>
                <div className="pricing-field">
                  <label>Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleForm} placeholder="Phone Number" required />
                </div>
              </div>

              {error && <p className="pricing-error">{error}</p>}

              <button className="btn-pri pricing-submit" type="submit" disabled={loading}>
                <span className="text" data-front={loading ? 'Sending…' : 'Get My Quote'} data-back={loading ? 'Sending…' : 'Get My Quote'} />
                <ArrowRightIcon size={18} />
                <span className="bg-clr" />
              </button>
            </form>
            )}
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* Trusted */}
      <section className="pricing-trusted">
        <div className="section-label" style={{ textAlign: 'center' }}>{tagline.trustedLabel || 'Trusted By Estate Agents Across The UK'}</div>
        <div className="pricing-trusted-logos">
          {displayTrusted.map(({ name, img, height }) => (
            <div className="pricing-trusted-logo" key={name}>
              <img src={img} alt={name} style={{ height }} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Tagline */}
      <section className="pricing-tagline-section">
        <h2>{tagline.heading || 'Dentsy. The Smartest AI Phone System for Estate Agents.'}</h2>
        <p className="body">{tagline.description || 'The system that runs your calls. The AI that handles them.'}</p>
      </section>

      <Footer />
    </div>
  )
}
