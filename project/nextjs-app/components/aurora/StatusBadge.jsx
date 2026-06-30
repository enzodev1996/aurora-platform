const STATUS_MAP = {
  completed:    's-approved',
  approved:     's-approved',
  verifying:    's-verifying',
  'under verification': 's-verifying',
  pending:      's-pending',
  rejected:     's-rejected',
  failed:       's-rejected',
}

const LABELS = {
  completed: 'Completed',
  approved:  'Approved',
  verifying: 'Under verification',
  'under verification': 'Under verification',
  pending:   'Pending',
  rejected:  'Rejected',
  failed:    'Failed',
}

/**
 * @param {{ status: string, label?: string }} props
 */
export default function StatusBadge({ status, label }) {
  const key = (status ?? '').toLowerCase()
  const cls = STATUS_MAP[key] ?? 's-pending'
  const text = label ?? LABELS[key] ?? status
  return (
    <span className={`status-label ${cls}`}>
      <span className="status-dot" />
      {text}
    </span>
  )
}
