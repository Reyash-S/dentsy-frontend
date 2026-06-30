import { useRef, useState } from 'react'
import { PlayCircleIcon, PauseIcon, CircleRightIcon, ArrowRightIcon } from './Icons'
import { useGlobalData } from '../hooks/useGlobalData.jsx'

const defaultCards = [
  { img: '/images/calls3.png', name: 'Naomi', role: 'Viewing Enquiry', audio: '/audio/agent1.mp3' },
  { img: '/images/guy4.png', name: 'Andrew', role: 'Rental Application', audio: '/audio/agent2.mp3' },
  { img: '/images/client.jpeg', name: 'Anna', role: 'Valuation Request', audio: '/audio/agent3.mp3' },
]

const defaultPills = [
  'Always Answers 24/7', 'Takes Payments', 'Sentiment Analysis',
  'Speaks Like Your Agency', 'Integrates With Your CRM', 'Intelligence Dashboard',
  'Books Appointments', 'Reporting', 'Handles FAQs',
  'Notes Synced Directly to CRM',
]

export default function AIReceptionist({ cms }) {
  const c = cms || {}
  const [playingIndex, setPlayingIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const global = useGlobalData()

  const cards = []
  const audioCards = global.airAudio?.cards
  for (let i = 1; i <= 3; i++) {
    cards.push({
      img: c[`card${i}Image`] || audioCards?.[i-1]?.image || defaultCards[i - 1]?.img || '',
      name: c[`card${i}Name`] || audioCards?.[i-1]?.name || defaultCards[i - 1]?.name || '',
      role: c[`card${i}Role`] || audioCards?.[i-1]?.role || defaultCards[i - 1]?.role || '',
      audio: c[`card${i}Audio`] || audioCards?.[i-1]?.audio || defaultCards[i - 1]?.audio || '',
    })
  }

  const pills = c.featurePills
    ? c.featurePills.split('\n').filter(s => s.trim()).map(s => s.trim())
    : defaultPills

  function handlePlay(index, src) {
    if (playingIndex === index) {
      audioRef.current.pause()
      setPlayingIndex(null)
    } else if (activeIndex === index) {
      audioRef.current.play()
      setPlayingIndex(index)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.ontimeupdate = null
        audioRef.current.onended = null
      }
      setProgress(0)
      const audio = new Audio(src)
      audio.ontimeupdate = () => {
        if (audio.duration) setProgress(audio.currentTime / audio.duration * 100)
      }
      audio.onended = () => { setPlayingIndex(null); setActiveIndex(null); setProgress(0) }
      audio.play()
      audioRef.current = audio
      setPlayingIndex(index)
      setActiveIndex(index)
    }
  }

  return (
    <section className="ai-receptionist-section" id="ai-receptionist">
      <div className="ai-rec-header">
        <div className="section-label">{c.label || 'AI Receptionist'}</div>
        <h2>{c.heading || 'AI Receptionist: designed to perform like your best agent.'}</h2>
        <p>
          {c.description || 'Answering calls, handling inquiries, taking payments and booking appointments naturally and accurately, while keeping every conversation human, helpful and on-brand.'}<br /><br />{c.descriptionSuffix || 'This is what your callers hear:'}
        </p>
      </div>

      <div className="ai-rec-cards">
        {cards.map(({ img, name, role, audio }, i) => (
          <div className="ai-rec-card" key={i} style={{ backgroundImage: `url(${img})` }}>
              <div className="ai-rec-card-content">
                <div className="ai-rec-card-info">
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                  <span className="ai-rec-card-name">{name}</span>
                  <span className="ai-rec-card-role">{role}</span>
                  </div>
                  <button className="ai-rec-btn ai-rec-btn-play" onClick={() => handlePlay(i, audio)}>
                    {playingIndex === i ? <PauseIcon size={22} /> : <PlayCircleIcon size={22} />}
                  </button>
                </div>
                <div className="ai-rec-player-inner">
                  <div className="ai-rec-track">
                    <div className="ai-rec-track-bar" style={{ width: `${activeIndex === i ? progress : 0}%` }} />
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>

      <div>
        <h1 style={{textAlign: 'left', marginTop: '80px'}}>{c.flowHeading || 'Conversations that flow naturally'}</h1>
        <p className="body" style={{textAlign: 'left'}}>{c.flowDescription || 'No scripts. No awkward pauses. Just natural, confident conversations that feel like speaking to a member of your team.'}
        </p>
        <div className="ai-rec-features">
          {pills.map(f => <span className="ai-rec-feature-pill" key={f}>{f}</span>)}
        </div>
      </div>

            <div className="ai-rec-footer">
        <div style={{textAlign: 'left'}}>
        <p>{c.footerText || 'Feels like part of your team from day one.'}
        <span className="ai-rec-sub"> {c.footerSubtext || "Handling calls so naturally, it doesn't feel like AI."}</span></p>
        </div>
        <a href="/ai-receptionist" className="btn-pri">
          <span className="text" data-front={c.footerButton || 'Explore AI receptionist'} data-back={c.footerButton || 'Explore AI receptionist'} />
          <ArrowRightIcon size={16} />
          <span className="bg-clr" />
        </a>
      </div>

    </section>
  )
}
