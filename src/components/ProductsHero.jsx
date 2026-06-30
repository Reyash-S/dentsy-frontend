import { useEffect, useRef } from 'react'
import { CircleRightIcon, ArrowRightIcon, PhoneIcon } from './Icons'
import { Link } from 'react-router-dom'

export default function ProductsHero({ cms }) {
  const c = cms || {}
  const chatRef = useRef(null)

  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    const rows = el.querySelectorAll('.chat-row')

    function check() {
      const rect = el.getBoundingClientRect()
      if (rect.bottom <= window.innerHeight) {
        rows.forEach((row, i) => setTimeout(() => row.classList.add('chat-row-visible'), i * 150))
        window.removeEventListener('scroll', check)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <section className="products-hero">
      <h2>{c.heading || 'Two Products. One Platform.'}</h2>
      <p className="body w70">
        {c.description || 'The phone system that runs and reports your calls, and the AI that answers and handles them. Choose the AI Phone System, the AI Receptionist, or bring both together as one complete Dentsy platform.'}
      </p>

    <div className="two-wrapper">
      <div className="two-products-grid">
        <div className="two-header">
          <h3>{c.phoneTitle || 'AI Phone System'}</h3>
          <p className="body">
          {c.phoneDescription || 'Dentsy AI Phone System integrates with your CRM to show caller context, automate call notes, and turn every conversation into actionable insight.'}</p>
          <a href="#phonesystem">
            <button className="btn-pri">{c.phoneButton || 'Explore AI Phone System'} <ArrowRightIcon /></button>
          </a>
        </div>
        <div className="two-outer phone" style={{backgroundColor:'#e2e2e2', backgroundImage: c.phoneImage ? `url(${c.phoneImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center'}} />
      </div>
      
      <div className="two-products-grid">
        <div className="two-header">
          <h3>{c.receptionistTitle || 'AI Receptionist'}</h3>
          <p className="body">
          {c.receptionistDescription || 'Dentsy AI Receptionist answers calls naturally, handles inquiries, books appointments, and takes payments so no opportunity is ever missed.'}</p>
          <a href="#ai-receptionist">
          <button className="btn-pri">{c.receptionistButton || 'Explore AI Receptionist'} <ArrowRightIcon /></button>
          </a>
        </div>
        <div className="two-outer agent" style={{backgroundColor:'#e2e2e2', backgroundImage: c.agentImage ? `url(${c.agentImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center'}} ref={chatRef}>
            <div className="chat-row chat-row-left">
              <div className="chat-avatar"><PhoneIcon size={18} /></div>
              <div className="chat-bubble-wrap">
                <div className="chat-label">John Smith</div>
                <div className="chat-bubble">{c.chatCallerText || "Hi, I'm calling about the 3-bed property on Church Lane — is it still available for viewing?"}</div>
              </div>
            </div>
            <div className="chat-row chat-row-right">
              <div className="chat-avatar"><img src="/images/orb.gif" alt="Dentsy AI" className="chat-orb" loading="lazy" /></div>
              <div className="chat-bubble-wrap">
                <div className="chat-label">Dentsy AI</div>
                <div className="chat-bubble">{c.chatAIText || "Hi there! Yes, Church Lane is still available. I can book you in — what day works best for you?"}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    </section>
  )
}
