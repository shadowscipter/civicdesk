import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change: string
  detail: string
  icon: LucideIcon
  tone: 'forest' | 'amber' | 'blue' | 'coral'
}

export default function StatCard({ label, value, change, detail, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon-${tone}`}><Icon size={19} strokeWidth={1.8} /></div>
      <div className="stat-copy">
        <p className="stat-label">{label}</p>
        <div className="stat-value-row"><strong>{value}</strong><span className="stat-change">{change}</span></div>
        <p className="stat-detail">{detail}</p>
      </div>
    </article>
  )
}