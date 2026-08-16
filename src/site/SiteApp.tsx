import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, Globe2, Menu, Send, X } from 'lucide-react'
import { academicPrograms } from '../data/site'
import { supabase } from '../lib/supabase'
import './site.css'

type Lang='en'|'uz'|'ru'
type Page='home'|'about'|'academics'|'people'|'admissions'|'news'|'achievements'|'gallery'|'faq'|'contact'
const order:Page[]=['home','about','academics','people','admissions','news','achievements','gallery','faq','contact']
const copy={en:{home:'Home',about:'About',academics:'Academics',people:'People',admissions:'Admissions',news:'News',achievements:'Achievements',gallery:'Gallery',faq:'FAQ',contact:'Contact',hero:'A place to learn. A place to become.',aboutTitle:'An academic community built for the next generation.',aboutText:'Academic Lyceum of Andijan State University gives motivated students a rigorous environment in which to learn, think independently, and prepare for university and life beyond it.',programTitle:'Strong foundations for ambitious futures.',admissionTitle:'Admissions at ALASU',admissionText:'Applications to academic lyceums are submitted through my.edu.uz. ALASU provides information and guidance through its administration.',peopleTitle:'People make the institution.',peopleText:'Our leadership, teachers, and students are the heart of ALASU.',contactTitle:'Talk to ALASU',explore:'Explore',info:'Admissions information',official:'Official application portal',next:'Continue exploring',previous:'Previous',submit:'Send request',sent:'Thank you. Your request has been received.',error:'Something went wrong. Please try again.'},uz:{home:'Bosh sahifa',about:'Biz haqimizda',academics:'Ta’lim',people:'Jamoa',admissions:'Qabul',news:'Yangiliklar',achievements:'Yutuqlar',gallery:'Galereya',faq:'FAQ',contact:'Aloqa',hero:'O‘rganish uchun. Kelajak uchun.',aboutTitle:'Kelajak avlodi uchun yaratilgan akademik hamjamiyat.',aboutText:'Andijon davlat universiteti akademik litseyi bilim olish, mustaqil fikrlash va universitetga tayyorlanish uchun kuchli akademik muhit yaratadi.',programTitle:'Katta maqsadlar uchun mustahkam poydevor.',admissionTitle:'ALASUga qabul',admissionText:'Akademik litseylarga arizalar my.edu.uz orqali topshiriladi. ALASU ma’muriyati ma’lumot va yo‘l-yo‘riq beradi.',peopleTitle:'Muassasani odamlar yaratadi.',peopleText:'Rahbariyat, o‘qituvchilar va o‘quvchilar ALASUning yuragi.',contactTitle:'ALASU bilan bog‘laning',explore:'Ko‘rish',info:'Qabul haqida ma’lumot',official:'Rasmiy ariza portali',next:'Ko‘proq ko‘rish',previous:'Orqaga',submit:'So‘rov yuborish',sent:'Rahmat. So‘rovingiz qabul qilindi.',error:'Xatolik yuz berdi. Qayta urinib ko‘ring.'},ru:{home:'Главная',about:'О лицее',academics:'Обучение',people:'Команда',admissions:'Поступление',news:'Новости',achievements:'Достижения',gallery:'Галерея',faq:'FAQ',contact:'Контакты',hero:'Место, где учатся. Место, где растут.',aboutTitle:'Академическое сообщество для нового поколения.',aboutText:'Академический лицей Андижанского государственного университета создаёт сильную среду для обучения, самостоятельного мышления и подготовки к университету.',programTitle:'Сильная основа для амбициозного будущего.',admissionTitle:'Поступление в ALASU',admissionText:'Заявления в академические лицеи подаются через my.edu.uz. Администрация ALASU предоставляет информацию и консультации.',peopleTitle:'Люди создают институт.',peopleText:'Руководство, преподаватели и ученики — сердце ALASU.',contactTitle:'Связаться с ALASU',explore:'Подробнее',info:'Информация о поступлении',official:'Официальный портал подачи',next:'Продолжить знакомство',previous:'Назад',submit:'Отправить запрос',sent:'Спасибо. Ваш запрос получен.',error:'Произошла ошибка. Попробуйте ещё раз.'}} as const
const routes:Record<string,Page>={'/':'home','/about':'about','/academics':'academics','/people':'people','/admissions':'admissions','/news':'news','/achievements':'achievements','/gallery':'gallery','/faq':'faq','/contact':'contact'}

