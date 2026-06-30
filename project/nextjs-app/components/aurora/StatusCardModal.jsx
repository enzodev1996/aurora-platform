'use client'
import { useEffect } from 'react'
import { Icon } from '@/lib/icons'

const STATUS_CONFIG = {
  completed: { bg: 'rgba(187,247,208,0.14)', color: 'var(--c-pos-ink)', dot: '#3FB984', label: 'Completed', icon: 'check-big' },
  approved:  { bg: 'rgba(187,247,208,0.14)', color: 'var(--c-pos-ink)', dot: '#3FB984', label: 'Approved',  icon: 'check-big' },
  pending:   { bg: 'rgba(253,230,138,0.12)', color: 'var(--c-amber-ink)', dot: '#FDE68A', label: 'Pending approval', icon: 'clock-big' },
  verifying: { bg: 'rgba(253,230,138,0.12)', color: 'var(--c-amber-ink)', dot: '#FDE68A', label: 'Under verification', icon: 'clock-big' },
  rejected:  { bg: 'rgba(248,113,113,0.12)', color: '#FCA5A5', dot: '#F87171', label: 'Rejected', icon: 'x-big' },
}

/**
 * @param {{
 *   open: boolean
 *   onClose: Function
 *   request: { id?: string, amount: string, network?: string, txHash?: string, wallet?: string, date: string, status: string, reason?: string, points?: string }
 * }} props
 */
export default function StatusCardModal({ open, onClose, request }) {
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open || !request) return null

  const statusKey = (request.status || '').toLowerCase()
  const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending
  const isRejected = statusKey === 'rejected'

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(5,3,12,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ width: 420, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', background: 'var(--c-modal)', border: '1px solid var(--c-border)', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px 8px' }}>
          <span style={{ font: "700 17px/1.1 'Sulphur Point'", letterSpacing: '-0.01em', color: 'var(--c-text)' }}>
            Request {request.id || '#—'}
          </span>
          <button onClick={onClose} style={{ width: 32, height: 32, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', borderRadius: 9999 }}>
            <Icon name="close" />
          </button>
        </div>

        <div style={{ padding: '8px 22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status icon + badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '8px 0 4px' }}>
            <div style={{ width: 58, height: 58, borderRadius: '50%', background: cfg.bg, color: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={cfg.icon} style={{ width: 26, height: 26 }} />
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 9999, background: cfg.bg, color: cfg.color, font: '500 12px/1 Inter' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot }} />
              {cfg.label}
            </span>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: 16, borderRadius: 12, background: 'var(--c-elevated)', border: '1px solid var(--c-border)' }}>
            {[
              ['Amount', request.amount],
              request.points && ['Aura Points', request.points, cfg.color],
              ['Network', request.network || 'BEP-20'],
              request.txHash && ['TX hash', request.txHash, null, true],
              request.wallet && ['Wallet', request.wallet, null, true],
              ['Submitted', request.date],
            ].filter(Boolean).map(([k, v, color, wrap]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: wrap ? 16 : 0, font: '400 13px/1 Inter' }}>
                <span style={{ color: 'var(--c-muted)', flex: wrap ? 'none' : undefined }}>{k}</span>
                <span style={{ color: color || 'var(--c-text)', wordBreak: wrap ? 'break-all' : undefined, textAlign: wrap ? 'right' : undefined, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Rejection reason */}
          {isRejected && request.reason && (
            <div style={{ display: 'flex', gap: 10, padding: '13px 14px', borderRadius: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.22)' }}>
              <span style={{ flex: 'none', color: '#FCA5A5', display: 'flex' }}><Icon name="info" /></span>
              <div>
                <div style={{ font: '500 12px/1.3 Inter', color: '#FCA5A5' }}>Reason for rejection</div>
                <div style={{ font: '400 12px/1.5 Inter', color: '#E9A8A8', marginTop: 5 }}>{request.reason}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
