'use client'
import { useState } from 'react'
import BalanceHero from './BalanceHero'
import VaultModal from './VaultModal'

/**
 * @param {{ balance: string, currency?: string, subtitle?: string }} props
 */
export default function VaultHero({ balance, currency, subtitle }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BalanceHero
        eyebrow="Vault balance"
        balance={balance}
        currency={currency}
        subtitle={subtitle}
        variant="violet"
        actions={[
          { label: 'Top up vault', icon: 'sparkles', variant: 'accent', onClick: () => setOpen(true) },
        ]}
      />
      <VaultModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
