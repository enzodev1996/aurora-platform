import Badge from '@/components/ui/Badge'
import FundingProgress from './FundingProgress'

const RISK_VARIANT = { low: 'success', medium: 'warn', high: 'error' }
const STATUS_VARIANT = { funding: 'info', funded: 'success', completed: 'neutral', closed: 'neutral' }

/**
 * @param {{ title: string, location?: string, category?: string, raisedPct?: number, raised?: string, goal?: string, investors?: number, risk?: 'low'|'medium'|'high', status?: string, daysLeft?: number, gradient?: string, notice?: string }} props
 */
export default function ProjectCard({ title, location, category, raisedPct = 0, raised, goal, investors, risk, status, daysLeft, gradient, notice }) {
  return (
    <article className="project">
      <div
        className="project-top"
        style={gradient ? { background: gradient } : undefined}
        aria-hidden="true"
      >
        <div style={{ position: 'absolute', top: 10, left: 12, display: 'flex', gap: 6 }}>
          {status && (
            <Badge variant={STATUS_VARIANT[status?.toLowerCase()] ?? 'neutral'}>
              {status}
            </Badge>
          )}
        </div>
        {daysLeft != null && (
          <div style={{ position: 'absolute', top: 10, right: 12 }}>
            <Badge variant="neutral">{daysLeft}d left</Badge>
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="project-title">{title}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {location && <Badge variant="neutral">{location}</Badge>}
          {category && <Badge variant="neutral">{category}</Badge>}
        </div>
        {notice && (
          <p style={{ margin: 0, font: '400 12px/1.5 var(--font-body)', color: 'var(--c-muted)' }}>{notice}</p>
        )}
        <FundingProgress pct={raisedPct} raised={raised} goal={goal} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {investors != null && (
            <span style={{ font: '400 12px/1 var(--font-body)', color: 'var(--c-muted)' }}>
              {investors.toLocaleString()} investors
            </span>
          )}
          {risk && (
            <Badge variant={RISK_VARIANT[risk.toLowerCase()] ?? 'neutral'}>
              {risk.charAt(0).toUpperCase() + risk.slice(1)} risk
            </Badge>
          )}
        </div>
      </div>
    </article>
  )
}
