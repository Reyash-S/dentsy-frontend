export default function TwoProducts({ cms }) {
  const c = cms || {}
  return (
    <section className="two-products">
      <div className="two-products-header">
        <h2>{c.heading || 'Everything your agency needs,'}<br/>{c.headingSecond || 'built into every call.'}</h2>
        <p className="body w50 center">{c.description || 'Dentsy combines an AI Phone System and AI Receptionist into one seamless platform — capturing insight, handling calls, and keeping your CRM up to date automatically.'}</p>
        <p className="two-products-note">{c.note || '*Some agencies choose one product. Some agencies choose both. Dentsy is built around the way you work.'}</p>
      </div>
      <div className="two-products-ui">
        <img src={c.dashboardImage || '/images/dash5.png'} alt="Dentsy dashboard" loading="lazy" />
      </div>
    </section>
  )
}
