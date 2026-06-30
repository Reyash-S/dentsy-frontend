import { useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { CircleRightIcon, PlayCircleIcon, PauseIcon, ArrowRightIcon } from './Icons'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { usePageSections } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

const AUDIO_CARDS = [
  { img: '/images/calls3.png',   name: 'Naomi',       role: 'Viewing Inquiry',                        audio: '/audio/agent1.mp3' },
  { img: '/images/guy4.png',      name: 'Andrew',      role: 'Rental Application',                    audio: '/audio/agent2.mp3' },
  { img: '/images/client.jpeg',   name: 'Anna',   role: 'Valuation Request',    audio: '/audio/agent3.mp3' },
]

const HOW_STEPS = [
  { n: 1, title: 'Answered instantly',    body: 'No voicemail. No hold music. No missed opportunities. Every call is handled within seconds, any time of day.' },
  { n: 2, title: 'Understood perfectly',  body: 'Every inquiry is recognised & responded to naturally, from bookings to property questions & tenant requests.' },
  { n: 3, title: 'Actioned immediately',  body: 'Appointments are scheduled, inquiries captured & next steps confirmed, all during the call.' },
  { n: 4, title: 'Shared with your team', body: 'Full summaries, key details & outcomes are delivered instantly, keeping everyone informed.' },
]

const FEATURES = [
  { title: 'Always Answers 24/7',           body: 'Every call handled instantly, day or night. No voicemail, no hold music, no missed opportunities.' },
  { title: 'Speaks Like Your Agency',       body: 'Voice, tone & booking preferences tailored to match how your agency operates.' },
  { title: 'Books Appointments Instantly',  body: 'Viewings, valuations & tenant appointments are scheduled during the call, with availability checked & confirmed.' },
  { title: 'Handles Everyday Questions',    body: 'From property inquiries to tenant requests, every question is answered clearly & consistently.' },
  { title: 'Summarises Every Call',         body: 'Receive instant updates with summaries, key details & actions taken after every conversation.' },
  { title: 'Takes Payments',                body: 'Fees & payments collected during the call, securing commitment & keeping things moving forward.' },
  { title: 'Integrates With Your CRM',      body: 'Calls, notes, appointments & updates are logged automatically, keeping everything accurate & up to date.' },
  { title: 'Gives You Full Visibility',     body: 'Track call volumes, booking rates, common inquiries & AI performance in one clear dashboard.' },
]

const STATS = [
  { val: '95%',     label: 'Answer Rate',         sub: 'vs 78% industry average' },
  { val: '+35%',    label: 'More Bookings',        sub: 'on average' },
  { val: '3s',     label: 'Response Time',        sub: 'every call answered instantly' },
  { val: '24/7',    label: 'Availability',         sub: 'No missed opportunities' },
]

const SETUP_STEPS = [
  { n: 1, title: 'Tailored To Your Agency',    body: 'Dentsy is configured to match how your team works. From tone of voice to services.' },
  { n: 2, title: 'Connected To Your Systems',  body: 'Our team takes care of everything, from installation & system configuration to CRM integration & number porting. No technical work required from your side.' },
  { n: 3, title: 'Ready To Go Live',           body: 'Once configured & tested, Dentsy starts answering & supporting your calls immediately.' },
  { n: 4, title: 'Running In The Background',  body: 'Calls handled, captured & organised automatically, without adding extra work to your team.' },
]

function AudioSection({ data }) {
  const audioData = data || {}
  const displayCards = audioData.cards || AUDIO_CARDS.map(c => ({ name: c.name, role: c.role, image: c.img, audio: c.audio }))
  const [playingIndex, setPlayingIndex] = useState(null)
  const [activeIndex,  setActiveIndex]  = useState(null)
  const [progress,     setProgress]     = useState(0)
  const audioRef = useRef(null)

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
    <section className="arp-audio">
      <div className="wrapper">
        <div className="arp-audio-header">
           <div className="section-label">{audioData.label || 'Our Agents'}</div>
          <h1>{audioData.heading || 'Hear how Dentsy AI Receptionist handles your calls'}</h1>
          <p className="body">{audioData.description || 'Real conversations handled naturally from first question to confirmed outcome.'}</p>
        </div>
        <div className="ai-rec-cards">
          {displayCards.map((card, i) => (
            <div className="ai-rec-card" key={card.name || i} style={{ backgroundImage: `url(${card.image || card.img})` }}>
              <div className="ai-rec-card-content">
                <div className="ai-rec-card-info">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '200px' }}>
                    <span className="ai-rec-card-name">{card.name}</span>
                    <span className="ai-rec-card-role">{card.role}</span>
                  </div>
                  <button className="ai-rec-btn ai-rec-btn-play" onClick={() => handlePlay(i, card.audio)}>
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
      </div>
    </section>
  )
}

export default function AIReceptionistPage() {
  const { sections, seo } = usePageSections('ai-receptionist')
  useSEO(seo || { title: 'AI Receptionist — Dentsy' })
  const hero = sections['air-hero'] || {}
  const audioSec = sections['air-audio'] || {}
  const how = sections['air-how-it-works'] || {}
  const feat = sections['air-features'] || {}
  const stat = sections['air-stats'] || {}
  const setup = sections['air-setup'] || {}
  const cta = sections['air-cta'] || {}

  return (
    <div className="ai-receptionist-page">
      <Header />

      {/* Hero */}
      <section className="arp-hero" style={hero.heroImage ? { backgroundImage: `url(${hero.heroImage}), linear-gradient(rgba(255, 255, 255, 0.5), rgba(216, 241, 255, 0.5))` } : undefined}>
        <div>
          <div className="section-label">{hero.label || 'Dentsy AI Receptionist'}</div>
          <h1>{hero.heading || 'Every call answered.'}<br /><span className="accent">{hero.headingSecond || 'Properly.'}</span></h1>
          <p className="body">{hero.description || 'No scripts. No awkward pauses. Just natural, confident conversations that feel like speaking to a member of your team.'}</p>
          <div className="arp-hero-actions">
            <a href={hero.buttonUrl || '#book-demo'} target="_blank">
            <button className="btn-pri">
              <span className="text" data-front={hero.buttonText || 'Book A Demo'} data-back={hero.buttonText || 'Book A Demo'} />
              <ArrowRightIcon size={16} />
              <span className="bg-clr" />
            </button></a>
          </div>
        </div>
      </section>

      {/* Audio demos */}
      <AudioSection data={audioSec} />

      {/* How Dentsy Works */}
      <section className="arp-how">
        <div>
          <div className="arp-how-left">
            <div className="section-label">{how.label || 'How Dentsy Works'}</div>
            <h2>{how.heading || 'Designed To Perform Like Your Best Agent'}</h2>
            <p className="body w70">{how.description || 'From first ring to confirmed bookings, every interaction is handled naturally, with inquiries understood, appointments scheduled & next steps taken automatically.'}</p>
          </div>
          <div className="arp-how-steps">
            {(how.steps || HOW_STEPS).map((step, i) => (
              <div className="arp-how-step" key={step.n || i}>
                <div className="arp-step-num">{step.n || i + 1}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="arp-features">
        <div>
          <div className="section-label">{feat.label || 'Features'}</div>
          <h2>{feat.heading || 'What Dentsy Takes Care Of'}</h2>
          {feat.description && <p className="body">{feat.description}</p>}
          <div className="arp-features-grid">
            {(feat.features || FEATURES).map((f, i) => (
              <div className="arp-feature-card" key={f.title || i}>
                <h4>{f.title}</h4>
                <p>{f.body || f.description}</p>
              </div>
            ))}
          </div>
          <a href={feat.buttonUrl || '/pricing'}><button className="btn-pri" style={{ marginTop: 40 }}>{feat.buttonText || 'See Dentsy in action'} <ArrowRightIcon/></button></a>
        </div>
      </section>

      {/* Stats */}
      <section className="arp-stats">
        <div>
          <h2>{stat.heading || 'See The Difference In Your Calls'}</h2>
          <p className="body">{stat.description || 'Real improvements across response times, bookings & missed opportunities.'}</p>
          <div className="arp-stats-grid">
            {(stat.stats || STATS).map((s, i) => (
              <div className="arp-stat-card" key={s.label || i}>
                <div className="arp-stat-val">{s.val || s.value}</div>
                <div className="arp-stat-label">{s.label}</div>
                <div className="arp-stat-sub">{s.sub || s.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="arp-setup">
        <div>
          <div className="section-label">{setup.label || 'Setup'}</div>
          <h2>{setup.heading || 'Up & Running In Days'}</h2>
          <p className="body">{setup.description || 'No complex setup. No disruption to your workflow. Dentsy is configured around your agency & ready to handle calls in days.'}</p>
          <div className="arp-setup-grid">
            {(setup.steps || SETUP_STEPS).map((step, i) => (
              <div className="arp-setup-card" key={step.n || i}>
                <div className="arp-step-num">{step.n || i + 1}</div>
                <h4>{step.title}</h4>
                <p>{step.body || step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="arp-cta">
        <div className="container">
          <p className="arp-cta-eyebrow">{cta.eyebrow || 'Put Dentsy to work.'}</p>
          <h2>{cta.heading || 'The Smartest AI Phone System'}<br />{cta.headingSecond || 'For Estate Agencies.'}</h2>
          <p>{cta.description || 'The system that runs your calls. The AI that handles them.'}</p>
          <a href={cta.buttonUrl || '/pricing'}><button className="btn-pri">
            <span className="text" data-front={cta.buttonText || 'Get A Tailored Quote'} data-back={cta.buttonText || 'Get A Tailored Quote'} />
            <CircleRightIcon size={16} />
            <span className="bg-clr" />
          </button></a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
