import { useEffect, useRef } from 'react'
import { ArrowRightIcon } from './Icons'

export default function APFCta({ cms }) {
  const c = cms || {}
  const imageRef = useRef(null)

  useEffect(() => {
    const el = imageRef.current
    if (!el) return
    const bubbles = el.querySelectorAll('.apf-cta-bubble')

    function check() {
      const rect = el.getBoundingClientRect()
      if (rect.bottom <= window.innerHeight) {
        bubbles.forEach((bubble, i) =>
          setTimeout(() => bubble.classList.add('apf-cta-bubble--visible'), i * 200)
        )
        window.removeEventListener('scroll', check)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div className="apf-cta">
      <div className="apf-cta-text">
        <h2>{c.heading || 'Having missed call tracking not enough for you?'}</h2>
        <div className="section-label">{c.eyebrow || 'Explore our AI Receptionist and never miss a call again'}</div>
        <p className="body">
          {c.description || 'With Dentsy AI Receptionist, calls are answered, inquiries are captured and payments are taken. So opportunities keep moving, even when your team is busy, unavailable, or out of hours.'}
        </p>
        <a href="/ai-receptionist"><button className="btn-pri">{c.buttonText || 'Explore AI Receptionist'} <ArrowRightIcon /></button></a>
      </div>
      <div className="apf-cta-image" ref={imageRef} style={c.sideImage ? { backgroundImage: `url(${c.sideImage})` } : undefined}>
        {(c.bubbles || [
          { text: 'Call answered', time: '13:42' },
          { text: 'Call back arranged', time: '03:30' },
          { text: 'Viewing arranged', time: '22:15' },
        ]).map((b, i) => (
          <div className="apf-cta-bubble" key={i}>{b.text} <span>{b.time}</span></div>
        ))}
      </div>
    </div>
  )
}
