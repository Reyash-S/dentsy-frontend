import { createContext, useContext, useState, useEffect } from 'react'
import { fetchGraphQL } from '../lib/wordpress'

const GlobalDataContext = createContext({})

const GLOBAL_QUERY = `
  query GetGlobalData {
    headerSection: sectionById(sectionId: "global-header") { sectionId sectionData }
    footerSection: sectionById(sectionId: "global-footer") { sectionId sectionData }
    airAudioSection: sectionById(sectionId: "air-audio") { sectionId sectionData }
    trustedSection: sectionById(sectionId: "trusted") { sectionId sectionData }
    headerNav: navMenu(location: "header-nav") { label url target order }
    headerProducts: navMenu(location: "header-products") { label url target order }
    footerProduct: navMenu(location: "footer-product") { label url target order }
    footerSupport: navMenu(location: "footer-support") { label url target order }
    footerContact: navMenu(location: "footer-contact") { label url target order }
    footerLegal: navMenu(location: "footer-legal") { label url target order }
    partnerLogos(first: 100) {
      nodes {
        title
        logoUrl
        order
        logoPlacements {
          nodes {
            slug
          }
        }
      }
    }
  }
`

function sortLogos(nodes) {
  return [...nodes].sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function GlobalDataProvider({ children }) {
  const [data, setData] = useState({})

  useEffect(() => {
    fetchGraphQL(GLOBAL_QUERY)
      .then(d => {
        const parse = (section) => section?.sectionData ? JSON.parse(section.sectionData) : {}
        const allLogos = sortLogos(d.partnerLogos?.nodes || [])
        setData({
          header: parse(d.headerSection),
          footer: parse(d.footerSection),
          airAudio: parse(d.airAudioSection),
          trusted: parse(d.trustedSection),
          headerNav: d.headerNav || [],
          headerProducts: d.headerProducts || [],
          footerProduct: d.footerProduct || [],
          footerSupport: d.footerSupport || [],
          footerContact: d.footerContact || [],
          footerLegal: d.footerLegal || [],
          allPartnerLogos: allLogos,
        })
      })
      .catch(() => {})
  }, [])

  return <GlobalDataContext.Provider value={data}>{children}</GlobalDataContext.Provider>
}

export function useGlobalData() {
  return useContext(GlobalDataContext)
}

export function usePartnerLogos(placement) {
  const { allPartnerLogos } = useGlobalData()
  if (!allPartnerLogos) return []
  if (!placement) return allPartnerLogos
  return allPartnerLogos.filter(n =>
    n.logoPlacements?.nodes?.some(p => p.slug === placement)
  )
}
