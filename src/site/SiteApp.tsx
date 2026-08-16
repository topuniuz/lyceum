import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, ChevronDown, Award, Globe2, GraduationCap, MapPin, Menu, Phone, Mail, Send, Shield, Users, X } from 'lucide-react'
import { academicPrograms, achievementsList, facultyMembers, faqItems, lyceumStats, newsArticles } from '../data/site'
import { supabase } from '../lib/supabase'
import './site.css'

type Lang = 'en' | 'uz' | 'ru'
type Page = 'home' | 'about' | 'academics' | 'people' | 'admissions' | 'news' | 'achievements' | 'gallery' | 'faq' | 'contact'

const order: Page[] = ['home', 'about', 'academics', 'people', 'admissions', 'news', 'achievements', 'gallery', 'faq', 'contact']

const copy = {
  en: {
    home: 'Home', about: 'About', academics: 'Academics', people: 'People', admissions: 'Admissions',
    news: 'News', achievements: 'Achievements', gallery: 'Gallery', faq: 'FAQ', contact: 'Contact',
    hero: 'A place to learn. A place to become.',
    aboutTitle: 'An academic community built for the next generation.',
    aboutText: 'Academic Lyceum of Andijan State University gives motivated students a rigorous environment in which to learn, think independently, and prepare for top university admission.',
    programTitle: 'Strong foundations for ambitious futures.',
    admissionTitle: 'Admissions at ALASU',
    admissionText: 'Applications to academic lyceums across Uzbekistan are submitted online through my.edu.uz during the official admissions window.',
    peopleTitle: 'People make the institution.',
    peopleText: 'Our leadership, university professors, and student Olympiad medalists are the heart of ALASU.',
    contactTitle: 'Talk to ALASU Administration',
    explore: 'Explore', info: 'Admissions information', official: 'Official application portal',
    next: 'Continue exploring', previous: 'Previous', submit: 'Send Request',
    sent: 'Thank you. Your request has been received.', error: 'Something went wrong. Please try again.'
  },
  uz: {
    home: 'Bosh sahifa', about: 'Biz haqimizda', academics: 'Ta’lim', people: 'Jamoa', admissions: 'Qabul',
    news: 'Yangiliklar', achievements: 'Yutuqlar', gallery: 'Galereya', faq: 'FAQ', contact: 'Aloqa',
    hero: 'O‘rganish uchun. Kelajak uchun.',
    aboutTitle: 'Kelajak avlodi uchun yaratilgan akademik hamjamiyat.',
    aboutText: 'Andijon davlat universiteti akademik litseyi bilim olish, mustaqil fikrlash va eng nufuzli universitetlarga tayyorlanish uchun kuchli akademik muhit yaratadi.',
    programTitle: 'Katta maqsadlar uchun mustahkam poydevor.',
    admissionTitle: 'ALASUga qabul',
    admissionText: 'Akademik litseylarga arizalar my.edu.uz rasmiy portali orqali onlayn topshiriladi.',
    peopleTitle: 'Muassasani odamlar yaratadi.',
    peopleText: 'Rahbariyat, professor-o‘qituvchilar va olimpiada g‘oliblari ALASUning yuragidir.',
    contactTitle: 'ALASU ma’muriyati bilan bog‘laning',
    explore: 'Ko‘rish', info: 'Qabul haqida ma’lumot', official: 'Rasmiy ariza portali',
    next: 'Ko‘proq ko‘rish', previous: 'Orqaga', submit: 'So‘rov yuborish',
    sent: 'Rahmat. So‘rovingiz qabul qilindi.', error: 'Xatolik yuz berdi. Qayta urinib ko‘ring.'
  },
  ru: {
    home: 'Главная', about: 'О лицее', academics: 'Обучение', people: 'Команда', admissions: 'Поступление',
    news: 'Новости', achievements: 'Достижения', gallery: 'Галерея', faq: 'FAQ', contact: 'Контакты',
    hero: 'Место, где учатся. Место, где растут.',
    aboutTitle: 'Академическое сообщество для нового поколения.',
    aboutText: 'Академический лицей Андижанского государственного университета создаёт сильную среду для обучения, самостоятельного мышления и поступления в ведущие вузы.',
    programTitle: 'Сильная основа для амбициозного будущего.',
    admissionTitle: 'Поступление в ALASU',
    admissionText: 'Заявления в академические лицеи подаются онлайн через государственный портал my.edu.uz.',
    peopleTitle: 'Люди создают институт.',
    peopleText: 'Руководство, преподаватели и победители олимпиад — сердце ALASU.',
    contactTitle: 'Связаться с администрацией ALASU',
    explore: 'Подробнее', info: 'Информация о поступлении', official: 'Официальный портал подачи',
    next: 'Продолжить знакомство', previous: 'Назад', submit: 'Отправить запрос',
    sent: 'Спасибо. Ваш запрос получен.', error: 'Произошла ошибка. Попробуйте ещё раз.'
  }
} as const

