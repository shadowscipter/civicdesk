import { Bell, BriefcaseBusiness, ChartNoAxesCombined, ChevronDown, Menu, MessageSquareText, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ModuleKey } from '../types'

interface TopbarProps {
  title: string
  organizationName: string
  searchValue: string
  onSearchChange: (value: string) => void
  onMenuClick: () => void
  onNavigate: (page: ModuleKey) => void
}

export default function Topbar({ title, organizationName, searchValue, onSearchChange, onMenuClick, onNavigate }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unread, setUnread] = useState(3)

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.querySelector<HTMLInputElement>('.global-search input')?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-leading">
        <button className="icon-button mobile-menu-button" onClick={onMenuClick} aria-label="Open navigation"><Menu size={20} /></button>
        <div className="breadcrumb"><span>{organizationName}</span><span className="breadcrumb-divider">/</span><strong>{title}</strong></div>
      </div>
      <div className="topbar-tools">
        <label className="global-search">
          <Search size={16} />
          <input value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search records" aria-label="Search records" />
          <kbd>Ctrl K</kbd>
        </label>
        <div className="notification-wrap">
          <button className="icon-button notification-button" onClick={() => setNotificationsOpen((open) => !open)} aria-label={`Notifications, ${unread} unread`} aria-expanded={notificationsOpen}>
            <Bell size={19} />{unread > 0 && <span className="notification-dot" />}
          </button>
          {notificationsOpen && <div className="notification-popover">
            <div className="popover-heading"><strong>Notifications</strong><button onClick={() => setUnread(0)}>Mark all read</button></div>
            <button className="notification-item" onClick={() => { onNavigate('feedback'); setNotificationsOpen(false) }}><span className="notification-symbol notification-symbol-amber"><MessageSquareText size={15} /></span><span><strong>4 feedback items need attention</strong><small>Customer experience · Today</small></span>{unread > 0 && <i />}</button>
            <button className="notification-item" onClick={() => { onNavigate('applications'); setNotificationsOpen(false) }}><span className="notification-symbol notification-symbol-green"><BriefcaseBusiness size={15} /></span><span><strong>2 new applications received</strong><small>Recruitment · Yesterday</small></span>{unread > 1 && <i />}</button>
            <button className="notification-item" onClick={() => { onNavigate('reports'); setNotificationsOpen(false) }}><span className="notification-symbol notification-symbol-blue"><ChartNoAxesCombined size={15} /></span><span><strong>Weekly overview is ready</strong><small>Reports · 2 days ago</small></span>{unread > 2 && <i />}</button>
          </div>}
        </div>
        <div className="profile-menu" title="Signed in as Alex Morgan">
          <span className="profile-avatar">AM</span><span className="profile-name">Alex Morgan<small>Administrator</small></span><ChevronDown size={15} />
        </div>
      </div>
    </header>
  )
}