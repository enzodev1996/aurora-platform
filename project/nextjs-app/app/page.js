import BalanceHero from '@/components/aurora/BalanceHero'
import KpiTile from '@/components/aurora/KpiTile'
import TransactionRow from '@/components/aurora/TransactionRow'
import ProjectCard from '@/components/aurora/ProjectCard'
import Card from '@/components/ui/Card'

const RECENT = [
  { type: 'deposit',    network: 'BEP-20', date: 'Jun 20',  amount: '500.00 USDT',   status: 'completed' },
  { type: 'withdrawal', network: 'BEP-20', date: 'Jun 18',  amount: '250.00 USDT',   status: 'pending'   },
  { type: 'deposit',    network: 'BEP-20', date: 'Jun 14',  amount: '1,200.00 USDT', status: 'completed' },
  { type: 'deposit',    network: 'ERC-20', date: 'May 29',  amount: '2,000.00 USDT', status: 'verifying' },
]

const PROJECTS = [
  { title: 'GreenSolar PH', location: 'Cebu', category: 'Renewable', raisedPct: 72, raised: '₱2.1M', goal: '₱3M',   investors: 142, risk: 'low',    status: 'Funding',   daysLeft: 18 },
  { title: 'AquaFarm Co.',  location: 'Davao', category: 'Agri',     raisedPct: 55, raised: '₱880K', goal: '₱1.6M', investors: 89,  risk: 'medium', status: 'Funding',   daysLeft: 31 },
  { title: 'TechHub MNL',  location: 'Manila', category: 'Tech',     raisedPct: 91, raised: '₱4.5M', goal: '₱5M',   investors: 310, risk: 'low',    status: 'Funded',    daysLeft: 0  },
]

export default function DashboardPage() {
  return (
    <>
      <BalanceHero
        eyebrow="Total balance"
        balance="₱84,250.00"
        subtitle="Borealis Finance · Aurora Vault"
        delta="12.4%"
        actions={[
          { label: 'Top up',  icon: 'in',  variant: 'accent'     },
          { label: 'Withdraw', icon: 'out', variant: 'secondary'  },
        ]}
      />

      {/* KPIs */}
      <div className="grid-auto">
        <KpiTile label="USDT Balance"    value="12,480.50" unit="USDT" />
        <KpiTile label="Aurora Points"   value="84,250"    unit="AP"   />
        <KpiTile label="Active Investments" value="3"      />
        <KpiTile label="Pending Requests"   value="1"      />
      </div>

      <div className="grid-auto">
        {/* Recent activity */}
        <Card title="Recent activity">
          {RECENT.map((tx, i) => (
            <TransactionRow key={i} {...tx} />
          ))}
        </Card>

        {/* Assets */}
        <Card title="Your assets">
          <div className="tile" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="row-icon" style={{ background: 'rgba(38,161,123,0.16)', color: '#26A17B', font: '700 14px var(--font-body)', flexShrink: 0 }}>T</div>
              <div>
                <div className="row-title">Tether USD</div>
                <div className="row-sub">USDT · Stablecoin</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="tabular" style={{ font: '600 15px var(--font-body)' }}>12,480.50</div>
              <div className="row-sub">USDT</div>
            </div>
          </div>
          <div className="tile" style={{ justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="row-icon" style={{ background: 'rgba(120,40,232,0.16)', color: '#9B59B6', font: '700 14px var(--font-body)', flexShrink: 0 }}>A</div>
              <div>
                <div className="row-title">Aurora Token</div>
                <div className="row-sub">AUR · Platform token</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="tabular" style={{ font: '600 15px var(--font-body)' }}>1,240.50</div>
              <div className="row-sub">AUR</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Featured projects */}
      <Card title="Featured projects">
        <div className="grid-cards" style={{ marginTop: 4 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </Card>
    </>
  )
}
