import AdvantagesPills from './AdvantagesPills'
import { ArrowUpIcon } from './Icons'

const defaultStats = [
  { num: '95%', label: 'Answer rate', bg: '', bgImg: '/images/handphone-2.png', decoImg: '', color: 'white', iconColor: 'white' },
  { num: '+35%', label: 'Increase in bookings', bg: 'black', bgImg: null, decoImg: '', color: 'white', iconColor: '#3bff76' },
  { num: '3s', label: 'Response time', bg: '#c499f2', bgImg: '/images/response-time.jpg', decoImg: null, color: null, iconColor: 'black' },
  { num: '24/7', label: 'Hours available', bg: '', bgImg: null, decoImg: '/images/cubes.png', color: null, iconColor: null },
]

export default function Stats({ cms }) {
  const c = cms || {}

  let statsData = defaultStats
  if (c.stat1Num) {
    statsData = []
    for (let i = 1; i <= 6; i++) {
      if (!c[`stat${i}Num`]) break
      statsData.push({
        num: c[`stat${i}Num`],
        label: c[`stat${i}Label`] || '',
        bg: c[`stat${i}BgColor`] || '',
        bgImg: c[`stat${i}BgImage`] || null,
        decoImg: c[`stat${i}DecoImage`] || null,
        color: c[`stat${i}TextColor`] || null,
        iconColor: c[`stat${i}IconColor`] || null,
      })
    }
  }

  const advantages = []
  for (let i = 1; i <= 10; i++) {
    if (c[`adv${i}Title`]) {
      advantages.push({ title: c[`adv${i}Title`], body: c[`adv${i}Body`] || '' })
    }
  }

  return (
    <>
      <section className="advantages-section">

        <div className="advantage-header">
        <h2>{c.impactHeading || 'The impact of Dentsy AI receptionist'}</h2>
        <p className="body">{c.impactDescription || 'Dentsy combines an AI Phone System and AI Receptionist into one seamless platform — capturing insight, handling calls, and keeping your CRM up to date automatically.'}</p>
        </div>

        <div className="advantage-grid">
          <div className="advantage-img" style={c.advantageImage ? { backgroundImage: `url(${c.advantageImage})` } : undefined} />
          <div className="advantage-wrap">
          <h3>{c.advantageHeading || 'Your advantage on every call'}</h3>
          <AdvantagesPills items={advantages.length ? advantages : undefined} />
          </div>
        </div>
      </section>

      <section className="impact-section">
          <div className="impact-grid">
            {statsData.map(({ num, label, bg, bgImg, decoImg, color, iconColor }) => (
              <div className="impact-card" key={label} style={{ backgroundColor: bg || undefined, backgroundImage: bgImg ? `url(${bgImg})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <ArrowUpIcon className="impact-arrow" style={{ color: iconColor || undefined }} />
                {decoImg && <img src={decoImg} alt="" className="impact-card-img" loading="lazy" />}
                <span className="impact-label" style={{ color: color || undefined }}>{label}</span>
                <span className="impact-num" style={{ color: color || undefined }}>{num}</span>
              </div>
            ))}
          </div>
      </section>
    </>
  )
}
