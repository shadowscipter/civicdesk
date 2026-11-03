import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, MessageSquareText, Sparkles, Star, TriangleAlert } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { feedbackTrend } from '../data/mockData'
import type { FeedbackRecord, JobApplication, ModuleKey } from '../types'

interface DashboardProps {
  feedback: FeedbackRecord[]
  applications: JobApplication[]
  search: string
  onNavigate: (page: ModuleKey) => void
}

export default function Dashboard({ feedback, applications, search, onNavigate }: DashboardProps) {
  const averageRating = feedback.length ? feedback.reduce((total, record) => total + record.rating, 0) / feedback.length : 0
  const unresolved = feedback.filter((record) => record.status !== 'Resolved').length
  const openApplications = applications.filter((record) => !['Hired', 'Unsuccessful'].includes(record.status)).length
  const query = search.trim().toLowerCase()
  const recentFeedback = feedback.filter((record) => `${record.customer} ${record.subject} ${record.id}`.toLowerCase().includes(query)).slice(0, 4)
  const recentApplications = applications.filter((record) => `${record.applicant} ${record.department} ${record.id}`.toLowerCase().includes(query)).slice(0, 4)
  const chartPoints = feedbackTrend.map((point, index) => `${24 + index * 78},${154 - (point.value / 70) * 126}`).join(' ')

  return (
    <>
      <PageHeader eyebrow="MONDAY, 2 NOVEMBER 2026" title="Good morning, Alex" description="Here’s what’s happening across your workspace today." actions={<button className="button button-secondary" onClick={() => onNavigate('reports')}><ArrowRight size={16} /> View reports</button>} />

      <section className="stats-grid" aria-label="Workspace statistics">
        <StatCard label="Feedback received" value={String(feedback.length + 126)} change="+12.8%" detail="vs. previous 30 days" icon={MessageSquareText} tone="forest" />
        <StatCard label="Employment applications" value={String(applications.length + 43)} change="+8.2%" detail="vs. previous 30 days" icon={BriefcaseBusiness} tone="blue" />
        <StatCard label="Average satisfaction" value={`${averageRating.toFixed(1)} / 5`} change="+0.3" detail="from 184 ratings" icon={Star} tone="amber" />
        <StatCard label="Needs attention" value={String(unresolved + openApplications)} change={`${unresolved} feedback`} detail={`${openApplications} applications in progress`} icon={TriangleAlert} tone="coral" />
      </section>

      <section className="dashboard-grid">
        <article className="panel trend-panel">
          <div className="panel-heading"><div><p className="eyebrow">CUSTOMER EXPERIENCE</p><h2>Feedback activity</h2></div><span className="period-label">Last 8 weeks <ArrowDownRight size={14} /></span></div>
          <div className="trend-summary"><strong>184</strong><span>submissions this period</span><span className="trend-positive"><ArrowUpRight size={14} /> 12.8%</span></div>
          <div className="chart-wrap">
            <div className="chart-y-labels"><span>70</span><span>50</span><span>30</span><span>10</span></div>
            <svg className="line-chart" viewBox="0 0 570 170" role="img" aria-label="Feedback submissions increased over the last eight weeks">
              {[28, 68, 108, 148].map((y) => <line key={y} x1="20" x2="560" y1={y} y2={y} className="chart-gridline" />)}
              <polyline points={chartPoints} className="chart-line" />
              {feedbackTrend.map((point, index) => <circle key={point.label} cx={24 + index * 78} cy={154 - (point.value / 70) * 126} r="3.5" className="chart-point" />)}
            </svg>
          </div>
          <div className="chart-x-labels">{feedbackTrend.map((point) => <span key={point.label}>{point.label}</span>)}</div>
        </article>

        <article className="panel attention-panel">
          <div className="panel-heading"><div><p className="eyebrow">PRIORITY QUEUE</p><h2>Needs your attention</h2></div><span className="attention-count">{unresolved + openApplications}</span></div>
          <div className="attention-item"><span className="attention-icon attention-icon-amber"><MessageSquareText size={17} /></span><div><strong>{unresolved} feedback items</strong><small>Waiting for a response or resolution</small></div><button className="round-link" onClick={() => onNavigate('feedback')} aria-label="Review feedback"><ArrowRight size={16} /></button></div>
          <div className="attention-item"><span className="attention-icon attention-icon-blue"><BriefcaseBusiness size={17} /></span><div><strong>{openApplications} applications</strong><small>Ready for recruitment review</small></div><button className="round-link" onClick={() => onNavigate('applications')} aria-label="Review applications"><ArrowRight size={16} /></button></div>
          <div className="insight-note"><Sparkles size={16} /><span>Customer ratings are up <strong>0.3 points</strong> this month.</span></div>
        </article>
      </section>

      <section className="dashboard-grid lower-grid">
        <article className="panel table-panel">
          <div className="panel-heading"><div><p className="eyebrow">LATEST UPDATES</p><h2>Recent feedback</h2></div><button className="text-link" onClick={() => onNavigate('feedback')}>View all <ArrowRight size={15} /></button></div>
          {recentFeedback.length ? <div className="compact-list">{recentFeedback.map((record) => <div className="compact-row" key={record.id}><span className="avatar avatar-green">{record.customer.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div className="compact-main"><strong>{record.subject}</strong><small>{record.customer} · {record.submittedAt}</small></div><StatusBadge status={record.status} /></div>)}</div> : <div className="empty-state"><MessageSquareText size={21} /><strong>No matching feedback</strong><span>Try another search term.</span></div>}
        </article>
        <article className="panel table-panel">
          <div className="panel-heading"><div><p className="eyebrow">TALENT PIPELINE</p><h2>Recent applications</h2></div><button className="text-link" onClick={() => onNavigate('applications')}>View all <ArrowRight size={15} /></button></div>
          {recentApplications.length ? <div className="compact-list">{recentApplications.map((record) => <div className="compact-row" key={record.id}><span className="avatar avatar-blue">{record.initials}</span><div className="compact-main"><strong>{record.applicant}</strong><small>{record.department} · {record.receivedAt}</small></div><StatusBadge status={record.status} /></div>)}</div> : <div className="empty-state"><BriefcaseBusiness size={21} /><strong>No matching applications</strong><span>Try another search term.</span></div>}
        </article>
      </section>
    </>
  )
}