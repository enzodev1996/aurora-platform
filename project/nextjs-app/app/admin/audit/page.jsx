import Card from '@/components/ui/Card'
import StatusBadge from '@/components/aurora/StatusBadge'

const LOG = [
  { admin: 'Admin',  time: 'Jun 20, 2026 · 14:32', action: 'Approved',  user: 'Maria Santos',   amount: '500 USDT',   ref: '0x7d2a91c4' },
  { admin: 'Admin',  time: 'Jun 18, 2026 · 11:05', action: 'Approved',  user: 'Ana Reyes',      amount: '3,000 USDT', ref: '0x3b8f2c1a' },
  { admin: 'Admin',  time: 'Jun 09, 2026 · 09:47', action: 'Rejected',  user: 'Paolo Santos',   amount: '150 USDT',   ref: '0xa4f91b2d' },
  { admin: 'Admin',  time: 'Jun 02, 2026 · 16:21', action: 'Approved',  user: 'Carlo Bautista', amount: '800 USDT',   ref: '0x5e1d3f9c' },
  { admin: 'Admin',  time: 'May 29, 2026 · 13:18', action: 'Approved',  user: 'Rosa Garcia',    amount: '2,000 USDT', ref: '0xb7c2a8e1' },
]

export default function AuditPage() {
  return (
    <Card title="Audit trail">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {LOG.map((entry, i) => (
          <div key={i} className="list-row">
            <div
              className="row-icon"
              style={{
                background: entry.action === 'Approved' ? 'var(--c-pos-bg)' : 'rgba(248,113,113,0.12)',
                color:      entry.action === 'Approved' ? 'var(--c-pos-ink)' : '#FCA5A5',
                font: '700 12px var(--font-body)',
                flexShrink: 0,
              }}
            >
              {entry.action === 'Approved' ? '✓' : '✗'}
            </div>
            <div className="row-main">
              <div className="row-title">{entry.action} · {entry.user}</div>
              <div className="row-sub">{entry.time} · {entry.ref}</div>
            </div>
            <div className="row-right">
              <div className="tabular" style={{ font: '500 13px var(--font-body)' }}>{entry.amount}</div>
              <StatusBadge status={entry.action === 'Approved' ? 'approved' : 'rejected'} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