const routes: Record<string, Page> = {
  '/': 'home', '/about': 'about', '/academics': 'academics', '/people': 'people',
  '/admissions': 'admissions', '/news': 'news', '/achievements': 'achievements',
  '/gallery': 'gallery', '/faq': 'faq', '/contact': 'contact'
}

function useRouter() {
  const [p, setP] = useState<Page>(routes[location.pathname] ?? 'home')
  useEffect(() => {
    const f = () => setP(routes[location.pathname] ?? 'home')
    addEventListener('popstate', f)
    return () => removeEventListener('popstate', f)
  }, [])
  return [p, (x: Page) => {
    history.pushState({}, '', x === 'home' ? '/' : `/${x}`)
    setP(x)
    scrollTo(0, 0)
  }] as const
}

const flags: Record<Lang, string> = { en: '/flags/en.svg', uz: '/flags/uz.svg', ru: '/flags/ru.svg' }

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=85', title: 'Advanced Robotics & Physics Laboratory' },
  { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85', title: 'Lyceum Central Library & Study Commons' },
  { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=85', title: 'Main Academic Building & Campus Grounds' },
  { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85', title: 'National Olympiad Ceremony & Award Winners' },
  { url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=85', title: 'Student Sports Complex & Athletics Center' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85', title: 'Computer Science & Software Engineering Hub' },
]

function Header({ lang, setLang, page, go }: { lang: Lang; setLang: (x: Lang) => void; page: Page; go: (x: Page) => void }) {
  const c = copy[lang], [open, setOpen] = useState(false)
  const links: Page[] = ['about', 'academics', 'people', 'admissions', 'news', 'achievements', 'gallery', 'faq', 'contact']
  return (
    <header className="supaste-header">
      <div className="container">
        <div className="supaste-nav-bar">
          <button className="supaste-brand" onClick={() => go('home')}>
            <img src="/alasu-logo.png" alt="ALASU Logo" className="brand-logo" />
            <div className="brand-copy">
              <b>ALASU</b>
              <small>Academic Lyceum</small>
            </div>
          </button>
          <div className={`supaste-nav-links ${open ? 'is-open' : ''}`}>
            {links.map(x => (
              <button className={page === x ? 'active' : ''} key={x} onClick={() => { go(x); setOpen(false) }}>
                {c[x]}
              </button>
            ))}
          </div>
          <div className="supaste-actions">
            <div className="lang-pill">
              <img src={flags[lang]} alt={lang} className="lang-flag" />
              <select value={lang} onChange={e => setLang(e.target.value as Lang)}>
                <option value="en">EN</option>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
              </select>
            </div>
            <button className="supaste-cta-btn" onClick={() => go('contact')}>
              {c.contact} <ArrowRight size={14} />
            </button>
            <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Hero({ page, lang }: { page: Page; lang: Lang }) {
  const c = copy[lang]
  const title = page === 'home' ? c.hero : c[page]
  const text = page === 'home' ? c.aboutText : 'Official Portal of the Academic Lyceum of Andijan State University.'
  return (
    <section className={`page-hero ${page === 'home' ? 'home-hero' : ''}`}>
      <div className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        <p className="eyebrow light">{page === 'home' ? 'Academic Lyceum of Andijan State University' : `ALASU / ${c[page]}`}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {page === 'home' && (
          <div className="hero-actions">
            <a className="button button-light" href="#start">{c.explore} <ArrowRight size={15} /></a>
            <button className="hero-text-button" onClick={() => document.getElementById('admissions')?.scrollIntoView()}>{c.info} <ArrowRight size={15} /></button>
          </div>
        )}
      </div>
    </section>
  )
}

function Journey({ page, go, lang }: { page: Page; go: (x: Page) => void; lang: Lang }) {
  const c = copy[lang], i = order.indexOf(page), next = order[i + 1], prev = order[i - 1]
  return (
    <div className="page-journey container">
      <div>{prev && <button onClick={() => go(prev)}><ArrowLeft size={15} />{c.previous}: {c[prev]}</button>}</div>
      <div className="journey-progress"><span>{String(i + 1).padStart(2, '0')}</span><div><i style={{ width: `${((i + 1) / order.length) * 100}%` }} /></div><small>{String(order.length).padStart(2, '0')}</small></div>
      <div>{next && <button onClick={() => go(next)}>{c.next}: {c[next]} <ArrowRight size={15} /></button>}</div>
    </div>
  )
}

function Home({ lang, go }: { lang: Lang; go: (x: Page) => void }) {
  const c = copy[lang]
  return (
    <>
      <Hero page="home" lang={lang} />
      <div id="start" />
      
      {/* 1. Statistics Bar */}
      <section className="container">
        <div className="stat-grid-4">
          {lyceumStats.map(s => (
            <div className="stat-card" key={s.label}>
              <strong>{s.value}</strong>
              <b>{s.label}</b>
              <p>{s.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Director's Welcome Section */}
      <section className="container">
        <div className="director-section">
          <div className="director-grid">
            <div className="director-img-wrap">
              <img src={facultyMembers[0].img} alt="Dr. Alisher Toshmatov" />
            </div>
            <div className="director-content">
              <p className="eyebrow light">DIRECTOR'S WELCOME</p>
              <blockquote>
                "At ALASU, we don't just teach subjects — we build rigorous analytical minds, foster scientific curiosity, and prepare Uzbekistan's next generation of leaders to excel at top universities worldwide."
              </blockquote>
              <div className="director-meta">
                <b>Dr. Alisher Toshmatov</b>
                <span>Director of the Academic Lyceum of Andijan State University</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academic Pathways Grid */}
      <section className="feature-band">
        <div className="container">
          <div className="band-heading">
            <div>
              <p className="eyebrow">ACADEMIC PATHWAYS</p>
              <h2>{c.programTitle}</h2>
            </div>
            <p>{c.aboutText}</p>
          </div>
          <div className="program-grid">
            {academicPrograms.map(x => (
              <button className="program-card" key={x.number} onClick={() => go('academics')}>
                <div className="card-image-wrap">
                  <img src={x.image} alt={x.name} />
                  <span className="card-tag">{x.tag}</span>
                </div>
                <div className="card-body-content">
                  <span>{x.number}</span>
                  <h3>{x.name}</h3>
                  <p>{x.shortDesc}</p>
                  <ArrowRight size={17} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Admissions Strip */}
      <section className="admission-strip" id="admissions">
        <div className="container strip-grid">
          <div>
            <p className="eyebrow light">04 / {c.admissions}</p>
            <h2>{c.admissionTitle}</h2>
          </div>
          <div>
            <p>{c.admissionText}</p>
            <a className="button button-light" href="https://my.edu.uz" target="_blank" rel="noreferrer">
              Apply via my.edu.uz <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Latest News */}
      <section className="home-news">
        <div className="container">
          <div className="band-heading">
            <div>
              <p className="eyebrow">NEWS & ANNOUNCEMENTS</p>
              <h2>Latest Stories</h2>
            </div>
            <button className="inline-link" onClick={() => go('news')}>{c.explore} <ArrowRight size={15} /></button>
          </div>
          <div className="story-grid">
            {newsArticles.slice(0, 2).map(n => (
              <article key={n.id}>
                <div className="story-image" style={{ backgroundImage: `url(${n.image})` }} />
                <p className="story-meta">{n.category.toUpperCase()} · {n.date}</p>
                <h3>{n.title}</h3>
                <p style={{ fontSize: '13px', color: '#667788', marginTop: '8px' }}>{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Contact({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const [name, setName] = useState(''), [phone, setPhone] = useState(''), [topic, setTopic] = useState(''), [message, setMessage] = useState(''), [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  async function submit(e: FormEvent) {
    e.preventDefault(); setStatus('sending')
    if (!supabase) { setStatus('error'); return }
    const { error } = await supabase.from('contact_requests').insert({ name, phone, topic, message })
    setStatus(error ? 'error' : 'sent')
    if (!error) { setName(''); setPhone(''); setTopic(''); setMessage('') }
  }
  return (
    <div>
      <div className="contact-form-wrap">
        <form className="contact-form" onSubmit={submit}>
          <label>Name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></label>
          <label>Phone<input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+998 90 123-45-67" /></label>
          <label>Topic<input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Admissions, academic tracks, dormitory..." /></label>
          <label>Message<textarea required value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="How can the administration assist you?" /></label>
          {status === 'sent' && <div className="form-success">{c.sent}</div>}
          {status === 'error' && <div className="form-error">{c.error}</div>}
          <button className="button button-dark" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : c.submit} <Send size={15} /></button>
        </form>
      </div>

      <div style={{ marginTop: '50px' }}>
        <h3>Administrative Contact Directory</h3>
        <div className="directory-grid">
          <div className="directory-card">
            <h4>Directorate & Executive Office</h4>
            <p>Phone: +998 74 223-45-67</p>
            <p>Email: directorate@alasu.uz</p>
            <p>Hours: Mon - Fri, 09:00 - 17:00</p>
          </div>
          <div className="directory-card">
            <h4>Admissions & Registrar Office</h4>
            <p>Phone: +998 74 223-45-68</p>
            <p>Email: qabul@alasu.uz</p>
            <p>Hours: Mon - Sat, 08:30 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Interior({ page, lang, go }: { page: Page; lang: Lang; go: (x: Page) => void }) {
  const c = copy[lang]
  return (
    <>
      <Hero page={page} lang={lang} />
      <section className="interior-body">
        <div className="container interior-grid">
          <aside>
            <span>ALASU</span>
            <b>Andijan State University</b>
            <div className="aside-rule" />
          </aside>
          <main className="interior-main">
            <h2>{c[page]}</h2>

            {/* ABOUT PAGE */}
            {page === 'about' && (
              <div>
                <p>{c.aboutText}</p>
                <div style={{ margin: '30px 0' }}>
                  <h3>Institutional Mission & Values</h3>
                  <p>The Academic Lyceum of Andijan State University (ALASU) was established under the Ministry of Higher Education, Science and Innovations of the Republic of Uzbekistan. ALASU serves as a university-preparatory institution designed to nurture talent in the Fergana Valley region.</p>
                </div>
                <div className="detail-grid">
                  <article>
                    <span>01</span>
                    <h3>Academic Excellence</h3>
                    <p>Standardized curriculum aligned with top national and international university entry criteria.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>State-of-the-Art Labs</h3>
                    <p>Modernized laboratories for physics, chemistry, biology, and high-performance computing.</p>
                  </article>
                </div>
              </div>
            )}

            {/* ACADEMICS PAGE */}
            {page === 'academics' && (
              <div>
                <p>ALASU offers three specialized 2-year university preparatory tracks:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '30px' }}>
                  {academicPrograms.map(p => (
                    <div className="program-card" key={p.id} style={{ minHeight: 'auto' }}>
                      <div className="card-image-wrap" style={{ height: '220px' }}>
                        <img src={p.image} alt={p.name} />
                        <span className="card-tag">{p.tag}</span>
                      </div>
                      <div className="card-body-content">
                        <span>PROGRAM {p.number} · {p.weeklyHours} HOURS/WEEK</span>
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        
                        <div style={{ margin: '12px 0' }}>
                          <b style={{ fontSize: '12px', color: '#102a43' }}>Core Modules:</b>
                          <div className="curriculum-chips">
                            {p.curriculum.map(item => <span className="chip" key={item}>{item}</span>)}
                          </div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#667788', marginTop: '8px' }}>
                          <b>Entrance Exam Subjects:</b> {p.examSubjects.join(' · ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PEOPLE PAGE */}
            {page === 'people' && (
              <div>
                <p>Meet the executive leadership and distinguished educators driving academic achievement at ALASU:</p>
                <div className="people-grid-showcase">
                  {facultyMembers.map(f => (
                    <div key={f.name} className="faculty-card">
                      <img src={f.img} alt={f.name} />
                      <div className="faculty-info">
                        <h4>{f.name}</h4>
                        <span>{f.role}</span>
                        <small style={{ color: '#0b78c8', display: 'block', marginBottom: '6px' }}>{f.degree}</small>
                        <p>{f.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMISSIONS PAGE */}
            {page === 'admissions' && (
              <div>
                <p>Official guide for admission to the Academic Lyceum of Andijan State University:</p>
                
                <h3 style={{ marginTop: '30px' }}>Admissions Roadmap 2026</h3>
                <div className="admissions-steps-grid">
                  <div className="step-card">
                    <div className="step-number">1</div>
                    <h4>Online Registration</h4>
                    <p>Register online via <b>my.edu.uz</b> state portal between June 20 and July 20.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">2</div>
                    <h4>Test Ticket Issuance</h4>
                    <p>Download your official examination permit with test location and time details.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">3</div>
                    <h4>State Entrance Exam</h4>
                    <p>Complete standardized testing conducted by the Knowledge and Skills Assessment Agency.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">4</div>
                    <h4>Enrollment</h4>
                    <p>Results published. Successful candidates submit physical documents to ALASU registrar.</p>
                  </div>
                </div>

                <div className="action-card" style={{ marginTop: '40px' }}>
                  <div>
                    <b>Official Application Portal (my.edu.uz)</b>
                    <p>Submit your application online directly to ALASU through the government portal.</p>
                  </div>
                  <a className="button button-dark" href="https://my.edu.uz" target="_blank" rel="noreferrer">
                    Launch my.edu.uz <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            )}

            {/* NEWS PAGE */}
            {page === 'news' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {newsArticles.map(n => (
                  <article key={n.id} style={{ border: '1px solid #dce4ea', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                    <img src={n.image} alt={n.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                    <div style={{ padding: '24px' }}>
                      <span style={{ fontSize: '11px', color: '#0b78c8', fontWeight: '700', textTransform: 'uppercase' }}>{n.category} · {n.date}</span>
                      <h3 style={{ fontSize: '24px', margin: '8px 0 12px', color: '#102a43' }}>{n.title}</h3>
                      <p style={{ fontSize: '14px', color: '#667788', lineHeight: '1.7' }}>{n.content}</p>
                      <small style={{ display: 'block', marginTop: '14px', color: '#82909c' }}>Author: {n.author} · {n.readTime}</small>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ACHIEVEMENTS PAGE */}
            {page === 'achievements' && (
              <div>
                <p>Record of excellence in national science Olympiads and university admissions:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                  {achievementsList.map(a => (
                    <div key={a.id} style={{ padding: '24px', border: '1px solid #dce4ea', borderRadius: '12px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: '#0b78c8', fontWeight: '700' }}>{a.year} · {a.category}</span>
                        <h4 style={{ fontSize: '18px', margin: '4px 0 6px', color: '#102a43' }}>{a.title}</h4>
                        <p style={{ fontSize: '13px', color: '#667788', margin: 0 }}>{a.description}</p>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '130px' }}>
                        <strong style={{ fontSize: '28px', color: '#0b78c8', display: 'block' }}>{a.metric}</strong>
                        <small style={{ fontSize: '10px', color: '#82909c' }}>{a.metricLabel}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY PAGE */}
            {page === 'gallery' && (
              <div>
                <p>Campus life, laboratory facilities, and event gallery:</p>
                <div className="gallery-grid-6">
                  {galleryImages.map((g, idx) => (
                    <div key={idx} className="gallery-item">
                      <img src={g.url} alt={g.title} />
                      <div className="gallery-caption">{g.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ PAGE */}
            {page === 'faq' && (
              <div className="faq-list">
                {faqItems.map(f => (
                  <details key={f.id}>
                    <summary>
                      <span>[{f.category}] {f.question}</span>
                      <ChevronDown size={16} />
                    </summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            )}

            {/* CONTACT PAGE */}
            {page === 'contact' && <Contact lang={lang} />}
          </main>
        </div>
      </section>
      <Journey page={page} go={go} lang={lang} />
    </>
  )
}

export default function SiteApp() {
  const [page, go] = useRouter()
  const [lang, setLang] = useState<Lang>('en')
  const c = copy[lang]
  useEffect(() => { document.title = `${c[page]} — ALASU` }, [page, lang, c])

  return (
    <div className="site">
      <Header {...{ lang, setLang, page, go }} />
      {page === 'home' ? <Home {...{ lang, go }} /> : <Interior {...{ page, lang, go }} />}
      <footer className="site-footer">
        <div className="container footer-grid-fixed">
          <div>
            <div className="footer-brand-wrap">
              <img src="/alasu-logo.png" alt="ALASU Logo" className="brand-logo" />
              <div>
                <b>ALASU</b>
                <small>Academic Lyceum of Andijan State University</small>
              </div>
            </div>
            <p className="footer-desc">Learning with purpose. Growing with ambition. Preparing motivated students for top university admission.</p>
          </div>
          <div className="footer-links">
            <span className="footer-col-title">Explore</span>
            {(['about', 'academics', 'people', 'news', 'gallery'] as Page[]).map(x => <button key={x} onClick={() => go(x)}>{c[x]}</button>)}
          </div>
          <div className="footer-links">
            <span className="footer-col-title">Admissions</span>
            <button onClick={() => go('admissions')}>{c.admissions}</button>
            <button onClick={() => go('contact')}>{c.contact}</button>
            <a href="https://my.edu.uz" target="_blank" rel="noreferrer">my.edu.uz ↗</a>
          </div>
          <div className="footer-contact-info">
            <span className="footer-col-title">Andijan, Uzbekistan</span>
            <p>Academic Lyceum of<br />Andijan State University</p>
            <p>Phone: +998 74 223-45-67</p>
            <p>Email: info@alasu.uz</p>
          </div>
        </div>
        <div className="container footer-bottom-fixed">
          <span>© 2026 Academic Lyceum of Andijan State University (ALASU). All rights reserved.</span>
          <span>Andijan, Uzbekistan</span>
        </div>
      </footer>
    </div>
  )
}
