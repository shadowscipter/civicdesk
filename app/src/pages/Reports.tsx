import { ArrowUpRight, BriefcaseBusiness, MessageSquareText, Star } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { feedbackTrend } from '../data/mockData'
import type { FeedbackRecord, JobApplication } from '../types'

interface ReportsProps {
  feedback: FeedbackRecord[]
  applications: JobApplication[]
}

export default function Reports({ feedback, applications }: ReportsProps) {
  const average = feedback.length ? feedback.reduce((sum, record) => sum + record.rating, 0) / feedback.length : 0
  const resolved = feedback.filter((record) => record.status === 'Resolved').length
  const categories = ['Complaint', 'Compliment', 'Suggestion', 'Product request', 'Service']
  const departments = ['Customer Service', 'Administration', 'Stock Management', 'Operations', 'General Application']
  const statusCounts = ['Received', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Unsuccessful', 'Hired'].map((status) => ({ status, count: applications.filter((record) => record.status === status).length }))
  const maxCategory = Math.max(...categories.map((category) => feedback.filter((record) => record.category === category).length), 1)
  const maxDepartment = Math.max(...departments.map((department) => applications.filter((record) => record.department === department).length), 1)
  const chartPoints = feedbackTrend.map((point, index) => `${24 + index * 78},${154 - (point.value / 70) * 126}`).join(' ')

  return (
    <>
      <PageHeader eyebrow="PERFORMANCE OVERVIEW" title="Reports & insights" description="A clear view of customer experience and recruitment activity across the workspace." actions={<span className="report-period">30 days <span>·</span> Demo dataset</span>} />
      <section className="report-metrics"><article className="report-metric"><span className="report-metric-icon metric-green"><MessageSquareText size={18} /></span><span>Feedback submissions</span><strong>{feedback.length + 126}</strong><small><ArrowUpRight size={13} /> 12.8% vs. prior period</small></article><article className="report-metric"><span className="report-metric-icon metric-amber"><Star size={18} /></span><span>Average satisfaction</span><strong>{average.toFixed(1)}<small> / 5</small></strong><small><ArrowUpRight size={13} /> 0.3 points</small></article><article className="report-metric"><span className="report-metric-icon metric-blue"><BriefcaseBusiness size={18} /></span><span>Applications received</span><strong>{applications.length + 43}</strong><small><ArrowUpRight size={13} /> 8.2% vs. prior period</small></article><article className="report-metric"><span className="report-metric-icon metric-coral"><MessageSquareText size={18} /></span><span>Feedback resolution</span><strong>{feedback.length ? Math.round((resolved / feedback.length) * 100) : 0}<small>%</small></strong><small>{feedback.length - resolved} items outstanding</small></article></section>
      <section className="reports-grid">
        <article className="panel report-chart-panel"><div className="panel-heading"><div><p className="eyebrow">CUSTOMER EXPERIENCE</p><h2>Feedback over time</h2></div><span className="chart-legend"><i /> Submissions</span></div><div className="large-chart-wrap"><div className="chart-y-labels"><span>70</span><span>50</span><span>30</span><span>10</span></div><svg className="line-chart" viewBox="0 0 570 170" role="img" aria-label="Feedback submissions trend over eight weeks">{[28, 68, 108, 148].map((y) => <line key={y} x1="20" x2="560" y1={y} y2={y} className="chart-gridline" />)}<polyline points={chartPoints} className="chart-line" />{feedbackTrend.map((point, index) => <circle key={point.label} cx={24 + index * 78} cy={154 - (point.value / 70) * 126} r="3.5" className="chart-point" />)}</svg></div><div className="chart-x-labels">{feedbackTrend.map((point) => <span key={point.label}>{point.label}</span>)}</div></article>
        <article className="panel breakdown-panel"><div className="panel-heading"><div><p className="eyebrow">CUSTOMER EXPERIENCE</p><h2>Feedback categories</h2></div></div><div className="bar-list">{categories.map((category) => { const count = feedback.filter((record) => record.category === category).length; return <div className="bar-row" key={category}><div><span>{category}</span><strong>{count}</strong></div><div className="bar-track"><span style={{ width: `${(count / maxCategory) * 100}%` }} /></div></div> })}</div></article>
      </section>
      <section className="reports-grid reports-grid-bottom">
        <article className="panel breakdown-panel"><div className="panel-heading"><div><p className="eyebrow">RECRUITMENT</p><h2>Applications by department</h2></div></div><div className="bar-list">{departments.map((department) => { const count = applications.filter((record) => record.department === department).length; return <div className="bar-row" key={department}><div><span>{department}</span><strong>{count}</strong></div><div className="bar-track bar-track-blue"><span style={{ width: `${(count / maxDepartment) * 100}%` }} /></div></div> })}</div></article>
        <article className="panel status-report-panel"><div className="panel-heading"><div><p className="eyebrow">RECRUITMENT</p><h2>Application pipeline</h2></div><span className="pipeline-total">{applications.length} records</span></div><div className="status-report-list">{statusCounts.map(({ status, count }) => <div key={status}><StatusBadge status={status} /><span className="status-report-track"><i style={{ width: `${applications.length ? (count / applications.length) * 100 : 0}%` }} /></span><strong>{count}</strong></div>)}</div></article>
      </section>
      <p className="report-footnote">This report uses a small fictional sample. Trend totals include illustrative historical figures and are not connected to a live data source.</p>
    </>
  )
}