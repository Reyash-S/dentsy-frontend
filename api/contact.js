import { Resend } from 'resend'
import { rateLimit, getIp } from './_rateLimit.js'
import { getNotificationEmail } from './_notificationEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const esc = (str) =>
  String(str ?? '')
    .slice(0, 2000)
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

  const { name, agency, email, phone, message } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const sName    = esc(name)
  const sAgency  = esc(agency)
  const sEmail   = esc(email)
  const sPhone   = esc(phone)
  const sMessage = esc(message).replace(/\n/g, '<br/>')

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
      subject: `Contact enquiry from ${sName} — ${sAgency}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${sName}</p>
        <p><strong>Agency:</strong> ${sAgency}</p>
        <p><strong>Email:</strong> ${sEmail}</p>
        <p><strong>Phone:</strong> ${sPhone}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${sMessage || '—'}</p>
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
        text: `*New Contact Enquiry*\n*Name:* ${sName}\n*Agency:* ${sAgency}\n*Email:* ${sEmail}\n*Phone:* ${sPhone || '—'}\n*Message:* ${esc(message) || '—'}`,
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
