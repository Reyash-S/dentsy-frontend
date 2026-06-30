import { useState, useEffect } from 'react'
import { getPageSections } from '../lib/wordpress'

export function usePageSections(pageSlug) {
  const [sections, setSections] = useState({})
  const [seo, setSeo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPageSections(pageSlug)
      .then(({ sections: data, seo: seoData }) => {
        const map = {}
        data.forEach(s => {
          if (s.sectionId) map[s.sectionId] = s.sectionData || {}
        })
        setSections(map)
        setSeo(seoData)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [pageSlug])

  return { sections, seo, loading }
}

export function s(sections, sectionId, field, fallback) {
  return sections?.[sectionId]?.[field] ?? fallback
}
