import {
  BriefcaseBusiness, ChartNoAxesCombined, ChevronLeft, ChevronRight,
  LayoutDashboard, MessageSquareText, Settings2, ShieldCheck, X,
} from 'lucide-react'
import type { ModuleKey } from '../types'

interface SidebarProps {
  activePage: ModuleKey
  organizationName: string
  collapsed: boolean
  mobileOpen: boolean
  onNavigate: (page: ModuleKey) => void
  onToggle: () => void
  onClose: () => void
}

const navigation: { label: string; key: ModuleKey; icon: typeof LayoutDashboard; group: string }[] = [
  { label: 'Overview', key: 'dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Customer feedback', key: 'feedback', icon: MessageSquareText, group: 'Workspace' },
  { label: 'Applications', key: 'applications', icon: BriefcaseBusiness, group: 'Workspace' },
  { label: 'Reports & insights', key: 'reports', icon: ChartNoAxesCombined, group: 'Manage' },
  { label: 'Settings', key: 'settings', icon: Settings2, group: 'Manage' },
]

export default function Sidebar({ activePage, organizationName, collapsed, mobileOpen, onNavigate, onToggle, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}${mobileOpen ? ' sidebar-mobile-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span /><span /><span /></div>
          {!collapsed && <div className="brand-name">civic<span>desk</span></div>}
          <button className="icon-button sidebar-mobile-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <div className="workspace-switcher" title={organizationName}>
          <span className="workspace-avatar">{organizationName.slice(0, 1).toUpperCase()}</span>
          {!collapsed && <><span className="workspace-copy"><strong>{organizationName}</strong><small>Workspace</small></span><ChevronRight size={15} /></>}
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          {['Workspace', 'Manage'].map((group) => (
            <div className="nav-group" key={group}>
              {!collapsed && <p className="nav-group-label">{group}</p>}
              {navigation.filter((item) => item.group === group).map(({ label, key, icon: Icon }) => (
                <button
                  key={key}
                  className={`nav-item${activePage === key ? ' nav-item-active' : ''}`}
                  onClick={() => { onNavigate(key); onClose() }}
                  title={collapsed ? label : undefined}
                  aria-current={activePage === key ? 'page' : undefined}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {!collapsed && <span>{label}</span>}
                  {key === 'feedback' && !collapsed && <span className="nav-count">4</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {!collapsed && <div className="privacy-card"><ShieldCheck size={17} /><div><strong>Demo workspace</strong><span>Sample data only</span></div></div>}
          <button className="collapse-toggle" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />} {!collapsed && <span>Collapse menu</span>}
          </button>
          {!collapsed && <p className="sidebar-version">CIVICDESK · DEMO 0.1</p>}
        </div>
      </aside>
    </>
  )
}