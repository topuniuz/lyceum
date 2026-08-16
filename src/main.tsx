import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Globe2,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import './styles.css'

type Language = 'EN' | 'UZ' | 'RU'

const nav = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'People', href: '#people' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'News', href: '#news' },
]

const copy: Record<Language, Record<string, string>> = {
  EN: {
    eyebrow: 'Academic Lyceum of Andijan State University',
    title: 'A place to learn.\nA place to become.',
    intro: 'A rigorous academic environment for ambitious students preparing for university, leadership, and the world beyond.',
    explore: 'Explore ALASU',
    admissions: 'Admissions information',
    aboutKicker: 'The ALASU experience',
    aboutTitle: 'Built around curiosity, discipline, and possibility.',
    aboutText: 'ALASU brings together dedicated teachers, motivated students, and a culture that takes learning seriously. Our community is designed to help young people discover what they can do — and give them the foundation to do it well.',
    programs: 'Academic programs',
    programsTitle: 'Strong foundations for ambitious futures.',
    programsText: 'Focused academic pathways, a demanding curriculum, and an environment where students are encouraged to think beyond the classroom.',
    people: 'Our people',
    peopleTitle: 'Teachers who know that education is personal.',
    peopleText: 'Meet the educators and leadership team who shape the academic life of ALASU.',
    admissionTitle: 'Thinking about joining ALASU?',
    admissionText: 'Official applications for academic lyceums are submitted through my.edu.uz. If you need information about programs, admissions, or the lyceum, our administration can help.',
    contact: 'Contact the administration',
    latest: 'Latest from ALASU',
    newsTitle: 'News, achievements, and life at the lyceum.',
  },
  UZ: {
    eyebrow: 'Andijon davlat universiteti akademik litseyi',
    title: 'O‘rganish uchun.\nKelajak uchun.',
    intro: 'Universitet, yetakchilik va kelajak sari intilayotgan yoshlar uchun kuchli akademik muhit.',
    explore: 'ALASUni o‘rganish',
    admissions: 'Qabul haqida ma’lumot',
    aboutKicker: 'ALASU tajribasi',
    aboutTitle: 'Qiziqish, intizom va imkoniyat atrofida qurilgan.',
    aboutText: 'ALASU fidoyi o‘qituvchilar, maqsadli o‘quvchilar va ta’limga jiddiy yondashadigan muhitni birlashtiradi.',
    programs: 'Akademik dasturlar',
    programsTitle: 'Katta maqsadlar uchun mustahkam poydevor.',
    programsText: 'Yo‘naltirilgan akademik dasturlar, talabchan o‘quv muhiti va sinfdan tashqarida fikrlashga undaydigan ta’lim.',
    people: 'Jamoamiz',
    peopleTitle: 'Ta’limni shaxsiy jarayon deb biladigan ustozlar.',
    peopleText: 'ALASUning akademik hayotini shakllantiradigan o‘qituvchilar va rahbariyat bilan tanishing.',
    admissionTitle: 'ALASUga qo‘shilishni o‘ylayapsizmi?',
    admissionText: 'Akademik litseylarga rasmiy arizalar my.edu.uz orqali topshiriladi. Dasturlar va qabul haqida ma’lumot olish uchun ma’muriyatimizga murojaat qilishingiz mumkin.',
    contact: 'Ma’muriyat bilan bog‘lanish',
    latest: 'ALASUdan yangiliklar',
    newsTitle: 'Yangiliklar, yutuqlar va litsey hayoti.',
  },
  RU: {
    eyebrow: 'Академический лицей Андижанского государственного университета',
    title: 'Место, где учатся.\nМесто, где растут.',
    intro: 'Сильная академическая среда для мотивированных учеников, готовящихся к университету, лидерству и будущему.',
    explore: 'Об ALASU',
    admissions: 'Информация о поступлении',
    aboutKicker: 'Опыт ALASU',
    aboutTitle: 'Среда, построенная на любознательности, дисциплине и возможностях.',
    aboutText: 'ALASU объединяет преданных своему делу преподавателей, мотивированных учеников и культуру, в которой к образованию относятся серьёзно.',
    programs: 'Академические программы',
    programsTitle: 'Сильная основа для амбициозного будущего.',
    programsText: 'Сфокусированные образовательные направления, требовательная программа и среда, которая учит мыслить шире класса.',
    people: 'Наши люди',
    peopleTitle: 'Преподаватели, для которых образование — это личный путь.',
    peopleText: 'Познакомьтесь с преподавателями и руководством, которые формируют академическую жизнь ALASU.',
    admissionTitle: 'Думаете о поступлении в ALASU?',
    admissionText: 'Официальные заявления в академические лицеи подаются через my.edu.uz. По вопросам программ и поступления можно обратиться к администрации.',
    contact: 'Связаться с администрацией',
    latest: 'Последние новости ALASU',
    newsTitle: 'Новости, достижения и жизнь лицея.',
  },
}

