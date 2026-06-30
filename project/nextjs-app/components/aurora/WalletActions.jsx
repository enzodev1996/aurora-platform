'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import TransactionModal from './TransactionModal'

export default function WalletActions() {
  const [flow, setFlow] = useState(null)

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        <Button variant="accent" icon="in" style={{ flex: 1 }} onClick={() => setFlow('topup')}>Deposit</Button>
        <Button variant="secondary" icon="out" style={{ flex: 1 }} onClick={() => setFlow('redeem')}>Redeem</Button>
      </div>
      <TransactionModal flow={flow ?? 'topup'} open={flow != null} onClose={() => setFlow(null)} />
    </>
  )
}
