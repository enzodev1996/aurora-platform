'use client'
import { useState } from 'react'
import TransactionModal from './TransactionModal'

const NETWORKS = ['Ethereum', 'Binance Network', 'Solana', 'Polygon', 'Base']

/**
 * @param {{ balance: string }} props
 */
export default function UsdtCard({ balance }) {
  const [flow, setFlow] = useState(null)

  return (
    <>
      <div style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 9999, background: 'rgba(38,161,123,0.16)', color: '#26A17B', font: '700 16px/1 var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>T</span>
          <div>
            <div style={{ font: '500 16px/1.2 var(--font-body)', color: 'var(--c-text)' }}>Tether USD</div>
            <div style={{ font: '400 12px/1.3 var(--font-body)', color: 'var(--c-muted)', marginTop: 3 }}>USDT · Stablecoin</div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ font: '400 12px/1 var(--font-body)', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Balance</div>
          <div style={{ font: "700 38px/1.1 'Sulphur Point'", letterSpacing: '-0.02em', color: 'var(--c-text)', marginTop: 10, fontVariantNumeric: 'tabular-nums' }}>{balance}</div>
          <div style={{ font: '400 14px/1.4 var(--font-body)', color: 'var(--c-muted)', marginTop: 4 }}>≈ ${balance} USD</div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button type="button" className="btn btn-accent" style={{ flex: 1 }} onClick={() => setFlow('topup')}>
            Top up
          </button>
          <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setFlow('withdraw')}>
            Withdraw
          </button>
        </div>

        <div style={{ marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--c-border)' }}>
          <div style={{ font: '400 11px/1 var(--font-body)', color: 'var(--c-muted)' }}>Supported networks</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            {NETWORKS.map((n) => (
              <span key={n} style={{ font: '400 11px/1 var(--font-body)', color: 'var(--c-muted)', background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: '6px 12px' }}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <TransactionModal flow={flow ?? 'topup'} open={flow != null} onClose={() => setFlow(null)} />
    </>
  )
}
