import { Icon } from '@/lib/icons'
import { fmt } from '@/lib/format'

export function AmountStep({ label, unit, sub, chips, amount, onPick }) {
  return (
    <>
      <div className="eyebrow" style={{ textAlign: 'center', color: 'var(--c-muted)' }}>{label}</div>
      <div className="amount-display">
        <span className="amount-num">{fmt(amount)}</span>{' '}
        <span className="muted" style={{ font: '500 18px var(--font-body)' }}>{unit}</span>
        <div className="muted" style={{ font: '400 13px var(--font-body)', marginTop: 6 }}>{sub}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {chips.map((v) => (
          <button
            key={v}
            type="button"
            className={`chip${amount === v ? ' on' : ''}`}
            onClick={() => onPick(v)}
          >
            {fmt(v)}
          </button>
        ))}
      </div>
    </>
  )
}

export function SummaryRow({ k, v, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1.6 var(--font-body)' }}>
      <span className="muted">{k}</span>
      <span className="tabular" style={color ? { color } : undefined}>{v}</span>
    </div>
  )
}

export function SuccessStep({ icon, iconColor, iconBg, title, body, rows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '6px 4px 2px' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} style={{ width: 30, height: 30 }} />
      </div>
      <div style={{ font: '700 22px/1.2 var(--font-display)' }}>{title}</div>
      <div className="muted" style={{ font: '400 14px/1.5 var(--font-body)', maxWidth: 330 }}>{body}</div>
      {rows && rows.length > 0 && (
        <div className="tile" style={{ width: '100%', flexDirection: 'column', alignItems: 'stretch', gap: 10, marginTop: 4 }}>
          {rows.map(([k, v, color], i) => <SummaryRow key={i} k={k} v={v} color={color} />)}
        </div>
      )}
    </div>
  )
}
