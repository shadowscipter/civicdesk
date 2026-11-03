import { useState, type FormEvent } from 'react'
import { BriefcaseBusiness, ChevronDown, FileText, Search, UserRound, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { applicationStatuses } from '../data/mockData'
import type { ApplicationStatus, Department, EmploymentType, JobApplication } from '../types'

interface ApplicationsProps {
  records: JobApplication[]
  search: string
  onUpdate: (id: string, updates: Partial<JobApplication>) => void
  onStatusChange: (id: string, status: ApplicationStatus) => void
}

const departments: Department[] = ['Customer Service', 'Administration', 'Stock Management', 'Operations', 'General Application']
const employmentTypes: EmploymentType[] = ['Full-time', 'Part-time', 'Temporary', 'Weekend', 'Holiday']

export default function Applications({ records, search, onUpdate, onStatusChange }: ApplicationsProps) {
  const [departmentFilter, setDepartmentFilter] = useState('All departments')
  const [typeFilter, setTypeFilter] = useState('All employment types')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const query = search.trim().toLowerCase()
  const filtered = records.filter((record) => {
    const matchesSearch = `${record.id} ${record.applicant} ${record.email} ${record.department}`.toLowerCase().includes(query)
    return matchesSearch && (departmentFilter === 'All departments' || record.department === departmentFilter) && (typeFilter === 'All employment types' || record.employmentType === typeFilter) && (statusFilter === 'All statuses' || record.status === statusFilter)
  })
  const selected = records.find((record) => record.id === selectedId)

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected || !note.trim()) return
    onUpdate(selected.id, { internalNotes: [...selected.internalNotes, note.trim()] })
    setNote('')
  }

  return (
    <>
      <PageHeader eyebrow="TALENT PIPELINE" title="Applications" description="Review expressions of interest and keep recruitment moving with clear next steps." />
      <div className="pipeline-summary"><div><span className="pipeline-mark pipeline-mark-green"><BriefcaseBusiness size={17} /></span><strong>{records.length}</strong><span>all applications</span></div><div><strong>{records.filter((record) => ['Received', 'Under Review'].includes(record.status)).length}</strong><span>to review</span></div><div><strong>{records.filter((record) => record.status === 'Shortlisted' || record.status === 'Interview Scheduled').length}</strong><span>in selection</span></div><div className="pipeline-note">General expressions of interest are included, even when no vacancy is listed.</div></div>
      <section className="panel application-workspace">
        <div className="list-toolbar"><div className="record-count"><strong>{filtered.length}</strong><span>applicants</span></div><div className="filter-controls"><label className="select-wrap"><span className="sr-only">Filter by department</span><select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}><option>All departments</option>{departments.map((department) => <option key={department}>{department}</option>)}</select><ChevronDown size={14} /></label><label className="select-wrap"><span className="sr-only">Filter by employment type</span><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option>All employment types</option>{employmentTypes.map((type) => <option key={type}>{type}</option>)}</select><ChevronDown size={14} /></label><label className="select-wrap status-filter"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option>{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={14} /></label></div></div>
        <div className={`records-layout${selected ? ' records-layout-selected' : ''}`}><div className="table-scroll"><table className="data-table application-table"><thead><tr><th>Applicant</th><th>Department</th><th>Employment type</th><th>Experience</th><th>Received</th><th>Status</th></tr></thead><tbody>
          {filtered.map((record) => <tr key={record.id} className={selectedId === record.id ? 'row-selected' : ''} onClick={() => { setSelectedId(record.id); setNote('') }} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedId(record.id) }}><td><div className="applicant-cell"><span className="avatar avatar-blue">{record.initials}</span><span><strong>{record.applicant}</strong><small>{record.id}</small></span></div></td><td>{record.department}</td><td>{record.employmentType}</td><td>{record.experience}</td><td>{formatDate(record.receivedAt)}</td><td><StatusBadge status={record.status} /></td></tr>)}
          {!filtered.length && <tr><td colSpan={6}><div className="empty-state"><Search size={22} /><strong>No applications found</strong><span>Adjust your filters or search for another applicant.</span></div></td></tr>}
        </tbody></table></div>
        {selected && <aside className="record-detail"><div className="detail-heading"><div><p className="eyebrow">{selected.id}</p><h2>Applicant profile</h2></div><button className="icon-button" onClick={() => setSelectedId(null)} aria-label="Close profile"><X size={17} /></button></div>
          <div className="applicant-profile"><span className="profile-avatar profile-avatar-large">{selected.initials}</span><div><h3>{selected.applicant}</h3><span>{selected.email}</span></div></div>
          <p className="detail-summary">{selected.summary}</p>
          <div className="detail-facts"><div><span>Department</span><strong>{selected.department}</strong></div><div><span>Employment type</span><strong>{selected.employmentType}</strong></div><div><span>Availability</span><strong>{selected.availability}</strong></div><div><span>Experience</span><strong>{selected.experience}</strong></div><div className="fact-status"><span>Application status</span><select value={selected.status} onChange={(event) => onStatusChange(selected.id, event.target.value as ApplicationStatus)}>{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select></div></div>
          <div className="cv-access"><FileText size={18} /><div><strong>{selected.cvOnFile ? 'CV marked as received' : 'No CV recorded'}</strong><small>{selected.cvOnFile ? 'Secure document access is not connected in this demo.' : 'No document is attached to this sample record.'}</small></div></div>
          <div className="notes-section"><h3>Recruitment notes <span>{selected.internalNotes.length}</span></h3>{selected.internalNotes.length ? <ul className="note-list">{selected.internalNotes.map((item, index) => <li key={`${selected.id}-${index}`}>{item}</li>)}</ul> : <p className="muted-copy">No notes yet.</p>}<form className="note-form" onSubmit={saveNote}><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note…" aria-label="Add a recruitment note" required /><button className="button button-secondary button-small" type="submit">Add note</button></form></div>
        </aside>}
        </div>
      </section>
      <p className="privacy-inline"><UserRound size={15} /> Fictional applicant records only. CVs are not stored or accessible in this prototype.</p>
    </>
  )
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}