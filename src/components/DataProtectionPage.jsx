import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getPageBySlug } from '../lib/wordpress'
import { useSEO } from '../hooks/useSEO'

export default function DataProtectionPage() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPageBySlug('data-protection')
      .then(data => setPage(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useSEO(page?.seo || { title: 'Data Protection Policy — Dentsy' })

  return (
    <div className="privacy-page">
      <Header />
      <div className="privacy-content">
        {loading ? (
          <div style={{ padding: '180px 20px 100px', textAlign: 'center' }}>Loading...</div>
        ) : page ? (
          <>
            <div className="privacy-meta">
              <h1>{page.title}</h1>
            </div>
            <div className="privacy-body" dangerouslySetInnerHTML={{ __html: page.content }} />
          </>
        ) : (
          <div style={{ padding: '180px 20px 100px', textAlign: 'center' }}>
            <h1>Data Protection Policy</h1>
            <p>Content not available. Please try again later.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
