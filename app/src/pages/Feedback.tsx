import { useState, type FormEvent } from 'react'
import { ChevronDown, MessageSquareText, Plus, Search, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import type { FeedbackCategory, FeedbackRecord, FeedbackStatus } from '../types'

interface FeedbackProps {
  records: FeedbackRecord[]
  search: string
  onUpdate: (id: string, updates: Partial<FeedbackRecord>) => void
  onAdd: (record: FeedbackRecord) => void
}

const statuses: FeedbackStatus[] = ['New', 'In Progress', 'Resolved']
const categories: FeedbackCategory[] = ['Complaint', 'Compliment', 'Suggestion', 'Product request', 'Service']
const departments = ['Customer Service', 'Operations', 'Stock Management', 'Administration']

export default function Feedback({ records, search, onUpdate, onAdd }: FeedbackProps) {
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [toast, setToast] = useState('')
  const query = search.trim().toLowerCase()
  const filtered = records.filter((record) => {
    const matchesSearch = `${record.id} ${record.customer} ${record.subject} ${record.department}`.toLowerCase().includes(query)
    return matchesSearch && (statusFilter === 'All statuses' || record.status === statusFilter) && (categoryFilter === 'All categories' || record.category === categoryFilter)
  })
  const selected = records.find((record) => record.id === selectedId)

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected || !note.trim()) return
    onUpdate(selected.id, { internalNotes: [...selected.internalNotes, note.trim()] })
    setNote('')
  }

  function createFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const customer = String(form.get('customer')).trim()
    const subject = String(form.get('subject')).trim()
    if (!customer || !subject) return
    const category = String(form.get('category')) as FeedbackCategory
    const created: FeedbackRecord = {
      id: `FDB-${Math.max(...records.map((record) => Number(record.id.slice(4))), 2841) + 1}`,
      customer, subject, category, department: 'Customer Service', rating: Number(form.get('rating')),
      submittedAt: new Date().toISOString().slice(0, 10), status: 'New',
      summary: String(form.get('summary')).trim() || 'No additional details provided.', internalNotes: [],
    }
    onAdd(created)
    setShowNew(false)
    setToast('Feedback entry added')
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <>
      <PageHeader eyebrow="CUSTOMER EXPERIENCE" title="Customer feedback" description="Review submissions, follow up on concerns, and learn from every interaction." actions={<button className="button button-primary" onClick={() => setShowNew(true)}><Plus size={16} /> Log feedback</button>} />
      <section className="panel feedback-workspace">
        <div className="list-toolbar"><div className="record-count"><strong>{filtered.length}</strong><span>submissions</span></div><div className="filter-controls"><label className="select-wrap"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={14} /></label><label className="select-wrap"><span className="sr-only">Filter by category</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select><ChevronDown size={14} /></label></div></div>
        <div className={`records-layout${selected ? ' records-layout-selected' : ''}`}>
          <div className="table-scroll"><table className="data-table"><thead><tr><th>Submission</th><th>Category</th><th>Rating</th><th>Department</th><th>Received</th><th>Status</th></tr></thead><tbody>
            {filtered.map((record) => <tr key={record.id} className={selectedId === record.id ? 'row-selected' : ''} onClick={() => { setSelectedId(record.id); setNote('') }} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedId(record.id) }}>
              <td><div className="table-primary">{record.subject}</div><div className="table-secondary">{record.id} · {record.customer}</div></td><td><span className="category-label">{record.category}</span></td><td><span className="rating-cell"><span>★</span> {record.rating}.0</span></td><td>{record.department}</td><td>{formatDate(record.submittedAt)}</td><td><StatusBadge status={record.status} /></td>
            </tr>)}
            {!filtered.length && <tr><td colSpan={6}><div className="empty-state"><Search size={22} /><strong>No feedback found</strong><span>Adjust your filters or search for another record.</span></div></td></tr>}
          </tbody></table></div>
          {selected && <aside className="record-detail"><div className="detail-heading"><div><p className="eyebrow">{selected.id}</p><h2>{selected.subject}</h2></div><button className="icon-button" onClick={() => setSelectedId(null)} aria-label="Close details"><X size={17} /></button></div>
            <div className="detail-person"><span className="avatar avatar-green">{selected.customer.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><strong>{selected.customer}</strong><small>Submitted {formatDate(selected.submittedAt)}</small></div></div>
            <p className="detail-summary">{selected.summary}</p>
            <div className="detail-facts"><div><span>Category</span><strong>{selected.category}</strong></div><div><span>Rating</span><strong className="rating-cell"><span>★</span> {selected.rating} / 5</strong></div><div><span>Department</span><select value={selected.department} onChange={(event) => onUpdate(selected.id, { department: event.target.value })}>{departments.map((department) => <option key={department}>{department}</option>)}</select></div><div><span>Status</span><select value={selected.status} onChange={(event) => onUpdate(selected.id, { status: event.target.value as FeedbackStatus })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div></div>
            <div className="notes-section"><h3>Internal notes <span>{selected.internalNotes.length}</span></h3>{selected.internalNotes.length ? <ul className="note-list">{selected.internalNotes.map((item, index) => <li key={`${selected.id}-${index}`}>{item}</li>)}</ul> : <p className="muted-copy">No notes yet.</p>}<form className="note-form" onSubmit={saveNote}><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note…" aria-label="Add an internal note" required /><button className="button button-secondary button-small" type="submit">Add note</button></form></div>
          </aside>}
        </div>
      </section>
      {showNew && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowNew(false) }}><form className="modal" onSubmit={createFeedback}><div className="modal-heading"><div><p className="eyebrow">CUSTOMER EXPERIENCE</p><h2>Log feedback</h2></div><button type="button" className="icon-button" onClick={() => setShowNew(false)} aria-label="Close form"><X size={18} /></button></div><label>Customer name<input name="customer" placeholder="Fictional customer name" required /></label><label>Subject<input name="subject" placeholder="Brief summary" required /></label><div className="form-two-col"><label>Category<select name="category">{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Rating<select name="rating"><option value="5">5 · Excellent</option><option value="4">4 · Good</option><option value="3">3 · Neutral</option><option value="2">2 · Poor</option><option value="1">1 · Very poor</option></select></label></div><label>Details<textarea name="summary" placeholder="What happened?" rows={3} /></label><p className="form-disclaimer">Use fictional demonstration data only. Entries are stored in this browser session.</p><div className="modal-actions"><button className="button button-secondary" type="button" onClick={() => setShowNew(false)}>Cancel</button><button className="button button-primary" type="submit"><Plus size={15} /> Add entry</button></div></form></div>}
      {toast && <div className="toast-message" role="status"><MessageSquareText size={16} />{toast}</div>}
    </>
  )
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}