function App() {
  const [language, setLanguage] = useState<Language>('EN')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="ALASU home">
            <span className="brand-mark">A</span>
            <span>
              <strong>ALASU</strong>
              <small>Academic Lyceum</small>
            </span>
          </a>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {nav.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <div className="nav-actions">
            <div className="language-switcher" aria-label="Language selector">
              <Globe2 size={15} />
              <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
                <option>EN</option>
                <option>UZ</option>
                <option>RU</option>
              </select>
            </div>
            <a className="nav-cta" href="#admissions">Admissions <ArrowRight size={15} /></a>
            <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow light">{t.eyebrow}</p>
              <h1>{t.title.split('\n').map((line, i) => <span key={i}>{line}</span>)}</h1>
              <p className="hero-intro">{t.intro}</p>
              <div className="hero-buttons">
                <a className="button button-light" href="#about">{t.explore} <ArrowRight size={17} /></a>
                <a className="text-link light-link" href="#admissions">{t.admissions} <ChevronRight size={18} /></a>
              </div>
            </div>
            <div className="hero-note">
              <span>01</span>
              <div><b>Andijan, Uzbekistan</b><small>Academic community since 2009</small></div>
            </div>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="container split-section">
            <div className="section-label"><span>01</span><span>{t.aboutKicker}</span></div>
            <div className="section-content">
              <h2>{t.aboutTitle}</h2>
              <p>{t.aboutText}</p>
              <a className="underlined-link" href="#people">Discover our community <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="programs-section" id="academics">
          <div className="container">
            <div className="section-heading-row">
              <div><p className="eyebrow">02 / {t.programs}</p><h2>{t.programsTitle}</h2></div>
              <p>{t.programsText}</p>
            </div>
            <div className="program-grid">
              {['Exact Sciences', 'Natural Sciences', 'Languages & Humanities'].map((name, i) => (
                <a className="program-card" href="#contact" key={name}>
                  <span className="program-number">0{i + 1}</span>
                  <h3>{name}</h3>
                  <p>Explore the academic pathway and learning environment.</p>
                  <ArrowRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="people-section" id="people">
          <div className="container people-layout">
            <div className="people-image" />
            <div className="people-copy">
              <p className="eyebrow">03 / {t.people}</p>
              <h2>{t.peopleTitle}</h2>
              <p>{t.peopleText}</p>
              <div className="stat-row"><div><strong>01</strong><span>Leadership</span></div><div><strong>02</strong><span>Faculty</span></div><div><strong>03</strong><span>Students</span></div></div>
              <a className="button button-dark" href="#contact">Meet the community <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="admission-section" id="admissions">
          <div className="container admission-inner">
            <div><p className="eyebrow light">04 / Admissions</p><h2>{t.admissionTitle}</h2></div>
            <div><p>{t.admissionText}</p><a className="button button-light" href="#contact">{t.contact} <ArrowRight size={17} /></a></div>
          </div>
        </section>

        <section className="news-section" id="news">
          <div className="container">
            <div className="section-heading-row news-heading"><div><p className="eyebrow">05 / {t.latest}</p><h2>{t.newsTitle}</h2></div><a className="underlined-link" href="#news">View all news <ArrowRight size={16} /></a></div>
            <div className="news-grid">
              <article className="news-feature"><div className="news-image one" /><div className="news-meta">ALASU · 2026</div><h3>Academic life, achievements, and the people behind them.</h3><a href="#contact">Read story <ArrowRight size={15} /></a></article>
              <article className="news-feature"><div className="news-image two" /><div className="news-meta">ALASU · COMMUNITY</div><h3>A closer look at life inside our academic community.</h3><a href="#contact">Read story <ArrowRight size={15} /></a></article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div><p className="eyebrow">06 / Contact</p><h2>Questions?<br /><em>Let's talk.</em></h2><p className="contact-lead">For admissions information, school questions, partnerships, or general enquiries, contact the ALASU administration.</p></div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <label>Name<input placeholder="Your name" /></label>
              <label>Phone<input placeholder="+998" /></label>
              <label>Message<textarea placeholder="How can we help?" rows={4} /></label>
              <button className="button button-dark" type="submit">Send request <ArrowRight size={17} /></button>
              <p className="form-note"><Phone size={14} /> Your request will be received by the ALASU administration.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><a className="brand footer-brand" href="#top"><span className="brand-mark">A</span><span><strong>ALASU</strong><small>Academic Lyceum of Andijan State University</small></span></a><p>Learning with purpose. Growing with ambition.</p></div>
          <div><span className="footer-title">Explore</span><a href="#about">About</a><a href="#academics">Academics</a><a href="#people">People</a><a href="#news">News</a></div>
          <div><span className="footer-title">Admissions</span><a href="#admissions">Information</a><a href="#contact">Contact administration</a><a href="https://my.edu.uz" target="_blank" rel="noreferrer">my.edu.uz ↗</a></div>
          <div><span className="footer-title">Andijan</span><p>Academic Lyceum of<br />Andijan State University</p><a href="#contact">Get in touch →</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 ALASU. All rights reserved.</span><span>Andijan, Uzbekistan</span></div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
