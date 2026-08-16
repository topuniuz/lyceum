import { FormEvent, useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, ChevronRight, Globe2, Menu, Phone, Send, X } from 'lucide-react'
import { supabase } from './lib/supabase'
import { academicPrograms, navigation } from './data/site'

type Language = 'en' | 'uz' | 'ru'

const content = {
  en: {
    nav: ['About', 'Academics', 'People', 'Admissions', 'News', 'Contact'],
    eyebrow: 'Academic Lyceum of Andijan State University',
    hero: 'A place to learn. A place to become.',
    intro: 'A rigorous academic environment for ambitious students preparing for university, leadership, and the world beyond.',
    explore: 'Explore ALASU', admissions: 'Admissions information',
    aboutKicker: 'The ALASU experience', aboutTitle: 'Built around curiosity, discipline, and possibility.',
    aboutText: 'ALASU brings together dedicated teachers, motivated students, and a culture that takes learning seriously. Our community is designed to help young people discover what they can do — and give them the foundation to do it well.',
    academics: 'Academic programs', academicTitle: 'Strong foundations for ambitious futures.',
    academicText: 'Focused academic pathways, a demanding curriculum, and an environment where students are encouraged to think beyond the classroom.',
    people: 'Our people', peopleTitle: 'Teachers who know that education is personal.', peopleText: 'Meet the educators and leadership team who shape the academic life of ALASU.',
    admissionTitle: 'Thinking about joining ALASU?', admissionText: 'Official applications for academic lyceums are submitted through my.edu.uz. If you need information about programs, admissions, or the lyceum, our administration can help.',
    contactAdmin: 'Contact the administration', news: 'Latest from ALASU', newsTitle: 'News, achievements, and life at the lyceum.',
    contact: 'Questions? Let’s talk.', contactText: 'For admissions information, school questions, partnerships, or general enquiries, contact the ALASU administration.',
    send: 'Send request', sent: 'Request received', sentText: 'Thank you. The ALASU administration will contact you.',
  },
  uz: {
    nav: ['Biz haqimizda', 'Ta’lim', 'Jamoa', 'Qabul', 'Yangiliklar', 'Aloqa'],
    eyebrow: 'Andijon davlat universiteti akademik litseyi', hero: 'O‘rganish uchun. Kelajak uchun.',
    intro: 'Universitet, yetakchilik va kelajak sari intilayotgan yoshlar uchun kuchli akademik muhit.', explore: 'ALASUni o‘rganish', admissions: 'Qabul haqida',
    aboutKicker: 'ALASU tajribasi', aboutTitle: 'Qiziqish, intizom va imkoniyat atrofida qurilgan.', aboutText: 'ALASU fidoyi o‘qituvchilar, maqsadli o‘quvchilar va ta’limga jiddiy yondashadigan muhitni birlashtiradi.',
    academics: 'Akademik dasturlar', academicTitle: 'Katta maqsadlar uchun mustahkam poydevor.', academicText: 'Yo‘naltirilgan akademik dasturlar, talabchan o‘quv muhiti va sinfdan tashqarida fikrlashga undaydigan ta’lim.',
    people: 'Jamoamiz', peopleTitle: 'Ta’limni shaxsiy jarayon deb biladigan ustozlar.', peopleText: 'ALASUning akademik hayotini shakllantiradigan o‘qituvchilar va rahbariyat bilan tanishing.',
    admissionTitle: 'ALASUga qo‘shilishni o‘ylayapsizmi?', admissionText: 'Akademik litseylarga rasmiy arizalar my.edu.uz orqali topshiriladi. Dasturlar va qabul haqida ma’lumot olish uchun ma’muriyatimizga murojaat qiling.', contactAdmin: 'Ma’muriyat bilan bog‘lanish',
    news: 'ALASUdan yangiliklar', newsTitle: 'Yangiliklar, yutuqlar va litsey hayoti.', contact: 'Savollaringiz bormi? Bog‘laning.', contactText: 'Qabul, ta’lim, hamkorlik yoki umumiy savollar bo‘yicha ALASU ma’muriyatiga murojaat qiling.', send: 'So‘rov yuborish', sent: 'So‘rov qabul qilindi', sentText: 'Rahmat. ALASU ma’muriyati siz bilan bog‘lanadi.',
  },
  ru: {
    nav: ['О лицее', 'Обучение', 'Команда', 'Поступление', 'Новости', 'Контакты'],
    eyebrow: 'Академический лицей Андижанского государственного университета', hero: 'Место, где учатся. Место, где растут.',
    intro: 'Сильная академическая среда для мотивированных учеников, готовящихся к университету, лидерству и будущему.', explore: 'Об ALASU', admissions: 'О поступлении',
    aboutKicker: 'Опыт ALASU', aboutTitle: 'Среда, построенная на любознательности, дисциплине и возможностях.', aboutText: 'ALASU объединяет преданных своему делу преподавателей, мотивированных учеников и культуру, в которой к образованию относятся серьёзно.',
    academics: 'Академические программы', academicTitle: 'Сильная основа для амбициозного будущего.', academicText: 'Сфокусированные образовательные направления, требовательная программа и среда, которая учит мыслить шире класса.',
    people: 'Наши люди', peopleTitle: 'Преподаватели, для которых образование — личный путь.', peopleText: 'Познакомьтесь с преподавателями и руководством, которые формируют академическую жизнь ALASU.',
    admissionTitle: 'Думаете о поступлении в ALASU?', admissionText: 'Официальные заявления в академические лицеи подаются через my.edu.uz. По вопросам программ и поступления можно обратиться к администрации.', contactAdmin: 'Связаться с администрацией',
    news: 'Последние новости ALASU', newsTitle: 'Новости, достижения и жизнь лицея.', contact: 'Есть вопросы? Давайте поговорим.', contactText: 'По вопросам поступления, обучения, партнёрства или общей информации свяжитесь с администрацией ALASU.', send: 'Отправить запрос', sent: 'Запрос получен', sentText: 'Спасибо. Администрация ALASU свяжется с вами.',
  },
} as const

