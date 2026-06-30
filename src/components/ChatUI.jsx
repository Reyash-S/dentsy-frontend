import { useEffect, useRef } from 'react'
import { PhoneIcon } from './Icons'

const defaultMessages = [
  {
    side: 'left',
    label: 'John Smith',
    text: "Hi, I'm calling about the 3-bed property on Church Lane — is it still available for viewing?",
  },
  {
    side: 'right',
    label: 'Dentsy AI',
    text: "Hi there! Yes, Church Lane is still available. I can book you in — what day works best for you?",
  },
  {
    side: 'left',
    label: 'John Smith',
    text: "Saturday morning would be great, if possible.",
  },
  {
    side: 'right',
    label: 'Dentsy AI',
    text: "Perfect — I've booked you in for Saturday at 10am. I'll send a confirmation to your number. Is there anything else I can help with?",
  },
]

export default function ChatUI({ messages }) {
  const ref = useRef(null)
  const msgs = messages || defaultMessages

  useEffect(() => {
    const rows = ref.current?.querySelectorAll('.chat-row')
    if (!rows) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rows.forEach((row, i) => {
            setTimeout(() => row.classList.add('chat-row-visible'), i * 150)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="chat-ui" ref={ref}>
      {msgs.map(({ side, label, text }, i) => (
        <div className={`chat-row chat-row-${side}`} key={i}>
          <div className="chat-avatar">
            {side === 'left'
              ? <PhoneIcon size={18} />
              : <img src="/images/orb.gif" alt="Dentsy AI" className="chat-orb" loading="lazy" />
            }
          </div>
          <div className="chat-bubble-wrap">
            <div className="chat-label">{label}</div>
            <div className="chat-bubble">{text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
