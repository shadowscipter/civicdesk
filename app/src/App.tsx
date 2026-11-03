import { useState, type CSSProperties } from 'react'
import { initialApplications, initialFeedback } from './data/mockData'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import Applications from './pages/Applications'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import type { ApplicationStatus, FeedbackRecord, JobApplication, ModuleKey, OrganizationSettings } from './types'

function App() {
  const [activePage, setActivePage] = useState<ModuleKey>('dashboard')
  const [feedback, setFeedback] = useState(initialFeedback)
  const [applications, setApplications] = useState(initialApplications)
  const [search, setSearch] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [organization, setOrganization] = useState<OrganizationSettings>(() => {
    try {
      const saved = localStorage.getItem('civicdesk.organization')
      return saved ? { ...defaultOrganization, ...JSON.parse(saved) as Partial<OrganizationSettings> } : defaultOrganization
    } catch {
      return defaultOrganization
    }
  })

  const titles: Record<ModuleKey, string> = {
    dashboard: 'Overview', feedback: 'Customer feedback', applications: 'Applications',
    reports: 'Reports & insights', settings: 'Settings',
  }

  function updateFeedback(id: string, updates: Partial<FeedbackRecord>) {
    setFeedback((records) => records.map((record) => record.id === id ? { ...record, ...updates } : record))
  }

  function addFeedback(record: FeedbackRecord) {
    setFeedback((records) => [record, ...records])
  }

  function updateApplication(id: string, updates: Partial<JobApplication>) {
    setApplications((records) => records.map((record) => record.id === id ? { ...record, ...updates } : record))
  }

  function updateApplicationStatus(id: string, status: ApplicationStatus) {
    updateApplication(id, { status })
  }

  function saveOrganization(next: OrganizationSettings) {
    setOrganization(next)
    try {
      localStorage.setItem('civicdesk.organization', JSON.stringify(next))
    } catch {
      // The settings remain available in memory if browser storage is disabled.
    }
  }

  const page = {
    dashboard: <Dashboard feedback={feedback} applications={applications} search={search} onNavigate={setActivePage} />,
    feedback: <Feedback records={feedback} search={search} onUpdate={updateFeedback} onAdd={addFeedback} />,
    applications: <Applications records={applications} search={search} onUpdate={updateApplication} onStatusChange={updateApplicationStatus} />,
    reports: <Reports feedback={feedback} applications={applications} />,
    settings: <Settings settings={organization} onSave={saveOrganization} />,
  }[activePage]

  return (
    <div className="app-shell" style={{ '--brand': organization.brandColor } as CSSProperties}>
      <Sidebar
        activePage={activePage}
        organizationName={organization.name}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onNavigate={(next) => { setActivePage(next); setSearch('') }}
        onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div className="main-column">
        <Topbar
          title={titles[activePage]}
          organizationName={organization.name}
          searchValue={search}
          onSearchChange={setSearch}
          onMenuClick={() => setMobileSidebarOpen(true)}
          onNavigate={(next) => { setActivePage(next); setSearch('') }}
        />
        <main className="main-content" key={activePage}>
          <div className="content-inner">{page}</div>
          <footer className="page-footer"><span>© 2026 CivicDesk</span><span>Independent workspace · Demonstration data</span></footer>
        </main>
      </div>
    </div>
  )
}

const defaultOrganization: OrganizationSettings = {
  name: 'Northstar Collective', type: 'Retail & services', email: 'hello@example.test',
  phone: '+27 11 555 0184', description: 'A fictional organization used to demonstrate CivicDesk.', brandColor: '#176B55',
}

export default App