const langNames = { en: 'EN', uz: 'UZ', ru: 'RU' }

function Header({ lang, setLang }: { lang: Language; setLang: (v: Language) => void }) {
  const [open, setOpen] = useState(false)
  const t = content[lang]
  return <header className="nav-wrap">
    <nav className="nav container">
      <a className="brand" href="#top"><img src="/alasu-logo.png" alt="ALASU Logo" className="brand-logo" /><span><strong>ALASU</strong><small>Academic Lyceum</small></span></a>
      <div className={`nav-links ${open ? 'open' : ''}`}>{navigation.map((item, i) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{t.nav[i]}</a>)}</div>
      <div className="nav-actions"><div className="language-switcher"><Globe2 size={15}/><select value={lang} onChange={e => setLang(e.target.value as Language)}>{Object.entries(langNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><a className="nav-cta" href="#admissions">{t.admissions}<ArrowRight size={15}/></a><button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Menu">{open ? <X/> : <Menu/>}</button></div>
    </nav>
  </header>
}

function ContactForm({ lang }: { lang: Language }) {
  const t = content[lang]
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState('sending')
    const form = new FormData(e.currentTarget)
    const payload = { name: String(form.get('name') || ''), phone: String(form.get('phone') || ''), topic: String(form.get('topic') || 'General enquiry'), message: String(form.get('message') || '') }
    if (!payload.name || !payload.phone) { setState('error'); return }
    if (!supabase) { setState('sent'); return }
    const { error } = await supabase.from('contact_requests').insert(payload)
    setState(error ? 'error' : 'sent')
    if (!error) e.currentTarget.reset()
  }
  if (state === 'sent') return <div className="form-success"><span><Check/></span><h3>{t.sent}</h3><p>{t.sentText}</p><a href="#top" className="underlined-link">Back to ALASU <ArrowRight size={16}/></a></div>
  return <form className="contact-form" onSubmit={submit}>
    <label>Name<input name="name" required placeholder={lang === 'uz' ? 'Ismingiz' : lang === 'ru' ? 'Ваше имя' : 'Your name'} /></label>
    <label>Phone<input name="phone" required placeholder="+998" /></label>
    <label>Topic<select name="topic"><option>Admissions</option><option>Academic programs</option><option>General enquiry</option><option>Partnership</option></select></label>
    <label>Message<textarea name="message" rows={4} placeholder={lang === 'uz' ? 'Qanday yordam bera olamiz?' : lang === 'ru' ? 'Как мы можем помочь?' : 'How can we help?'} /></label>
    <button className="button button-dark" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>{t.send}<Send size={15}/></>}</button>
    {state === 'error' && <p className="form-error">Please enter your name and phone number.</p>}
    <p className="form-note"><Phone size={14}/> Your request is sent to the ALASU administration.</p>
  </form>
}

