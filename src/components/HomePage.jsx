import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './Header'
import { PlayIcon } from './Icons'
import ProductsHero   from './ProductsHero'
import TwoProducts    from './TwoProducts'
import AIPhoneSystem  from './AIPhoneSystem'
import AIReceptionist from './AIReceptionist'
import Integrations   from './Integrations'
import Stats          from './Stats'
import HomeCTA        from './HomeCTA'
import LogoMarquee    from './LogoMarquee'
import Footer         from './Footer'
import { usePageSections, s } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'
import { usePartnerLogos } from '../hooks/useGlobalData.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const { sections, seo } = usePageSections('home')
  useSEO(seo || { title: 'Dentsy — AI Phone System for Estate Agents' })
  const containerRef = useRef(null)
  const agentPRef    = useRef(null)
  const cmsHeroLogos = usePartnerLogos('hero-integrations')
  const cmsMarqueeLogos = usePartnerLogos('marquee')
  const heroLogos = cmsHeroLogos.length ? cmsHeroLogos : [
    { title: 'Alto', logoUrl: '/images/alto.png' },
    { title: 'Street.co.uk', logoUrl: '/images/street.png' },
    { title: 'Apex 27', logoUrl: '/images/apex.png' },
  ]
  const marqueeLogos = cmsMarqueeLogos.length ? cmsMarqueeLogos : [
    { title: 'The Stow Brothers', logoUrl: '/images/stow.png' },
    { title: 'Grey & Co', logoUrl: '/images/grey-white.png' },
    { title: 'Oscar James', logoUrl: '/images/oscar-james-white.png' },
    { title: 'Shortland Horne', logoUrl: '/images/corrie.png' },
    { title: 'FIA', logoUrl: '/images/fia-white.png' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Active class on interface section entry
      gsap.utils.toArray('.wa_add_class').forEach(el => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleClass: 'active',
            once: true,
          },
        })
      })

      // Scroll-driven image fly-in (desktop only)
      if (window.matchMedia('(min-width: 1200px)').matches) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: () => document.querySelector('.sk-hero-1-area')?.offsetTop ?? 800,
            toggleActions: 'play none none reverse',
            scrub: 1.5,
          },
        })

        tl.from('.sk-hero-1-db-img-single.img-1', { x: -530, y: -780, rotation: -21 })
          .from('.sk-hero-1-db-img-single.img-4', { x: -960, y: -690, rotation: -15 }, '<')
          .from('.sk-hero-1-db-img-single.img-7', { x: -1080, y: -647, rotation: -12 }, '<')
          .from('.sk-hero-1-db-img-single.img-3', { x:  748, y: -830, rotation:  20 }, '<')
          .from('.sk-hero-1-db-img-single.img-6', { x:  370, y: -621, rotation: -11 }, '<')
          .from('.sk-hero-1-db-img-single.img-2', { x: 1050, y: -330, rotation:  29 }, '<')
          .from('.sk-hero-1-db-img-single.img-8', { x:  130, y: -650, rotation: -61 }, '<')
          .from('.sk-hero-1-db-img-single.img-5', { x:   70, y: -310, rotation:   9 }, '<')

        gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: () => document.querySelector('.sk-hero-1-area')?.offsetTop ?? 800,
            scrub: 1.5,
          },
        }).fromTo(
          '.sk-hero-1-db-img-single',
          { filter: 'blur(15px)', opacity: 1 },
          { filter: 'blur(0px)',  opacity: 1, ease: 'none' },
          '<'
        )
      }

      // Interface-bg height 80vh → 100vh
      gsap.fromTo('#interface-bg',
        { height: '80vh' },
        {
          height: '100vh',
          ease: 'none',
          scrollTrigger: {
            trigger: '.sk-hero-1-area',
            start: 'bottom bottom',
            end: '+=300',
            scrub: 1,
          },
        }
      )

      // img-7 slide up
      gsap.fromTo('.img-7-wrap',
        { top: '100%' },
        {
          top: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.scroll-spacer',
            start: 'top+=900 bottom',
            end: '+=400',
            scrub: 1,
          },
        }
      )

      // Caller button rotate + colour change
      const callerTrigger = {
        trigger: '.scroll-spacer',
        start: 'top+=2000 bottom',
        end: '+=400',
        scrub: 1,
      }
      gsap.fromTo('#caller-button img',
        { x: 0, y: 0, rotation: 0 },
        { x: 76, y: 0, rotation: 135, ease: 'none', scrollTrigger: callerTrigger }
      )
      gsap.fromTo('#caller-bg',
        { backgroundColor: '#daff00' },
        { backgroundColor: '#FE572A', ease: 'none', scrollTrigger: callerTrigger }
      )

      // Agent text slide up
      gsap.fromTo('#agent-text',
        { top: '100%' },
        {
          top: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.scroll-spacer',
            start: 'top+=2600 bottom',
            end: '+=400',
            scrub: 1,
          },
        }
      )

      // Typewriter on agent-text p
      const pEl = agentPRef.current
      if (pEl) {
        const fullHTML = pEl.innerHTML.trim()
        const chars = []
        let i = 0
        while (i < fullHTML.length) {
          if (fullHTML[i] === '<') {
            const end = fullHTML.indexOf('>', i)
            chars.push(fullHTML.substring(i, end + 1))
            i = end + 1
          } else {
            chars.push(fullHTML[i])
            i++
          }
        }
        pEl.innerHTML = ''
        const proxy = { index: 0 }
        gsap.to(proxy, {
          index: chars.length,
          ease: 'none',
          onUpdate() {
            pEl.innerHTML = chars.slice(0, Math.round(proxy.index)).join('')
          },
          scrollTrigger: {
            trigger: '.scroll-spacer',
            start: 'top+=3100 bottom',
            end: '+=800',
            scrub: 1,
          },
        })
      }

      // Interface wrapper max-width expand
      gsap.fromTo('#interface-wrapper',
        { maxWidth: '72vw' },
        {
          maxWidth: '75vw',
          ease: 'none',
          scrollTrigger: {
            trigger: '.scroll-spacer',
            start: 'top+=500 bottom',
            end: '+=400',
            scrub: 1,
          },
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <div className="grid-bg" />
      <div className="grid-bg grid-right" />

      <Header />

      {/* ── Hero ── */}
      <div id="hero">

        <div className="hero-content">

          <div>
            <h1 className="fade-up fade-up-1">{s(sections, 'hero', 'heading', 'The smartest AI phone system for')} <span className="text-grad">{s(sections, 'hero', 'headingHighlight', 'estate agents')}</span></h1>
          </div>

          <div className="hero-cta-wrap">
              <div className="hero-integrations fade-up fade-up-3">
                {heroLogos.map(({ title, logoUrl }) => (
                  <img key={title} src={logoUrl} alt={title} className="hero-integration-logo" loading="lazy" />
                ))}
              </div>

              <div className="btn-wrap fade-up fade-up-4">
                <a href={s(sections, 'hero', 'buttonUrl', '#book-demo')} className="btn-pri" aria-label="Book a demo">
                  <span className="text" data-front={s(sections, 'hero', 'buttonText', 'Book a demo')} data-back={s(sections, 'hero', 'buttonText', 'Book a demo')} />
                  <span className="bg-clr" />
                </a>
             </div>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-grid-cell" style={{ backgroundImage: `url(${s(sections, 'hero', 'heroImage1', '/images/london-ai.webp')})` }} />
          <div className="hero-grid-cell" style={{ backgroundImage: `url(${s(sections, 'hero', 'heroImage2', '/images/agent6-3.webp')})` }} />
          <div className="hero-grid-cell" style={{ backgroundImage: `url(${s(sections, 'hero', 'heroImage3', '/images/london3.webp')})` }} />
          <div className="hero-grid-cell" style={{ backgroundImage: `url(${s(sections, 'hero', 'heroImage4', '/images/lady-home.webp')})` }} />
        </div>
      </div>

      <LogoMarquee logos={marqueeLogos} />

      {/* ── Interface section ──
      <section className="sk-hero-1-area wa-p-relative wa_add_class tx-section">
        <div id="interface-bg" />

        <div id="interface-wrapper" className="sk-hero-1-bottom text-center wa-p-relative">
          <div id="interface" className="sk-hero-1-db wa_add_class">
            <div className="sk-hero-1-db-img">
              <div className="left">

                <div className="row-top">
                  <div className="sk-hero-1-db-img-single-border">
                    <div className="sk-hero-1-db-img-single img-1">
                      <img src="/images/call-final.png" alt="Call dashboard" loading="lazy" />
                    </div>
                  </div>
                </div>

                <div className="row-1">
                  <div className="sk-hero-1-db-img-single-border">
                    <div className="sk-hero-1-db-img-single img-4">
                      <img src="/images/landlord-final.png" alt="Landlord dashboard" loading="lazy" />
                    </div>
                  </div>
                </div>

                <div className="row-2">
                  <div className="sk-hero-1-db-img-single-border">
                    <div className="sk-hero-1-db-img-single img-5">
                      <img src="/images/tenant-final.png" alt="Tenant dashboard" loading="lazy" />
                      <div id="agent-text">
                        <p ref={agentPRef}>
                          Hi, this is the Dentsy AI agent, how may I help you today?<br /><br />
                          What kind of service are you looking for?<br /><br />
                          Would you like to speak to a human?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row-3">
                  <div className="sk-hero-1-db-img-single-border">
                    <div className="sk-hero-1-db-img-single img-6">
                      <img src="/images/sentiment-final.png" alt="Sentiment dashboard" loading="lazy" />
                    </div>
                  </div>
                  <div className="sk-hero-1-db-img-single-border">
                    <div className="sk-hero-1-db-img-single img-7">
                      <div className="img-7-wrap">
                        <img src="/images/caller-final.png" alt="Caller dashboard" loading="lazy" />
                        <div id="caller-button">
                          <div id="caller-bg" />
                          <img src="/images/phone-button.png" alt="" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>*/}

      <ProductsHero cms={sections['products-hero']} />
      <TwoProducts cms={sections['two-products']} />
      <AIPhoneSystem cms={sections['ai-phone-system']} />
      <AIReceptionist cms={sections['ai-receptionist']} />
      <Integrations cms={sections['integrations']} trustedCms={sections['trusted']} />
      <Stats cms={sections['stats']} />
      <HomeCTA cms={sections['home-cta']} />
      <Footer />
    </div>
  )
}
