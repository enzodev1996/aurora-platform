import Button from '@/components/ui/Button'

const SPARK_DATA = [22, 20, 24, 21, 27, 24, 29, 26, 32, 30, 35, 32, 38, 41, 39, 45, 42, 49, 54, 60, 64, 70, 78]

function Sparkline() {
  const W = 440, H = 110, pad = 6
  const min = Math.min(...SPARK_DATA), max = Math.max(...SPARK_DATA)
  const range = max - min || 1
  const pts = SPARK_DATA.map((v, i) => {
    const x = (i / (SPARK_DATA.length - 1)) * W
    const y = H - pad - ((v - min) / range) * (H - pad * 2)
    return [x, y]
  })
  const linePath = 'M ' + pts.map(([x, y]) => `${x},${y}`).join(' L ')
  const areaPath = linePath + ` L ${W},${H} L 0,${H} Z`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7828E8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7828E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fill)" />
      <path d={linePath} fill="none" stroke="#9B59E8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
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
