import ChatUI from './ChatUI'
import { ArrowRightIcon } from './Icons'

const defaultPills = [
  ['Smart Caller Pop-Up', 'One Click File Access', 'Notes Synced Directly to CRM'],
  ['Automatic Note Taking', 'Recording & Full Transcription', 'AI Call Summaries'],
  ['Sentiment Analysis', 'Agent Scoring', 'Intelligence Dashboards'],
  ['Coaching', 'Reporting', 'Missed Call Tracking'],
]

export default function AIPhoneSystem({ cms }) {
  const c = cms || {}

  const chatMessages = []
  for (let i = 1; i <= 4; i++) {
    if (c[`chat${i}Text`]) {
      chatMessages.push({
        side: i % 2 === 1 ? 'left' : 'right',
        label: c[`chat${i}Label`] || (i % 2 === 1 ? 'John Smith' : 'Dentsy AI'),
        text: c[`chat${i}Text`]
      })
    }
  }

  let pills = defaultPills
  if (c.featurePills) {
    const items = c.featurePills.split('\n').filter(s => s.trim())
    if (items.length) {
      pills = []
      for (let i = 0; i < items.length; i += 3) {
        pills.push(items.slice(i, i + 3).map(s => s.trim()))
      }
    }
  }

  return (
    <section className="ai-phone-section" id="phonesystem">
      <div className="ai-phone-inner">
        <div className="ai-phone-text">
          <div className="section-label">{c.label || 'AI Phone System'}</div>
          <h2>{c.heading || 'The system behind every call.'}</h2>
          <p>
            {c.description || 'Dentsy integrates seamlessly with your CRM to reduce admin, improve productivity, and give your team complete clarity across every call. See who\'s calling before you answer, access their record in one click, it automatically transcribes conversations, giving summaries, notes, smart tagging and next step. With intelligence dashboards, sentiment analysis and agent scoring, Dentsy turns every conversation into insight that helps your agency capture more inquiries and improve performance.'}
          </p>
        </div>
        <div className="ai-phone-image">
          <ChatUI messages={chatMessages.length ? chatMessages : undefined} />
        </div>
      </div>
      <div className="ai-phone-advantage">
        <div className="ai-phone-advantage-left">
          <h1>{c.advantageHeading || 'The advantage before, during & after every conversation.'}</h1>
          <p>{c.advantageDescription || 'Context before you answer. Conversations captured and understood in real time. Everything in your CRM, nothing missed or forgotten.'}</p>
        </div>
        <div className="ai-phone-wrapper">
          <div className="ai-phone-advantage-right">
            {pills.map((group, g) => (
              <div className="ai-phone-feature-group" key={g}>
                {group.map(f => <span className="ai-phone-feature-pill" key={f}>{f}</span>)}
              </div>
            ))}
          </div>
          <a href="/ai-phone-system">
          <button className="btn-pri-alt">{c.buttonText || 'Explore AI Phone System'} <ArrowRightIcon/></button></a>
        </div>
      </div>
    </section>
  )
}
