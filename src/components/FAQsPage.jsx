import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { ArrowDownIcon } from './Icons'
import { getFaqs, getPageBySlug } from '../lib/wordpress'
import { usePageSections, s } from '../hooks/usePageSections'
import { useSEO } from '../hooks/useSEO'

const FALLBACK_FAQS = [
  {
    category: 'Getting Started',
    items: [
      { q: 'How quickly can an estate agency get started with Dentsy?', a: 'Most estate agencies are up and running within days. Dentsy is configured around your workflows, CRM and call handling, so there\'s no disruption to how your agency operates.' },
      { q: 'Does Dentsy work for multi-branch estate agencies?', a: 'Yes. Dentsy is built to scale across multiple branches and teams, giving you full visibility across your entire operation.' },
    ],
  },
  {
    category: 'AI Phone System',
    items: [
      { q: 'What is an AI Phone System for estate agents?', a: 'Dentsy is a complete phone system that captures, organises and provides insight into every call, before, during and after it happens.' },
      { q: 'How is Dentsy different from a standard phone system (VoIP)?', a: 'Traditional systems route calls. Dentsy helps you handle them better, with call insight, automatic summaries and full visibility across every conversation.' },
      { q: 'Can I review and search past calls?', a: 'Yes. Every call is recorded, transcribed and searchable, so you can quickly find conversations and key details.' },
      { q: 'Will Dentsy work with my CRM?', a: 'Yes. Dentsy integrates with your CRM to pull in client details before the call and automatically update records afterwards.' },
      { q: 'How does sentiment analysis work?', a: 'Dentsy analyses tone, urgency and sentiment during the call, helping you identify issues early and improve client experience.' },
    ],
  },
  {
    category: 'AI Receptionist',
    items: [
      { q: 'How does the AI Receptionist work for estate agents?', a: 'Dentsy answers calls, handles inquiries, books viewings, takes payments and captures information in real time, following your agency\'s processes.' },
      { q: 'Can the AI handle property inquiries and tenant calls?', a: 'Yes. Dentsy is designed for estate agents, handling sales inquiries, lettings, property management requests and tenant queries.' },
      { q: 'Does the AI sound like a real person?', a: 'Yes. Dentsy is designed to sound natural and professional, and most callers won\'t realise they\'re speaking to AI.' },
      { q: 'Can the AI book appointments directly?', a: 'Yes. The AI checks real-time availability in your CRM and books appointments during the call, with confirmation sent instantly.' },
      { q: 'What happens if the AI can\'t handle a query?', a: 'If a query falls outside its scope, the call will be transferred to your team or a message is taken and sent instantly for follow-up.' },
      { q: 'Does the AI Receptionist take payments?', a: 'Yes. Dentsy can securely collect deposits and payments during calls, helping streamline your processes.' },
    ],
  },
  {
    category: 'General',
    items: [
      { q: 'How much does Dentsy cost for estate agents?', a: 'Pricing is tailored to your agency based on call volume, number of users, integrations and which products you choose. During your demo, we\'ll walk through your setup and provide a bespoke quote after the session.' },
      { q: 'Will Dentsy replace my team?', a: 'No. Dentsy supports your team by handling calls, reducing admin and providing insight, giving them more time to focus on clients and progressing deals.' },
      { q: 'Is my data secure with Dentsy?', a: 'Yes. All calls and client data are stored securely, with encryption and controlled access.' },
    ],
  },
]

const CATEGORY_SLUG_ORDER = ['getting-started', 'ai-phone-system', 'ai-receptionist', 'general']

function groupFaqs(nodes) {
  const map = {}
  nodes.forEach((faq) => {
    const catNode = faq.faqCategories?.nodes?.[0]
    const category = catNode?.name || 'General'
    const slug = catNode?.slug || 'general'
    const question = faq.title
    const answer = faq.content || ''
    if (!map[slug]) map[slug] = { name: category, items: [] }
    map[slug].items.push({ q: question, a: answer })
  })
  return Object.entries(map)
    .sort(([a], [b]) => {
      const ai = CATEGORY_SLUG_ORDER.indexOf(a)
      const bi = CATEGORY_SLUG_ORDER.indexOf(b)
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })
    .map(([, { name, items }]) => ({ category: name, items }))
}

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`} onClick={onToggle}>
      <div className="faq-question">
        <span>{q}</span>
        <div className="btn-pri-alt">
          <ArrowDownIcon />
        </div>
      </div>
      {open && <div className="faq-answer" dangerouslySetInnerHTML={{ __html: a }} />}
    </div>
  )
}

function FAQGroup({ category, items }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="faq-group">
      <h2 className="faq-category">{category}</h2>
      <div className="faq-list">
        {items.map(({ q, a }, i) => (
          <FAQItem
            key={q}
            q={q}
            a={a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function FAQsPage() {
  const { sections } = usePageSections('faqs')
  const [faqs, setFaqs] = useState(FALLBACK_FAQS)
  const [seo, setSeo] = useState(null)
  useSEO(seo || { title: 'FAQs — Dentsy' })

  useEffect(() => {
    getFaqs()
      .then(nodes => { if (nodes.length) setFaqs(groupFaqs(nodes)) })
      .catch(() => {})
    getPageBySlug('faqs')
      .then(page => { if (page?.seo) setSeo(page.seo) })
      .catch(() => {})
  }, [])

  return (
    <div className="faqs-page">
      <Header />
      <div className="faqs-content container">
        <div className="faqs-meta">
          <div className="section-label">{s(sections, 'faqs-hero', 'label', 'FAQs')}</div>
          <h1>{s(sections, 'faqs-hero', 'heading', 'Everything you need to know about Dentsy')}</h1>
        </div>
        <div className="faqs-body">
          {faqs.map(({ category, items }) => (
            <FAQGroup key={category} category={category} items={items} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
