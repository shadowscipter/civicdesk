interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const tone = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge status-${tone}`}><span className="status-dot" />{status}</span>
}