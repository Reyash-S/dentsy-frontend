import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from './Icons'

const items = [
  {
    n: '01',
    title: 'More Bookings Without More Calls',
    body: 'Capture more opportunities from the inquiries you already receive. Dentsy helps your team track outcomes, improve follow-up and convert more calls into viewings, valuations and appointments, without increasing workload.',
    stat: '+34%',
    statLabel: 'Average booking rate increase',
    bg: 'url(/images/bookings.jpg)',
  },
  {
    n: '02',
    title: 'No Missed Opportunities',
    body: "Make sure calls are answered or returned, inquiries are captured and follow-ups are clear. Dentsy gives your team better visibility of missed calls and open opportunities, so fewer potential clients slip through the cracks.",
    stat: '0',
    statLabel: 'Leads left without follow-up',
    bg: 'url(/images/man3.jpg)',
  },
  {
    n: '03',
    title: 'Stronger Performance Across Your Team',
    body: 'Understand what good looks like across every call. With call insights, agent scoring and coaching dashboards, managers can spot strengths, support weaker areas and improve quality across individuals, teams and branches.',
    stat: '2×',
    statLabel: 'Faster team performance growth',
    bg: 'url(/images/team.jpg)',
  },
  {
    n: '04',
    title: 'Less Admin, More Time to Focus On Clients',
    body: 'Notes, summaries and updates are handled automatically after each call. Your team spends less time typing, chasing details and updating records, and more time supporting clients and progressing opportunities.',
    stat: '3hrs',
    statLabel: 'Average saved per agent per week',
    bg: 'url(/images/idk.png)',
  },
  {
    n: '05',
    title: 'Decisions Backed By Real Insight',
    body: 'See what is working, what is being missed and where your agency can improve. Dentsy turns call data into clear insight, helping you make better decisions around follow-up, performance, training and growth.',
    stat: '100%',
    statLabel: 'Of decisions backed by data',
    bg: 'url(/images/yo.jpg)',
  },
  {
    n: '06',
    title: 'More Professional, Consistent Client Experience',
    body: 'Give clients a clearer, more personal and more consistent experience on every call. With caller context, call history and better team visibility, your agency can respond faster, reduce repetition and build more trust.',
    stat: '4.9',
    statLabel: 'Average client satisfaction score',
    bg: 'url(/images/client4.png)',
  },
]

export default function Benefits({ cms }) {
  const c = cms || {}
  const displayItems = c.items || items
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const item = displayItems[active] || displayItems[0]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1240px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const cycleNext = () => setActive(i => (i + 1) % displayItems.length)

  return (
    <section className="benefits">
      <div className="benefits-header">
        <div className="section-label">{c.label || 'Advantages'}</div>
        <h2>{c.heading || 'The advantage for your estate agency'}</h2>
        <p className="body">{c.description || 'Dentsy gives your estate agency the advantage by helping your team move faster, follow up smarter and see exactly where opportunities are being won or missed. From automatic notes and call summaries to caller insights and performance dashboards, Dentsy turns your call activity into clear actions that drive better results.'}</p>
      </div>

      <div className="benefits-body">
        <div className="benefits-left">
          <div className="benefits-nav">
            {isMobile ? (
              <button
                className="benefits-nav-item active benefits-nav-item--mobile"
                onClick={cycleNext}
              >
                <span className="benefits-nav-num">{item.n}</span>
                <span className="benefits-nav-title">{item.title}</span>
                <div className="btn-pri"><ChevronDownIcon size={18} className="benefits-nav-chevron" /></div>
              </button>
            ) : (
              displayItems.map((it, i) => (
                <button
                  key={it.n}
                  className={`benefits-nav-item${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="benefits-nav-num">{it.n}</span>
                  <span className="benefits-nav-title">{it.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="benefits-right">
          <div className="benefits-content" key={active}>
            <div className="benefits-right-inner">
              <div className="benefits-stat">
                <span className="benefits-stat-label">{item.statLabel}</span>
                <span className="benefits-stat-num">{item.stat}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
             <div className="stat-image" style={{ backgroundImage: item.bg && item.bg.startsWith('url(') ? item.bg : item.bg ? `url(${item.bg})` : undefined }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
