import { useState, type FormEvent } from 'react'
import { Check, CheckCheck, Paintbrush, Save, ShieldCheck, UserRound, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import type { OrganizationSettings } from '../types'

interface SettingsProps {
  settings: OrganizationSettings
  onSave: (settings: OrganizationSettings) => void
}

const roles = [
  { name: 'Administrator', scope: 'Full platform access, organization setup and user management', count: '1 user', tone: 'role-forest' },
  { name: 'HR / Recruitment', scope: 'Applications, applicant records and recruitment reporting', count: '2 users', tone: 'role-blue' },
  { name: 'Customer Service', scope: 'Feedback, complaints and customer follow-up', count: '4 users', tone: 'role-amber' },
  { name: 'Management', scope: 'Dashboard overview and business reports', count: '2 users', tone: 'role-coral' },
]

export default function Settings({ settings, onSave }: SettingsProps) {
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({ feedback: true, applications: true, weekly: false })

  function update<K extends keyof OrganizationSettings>(key: K, value: OrganizationSettings[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(form)
    setSaved(true)
  }

  return (
    <>
      <PageHeader eyebrow="WORKSPACE PREFERENCES" title="Settings" description="Manage organization details, workspace access and notification preferences." />
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections"><a href="#organization" className="settings-nav-active"><Paintbrush size={16} /> Organization</a><a href="#team"><Users size={16} /> Team & access</a><a href="#notifications"><CheckCheck size={16} /> Notifications</a><a href="#privacy"><ShieldCheck size={16} /> Privacy & security</a></nav>
        <div className="settings-content">
          <form id="organization" className="panel settings-panel" onSubmit={submit}><div className="settings-section-heading"><span className="settings-section-icon"><Paintbrush size={18} /></span><div><h2>Organization profile</h2><p>Customize how this workspace appears to your team.</p></div></div><div className="settings-form-grid"><label>Organization name<input value={form.name} onChange={(event) => update('name', event.target.value)} required maxLength={60} /></label><label>Organization type<select value={form.type} onChange={(event) => update('type', event.target.value)}><option>Retail & services</option><option>Education</option><option>Healthcare</option><option>Non-profit</option><option>Professional services</option><option>Other</option></select></label><label>Contact email<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label><label>Contact phone<input value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label><label className="field-full">Organization description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} rows={3} maxLength={240} /></label></div><div className="brand-color-row"><div><strong>Workspace brand color</strong><span>Applied to navigation and key actions.</span></div><div className="color-swatches">{[{ name: 'Forest', color: '#176B55' }, { name: 'Ocean', color: '#27678D' }, { name: 'Terracotta', color: '#B65F45' }, { name: 'Gold', color: '#9B741A' }].map(({ name, color }) => <button key={color} type="button" className={`color-swatch${form.brandColor === color ? ' color-swatch-selected' : ''}`} style={{ backgroundColor: color }} onClick={() => update('brandColor', color)} aria-label={`${name} brand color`} aria-pressed={form.brandColor === color}>{form.brandColor === color && <Check size={15} />}</button>)}</div></div><div className="settings-save-row"><span className="form-disclaimer">Changes are saved in this browser only.</span><button className="button button-primary" type="submit"><Save size={15} /> Save changes</button></div>{saved && <p className="save-confirmation" role="status"><Check size={15} /> Workspace settings saved.</p>}</form>

          <section id="team" className="panel settings-panel"><div className="settings-section-heading"><span className="settings-section-icon"><Users size={18} /></span><div><h2>Team & access</h2><p>Role structure planned for a connected workspace.</p></div><span className="demo-chip">DEMO</span></div><div className="role-list">{roles.map((role) => <div className="role-row" key={role.name}><span className={`role-icon ${role.tone}`}><UserRound size={17} /></span><div><strong>{role.name}</strong><small>{role.scope}</small></div><span className="role-count">{role.count}</span></div>)}</div><p className="settings-note"><ShieldCheck size={15} /> User invitations and access enforcement require backend authentication and are not active.</p></section>

          <section id="notifications" className="panel settings-panel"><div className="settings-section-heading"><span className="settings-section-icon"><CheckCheck size={18} /></span><div><h2>Notifications</h2><p>Choose the updates you would receive in a connected account.</p></div></div><div className="preference-list">{([{ key: 'feedback', title: 'Customer feedback', detail: 'When a new submission needs review.' }, { key: 'applications', title: 'Employment applications', detail: 'When an application is received or updated.' }, { key: 'weekly', title: 'Weekly summary', detail: 'A snapshot of activity and outstanding items.' }] as const).map(({ key, title, detail }) => <label className="preference-row" key={key}><span><strong>{title}</strong><small>{detail}</small></span><input type="checkbox" checked={notifications[key]} onChange={(event) => setNotifications((current) => ({ ...current, [key]: event.target.checked }))} /></label>)}</div><p className="settings-note">Preferences in this prototype are held in memory and do not send email or push notifications.</p></section>

          <section id="privacy" className="panel settings-panel privacy-settings"><div className="settings-section-heading"><span className="settings-section-icon"><ShieldCheck size={18} /></span><div><h2>Privacy & security</h2><p>Prototype security boundaries and planned safeguards.</p></div></div><div className="privacy-check-list"><p><Check size={15} /> Demonstration records are fictional.</p><p><Check size={15} /> No passwords, CV files or authentication tokens are collected.</p><p><Check size={15} /> Role-based access, encryption and audit logging are not implemented.</p><p><Check size={15} /> Supabase integration and organization-level isolation are planned.</p></div><div className="security-warning"><strong>Not for personal or confidential data</strong><span>This frontend prototype is not a secure production system and is not certified as POPIA-compliant.</span></div></section>
        </div>
      </div>
    </>
  )
}