import { Resend } from 'resend'
import { rateLimit, getIp } from './_rateLimit.js'
import { getNotificationEmail } from './_notificationEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const esc = (str) =>
  String(str ?? '')
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rateLimit(getIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { firstName, lastName, agencyName, email, phone, product, agencies, users } = req.body

  if (!firstName || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const sFirst   = esc(firstName)
  const sLast    = esc(lastName)
  const sAgency  = esc(agencyName)
  const sEmail   = esc(email)
  const sPhone   = esc(phone)
  const sProduct = esc(product)
  const sAgencies = Number(agencies) || 0
  const sUsers    = Number(users) || 0

  const debug = { email: null, slack: null }
  const notificationTo = await getNotificationEmail()

  if (!notificationTo) {
    return res.status(500).json({ error: 'Notification email not configured' })
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dentsy <noreply@dentsy.ai>',
      to: notificationTo,
      replyTo: sEmail,
      subject: `Pricing enquiry from ${sFirst} ${sLast} — ${sAgency}`,
      html: `
        <h2>New Pricing Enquiry</h2>
        <p><strong>Name:</strong> ${sFirst} ${sLast}</p>
        <p><strong>Agency:</strong> ${sAgency}</p>
        <p><strong>Email:</strong> ${sEmail}</p>
        <p><strong>Phone:</strong> ${sPhone}</p>
        <hr />
        <p><strong>Product:</strong> ${sProduct}</p>
        <p><strong>Number of agencies:</strong> ${sAgencies}</p>
        <p><strong>Number of users:</strong> ${sUsers}</p>
      `,
    })
    debug.email = 'ok'
  } catch (err) {
    console.error('Resend error:', err)
    debug.email = err.message
    return res.status(500).json({ error: 'Failed to send email', debug })
  }

  try {
    const slackRes = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*New Pricing Enquiry*\n*Name:* ${sFirst} ${sLast}\n*Agency:* ${sAgency}\n*Email:* ${sEmail}\n*Phone:* ${sPhone || '—'}\n*Product:* ${sProduct}\n*Agencies:* ${sAgencies}\n*Users:* ${sUsers}`,
      }),
    })
    debug.slack = slackRes.ok ? 'ok' : `HTTP ${slackRes.status}`
    if (!slackRes.ok) console.error('Slack webhook error:', slackRes.status, await slackRes.text())
  } catch (err) {
    console.error('Slack fetch error:', err)
    debug.slack = err.message
  }

  return res.status(200).json({ ok: true, debug })
}
