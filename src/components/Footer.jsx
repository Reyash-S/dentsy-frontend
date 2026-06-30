import { Link } from 'react-router-dom'
import { useGlobalData } from '../hooks/useGlobalData.jsx'

const DEFAULT_PRODUCT = [
  { label: 'Dentsy Phone System', url: '/ai-phone-system' },
  { label: 'AI Receptionist', url: '/ai-receptionist' },
  { label: 'Integrations', url: '/integrations' },
]
const DEFAULT_SUPPORT = [
  { label: 'Book a demo', url: '#book-demo', target: '_blank' },
  { label: 'FAQs', url: '/faqs' },
  { label: 'Contact Us', url: '/contact' },
]
const DEFAULT_CONTACT = [
  { label: 'info@dentsy.ai', url: 'mailto:info@dentsy.ai' },
  { label: '03330 570038', url: 'tel:03330570038' },
  { label: 'London, UK', url: '#' },
]
const DEFAULT_LEGAL = [
  { label: 'Privacy Policy', url: '/privacy-policy' },
  { label: 'Cookies', url: '/cookie-policy' },
  { label: 'Data Protection Policy', url: '/data-protection' },
]

export default function Footer() {
  const global = useGlobalData()
  const productMenu = global.footerProduct?.length ? global.footerProduct : DEFAULT_PRODUCT
  const supportMenu = global.footerSupport?.length ? global.footerSupport : DEFAULT_SUPPORT
  const contactMenu = global.footerContact?.length ? global.footerContact : DEFAULT_CONTACT
  const legalMenu = global.footerLegal?.length ? global.footerLegal : DEFAULT_LEGAL
  const footerData = global.footer || {}

  const f = footerData
  const isExternal = (url) => url && (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:'))

  const renderLink = (item) => {
    if (isExternal(item.url)) {
      return <a href={item.url} target={item.target === '_blank' ? '_blank' : undefined}>{item.label}</a>
    }
    if (item.url === '#') return <span>{item.label}</span>
    return <Link to={item.url}>{item.label}</Link>
  }

  return (
    <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <img src={f.logoImage || '/images/logo.png'} style={{ width: 100 }} alt="Dentsy" loading="lazy" />
            </div>
            <p className="footer-text">{f.tagline || 'The smartest AI phone system designed specifically for estate agents.'}</p>
            <img src={f.fiaLogo || '/images/fia.png'} alt="FIA" className="footer-fia-logo" loading="lazy" />
          </div>
          <div className="menu">
            <ul>
              <li>{f.productMenuTitle || 'Product'}</li>
              {productMenu.map(item => <li key={item.url}>{renderLink(item)}</li>)}
            </ul>
            <ul>
              <li>{f.supportMenuTitle || 'Support'}</li>
              {supportMenu.map(item => <li key={item.url}>{renderLink(item)}</li>)}
            </ul>
            <ul>
              <li>{f.contactMenuTitle || 'Contact'}</li>
              {contactMenu.map(item => <li key={item.url}>{renderLink(item)}</li>)}
            </ul>
          </div>
          </div>
          <div className="footer-copy">
            <Link to={f.insightsUrl || '/blog'}>{f.insightsLabel || 'Insights'}</Link>
            {legalMenu.map(item => (
              <Link key={item.url} to={item.url}>{item.label}</Link>
            ))}
            <a style={{color: '#b7b7b7'}}>&copy;{f.copyright || 'Copyright 2026 Dentsy'}</a>
          </div>

    </footer>
  )
}
