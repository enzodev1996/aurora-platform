import { Icon } from '@/lib/icons'
import StatusBadge from './StatusBadge'

/**
 * @param {{ type: 'deposit'|'withdrawal', network: string, date: string, amount: string, status: string }} props
 */
export default function TransactionRow({ type, network, date, amount, status }) {
  const isDeposit = type === 'deposit'
  const statusKey = (status ?? '').toLowerCase()

  return (
    <div className={`list-row s-${statusKey === 'completed' || statusKey === 'approved' ? 'approved' : statusKey === 'pending' ? 'pending' : statusKey === 'verifying' || statusKey === 'under verification' ? 'verifying' : 'rejected'}`}>
      <span
        className="row-icon"
        style={isDeposit
          ? { background: 'var(--c-pos-bg)', color: 'var(--c-pos-ink)' }
          : { background: 'var(--c-hover)',  color: 'var(--c-muted)'   }
        }
      >
        <Icon name={isDeposit ? 'in' : 'out'} />
      </span>
      <div className="row-main">
        <div className="row-title">{isDeposit ? 'Deposit' : 'Withdrawal'}</div>
        <div className="row-sub">{network} · {date}</div>
      </div>
      <div className="row-right">
        <div className={`tabular ${isDeposit ? 'amt' : 'row-title'}`}>
          {isDeposit ? '+' : '−'}{amount}
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  )
}