function useRouter(){const[p,setP]=useState(routes[location.pathname]??'home');useEffect(()=>{const f=()=>setP(routes[location.pathname]??'home');addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);return[p,(x:Page)=>{history.pushState({},'',x==='home'?'/':`/${x}`);setP(x);scrollTo(0,0)}] as const}

const flags:Record<Lang,string>={en:'/flags/en.svg',uz:'/flags/uz.svg',ru:'/flags/ru.svg'}

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=85', title: 'Advanced Robotics & Physics Laboratory' },
  { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85', title: 'Lyceum Central Library & Study Commons' },
  { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=85', title: 'Main Academic Building & Campus Grounds' },
  { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85', title: 'National Olympiad Ceremony & Award Winners' },
  { url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=85', title: 'Student Sports Complex & Athletics Center' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85', title: 'Computer Science & Software Engineering Hub' },
]

const facultyMembers = [
  { name: 'Dr. Alisher Toshmatov', title: 'Director & Executive Leadership', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85', bio: 'Ph.D. in Physics & Mathematics, leading academic innovation and university partnerships at ALASU.' },
  { name: 'Prof. Nigora Umarova', title: 'Dean of Exact & Natural Sciences', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85', bio: '20+ years of teaching excellence in Chemistry & Advanced Mathematics.' },
  { name: 'Jasur Karimov', title: 'President of Student Union & Olympiad Lead', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85', bio: 'National Mathematics Olympiad Gold Medalist & Student Representative.' },
]

function Header({lang,setLang,page,go}:{lang:Lang;setLang:(x:Lang)=>void;page:Page;go:(x:Page)=>void}){
  const c=copy[lang],[open,setOpen]=useState(false);
  const links:Page[]=['about','academics','people','admissions','news'];
  return (
    <header className="supaste-header">
      <div className="container">
        <div className="supaste-nav-bar">
          <button className="supaste-brand" onClick={()=>go('home')}>
            <img src="/alasu-logo.png" alt="ALASU Logo" className="brand-logo" />
            <div className="brand-copy">
              <b>ALASU</b>
              <small>Academic Lyceum</small>
            </div>
          </button>
          <div className={`supaste-nav-links ${open?'is-open':''}`}>
            {[...(['home'] as Page[]),...links].map(x=>(
              <button className={page===x?'active':''} key={x} onClick={()=>{go(x);setOpen(false)}}>
                {c[x]}
              </button>
            ))}
          </div>
          <div className="supaste-actions">
            <div className="lang-pill">
              <img src={flags[lang]} alt={lang} className="lang-flag"/>
              <select value={lang} onChange={e=>setLang(e.target.value as Lang)}>
                <option value="en">EN</option>
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
              </select>
            </div>
            <button className="supaste-cta-btn" onClick={()=>go('contact')}>
              {c.contact}<ArrowRight size={14}/>
            </button>
            <button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
              {open?<X size={20}/>:<Menu size={20}/>}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Hero({page,lang}:{page:Page;lang:Lang}){
  const c=copy[lang];
  const title=page==='home'?c.hero:c[page];
  const text=page==='home'?c.aboutText:page==='about'?c.aboutText:page==='academics'?c.aboutText:page==='people'?c.peopleText:page==='admissions'?c.admissionText:'Stories, announcements, and moments from ALASU.';
  return (
    <section className={`page-hero ${page==='home'?'home-hero':''}`}>
      <div className="page-hero-image"/>
      <div className="page-hero-shade"/>
      <div className="container page-hero-content">
        <p className="eyebrow light">{page==='home'?'Academic Lyceum of Andijan State University':c[page]}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {page==='home'&&<div className="hero-actions"><a className="button button-light" href="#start">{c.explore}<ArrowRight size={15}/></a><button className="hero-text-button" onClick={()=>document.getElementById('admissions')?.scrollIntoView()}>{c.info} <ArrowRight size={15}/></button></div>}
      </div>
    </section>
  )
}

function Journey({page,go,lang}:{page:Page;go:(x:Page)=>void;lang:Lang}){
  const c=copy[lang],i=order.indexOf(page),next=order[i+1],prev=order[i-1];
  return (
    <div className="page-journey container">
      <div>{prev&&<button onClick={()=>go(prev)}><ArrowLeft size={15}/>{c.previous}: {c[prev]}</button>}</div>
      <div className="journey-progress"><span>{String(i+1).padStart(2,'0')}</span><div><i style={{width:`${((i+1)/order.length)*100}%`}}/></div><small>{String(order.length).padStart(2,'0')}</small></div>
      <div>{next&&<button onClick={()=>go(next)}>{c.next}: {c[next]} <ArrowRight size={15}/></button>}</div>
    </div>
  )
}

function Home({lang,go}:{lang:Lang;go:(x:Page)=>void}){
  const c=copy[lang];
  return (
    <>
      <Hero page="home" lang={lang}/>
      <div id="start"/>
      <section className="statement">
        <div className="container statement-grid">
          <span className="section-index">01</span>
          <div>
            <p className="eyebrow">{c.about}</p>
            <h2>{c.aboutTitle}</h2>
            <p>{c.aboutText}</p>
            <button className="inline-link" onClick={()=>go('about')}>{c.explore}<ArrowRight size={15}/></button>
          </div>
        </div>
      </section>

      <section className="feature-band">
        <div className="container">
          <div className="band-heading">
            <div>
              <p className="eyebrow">02 / {c.academics}</p>
              <h2>{c.programTitle}</h2>
            </div>
            <p>{c.aboutText}</p>
          </div>
          <div className="program-grid">
            {academicPrograms.map(x=>(
              <button className="program-card" key={x.number} onClick={()=>go('academics')}>
                <div className="card-image-wrap">
                  <img src={x.image} alt={x.name} />
                  <span className="card-tag">{x.tag}</span>
                </div>
                <div className="card-body-content">
                  <span>{x.number}</span>
                  <h3>{x.name}</h3>
                  <p>{x.description}</p>
                  <ArrowRight size={17}/>
                </div>
              </button>
            ))}
          </div>
          <div className="section-next">
            <button className="inline-link" onClick={()=>go('academics')}>{c.next}: {c.academics}<ArrowRight size={15}/></button>
          </div>
        </div>
      </section>

      <section className="people-preview">
        <div className="people-photo"/>
        <div className="people-panel">
          <p className="eyebrow light">03 / {c.people}</p>
          <h2>{c.peopleTitle}</h2>
          <p>{c.peopleText}</p>
          <button className="button button-light" onClick={()=>go('people')}>{c.explore}<ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="admission-strip" id="admissions">
        <div className="container strip-grid">
          <div>
            <p className="eyebrow light">04 / {c.admissions}</p>
            <h2>{c.admissionTitle}</h2>
          </div>
          <div>
            <p>{c.admissionText}</p>
            <button className="button button-light" onClick={()=>go('admissions')}>{c.info}<ArrowRight size={16}/></button>
          </div>
        </div>
      </section>

      <section className="home-news">
        <div className="container">
          <div className="band-heading">
            <div>
              <p className="eyebrow">05 / {c.news}</p>
              <h2>{c.news}</h2>
            </div>
            <button className="inline-link" onClick={()=>go('news')}>{c.explore}<ArrowRight size={15}/></button>
          </div>
          <div className="story-grid">
            <article>
              <div className="story-image story-one"/>
              <p className="story-meta">ALASU · 2026</p>
              <h3>Academic life, achievements, and the people behind them.</h3>
            </article>
            <article>
              <div className="story-image story-two"/>
              <p className="story-meta">ALASU · COMMUNITY</p>
              <h3>A closer look at life inside our academic community.</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div className="container">
          <p className="eyebrow light">ALASU</p>
          <h2>Keep exploring the institution.</h2>
          <button className="button button-light" onClick={()=>go('about')}>{c.next}: {c.about}<ArrowRight size={16}/></button>
        </div>
      </section>
    </>
  )
}

function Contact({lang}:{lang:Lang}){
  const c=copy[lang];
  const[name,setName]=useState(''),[phone,setPhone]=useState(''),[topic,setTopic]=useState(''),[message,setMessage]=useState(''),[status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(e:FormEvent){
    e.preventDefault();setStatus('sending');
    if(!supabase){setStatus('error');return}
    const{error}=await supabase.from('contact_requests').insert({name,phone,topic,message});
    setStatus(error?'error':'sent');
    if(!error){setName('');setPhone('');setTopic('');setMessage('')}
  }
  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={submit}>
        <label>Name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>
        <label>Phone<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+998"/></label>
        <label>Topic<input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Admissions, programs, general question…"/></label>
        <label>Message<textarea required value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder="How can we help?"/></label>
        {status==='sent'&&<div className="form-success">{c.sent}</div>}
        {status==='error'&&<div className="form-error">{c.error}</div>}
        <button className="button button-dark" disabled={status==='sending'}>{status==='sending'?'Sending…':c.submit}<Send size={15}/></button>
      </form>
    </div>
  )
}

function Interior({page,lang,go}:{page:Page;lang:Lang;go:(x:Page)=>void}){
  const c=copy[lang];
  const generic='Stories, information, and people that make up the ALASU academic community.';
  return (
    <>
      <Hero page={page} lang={lang}/>
      <section className="interior-body">
        <div className="container interior-grid">
          <aside>
            <span>ALASU</span>
            <b>Andijan State University</b>
            <div className="aside-rule"/>
          </aside>
          <main className="interior-main">
            <h2>{page==='about'?c.aboutTitle:page==='academics'?c.programTitle:page==='people'?c.peopleTitle:page==='admissions'?c.admissionTitle:page==='contact'?c.contactTitle:c[page]}</h2>
            <p>{page==='about'?c.aboutText:page==='academics'?c.aboutText:page==='people'?c.peopleText:page==='admissions'?c.admissionText:generic}</p>

            {page==='academics'&&(
              <div className="program-grid" style={{marginTop:'30px'}}>
                {academicPrograms.map(x=>(
                  <article className="program-card" key={x.number}>
                    <div className="card-image-wrap">
                      <img src={x.image} alt={x.name} />
                      <span className="card-tag">{x.tag}</span>
                    </div>
                    <div className="card-body-content">
                      <span>{x.number}</span>
                      <h3>{x.name}</h3>
                      <p>{x.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {page==='people'&&(
              <div className="people-grid-showcase">
                {facultyMembers.map(f=>(
                  <div key={f.name} className="faculty-card">
                    <img src={f.img} alt={f.name} />
                    <div className="faculty-info">
                      <h4>{f.name}</h4>
                      <span>{f.title}</span>
                      <p>{f.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {page==='admissions'&&(
              <div className="action-card">
                <div>
                  <b>{c.official}</b>
                  <p>Applications are submitted through my.edu.uz. ALASU administration can answer questions.</p>
                </div>
                <a className="button button-dark" href="https://my.edu.uz" target="_blank" rel="noreferrer">my.edu.uz <ArrowRight size={15}/></a>
              </div>
            )}

            {page==='contact'&&<Contact lang={lang}/>}

            {page==='faq'&&(
              <div className="faq-list">
                {['How does admission work?','Where are applications submitted?','How can I contact the administration?','What programs are available?'].map((q,i)=>(
                  <details key={q}>
                    <summary>{q}<ChevronDown size={16}/></summary>
                    <p>{i===1?'Official applications are submitted through my.edu.uz. Other questions can be sent to ALASU administration.':'This information will be maintained through the ALASU content management system.'}</p>
                  </details>
                ))}
              </div>
            )}

            {page==='news'&&(
              <div className="story-grid" style={{marginTop:'30px'}}>
                <article>
                  <div className="story-image story-one"/>
                  <p className="story-meta">ALASU · 2026</p>
                  <h3>Academic life, achievements, and the people behind them.</h3>
                </article>
                <article>
                  <div className="story-image story-two"/>
                  <p className="story-meta">ALASU · COMMUNITY</p>
                  <h3>A closer look at life inside our academic community.</h3>
                </article>
              </div>
            )}

            {page==='gallery'&&(
              <div className="gallery-grid-6">
                {galleryImages.map((g,idx)=>(
                  <div key={idx} className="gallery-item">
                    <img src={g.url} alt={g.title} />
                    <div className="gallery-caption">{g.title}</div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
      <Journey page={page} go={go} lang={lang}/>
    </>
  )
}

export default function SiteApp(){
  const[page,go]=useRouter();
  const[lang,setLang]=useState<Lang>('en');
  const c=copy[lang];
  useEffect(()=>{document.title=`${c[page]} — ALASU`},[page,lang,c]);
  return (
    <div className="site">
      <Header {...{lang,setLang,page,go}}/>
      {page==='home'?<Home {...{lang,go}}/>:<Interior {...{page,lang,go}}/>}
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
            {(['about','academics','people','news','gallery'] as Page[]).map(x=><button key={x} onClick={()=>go(x)}>{c[x]}</button>)}
          </div>
          <div className="footer-links">
            <span className="footer-col-title">Admissions</span>
            <button onClick={()=>go('admissions')}>{c.admissions}</button>
            <button onClick={()=>go('contact')}>{c.contact}</button>
            <a href="https://my.edu.uz" target="_blank" rel="noreferrer">my.edu.uz ↗</a>
          </div>
          <div className="footer-contact-info">
            <span className="footer-col-title">Andijan, Uzbekistan</span>
            <p>Academic Lyceum of<br/>Andijan State University</p>
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
