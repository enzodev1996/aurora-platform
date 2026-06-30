import VaultHero from '@/components/aurora/VaultHero'
import KpiTile from '@/components/aurora/KpiTile'
import TransactionRow from '@/components/aurora/TransactionRow'
import Card from '@/components/ui/Card'
import Callout from '@/components/ui/Callout'

const REQUESTS = [
  { type: 'deposit', network: 'BEP-20', date: 'Jun 20, 2026', amount: '500.00 USDT',   status: 'completed' },
  { type: 'deposit', network: 'BEP-20', date: 'Jun 14, 2026', amount: '1,200.00 USDT', status: 'completed' },
  { type: 'deposit', network: 'ERC-20', date: 'May 29, 2026', amount: '2,000.00 USDT', status: 'verifying' },
  { type: 'deposit', network: 'BEP-20', date: 'May 10, 2026', amount: '800.00 USDT',   status: 'completed' },
]

export default function VaultPage() {
  return (
    <>
      <VaultHero
        balance="84,250"
        currency="AP"
        subtitle="1 USDT = 100 Aurora Points"
      />

      <div className="grid-auto">
        <KpiTile label="Total topped up"    value="4,500.00" unit="USDT" />
        <KpiTile label="Pending requests"   value="0"        />
        <KpiTile label="Aura XP lent"       value="320.00"   unit="XP"   />
        <KpiTile label="Available to lend"  value="522.50"   unit="XP"   />
      </div>

      <Callout variant="info" icon="info">
        Aura Points are your internal currency. Top up with USDT to receive AP, then lend your Aura XP in investment projects.
      </Callout>

      <Card title="Top-up requests">
        {REQUESTS.map((r, i) => (
          <TransactionRow key={i} {...r} />
        ))}
      </Card>
    </>
  )
}
