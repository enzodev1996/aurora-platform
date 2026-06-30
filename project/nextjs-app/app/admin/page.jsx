import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import KpiTile from '@/components/aurora/KpiTile'
import StatusBadge from '@/components/aurora/StatusBadge'

const QUEUE = [
  { user: 'Maria Santos',  date: 'Jun 20, 2026', amount: '500 USDT',   network: 'BEP-20', status: 'pending'   },
  { user: 'Juan Dela Cruz',date: 'Jun 18, 2026', amount: '1,200 USDT', network: 'ERC-20', status: 'verifying' },
  { user: 'Ana Reyes',     date: 'Jun 14, 2026', amount: '3,000 USDT', network: 'BEP-20', status: 'completed' },
  { user: 'Carlo Bautista',date: 'Jun 9, 2026',  amount: '800 USDT',   network: 'BEP-20', status: 'completed' },
  { user: 'Rosa Garcia',   date: 'May 29, 2026', amount: '2,000 USDT', network: 'ERC-20', status: 'completed' },
]

export default function AdminPage() {
  return (
    <>
      <div className="grid-auto">
        <KpiTile label="Pending review"    value="2"          />
        <KpiTile label="Approved today"    value="3"          />
        <KpiTile label="USDT under review" value="1,700.00"   unit="USDT" />
        <KpiTile label="Total processed"   value="32"         />
      </div>

      <Card title="Verification queue">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', font: '400 13px var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                {['User', 'Date', 'Amount', 'Network', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 500, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUEUE.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-divider)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{row.user}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--c-muted)' }}>{row.date}</td>
                  <td style={{ padding: '12px 8px', fontVariantNumeric: 'tabular-nums' }}>{row.amount}</td>
                  <td style={{ padding: '12px 8px' }}><Badge variant="neutral">{row.network}</Badge></td>
                  <td style={{ padding: '12px 8px' }}><StatusBadge status={row.status} /></td>
                  <td style={{ padding: '12px 8px' }}>
                    {row.status === 'pending' || row.status === 'verifying' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-accent" style={{ height: 32, padding: '0 14px', fontSize: 12 }}>Approve</button>
                        <button className="btn btn-secondary" style={{ height: 32, padding: '0 14px', fontSize: 12 }}>Reject</button>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--c-muted)', fontSize: 12 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
