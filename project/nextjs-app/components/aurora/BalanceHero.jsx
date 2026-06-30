import Button from '@/components/ui/Button'

/**
 * Always-dark hero balance card.
 * @param {{ eyebrow?: string, balance: string, currency?: string, subtitle?: string, delta?: string, variant?: 'default'|'violet'|'green', actions?: Array<{label: string, variant?: string, icon?: string, onClick?: Function}> }} props
 */
export default function BalanceHero({ eyebrow = 'Total balance', balance, currency, subtitle, delta, variant = 'default', actions = [] }) {
  return (
    <div className={`hero${variant !== 'default' ? ` ${variant}` : ''}`} data-theme="dark">
      <div className="hero-bloom" aria-hidden="true" />
      <div className="hero-bloom right teal" aria-hidden="true" />
      <div className="hero-inner">
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
