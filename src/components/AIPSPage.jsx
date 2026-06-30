import Header          from './Header'
import Hero             from './Hero'
import AIPhoneFeatures  from './AIPhoneFeatures'
import APFCta           from './APFCta'
import Dashboards       from './Dashboards'
import Testimonials     from './Testimonials'
import Benefits         from './Benefits'
import Setup            from './Setup'
import Footer           from './Footer'
import { usePageSections } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

export default function AIPSPage() {
  const { sections, seo } = usePageSections('ai-phone-system')
  useSEO(seo || { title: 'AI Phone System — Dentsy' })

  return (
    <div className="product-page">
      <Header />
      <Hero cms={sections['aps-hero']} />

      <AIPhoneFeatures cms={sections['aps-features']} />

      <Dashboards cms={sections['aps-dashboards']} />

      <Testimonials cms={sections['testimonials']} />

      <div className="section-divider" />

      <APFCta cms={sections['aps-cta']} />

      <div className="section-divider" />
      <Benefits cms={sections['benefits']} />

      <Setup cms={sections['setup']} />

      <Footer />
    </div>
  )
}
