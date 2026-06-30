/**
 * @param {{ pct: number, raised?: string, goal?: string }} props
 */
export default function FundingProgress({ pct = 0, raised, goal }) {
  const clamped = Math.min(100, Math.max(0, pct))
  return (
    <div>
      <div className="progress">
        <span className="progress-fill" style={{ width: `${clamped}%` }} />
      </div>
      {(raised || goal) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, font: '400 11px/1 var(--font-body)', color: 'var(--c-muted)' }}>
          {raised && <span>{raised} raised</span>}
          {goal   && <span>of {goal}</span>}
        </div>
      )}
    </div>
  )
}
