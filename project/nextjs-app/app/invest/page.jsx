import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Callout from '@/components/ui/Callout'
import ProjectCard from '@/components/aurora/ProjectCard'

const PROJECTS = [
  {
    title: 'GreenSolar PH',
    location: 'Cebu City',
    category: 'Renewable Energy',
    raisedPct: 72,
    raised: '₱2.1M',
    goal: '₱3M',
    investors: 142,
    risk: 'low',
    status: 'Funding',
    daysLeft: 18,
    notice: 'Fixed 8% p.a. · 90-day term',
    gradient: 'linear-gradient(135deg, #0c2218 0%, #0e4a2a 60%, #2AD9B7 100%)',
  },
  {
    title: 'AquaFarm Co.',
    location: 'Davao',
    category: 'Agriculture',
    raisedPct: 55,
    raised: '₱880K',
    goal: '₱1.6M',
    investors: 89,
    risk: 'medium',
    status: 'Funding',
    daysLeft: 31,
    notice: 'Variable yield · 120-day term',
  },
  {
    title: 'TechHub Manila',
    location: 'Manila',
    category: 'Technology',
    raisedPct: 91,
    raised: '₱4.5M',
    goal: '₱5M',
    investors: 310,
    risk: 'low',
    status: 'Funded',
    daysLeft: 0,
    notice: 'Fixed 9% p.a. · 90-day term',
    gradient: 'linear-gradient(135deg, #1a0c2e 0%, #7828E8 60%, #4C9ED9 100%)',
  },
  {
    title: 'Island Resort PH',
    location: 'Palawan',
    category: 'Tourism',
    raisedPct: 38,
    raised: '₱1.2M',
    goal: '₱3.2M',
    investors: 54,
    risk: 'medium',
    status: 'Funding',
    daysLeft: 44,
    notice: 'Variable yield · 120-day term',
    gradient: 'linear-gradient(135deg, #0c1a2e 0%, #2F6BD8 60%, #4C9ED9 100%)',
  },
]

export default function InvestPage() {
  return (
    <>
      <Callout variant="info" icon="info">
        Invest Aurora Points (AP) in curated projects. 100 AP = 1 Aura XP = $1 USDT ≈ ₱58.
        SecureNest projects offer guaranteed returns; TrustBox projects are non-guaranteed but higher yield.
      </Callout>

      <div className="grid-cards">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </>
  )
}