function Home({ lang }: { lang: Language }) {
  const t = content[lang]
  return <>
    <section className="hero"><div className="hero-image"/><div className="hero-overlay"/><div className="container hero-content"><div className="hero-copy"><p className="eyebrow light">{t.eyebrow}</p><h1>{t.hero}</h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><a className="button button-light" href="#about">{t.explore}<ArrowRight size={17}/></a><a className="text-link light-link" href="#admissions">{t.admissions}<ChevronRight size={18}/></a></div></div><div className="hero-note"><span>01</span><div><b>Andijan, Uzbekistan</b><small>Academic community</small></div></div></div></section>
    <section className="intro-section" id="about"><div className="container split-section"><div className="section-label"><span>01</span><span>{t.aboutKicker}</span></div><div className="section-content"><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><a className="underlined-link" href="#people">Discover our community <ArrowRight size={16}/></a></div></div></section>
    <section className="programs-section" id="academics"><div className="container"><div className="section-heading-row"><div><p className="eyebrow">02 / {t.academics}</p><h2>{t.academicTitle}</h2></div><p>{t.academicText}</p></div><div className="program-grid">{academicPrograms.map(p => <a className="program-card" href="#contact" key={p.number}><span className="program-number">{p.number}</span><h3>{p.name}</h3><p>{p.description}</p><ArrowRight size={19}/></a>)}</div></div></section>
    <section className="people-section" id="people"><div className="container people-layout"><div className="people-image"/><div className="people-copy"><p className="eyebrow">03 / {t.people}</p><h2>{t.peopleTitle}</h2><p>{t.peopleText}</p><div className="stat-row"><div><strong>01</strong><span>Leadership</span></div><div><strong>02</strong><span>Faculty</span></div><div><strong>03</strong><span>Students</span></div></div><a className="button button-light" href="#contact">Meet the community <ArrowRight size={17}/></a></div></div></section>
    <section className="admission-section" id="admissions"><div className="container admission-inner"><div><p className="eyebrow light">04 / Admissions</p><h2>{t.admissionTitle}</h2></div><div><p>{t.admissionText}</p><a className="button button-light" href="#contact">{t.contactAdmin}<ArrowRight size={17}/></a></div></div></section>
    <section className="news-section" id="news"><div className="container"><div className="section-heading-row news-heading"><div><p className="eyebrow">05 / {t.news}</p><h2>{t.newsTitle}</h2></div><a className="underlined-link" href="#contact">View all news <ArrowRight size={16}/></a></div><div className="news-grid"><article className="news-feature"><div className="news-image one"/><div className="news-meta">ALASU · 2026</div><h3>Academic life, achievements, and the people behind them.</h3><a href="#contact">Read story <ArrowRight size={15}/></a></article><article className="news-feature"><div className="news-image two"/><div className="news-meta">ALASU · COMMUNITY</div><h3>A closer look at life inside our academic community.</h3><a href="#contact">Read story <ArrowRight size={15}/></a></article></div></div></section>
    <section className="contact-section" id="contact"><div className="container contact-layout"><div><p className="eyebrow">06 / Contact</p><h2>{t.contact}</h2><p className="contact-lead">{t.contactText}</p></div><ContactForm lang={lang}/></div></section>
  </>
}

function Footer() { return <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">A</span><span><strong>ALASU</strong><small>Academic Lyceum of Andijan State University</small></span></a><p>Learning with purpose. Growing with ambition.</p></div><div><span className="footer-title">Explore</span><a href="#about">About</a><a href="#academics">Academics</a><a href="#people">People</a><a href="#news">News</a></div><div><span className="footer-title">Admissions</span><a href="#admissions">Information</a><a href="#contact">Contact administration</a><a href="https://my.edu.uz" target="_blank" rel="noreferrer">my.edu.uz ↗</a></div><div><span className="footer-title">Andijan</span><p>Academic Lyceum of<br/>Andijan State University</p><a href="#contact">Get in touch →</a></div></div><div className="container footer-bottom"><span>© 2026 ALASU. All rights reserved.</span><span>Andijan, Uzbekistan</span></div></footer> }

export default function App() { const [lang, setLang] = useState<Language>('en'); return <div className="site-shell"><Header lang={lang} setLang={setLang}/><main id="top"><Home lang={lang}/></main><Footer/></div> }
