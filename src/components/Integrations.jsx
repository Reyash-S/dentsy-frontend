import { useRef, useState } from 'react'
import { ChevronRightIcon, ArrowRightIcon } from './Icons'
import { useGlobalData } from '../hooks/useGlobalData.jsx'

const defaultIntegrations = [
  { name: 'Alto', img: '/images/alto.png', cls: 'logo-alto', certified: true },
  { name: 'Street.co.uk', img: '/images/street.png', cls: '' },
  { name: 'Apex 27', img: '/images/apex.png', cls: '' },
  { name: 'Greenhouse', img: '/images/greenhouse.png', cls: 'coming-soon', soon: true },
  { name: 'SME', img: '/images/sme.png', cls: 'coming-soon sme', soon: true },
]

const defaultAgencies = [
  { name: 'The Stow Brothers', img: '/images/stow.jpg', logo: '/images/stow.png' },
  { name: 'Oscar James', img: '/images/oscar.jpg', logo: '/images/oscar-james.svg', logoWhite: true },
  { name: 'Pinewood', img: '/images/pinewood2.png', logo: '/images/pinewood.png', logoWhite: true },
  { name: 'Corrie & Co.', img: '/images/melanie.jpg', logo: '/images/corrie.png', logoCls: 'logo-shortland' },
  { name: 'Grey & Co', img: '/images/grey2.png', logo: '/images/grey.png', logoWhite: true, logoCls: 'logo-grey' },
]

export function TrustedSection() {
  const scrollRef = useRef(null)
  const global = useGlobalData()
  const trustedData = global.trusted || {}

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 366, behavior: 'smooth' })

  let agencyItems = defaultAgencies
  if (trustedData.agency1Name) {
    agencyItems = []
    for (let i = 1; i <= 10; i++) {
      const name = trustedData[`agency${i}Name`]
      if (!name) break
      agencyItems.push({
        name,
        img: trustedData[`agency${i}Image`] || '',
        logo: trustedData[`agency${i}Logo`] || '',
      })
    }
  }

  return (
    <section className="trusted-section">
      <h2>{trustedData.heading || 'Trusted By Estate Agents Across The UK'}</h2>
      <div className="trusted-scroll-btns">
        <button className="btn-pri" onClick={() => scroll(-1)}>
          <ArrowRightIcon size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button className="btn-pri" onClick={() => scroll(1)}>
          <ArrowRightIcon size={18} />
        </button>
      </div>
      <div className="trusted-cards" ref={scrollRef}>
        {agencyItems.map(({ name, img, logo }) => (
          <div className="trusted-card" key={name} style={{ backgroundImage: `url(${img})` }}>
            <div className="trusted-card-overlay" />
            <div className="trusted-card-content">
              {logo && <img src={logo} alt={name} className="trusted-card-logo" loading="lazy" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Integrations({ cms, trustedCms }) {
  const c = cms || {}
  const t = trustedCms || {}
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 366, behavior: 'smooth' })
  }

  let integrationItems = defaultIntegrations
  if (c.int1Name) {
    integrationItems = []
    for (let i = 1; i <= 10; i++) {
      const name = c[`int${i}Name`]
      if (!name) break
      const status = c[`int${i}Status`] || 'normal'
      integrationItems.push({
        name,
        img: c[`int${i}Image`] || '',
        cls: status === 'coming-soon' ? 'coming-soon' : '',
        certified: status === 'certified',
        soon: status === 'coming-soon',
      })
    }
  }

  let agencyItems = defaultAgencies
  if (t.agency1Name) {
    agencyItems = []
    for (let i = 1; i <= 10; i++) {
      const name = t[`agency${i}Name`]
      if (!name) break
      agencyItems.push({
        name,
        img: t[`agency${i}Image`] || '',
        logo: t[`agency${i}Logo`] || '',
      })
    }
  }

  return (
    <>
      <section className="integrations-section">
        <div className="integrations-wrapper">
        <div className="section-label">{c.label || 'Integrations'}</div>
        <div className="integrations-header">
          <h2>{c.heading || 'Works with your existing systems'}</h2>
          <p className="body">
            {c.description || 'Dentsy seamlessly integrates with your CRM & tools, keeping everything connected & up to date. No disruption. No double entry.'}
          </p>
        </div>
        <div className="integrations-logos">
          {integrationItems.map(({ name, img, cls, certified, soon }) => (
            <div className="integration-logo" key={name}>
              {img ? <img src={img} alt={name} className={cls} loading="lazy" /> : name}
              {certified && <p className="integration-certified">Certified Partner</p>}
              {soon && <p className="integration-soon">Coming Soon</p>}
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="trusted-section">
        <h2>{t.heading || 'Trusted By Estate Agents Across The UK'}</h2>
        <div className="trusted-scroll-btns">
          <button className="btn-pri" onClick={() => scroll(-1)}>
            <ArrowRightIcon size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="btn-pri" onClick={() => scroll(1)}>
            <ArrowRightIcon size={18} />
          </button>
        </div>
        <div className="trusted-cards" ref={scrollRef}>
          {agencyItems.map(({ name, img, logo }) => (
            <div className="trusted-card" key={name} style={{ backgroundImage: `url(${img})` }}>
              <div className="trusted-card-overlay" />
              <div className="trusted-card-content">
                {logo && <img src={logo} alt={name} className="trusted-card-logo" loading="lazy" />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
