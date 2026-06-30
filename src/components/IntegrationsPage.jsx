import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { CircleRightIcon, ArrowRightIcon } from './Icons'
import { usePageSections } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'
import { usePartnerLogos } from '../hooks/useGlobalData.jsx'

const TABS = [
  {
    title: 'What this means for your agency',
    bulletsTitle: '',
    image: '/images/int-crm2.png',
    bullets: [
      'Client details appear as the phone rings',
      'Calls, notes and outcomes are logged automatically',
      'Appointments are booked directly into your CRM',
      'No manual data entry or double handling',
    ],
  },
  {
    title: 'Where your AI and systems work together',
    bulletsTitle: 'Your AI Receptionist can: ',
    image: '/images/desk-man.png',
    bullets: [
      'Access client records instantly',
      'Check availability in real time',
      'Book appointments directly into your CRM',
      'Capture and store information automatically',
    ],
  },
]

const DEFAULT_HERO_LOGOS = [
  { name: 'Alto',         img: '/images/alto.png',    height: null, certified: true },
  { name: 'Street.co.uk', img: '/images/street.png',  height: 14 },
  { name: 'Apex 27',      img: '/images/apex.png',    height: 20 },
]

const DEFAULT_CRM_LOGOS = [
  { name: 'Alto',         img: '/images/alto.png',        height: 50,   certified: true, cls: 'crm-alto' },
  { name: 'Street.co.uk', img: '/images/street.png',      height: null, cls: 'crm-street' },
  { name: 'Apex 27',      img: '/images/apex.png',        height: 100,  cls: 'crm-apex' },
  { name: 'SME',          img: '/images/sme.png',         height: 70,   soon: true, cls: 'crm-sme' },
  { name: 'Greenhouse',   img: '/images/greenhouse.png',  height: null, soon: true, cls: 'crm-greenhouse' },
]

function buildLogos(section, prefix, maxCount, defaults) {
  const logos = []
  for (let i = 1; i <= maxCount; i++) {
    const name = section[`${prefix}${i}Name`]
    if (!name) break
    const soonVal = section[`${prefix}${i}Soon`]
    const certVal = section[`${prefix}${i}Certified`]
    logos.push({
      name,
      img: section[`${prefix}${i}Image`] || '',
      certified: certVal && certVal !== '' && certVal !== 'false',
      soon: soonVal && soonVal !== '' && soonVal !== 'false',
      height: defaults[i - 1]?.height ?? null,
      cls: defaults[i - 1]?.cls || '',
    })
  }
  return logos.length ? logos : defaults
}

export default function IntegrationsPage() {
  const { sections, seo } = usePageSections('integrations')
  useSEO(seo || { title: 'Integrations — Dentsy' })
  const hero = sections['int-hero'] || {}
  const crm = sections['int-crm'] || {}
  const cta = sections['int-cta'] || {}
  const displayTabs = crm.tabs || TABS
  const [active, setActive] = useState(0)
  const cmsIntLogos = usePartnerLogos('int-hero-integrations')
  const heroLogos = cmsIntLogos.length
    ? cmsIntLogos.map((l, i) => ({
        name: l.title,
        img: l.logoUrl,
        height: DEFAULT_HERO_LOGOS[i]?.height ?? null,
        certified: l.certified,
      }))
    : DEFAULT_HERO_LOGOS

  const cmsHeroLogos = buildLogos(hero, 'heroLogo', 5, DEFAULT_HERO_LOGOS)
  const displayHeroLogos = hero.heroLogo1Name ? cmsHeroLogos : heroLogos
  const crmLogos = buildLogos(crm, 'crm', 10, DEFAULT_CRM_LOGOS)

  return (
    <div className="integrations-page">
      <Header />

      <div className="int-hero" style={hero.heroImage ? {'--int-hero-bg': `url(${hero.heroImage})`} : undefined}>

      {/* Works with your systems */}
      <section>
        <h2>{hero.heading || 'Works with the'} <span className="purple">{hero.headingHighlight || 'systems'}</span> {hero.headingAfter || 'your estate agency already uses'}</h2>
        <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <p className="body">{hero.description || 'Dentsy integrates seamlessly with your CRM and tools, keeping everything connected, up to date and in one place. No disruption. No double entry. No extra work.'}</p>
        <div className="int-hero-logos">
            {displayHeroLogos.map(({ name, img, height, certified }) => (
            <div className="int-logo" key={name}>
              <img src={img} alt={name} style={height ? { height } : undefined} loading="lazy" />
              {certified && <p className="integration-certified">Certified Partner</p>}
            </div>
          ))}
          </div>
          </div>
      </section>

    </div>

      {/* CRM logos */}
      <section className="int-section">
        <h2>{crm.heading || 'Built for estate agency CRMs'}</h2>
        <p className="body w70">{crm.description || 'Dentsy integrates with leading platforms, including Alto, where we are an official integration partner, giving you seamless access to client data and real-time updates.'}</p>
        <div className="int-logos">
          {crmLogos.map(({ name, img, height, certified, soon, cls }) => (
            <div className={`int-logo int-logo--crm${cls ? ` ${cls}` : ''}${soon ? ' int-logo--soon' : ''}`} key={name}>
              {soon && <p className="integration-soon">Coming Soon</p>}
              <img src={img} alt={name} style={height ? { height } : undefined} loading="lazy" />
              {certified && <p className="integration-certified">Certified Partner</p>}
            </div>
          ))}
        </div>
        <div className="int-cta">
        <p className="body">
          {crm.helperText || 'If you use a different CRM, let us know. We may already support it, or we can explore building the right connection for your agency.'}</p>
          <a href={crm.helperButtonUrl || '/contact'}><button className="btn-pri">{crm.helperButtonText || 'Contact Us'} <ArrowRightIcon /></button></a></div>
      </section>

      {/* What this means */}
      <section className="int-three-col">
        <div className="int-col-image">
          <img src={displayTabs[active]?.image || TABS[active]?.image || ''} alt="" loading="lazy" />
        </div>
        <div className="int-col-nav">
          {displayTabs.map((tab, i) => (
            <button
              key={tab.title || i}
              className={`int-tab${active === i ? ' int-tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="int-col-bullets">
          {displayTabs[active]?.bulletsTitle && <h3 className="int-bullets-title">{displayTabs[active].bulletsTitle}</h3>}
          <ul className="int-list">
            {(displayTabs[active]?.items || displayTabs[active]?.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="int-cta-big">
        <p className="section-label">{cta.label || 'Built around your agency'}</p>
        <h3 className="text-grad">{cta.description || 'Dentsy works with your systems and call handling, so you can get started quickly without disrupting how your agency runs. Most agencies are live within days.'}</h3>
        <h2>{cta.heading || 'Don\'t just take our word for it.'}<br />{cta.headingGradient || 'See how Dentsy works with your systems.'}</h2>
        <a href={cta.buttonUrl || '#book-demo'} target="_blank" className="btn-pri">
          <span className="text" data-front={cta.buttonText || 'See Dentsy In Action'} data-back={cta.buttonText || 'See Dentsy In Action'} />
          <ArrowRightIcon size={18} />
          <span className="bg-clr" />
        </a>
      </section>

      <Footer />
    </div>
  )
}
