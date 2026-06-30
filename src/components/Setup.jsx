import { GearIcon, HeadsetIcon, ChartIcon } from './Icons'

const steps = [
  {
    num: 1,
    title: 'We handle the setup',
    body: 'We take care of everything from your configuration & CRM integration to number porting. No technical work on your part.',
  },
  {
    num: 2,
    title: 'Go live in days',
    body: "Once configured & tested, Dentsy is live in a matter of days. Your team's calls start flowing through everything as they happen.",
  },
  {
    num: 3,
    title: 'Start seeing the difference',
    body: 'Results start appearing immediately, with more opportunities spotted as Dentsy learns. Insights improve with every conversation.',
  },
]

export default function Setup({ cms }) {
  const c = cms || {}
  return (
    <section className="setup">
      <div className="setup-inner">
        <div className="setup-top">
          <div className="pill">{c.label || 'Quick setup'}</div>
          <h2>{c.heading || 'Set up around your agency'}</h2>
          <p className="body">{c.description || 'Dentsy is set up to fit your agency, your team and your existing CRM. With a smooth integration process, simple onboarding and minimal disruption, your team can start saving time, improving follow-up and getting more value from every call quickly.'}</p>
          <div className="hero-btns" style={{ justifyContent: 'center' }}>
            <a href={c.buttonPrimaryUrl || '/pricing'} className="btn-pri">{c.buttonPrimary || 'Put Dentsy to work'}</a>
            <a target="_blank" href={c.buttonSecondaryUrl || '#book-demo'} className="btn-pri-alt">{c.buttonSecondary || 'See Dentsy in action'}</a>
          </div>
        </div>

        <div className="setup-steps">
          {(c.steps || steps).map((step, i) => {
            const num = i + 1
            const title = step.title
            const body = step.body || step.description
            return (
              <div className={`step step-${num}`} key={num}>
                {num === 1 && <GearIcon className="step-icon" size={50} />}
                {num === 2 && <HeadsetIcon className="step-icon" size={50} />}
                {num === 3 && <ChartIcon className="step-icon" size={50} />}
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
