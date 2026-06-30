'use client'
import { useState } from 'react'
import Chip from '@/components/ui/Chip'
import TransactionRow from '@/components/aurora/TransactionRow'
import Card from '@/components/ui/Card'

const ALL_TXS = [
  { type: 'deposit',    network: 'BEP-20', date: 'Jun 20, 2026', amount: '500.00 USDT',   status: 'completed' },
  { type: 'withdrawal', network: 'BEP-20', date: 'Jun 18, 2026', amount: '250.00 USDT',   status: 'pending'   },
  { type: 'deposit',    network: 'BEP-20', date: 'Jun 14, 2026', amount: '1,200.00 USDT', status: 'completed' },
  { type: 'withdrawal', network: 'BEP-20', date: 'Jun 9, 2026',  amount: '800.00 USDT',   status: 'completed' },
  { type: 'deposit',    network: 'BEP-20', date: 'Jun 2, 2026',  amount: '3,000.00 USDT', status: 'completed' },
  { type: 'deposit',    network: 'ERC-20', date: 'May 29, 2026', amount: '2,000.00 USDT', status: 'verifying' },
]

const FILTERS = ['All', 'Deposits', 'Withdrawals', 'Completed', 'Pending']

function applyFilter(txs, filter) {
  switch (filter) {
    case 'Deposits':    return txs.filter(t => t.type === 'deposit')
    case 'Withdrawals': return txs.filter(t => t.type === 'withdrawal')
    case 'Completed':   return txs.filter(t => t.status === 'completed')
    case 'Pending':     return txs.filter(t => t.status === 'pending' || t.status === 'verifying')
    default:            return txs
  }
}

export default function TransactionsPage() {
  const [active, setActive] = useState('All')
  const visible = applyFilter(ALL_TXS, active)

  return (
    <>
      <div role="tablist" aria-label="Filter transactions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <Chip key={f} active={active === f} onClick={() => setActive(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <Card style={{ padding: '6px 20px' }}>
        {visible.length === 0 ? (
          <p style={{ padding: '20px 2px', color: 'var(--c-muted)', font: '400 14px var(--font-body)' }}>
            No transactions found.
          </p>
        ) : (
          visible.map((tx, i) => <TransactionRow key={i} {...tx} />)
        )}
      </Card>
    </>
  )
}
