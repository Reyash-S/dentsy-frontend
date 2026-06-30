import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownIcon, PhoneIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const rows = [
  {
    label: 'Before the call',
    heading: 'Know more before you answer',
    body: 'As the phone rings, a smart caller pop-up shows clients details, property information, and past interactions, with one-click access to full records.',
    cards: [
      {
        title: 'Smart Caller Pop-Up',
        body:  'Client details appear instantly as the phone rings, so your team always know who\'s calling.',
        img: 'url(/images/popup.png)',
      },
      {
        title: 'One Click File Access',
        body:  'Open the full client record in a single click, without interrupting your flow.',
        img: 'url(/images/folder.png)',
      },
      {
        title: 'Continually Built In',
        body:  'See past interactions & property details, so conversations continue naturally.',
        img: 'url(/images/built.webp)',
      },
      {
        title: 'Works With Your CRM',
        body:  'Dentsy syncs with your existing CRM, keeping everything connected without double entry.',
        img: 'url(/images/crm.png)',
      },
    ],
  },
  {
    label: 'During the call',
    heading: 'Captured and understood in real time',
    body: 'Every conversation is recorded, transcribed, understood and analysed as it happens, with key points and client sentiment identified automatically.',
    cards: [
      {
        title: 'Call Recording',
        body:  'Every conversation is captured in full, securely as it happens.',
        img: 'url(/images/mic.png)',
      },
      {
        title: 'Live Transcription',
        body:  'Calls are transcribed in real time, keeping an accurate written record automatically.',
        img: 'url(/images/transcript.png)',
      },
      {
        title: 'Notes Taken Automatically',
        body:  'Key points are identified and saved as structured notes — no need to take notes manually.',
        img: 'url(/images/notes.png)',
        col: null,
      },
    ],
  },
  {
    label: 'After the call',
    heading: 'Clear on what happens next',
    body: 'Summaries, notes, and next steps are created instantly and added directly to your client files in your CRM, making follow-ups clear.',
    cards: [
      {
        title: 'AI Call Summaries & Next Steps',
        body:  'Every call produces a clean summary with actions clearly identified.',
        img: 'url(/images/tasks.png)',
      },
      {
        title: 'Notes Synced Directly to Your CRM',
        body:  'Client files are updated instantly, keeping your team accurate and up to date.',
        img: 'url(/images/sync.png)',
      },
      {
        title: 'Recording & Full Transcription',
        body:  'The complete call is stored and available to review at any time.',
        img: 'url(/images/rec.png)',
      },
      {
        title: 'Sentiment Analysis & Agent Scoring',
        body:  'Key points are analysed to highlight client sentiment & measure agent performance.',
        img: 'url(/images/graph.png)',
      },
      {
        title: 'Keyword Search',
        body:  'Find any detail from any call instantly with key points & follow-ups clearly identified.',
        img: 'url(/images/search.png)',
      },
      {
        title: 'Missed Call Tracking & Instant Follow-Up',
        body:  'Every missed call is logged and flagged, with nothing is left behind.',
        img: 'url(/images/missed.png)',
      },
    ],
  },
]

export default function AIPhoneFeatures({ cms }) {
  const c = cms || {}
  const displayRows = c.rows || rows
  const rowRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row || i === 0) return
        gsap.set(row, { opacity: 0, y: 28 })
        gsap.to(
          row,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [displayRows])

  return (
    <section className="ai-phone-features" id="ai-phone-features">
      <div className="ai-phone-features-header">
        <div>
          <div className="section-label">{c.label || 'Dentsy AI Phone System'}</div>
          <h2>{c.heading || 'See everything that matters'}{c.headingGradient !== undefined && c.headingGradient !== '' ? <> <span className="text-grad">{c.headingGradient}</span></> : !c.heading ? <> <span className="text-grad">before, during and after every call.</span></> : null}</h2>
          {(c.description) && <p className="body">{c.description}</p>}
        </div>
      </div>

      <div className="ai-phone-features-rows">

        {/* Timeline column */}
        <div className="apf-timeline">
          <div className="apf-timeline-arrow-wrap">
            <ArrowDownIcon size={16} />
          </div>
        </div>

        {/* Rows */}
        <div className="apf-rows-content">
          {displayRows.map(({ label, heading, body, cards }, i) => (
            <div
              className="apf-row"
              key={i}
              ref={el => rowRefs.current[i] = el}
            >
              <div className="apf-row-label">
                <div className="apf-row-dot"><PhoneIcon size={12} /></div>
                <span className="section-label">{label}</span>
              </div>
              {heading && <h3 className="apf-row-heading">{heading}</h3>}
              {body && <p className="apf-row-body">{body}</p>}
              <div className="apf-cards">
                {cards.map(({ title, body, highlight, img, col }) => {
                  const bgImg = img ? (img.startsWith('url(') ? img : `url(${img})`) : null
                  return (
                  <div
                    className={`apf-card${highlight ? ' apf-card--highlight' : ''}`}
                    key={title}
                    style={{ gridColumn: col || undefined }}
                  >
                    {bgImg && <div className="apf-card-img" style={{ backgroundImage: bgImg, backgroundColor: 'white' }} />}
                    <div className="apf-card-text">
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
