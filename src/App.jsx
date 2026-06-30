import { Routes, Route } from 'react-router-dom'
import HomePage           from './components/HomePage'
import AIPSPage           from './components/AIPSPage'
import IntegrationsPage   from './components/IntegrationsPage'
import PricingPage        from './components/PricingPage'
import AIReceptionistPage from './components/AIReceptionistPage'
import PrivacyPolicyPage  from './components/PrivacyPolicyPage'
import CookiePolicyPage    from './components/CookiePolicyPage'
import DataProtectionPage  from './components/DataProtectionPage'
import FAQsPage            from './components/FAQsPage'
import ContactPage         from './components/ContactPage'
import BlogPage            from './components/BlogPage'
import BlogPostPage        from './components/BlogPostPage'
import ScrollToTop         from './components/ScrollToTop'
import CookieBanner        from './components/CookieBanner'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        <Route path="/"                element={<HomePage />} />
        <Route path="/ai-phone-system"        element={<AIPSPage />} />
        <Route path="/dentsy"                  element={<AIPSPage />} />
        <Route path="/ai-receptionist" element={<AIReceptionistPage />} />
        <Route path="/integrations"    element={<IntegrationsPage />} />
        <Route path="/pricing"         element={<PricingPage />} />
        <Route path="/privacy-policy"  element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy"        element={<CookiePolicyPage />} />
        <Route path="/data-protection"      element={<DataProtectionPage />} />
        <Route path="/faqs"                 element={<FAQsPage />} />
        <Route path="/blog"                 element={<BlogPage />} />
        <Route path="/blog/:slug"           element={<BlogPostPage />} />
        <Route path="/contact"              element={<ContactPage />} />
      </Routes>
    </>
  )
}
