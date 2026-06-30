const VARIANT_STYLES = {
  success:   { background: 'var(--c-pos-bg)',                 color: 'var(--c-pos-ink)' },
  warn:      { background: 'rgba(253,211,77,0.12)',           color: '#FCD34D'          },
  error:     { background: 'rgba(248,113,113,0.12)',          color: '#FCA5A5'          },
  neutral:   { background: 'var(--c-elevated)',               color: 'var(--c-muted)'   },
  violet:    { background: 'rgba(120,40,232,0.14)',           color: 'var(--c-violet)', border: '1px solid rgba(120,40,232,0.3)' },
  pending:   { background: 'rgba(180,83,9,0.12)',             color: '#FCD34D'          },
  info:      { background: 'rgba(47,107,216,0.12)',           color: 'var(--c-info-ink)'},
}

/**
 * @param {{ variant?: 'success'|'warn'|'error'|'neutral'|'violet'|'pending'|'info', children: React.ReactNode, className?: string }} props
 */
export default function Badge({ variant = 'neutral', children, className = '' }) {
  const s = VARIANT_STYLES[variant] ?? VARIANT_STYLES.neutral
  return (
    <span
      className={`chip ${className}`}
      style={{ ...s, cursor: 'default', fontSize: 11, padding: '4px 10px' }}
    >
      {children}
    </span>
  )
}
