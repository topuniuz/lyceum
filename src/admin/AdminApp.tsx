import { useEffect, useState } from 'react'
import { 
  Award, Bell, BookOpen, CheckCircle2, FileText, Globe2, 
  GraduationCap, HelpCircle, Image, LayoutDashboard, Link2, LogOut, 
  Newspaper, Phone, Plus, Search, Settings, Shield, Users 
} from 'lucide-react'
import { supabase } from '../lib/supabase'

type RequestRow = { id: string; name: string; phone: string; topic: string | null; message: string | null; status: 'new'|'contacted'|'resolved'; created_at: string }

type Section = 
  | 'Dashboard'
  | 'Homepage'
  | 'About'
  | 'Leadership'
  | 'Teachers'
  | 'Students'
  | 'Academic Programs'
  | 'News'
  | 'Achievements'
  | 'FAQ'
  | 'Contact Requests'
  | 'Gallery'
  | 'EN / UZ / RU'
  | 'Contact information'
  | 'Social links'
  | 'SEO'

const menuGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard' as Section, icon: LayoutDashboard },
    ]
  },
  {
    title: 'Website Content',
    items: [
      { name: 'Homepage' as Section, icon: FileText },
      { name: 'About' as Section, icon: BookOpen },
      { name: 'Leadership' as Section, icon: Shield },
      { name: 'Teachers' as Section, icon: Users },
      { name: 'Students' as Section, icon: GraduationCap },
      { name: 'Academic Programs' as Section, icon: Award },
    ]
  },
  {
    title: 'Communications',
    items: [
      { name: 'News' as Section, icon: Newspaper },
      { name: 'Achievements' as Section, icon: CheckCircle2 },
      { name: 'FAQ' as Section, icon: HelpCircle },
      { name: 'Contact Requests' as Section, icon: Bell, hasBadge: true },
    ]
  },
  {
    title: 'Media',
    items: [
      { name: 'Gallery' as Section, icon: Image },
    ]
  },
  {
    title: 'Settings',
    items: [
      { name: 'EN / UZ / RU' as Section, icon: Globe2 },
      { name: 'Contact information' as Section, icon: Phone },
      { name: 'Social links' as Section, icon: Link2 },
      { name: 'SEO' as Section, icon: Settings },
    ]
  }
]

