'use client'
import Button from '@/components/ui/Button'
import { ChartContainer } from '@/components/ui/chart'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'

const SPARK_DATA = [
  { v: 22 }, { v: 20 }, { v: 24 }, { v: 21 }, { v: 27 }, { v: 24 },
  { v: 29 }, { v: 26 }, { v: 32 }, { v: 30 }, { v: 35 }, { v: 32 },
  { v: 38 }, { v: 41 }, { v: 39 }, { v: 45 }, { v: 42 }, { v: 49 },
  { v: 54 }, { v: 60 }, { v: 64 }, { v: 70 }, { v: 78 },
]

const CHART_CONFIG = {
  v: { color: '#9B59E8' },
}

function Sparkline() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', pointerEvents: 'none' }}
    >
      <ChartContainer config={CHART_CONFIG} style={{ width: '100%', height: '100%' }}>
        <AreaChart data={SPARK_DATA} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7828E8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7828E8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="#9B59E8"
            strokeWidth={2}
            fill="url(#sparkGradient)"
            dot={false}
            isAnimationActive={false}
          />
          <Tooltip content={() => null} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

/**
 * Always-dark hero balance card.
 * @param {{ eyebrow?: string, balance: string, currency?: string, subtitle?: string, delta?: string, variant?: 'default'|'violet'|'green', sparkline?: boolean, actions?: Array<{label: string, variant?: string, icon?: string, onClick?: Function}> }} props
 */
export default function BalanceHero({ eyebrow = 'Total balance', balance, currency, subtitle, delta, variant = 'default', sparkline = false, actions = [] }) {
  return (
    <div className={`hero${variant !== 'default' ? ` ${variant}` : ''}`} data-theme="dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-bloom" aria-hidden="true" />
      <div className="hero-bloom right teal" aria-hidden="true" />
      {sparkline && <Sparkline />}
      <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <div className="balance sm" style={{ marginTop: 8 }}>
          {balance}{currency && <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 8, opacity: 0.7 }}>{currency}</span>}
        </div>
        {(subtitle || delta) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            {delta  && <span className="delta">+{delta}</span>}
            {subtitle && <span style={{ font: '400 13px/1 var(--font-body)', color: '#C0C2CB' }}>{subtitle}</span>}
          </div>
        )}
        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {actions.map((a, i) => (
              <Button key={i} variant={a.variant ?? (i === 0 ? 'accent' : 'secondary')} icon={a.icon} onClick={a.onClick}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
