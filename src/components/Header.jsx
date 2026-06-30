import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BarsIcon, CircleRightIcon } from './Icons'
import { useGlobalData } from '../hooks/useGlobalData.jsx'

const DEFAULT_PRODUCTS = [
  { label: 'Dentsy Phone System', url: '/ai-phone-system' },
  { label: 'AI Receptionist', url: '/ai-receptionist' },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const touchStartY = useRef(null)
  const { pathname } = useLocation()
  const global = useGlobalData()
  const headerData = global.header || {}
  const navItems = global.headerNav?.length ? global.headerNav : null
  const productMenuItems = global.headerProducts?.length ? global.headerProducts : null

  useEffect(() => {
    if (headerData.faviconUrl) {
      document.querySelectorAll('link[rel="icon"]').forEach(el => {
        el.href = headerData.faviconUrl
      })
    }
  }, [headerData.faviconUrl])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    if (delta > 60) setDrawerOpen(false)
    touchStartY.current = null
  }

  const active = (path) => pathname === path ? 'active' : undefined
  const productItems = productMenuItems || DEFAULT_PRODUCTS
  const productsActive = productItems.some(p => pathname === p.url)
  const productsLabel = headerData.productsLabel || 'Products'
  const demoText = headerData.demoButtonText || 'Book a demo'
  const demoUrl = headerData.demoButtonUrl || '#book-demo'
  const logo = headerData.logoImage || '/images/logo.png'

  const productUrls = new Set(productItems.map(p => p.url))
  const mainItems = navItems
    ? navItems.filter(i => i.url !== '/' && !productUrls.has(i.url))
    : [
        { label: 'Integrations', url: '/integrations' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Contact', url: '/contact' },
      ]
  const allMobileItems = [
    { label: 'Home', url: '/' },
    ...productItems,
    ...mainItems,
  ]

  return (
    <div id="header">
      <a href="/" className="btn-pri">
        <div className="logo-wrapper">
          <img src={logo} style={{ width: 50 }} alt="Dentsy" />
        </div>
      </a>

      <nav className="top">
        <a href="/" className={active('/')}>Home</a>
        <div className="nav-border"/>
        <div className="nav-products">
          <a className={productsActive ? 'active' : undefined}>{productsLabel}</a>
          <div className="nav-dropdown">
            {productItems.map(p => (
              <a key={p.url} href={p.url} className={active(p.url)}>{p.label}</a>
            ))}
          </div>
        </div>
        {mainItems.map(item => (
          <React.Fragment key={item.url}>
            <div className="nav-border" />
            <a href={item.url} className={active(item.url)} target={item.target === '_blank' ? '_blank' : undefined}>{item.label}</a>
          </React.Fragment>
        ))}
      </nav>

      <div className="header-btn-wrap">
        <a href={demoUrl} target="_blank">
        <button id="demo-btn" className="btn-pri">
          <span className="text" data-front={demoText} data-back={demoText} />
          <span className="bg-clr" />
        </button></a>
        <button id="mobile-menu-btn" className="btn-pri" onClick={() => setDrawerOpen(o => !o)}>
          <BarsIcon size={18} />
        </button>
      </div>

      {drawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      <div
        className={`mobile-drawer${drawerOpen ? ' mobile-drawer--open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mobile-drawer-handle" />
        <nav className="mobile-drawer-nav">
          {allMobileItems.map(item => (
            <a key={item.url} href={item.url} className={active(item.url)}>
              {item.label} <CircleRightIcon size={18} />
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
