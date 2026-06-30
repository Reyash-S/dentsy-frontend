import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePartnerLogos } from '../hooks/useGlobalData.jsx'

function randomGlow(el, xRange, yRange) {
  gsap.to(el, {
    x: gsap.utils.random(...xRange),
    y: gsap.utils.random(...yRange),
    duration: gsap.utils.random(10, 16),
    ease: 'sine.inOut',
    onComplete: () => randomGlow(el, xRange, yRange),
  })
}

const DEFAULT_LOGOS = [
  { title: 'Alto', logoUrl: '/images/alto.png' },
  { title: 'Street.co.uk', logoUrl: '/images/street.png' },
  { title: 'Apex 27', logoUrl: '/images/apex.png' },
]

export default function Hero({ cms }) {
  const c = cms || {}
  const contentRef = useRef(null)
  const glow1Ref   = useRef(null)
  const glow2Ref   = useRef(null)
  const cmsLogos = usePartnerLogos('aps-hero-integrations')
  const logos = cmsLogos.length ? cmsLogos : DEFAULT_LOGOS

  useEffect(() => {
    const g1 = glow1Ref.current
    const g2 = glow2Ref.current
    if (!g1 || !g2) return
    randomGlow(g1, [-200, 200], [-150, 150])
    randomGlow(g2, [-150, 150], [-200, 200])
    return () => { gsap.killTweensOf(g1); gsap.killTweensOf(g2) }
  }, [])

  return (
    <div className="hero-product" style={c.heroImage ? {'--hero-bg': `url(${c.heroImage})`} : undefined}>
      <section className="product-hero hero-product-cell">
        <div id="hero-product-content" ref={contentRef}>
          <div className="hero-glow"   ref={glow1Ref} />
          <div className="hero-glow-2" ref={glow2Ref} />

          <h1 className="fade-up fade-up-2">{c.heading || 'The call is'}<br /><span>{c.headingSecond || 'just the beginning'}</span></h1>

          <p className="body fade-up fade-up-3">
            {c.description || 'Everything handled, captured and organised, so you\'re always one step ahead. From the first ring to the final follow-up, Dentsy gives your team the advantage to respond faster, work smarter and turn more conversations into opportunities.'}
          </p>

          <div className="hero-btns fade-up fade-up-4">
            <a href="#ai-phone-features" className="btn-pri">
              <span className="text" data-front={c.buttonPrimary || 'Learn More'} data-back={c.buttonPrimary || 'Learn More'} />
              <span className="bg-clr" />
            </a>
            <a target="_blank" href="#book-demo" className="btn-pri-alt">{c.buttonSecondary || 'Book A Demo'}</a>
          </div>

          <div className="hero-integrations fade-up fade-up-5">
            {logos.map((logo) => (
              <img key={logo.title} src={logo.logoUrl} alt={logo.title} className="hero-integration-logo" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
