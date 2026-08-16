import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SiteApp from './site/SiteApp'
import AdminApp from './admin/AdminApp'
import './styles.css'
import './admin/admin.css'

const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isAdmin ? <AdminApp /> : <SiteApp />}</StrictMode>,
)
