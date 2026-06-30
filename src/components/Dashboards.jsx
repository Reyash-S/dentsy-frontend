import { useState, useRef } from 'react'

const NAV_ITEMS = ['Main Intelligence Dashboard', 'AI Analytics', 'Leaderboards', 'Coaching']

const IMAGES = [
  '/images/screen-og5.png',
  '/images/screen-og7.png',
  '/images/screen-og6.png',
  '/images/screen-og8.png',
]

export default function Dashboards({ cms }) {
  const c = cms || {}
  const [active, setActive] = useState(0)
  const dragStart = useRef(null)

  const tabs = c.tabs || NAV_ITEMS.map((label, i) => ({ label, image: IMAGES[i] }))
  const navItems = tabs.map(t => t.label)
  const images = tabs.map(t => t.image)

  function handleDragStart(e) {
    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  function handleDragEnd(e) {
    if (dragStart.current === null) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const delta = dragStart.current - endX
    dragStart.current = null
    if (Math.abs(delta) < 50) return
    if (delta > 0) setActive(i => Math.min(i + 1, navItems.length - 1))
    else setActive(i => Math.max(i - 1, 0))
  }

  return (
    <section className="dashboards">
      <div className="container">
        <div className="dashboards-header">
          <div className="section-label">{c.label || 'Dashboards'}</div>
          <h2>{c.heading || 'See the full picture. Turn insight into growth.'}</h2>
          <p className="body">{c.description || 'Dentsy gives your agency a clear, real-time view of call performance, from inquiries and bookings to missed opportunitites, conversion rates and revenue. With AI analytics, leaderboards and coaching dashboards, you can stop the trends, compare teams and improve how calls are handled.'}</p>
        </div>
      </div>
      <div className="dashboards-nav">
        {navItems.map((label, i) => (
          <button
            key={label}
            className={`dashboards-nav-item${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >{label}</button>
        ))}
      </div>

      <div
        className="dashboards-visual-wrap"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        style={{ cursor: 'grab' }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="dashboards-img"
            style={{
              backgroundImage: `url(${src})`,
              opacity: active === i ? 1 : 0,
              transition: 'opacity 0.8s ease',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
