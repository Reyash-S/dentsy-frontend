import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UserViewIcon, InfoIcon, BrainIcon, ChartIcon, ClockIcon, DataIcon } from './Icons'
import { MdOutlineLocalPhone, MdOutlineCheckCircle, MdOutlineCalendarToday } from 'react-icons/md'
import { RiMoneyPoundCircleLine } from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

function MainDashboardVisual() {
  const cards = [
    {
      icon: <MdOutlineLocalPhone size={35} />, iconBg: '#bbd5ff', iconColor: '#2f7fff', bg: '#eff5ff', valColor: '#2f7fff', labelColor: '#2f7fff', statColor: '#2f7fff',
      title: 'Total Calls', stat: '52', subs: null,
    },
    {
      icon: <MdOutlineLocalPhone size={35} />, iconBg: '#0a9ba7', iconColor: '#fff', bg: '#eefcf7',
      title: 'Call Direction', stat: null,
      subs: [{ label: 'Incoming', val: '31', valColor: '#0a9ba7', labelColor: '#0a9ba7' }, { label: 'Outgoing', val: '18', valColor: '#0a9ba7', labelColor: '#0a9ba7' }, { label: 'Internal', val: '3', valColor: '#0a9ba7', labelColor: '#0a9ba7' }],
    },
    {
      icon: <MdOutlineLocalPhone size={35} />, iconBg: '#ffd7d7', iconColor: '#ef4444', bg: '#fef2f7',
      title: 'Inbound Call Status', stat: null,
      subs: [{ label: 'Answered', val: '28', valColor: '#ef4444', labelColor: '#ef4444' }, { label: 'Missed', val: '3', valColor: '#ef4444', labelColor: '#ef4444' }],
    },
    {
      icon: <MdOutlineLocalPhone size={35} />, iconBg: '#d8c8ff', iconColor: '#8b5cf6', bg: '#f4edfe',
      title: 'Answer Rates', stat: null,
      subs: [{ label: 'Overall', val: '85%', valColor: '#8b5cf6', labelColor: '#8b5cf6' }, { label: 'Inbound', val: '90%', valColor: '#8b5cf6', labelColor: '#8b5cf6' }],
    },
    {
      icon: <ClockIcon width={35} height={35} />, iconBg: '#d6c5ff', iconColor: '#8b5cf6', bg: '#ececfe', statColor: '#8b5cf6',
      title: 'Average Duration', stat: '03:42', subs: null,
    },
    {
      icon: <ClockIcon width={35} height={35} />, iconBg: '#ffd4d4', iconColor: '#ef4444', bg: '#fef3fa', statColor: '#ef4444',
      title: 'Inbound Duration', stat: '04:11', subs: null,
    },
    {
      icon: <MdOutlineLocalPhone size={35} />, iconBg: '#d0d1ff', iconColor: '#6366f1', bg: '#eff2ff',
      title: 'Outbound Call Status', stat: null,
      subs: [{ label: 'Answered', val: '15', valColor: '#6366f1', labelColor: '#6366f1' }, { label: 'Missed', val: '3', valColor: '#6366f1', labelColor: '#6366f1' }],
    },
    {
      icon: <ClockIcon width={35} height={35} />, iconBg: '#c8edff', iconColor: '#0ea5e9', bg: '#e4f8fe',
      title: 'Ring Time Averages', stat: null,
      subs: [{ label: 'Overall', val: '18s', valColor: '#0ea5e9', labelColor: '#0ea5e9' }, { label: 'Inbound', val: '22s', valColor: '#0ea5e9', labelColor: '#0ea5e9' }],
    },
  ]
  return (
    <div className="mdi-grid">
      {cards.map(({ icon, iconBg, iconColor, bg, title, stat, statColor, subs }) => (
        <div className="mdi-card" key={title} style={{ background: bg }}>
          <div className="mdi-card-top">
            <div className="mdi-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
            <span className="mdi-title">{title}</span>
          </div>
          {stat && <div className="mdi-stat" style={statColor ? { color: statColor } : {}}>{stat}</div>}
          {subs && (
            <div className="mdi-subs">
              {subs.map(s => (
                <div className="mdi-sub" key={s.label}>
                  <span className="mdi-sub-val" style={s.valColor ? { color: s.valColor } : {}}>{s.val}</span>
                  <span className="mdi-sub-label" style={s.labelColor ? { color: s.labelColor } : {}}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AiVisual() {
  const cards = [
    {
      icon: <MdOutlineLocalPhone size={30} />, iconBg: '#6366f1', cardBg: '#bfd9fb',
      statColor: '#6366f1', title: 'Total Calls', stat: '52',
      subs: [{ label: 'Inbound', val: '31' }, { label: 'Outbound', val: '21' }],
    },
    {
      icon: <RiMoneyPoundCircleLine size={30} />, iconBg: '#2fbd62', cardBg: '#d4f8e3',
      statColor: '#16a34a', title: 'New Inquiries Revenue', stat: '£4,200',
      subs: [{ label: 'Converted Rev (Est.)', val: '£3,800' }, { label: 'Unconverted Rev (Est.)', val: '£400' }],
    },
    {
      icon: <ClockIcon width={30} height={30} />, iconBg: '#aa4aeb', cardBg: '#f0e2fe',
      statColor: '#9333ea', title: 'Inquiries', stat: '14',
      subs: [{ label: 'New', val: '9' }, { label: 'Existing', val: '5' }],
    },
    {
      icon: <ChartIcon width={30} height={30} />, iconBg: '#f34067', cardBg: '#fce1ee',
      statColor: '#f34067', title: 'Bookings', stat: '8',
      subs: [{ label: 'New', val: '5' }, { label: 'Existing', val: '3' }],
    },
    {
      icon: <MdOutlineLocalPhone size={30} />, iconBg: '#2fc755', cardBg: '#e8facb',
      statColor: '#2fc755', title: 'Answered Calls', stat: '48',
      subs: [{ label: 'Inbound', val: '29' }, { label: 'Outbound', val: '19' }],
    },
    {
      icon: <MdOutlineLocalPhone size={30} />, iconBg: '#ef4444', cardBg: '#fee1e1',
      statColor: '#ef4444', title: 'Missed Calls', stat: '4',
      subs: [{ label: 'Inbound', val: '2' }, { label: 'Outbound', val: '2' }],
    },
  ]
  return (
    <div className="aid-grid">
      {cards.map(({ icon, iconBg, cardBg, statColor, title, stat, note, subs }) => (
        <div className="aid-card" key={title} style={{ background: cardBg }}>
          <div className="aid-card-top">
            <div className="aid-icon" style={{ background: iconBg }}>{icon}</div>
            <div className="aid-top-right">
              <span className="aid-stat" style={{ color: statColor }}>{stat}</span>
              <span className="aid-title">{title}</span>
            </div>
          </div>
          {note && <p className="aid-note">{note}</p>}
          <div className="aid-subs">
            {subs.map(s => (
              <div className="aid-sub" key={s.label}>
                <span className="aid-sub-label">{s.label}</span>
                <span className="aid-sub-val" style={{ color: statColor }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Leaderboard() {
  const cards = [
    {
      title: 'Total Calls', icon: <MdOutlineLocalPhone size={16} />,
      iconBg: '#c7d9ff', iconColor: '#4a7fff', bg: '#eef3ff',
      stat: '14',
      detail: '9 inbound / 5 outbound',
    },
    {
      title: 'Answered Calls', icon: <MdOutlineCheckCircle size={16} />,
      iconBg: '#b6f5d0', iconColor: '#22c55e', bg: '#edfff5',
      stat: '1',
      pct: 7, missed: '13 missed',
      detail: '7% answer rate',
    },
    {
      title: 'Booked Inquiries', icon: <MdOutlineCalendarToday size={16} />,
      iconBg: '#ddd6fe', iconColor: '#8b5cf6', bg: '#f3f0ff',
      stat: '0',
      pct: null, side: '0 new inquiries',
      detail: '0% conversion rate',
    },
    {
      title: 'Converted Revenue (Est)', icon: <RiMoneyPoundCircleLine size={16} />,
      iconBg: '#fde68a', iconColor: '#d97706', bg: '#fffbeb',
      stat: '£0',
      detail: '£0 potential not booked',
    },
  ]
  return (
    <div className="lb2-grid">
      {cards.map(({ title, icon, iconBg, iconColor, bg, stat, pct, missed, side, detail }) => (
        <div className="lb2-card" key={title} style={{ background: bg }}>
          <div className="lb2-card-top">
            <span className="lb2-title">{title}</span>
            <div className="lb2-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
          </div>
          <div className="lb2-stat">{stat}</div>
          {pct !== undefined && pct !== null && (
            <div className="lb2-bar-row">
              <span className="lb2-pct">{pct}%</span>
              <div className="lb2-bar-track"><div className="lb2-bar-fill" style={{ width: `${pct}%`, background: iconColor }} /></div>
              {missed && <span className="lb2-missed">{missed}</span>}
            </div>
          )}
          {side && !pct && (
            <div className="lb2-side-row">
              <span className="lb2-pct">0%</span>
              <span className="lb2-missed">{side}</span>
            </div>
          )}
          <div className="lb2-detail">{detail}</div>
        </div>
      ))}
    </div>
  )
}

function CoachingVisual() {
  const metrics = [
    { label: 'Rapport building',   val: 82 },
    { label: 'Needs discovery',    val: 67 },
    { label: 'Closing technique',  val: 74 },
    { label: 'Objection handling', val: 91 },
    { label: 'Call-to-book rate',  val: 55 },
  ]
  return (
    <div className="coaching-visual" style={{ height: 'auto' }}>
      {metrics.map(({ label, val }) => (
        <div className="coaching-metric" key={label}>
          <span className="coaching-label">{label}</span>
          <div className="coaching-track">
            <div className="coaching-track-fill" style={{ width: `${val}%` }} />
          </div>
          <span className="coaching-val">{val}%</span>
        </div>
      ))}
    </div>
  )
}

const GAP = 24

const CARD_DATA = [
  {
    icon: <MdOutlineLocalPhone size={16} />, title: 'Main Intelligence Dashboard', data: 'Average Daily Calls: 52',
    body: 'Get your call performance across your entire agency all in one complete view — your central dashboard.',
    visual: <MainDashboardVisual />,
  },
  {
    icon: <BrainIcon width={16} height={16} />, title: 'AI Analytics Dashboard', data: '',
    body: 'AI turns conversations into insights — finding trends, patterns & missed opportunities automatically.',
    visual: <AiVisual />,
  },
  {
    icon: <ChartIcon width={16} height={16} />, title: 'Leaderboards', data: '',
    body: "See the performance across your team. Compare teams & individuals to identify who's leading.",
    visual: <Leaderboard />,
  },
  {
    icon: <UserViewIcon width={16} height={16} />, title: 'Coaching Dashboard', data: '',
    body: 'Improve how every call is handled. Track where your team can improve, helping every call be better than the last.',
    visual: <CoachingVisual />,
  },
]

export default function Dashboards() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const stage   = stageRef.current
    const section = sectionRef.current
    if (!stage || !section) return

    const cards = cardRefs.current.filter(Boolean)
    const n = cards.length

    let CARD_H = 0, STEP = 0
    let SCROLL_Y = 0
    let rafId = null

    function measure() {
      CARD_H = cards[0]?.getBoundingClientRect().height || 500
      STEP   = CARD_H + GAP
    }

    function updateTransforms() {
      for (let i = 0; i < n; i++) {
        const screenY = Math.max(0, i * STEP - SCROLL_Y)
        const covered = screenY === 0 ? Math.max(0, SCROLL_Y - i * STEP) : 0
        const tScale   = Math.min(covered / STEP, 1)
        const tOpacity = Math.min(Math.max(0, (covered - STEP * 0.5) / (STEP * 0.5)), 1)
        const scale    = 1 - tScale * 0.06
        const opacity  = 1 - tOpacity

        cards[i].style.transform = `translate(-50%, calc(-50% + ${screenY}px)) scale(${scale})`
        cards[i].style.opacity   = opacity
        cards[i].style.filter    = ''
        cards[i].style.zIndex    = String(i + 10)
      }
    }

    function tick() {
      updateTransforms()
      rafId = requestAnimationFrame(tick)
    }

    measure()
    rafId = requestAnimationFrame(tick)

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'bottom bottom',
      end: () => `+=${(n - 1) * 700}`,
      pin: true,
      scrub: 1,
      onUpdate: self => {
        SCROLL_Y = self.progress * (n - 1) * STEP
      },
    })

    const onResize = () => {
      measure()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="dashboards" ref={sectionRef}>
      <div className="container">
        <div className="dashboards-header">
          <div className="section-label">Dashboards</div>
          <h2>Everything in one <span className="accent">intelligent</span> view.</h2>
          <p className="body">Understand what your calls are truly telling you, listening closely for patterns, emotions, and intent. Transform everyday conversations into meaningful clarity by asking better questions, reflecting thoughtfully, and acting with purpose.</p>
        </div>
      </div>

      <div className="carousel-stage" ref={stageRef}>
        <div className="carousel-cards">
          {CARD_DATA.map((card, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              className="db-card carousel-card"
            >
              <div className="db-card-header">
                <div className="title-wrap">
                  <h3>{card.title}</h3>
                </div>
                  <div className="card-info">
                    <p>{card.body}</p>
                  </div>
              </div>
              <div className="db-card-visual">{card.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
