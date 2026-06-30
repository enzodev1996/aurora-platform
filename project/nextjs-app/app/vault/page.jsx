'use client'
import { useState } from 'react'
import VaultHero from '@/components/aurora/VaultHero'
import KpiTile from '@/components/aurora/KpiTile'
import TransactionRow from '@/components/aurora/TransactionRow'
import StatusCardModal from '@/components/aurora/StatusCardModal'
import Card from '@/components/ui/Card'
import Callout from '@/components/ui/Callout'

const REQUESTS = [
  { id: '#2041', type: 'deposit', network: 'BEP-20', date: 'Jun 20, 2026', amount: '500.00 USDT',   points: '+50,000 AP', txHash: '0xabc123def456abc123def456abc123de', wallet: '0xSender1', status: 'completed' },
  { id: '#2038', type: 'deposit', network: 'BEP-20', date: 'Jun 14, 2026', amount: '1,200.00 USDT', points: '+120,000 AP', txHash: '0x9f8e7d6c5b4a3210',                wallet: '0xSender2', status: 'completed' },
  { id: '#2031', type: 'deposit', network: 'ERC-20', date: 'May 29, 2026', amount: '2,000.00 USDT', points: '+200,000 AP', txHash: '0x1234567890abcdef',                wallet: '0xSender3', status: 'verifying' },
  { id: '#2019', type: 'deposit', network: 'BEP-20', date: 'May 10, 2026', amount: '800.00 USDT',   points: '+80,000 AP',  txHash: '0xfedcba0987654321',                wallet: '0xSender4', status: 'completed' },
]

export default function VaultPage() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <VaultHero
        balance="84,250"
        currency="AP"
        subtitle="1 USDT = 100 Aurora Points"
      />

      <div className="grid-auto">
        <KpiTile label="Total topped up"    value="4,500.00" unit="USDT" />
        <KpiTile label="Pending requests"   value="1"        />
        <KpiTile label="Aura XP lent"       value="320.00"   unit="XP"   />
        <KpiTile label="Available to lend"  value="522.50"   unit="XP"   />
      </div>

      <Callout variant="info" icon="info">
        Top-ups are credited after our finance team verifies your transfer. Approval usually completes within a few hours — you&apos;ll see each request&apos;s status below.
      </Callout>

      <Card title="Top-up requests">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid var(--c-divider)', marginBottom: 4 }}>
          <span />
          <span style={{ font: '400 12px/1 var(--font-body)', color: 'var(--c-muted)' }}>Tap a request for details</span>
        </div>
        {REQUESTS.map((r, i) => (
          <TransactionRow key={i} {...r} onClick={() => setSelected(r)} />
        ))}
      </Card>

      <StatusCardModal
        open={selected != null}
        onClose={() => setSelected(null)}
        request={selected}
      />
    </>
  )
}
