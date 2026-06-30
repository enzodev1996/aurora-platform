'use client'
import { useState } from 'react'
import BalanceHero from './BalanceHero'
import TransactionModal from './TransactionModal'

/**
 * @param {{ balance: string, subtitle?: string, delta?: string }} props
 */
export default function DashboardHero({ balance, subtitle, delta }) {
  const [flow, setFlow] = useState(null)

  return (
    <>
      <BalanceHero
        eyebrow="Total balance"
        balance={balance}
        subtitle={subtitle}
        delta={delta}
        actions={[
          { label: 'Top up',   icon: 'in',  variant: 'accent',    onClick: () => setFlow('topup')    },
          { label: 'Withdraw', icon: 'out', variant: 'secondary', onClick: () => setFlow('withdraw') },
        ]}
      />
      <TransactionModal flow={flow ?? 'topup'} open={flow != null} onClose={() => setFlow(null)} />
    </>
  )
}