export default function AdminApp() {
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('')
  const [section, setSection] = useState<Section>('Dashboard'); const [requests, setRequests] = useState<RequestRow[]>([]); const [loading, setLoading] = useState(false)

  useEffect(() => { if (!supabase) return; supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s)); return () => data.subscription.unsubscribe() }, [])
  useEffect(() => { if (session && section === 'Contact Requests') loadRequests() }, [session, section])

  async function login(e: React.FormEvent) { e.preventDefault(); setError(''); if (!supabase) { setError('Supabase is not configured.'); return } const { data, error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setError(error.message); else setSession(data.session) }
  async function loadRequests() { if (!supabase) return; setLoading(true); const { data } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false }); setRequests((data || []) as RequestRow[]); setLoading(false) }
  async function updateStatus(id: string, status: RequestRow['status']) { if (!supabase) return; await supabase.from('contact_requests').update({ status }).eq('id', id); setRequests(rows => rows.map(r => r.id === id ? { ...r, status } : r)) }

  if (!session) return (
    <div className="admin-login">
      <div className="admin-login-card">
        <img src="/alasu-logo.png" alt="ALASU Logo" className="admin-login-logo" />
        <p className="admin-kicker">ALASU · CMS WORKSPACE</p>
        <h1>Welcome back.</h1>
        <p>Sign in to manage the ALASU platform content, media, and contact requests.</p>
        <form onSubmit={login}>
          <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" required /></label>
          <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" required /></label>
          {error && <div className="admin-error">{error}</div>}
          <button className="admin-primary">Sign in</button>
        </form>
        <a href="/" className="admin-back">← Back to alasu.uz</a>
      </div>
    </div>
  )

  const newCount = requests.filter(r => r.status === 'new').length

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          <img src="/alasu-logo.png" alt="ALASU Logo" className="brand-logo" />
          <div>
            <b>ALASU CMS</b>
            <small>MANAGEMENT PLATFORM</small>
          </div>
        </a>
        <div className="admin-menu-scroll">
          {menuGroups.map(group => (
            <div key={group.title} className="menu-group">
              <span className="menu-group-title">{group.title}</span>
              {group.items.map(item => {
                const Icon = item.icon
                return (
                  <button 
                    key={item.name} 
                    className={section === item.name ? 'active' : ''} 
                    onClick={() => setSection(item.name)}
                  >
                    <Icon size={16}/>
                    <span>{item.name}</span>
                    {item.hasBadge && newCount > 0 && <em>{newCount}</em>}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        <button className="admin-logout" onClick={() => supabase?.auth.signOut()}>
          <LogOut size={16}/> Sign out
        </button>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>ALASU CMS · INSTITUTIONAL WORKSPACE</span>
            <h1>{section}</h1>
          </div>
          <a href="/" target="_blank" className="view-site">View website ↗</a>
        </header>
        {section === 'Dashboard' ? (
          <Overview requests={requests} onOpen={() => setSection('Contact Requests')}/>
        ) : section === 'Contact Requests' ? (
          <Requests requests={requests} loading={loading} updateStatus={updateStatus} />
        ) : (
          <Placeholder section={section}/>
        )}
      </main>
    </div>
  )
}

function Overview({ requests, onOpen }: { requests: RequestRow[]; onOpen: () => void }) { 
  const newCount = requests.filter(r => r.status === 'new').length; 
  return (
    <div className="admin-content">
      <div className="admin-welcome">
        <div>
          <p className="admin-kicker">GOOD MORNING</p>
          <h2>Your institutional workspace.</h2>
          <p>Manage the content, communications, and media that keep ALASU's public presence current.</p>
        </div>
        <button className="admin-primary" onClick={onOpen}><Bell size={16}/> View requests</button>
      </div>
      <div className="admin-stats">
        <div><span>New requests</span><strong>{newCount}</strong><small>Needs attention</small></div>
        <div><span>Published news</span><strong>—</strong><small>Connected to CMS</small></div>
        <div><span>Teachers & Faculty</span><strong>—</strong><small>Content database</small></div>
        <div><span>Programs</span><strong>3</strong><small>Initial structure</small></div>
      </div>
      <div className="admin-panel">
        <div className="panel-head">
          <div><span>QUICK ACTIONS</span><h3>Keep ALASU up to date.</h3></div>
        </div>
        <div className="quick-grid">
          <button><Plus/>Create news story</button>
          <button><Users/>Manage teachers</button>
          <button><BookOpen/>Edit programs</button>
          <button><Image/>Update gallery</button>
        </div>
      </div>
    </div> 
  )
}

function Requests({ requests, loading, updateStatus }: { requests: RequestRow[]; loading: boolean; updateStatus: (id: string, status: RequestRow['status']) => void }) { 
  return (
    <div className="admin-content">
      <div className="request-toolbar">
        <div><span>INBOUND ENQUIRIES</span><h2>Contact requests</h2></div>
        <button className="admin-secondary"><Search size={16}/> Search</button>
      </div>
      <div className="request-list">
        {loading ? <div className="empty-state">Loading requests…</div> : requests.length === 0 ? <div className="empty-state"><Bell size={24}/><h3>No requests yet</h3><p>New enquiries from alasu.uz will appear here.</p></div> : requests.map(r => (
          <article className="request-row" key={r.id}>
            <div className="request-avatar">{r.name.charAt(0).toUpperCase()}</div>
            <div className="request-main">
              <div className="request-title"><h3>{r.name}</h3><span>{new Date(r.created_at).toLocaleString()}</span></div>
              <p>{r.phone} · {r.topic || 'General enquiry'}</p>
              {r.message && <blockquote>{r.message}</blockquote>}
            </div>
            <div className="request-actions">
              <select value={r.status} onChange={e => updateStatus(r.id, e.target.value as RequestRow['status'])}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </div> 
  )
}

function Placeholder({ section }: { section: string }) { 
  return (
    <div className="admin-content">
      <div className="admin-placeholder">
        <span>{section}</span>
        <h2>{section} Management</h2>
        <p>This module is scaffolded and ready to connect to the corresponding Supabase table and content model.</p>
        <button className="admin-primary"><Plus size={16}/> Add {section.toLowerCase()}</button>
      </div>
    </div> 
  )
}
