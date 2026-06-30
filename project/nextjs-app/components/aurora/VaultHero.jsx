'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BalanceHero from './BalanceHero'
import TransactionModal from './TransactionModal'

/**
 * @param {{ balance: string, currency?: string, subtitle?: string }} props
 */
export default function VaultHero({ balance, currency, subtitle }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <BalanceHero
        eyebrow="Aura Vault balance"
        balance={balance}
        currency={currency}
        subtitle={subtitle}
        variant="violet"
        actions={[
          { label: 'Top up vault', icon: 'in',    variant: 'accent',    onClick: () => setOpen(true) },
          { label: 'Lend Aura XP', icon: 'arrow', variant: 'secondary', onClick: () => router.push('/invest') },
        ]}
      />
      <TransactionModal flow="vault" open={open} onClose={() => setOpen(false)} />
    </>
  )
}
