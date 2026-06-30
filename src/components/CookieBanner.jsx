import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          We use cookies to improve your experience on our site. By clicking "Accept", you agree to our <Link to="/cookie-policy">Cookie Policy</Link>.
        </p>
        <div className="cookie-banner-actions">
          <button className="cookie-btn-decline" onClick={decline}>Decline</button>
          <button className="cookie-btn-accept" onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  )
}
