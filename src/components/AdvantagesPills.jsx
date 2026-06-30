import { useState } from 'react'

const advantages = [
  {
    title: 'Convert more inquiries into revenue',
    body: 'Capture every inquiry, key detail and next steps automatically, so your team spend less time on admin and more time turning opportunities into revenue.',
  },
  {
    title: 'More bookings without more calls',
    body: 'Dentsy helps your team act while interest is still high, so more conversations turn into viewing, valuations and appointments.',
  },
  {
    title: 'No missed opportunities',
    body: 'Dentsy helps you spot missed opportunities, track booking outcomes and convert more of the inquiries you already receive.',
  },
  {
    title: 'Better performance across your team',
    body: 'See how every team member handles calls, with coaching dashboards and agent scoring that helps improve quality, consistency and results.',
  },
  {
    title: 'Less admin, more time to focus on deals',
    body: 'Dentsy handles call notes, summaries and next steps automatically, giving your team less time spent on admin and more time moving opportuntities forward.',
  },
  {
    title: 'More consistent, professional client experience',
    body: 'Client details appear instantly before each call, so agents can answer calls with full context and deliver a more personal experience.',
  },
]

export default function AdvantagesPills({ items }) {
  const [open, setOpen] = useState(0)
  const data = items || advantages

  return (
    <div className="advantages-list">
      {data.map(({ title, body }, i) => (
        <div className={`advantages-item${open === i ? ' advantages-item--open' : ''}`} key={i}>
          <button className="advantages-item-heading" onClick={() => setOpen(open === i ? null : i)}>
            <span>{title}</span>
            <span className="advantages-item-icon">{open === i ? '−' : '+'}</span>
          </button>
          <div className="advantages-item-body-wrap">
            <p className="advantages-item-body">{body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
