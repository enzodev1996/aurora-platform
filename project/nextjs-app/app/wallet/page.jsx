import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Callout from '@/components/ui/Callout'
import QrBlock from '@/components/aurora/QrBlock'

const ADDR = '0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a'

export default function WalletPage() {
  return (
    <>
      {/* Balances */}
      <Card>
        <div className="card-head">
          <span className="card-title">Wallet</span>
        </div>
        <div className="eyebrow" style={{ color: 'var(--c-muted)' }}>Cash balance</div>
        <div className="balance" style={{ fontSize: 40, marginTop: 8, color: 'var(--c-text)' }}>₱84,250.00</div>
        <div className="tile" style={{ marginTop: 16, justifyContent: 'space-between' }}>
          <span className="muted">Token holdings</span>
          <span>
            <span className="tabular" style={{ font: '600 16px var(--font-body)' }}>1,240.50</span>{' '}
            <span className="muted">AUR</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <Button variant="accent" icon="in" style={{ flex: 1 }}>Deposit</Button>
          <Button variant="secondary" icon="out" style={{ flex: 1 }}>Redeem</Button>
        </div>
      </Card>

      {/* Deposit address */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card-title">Deposit USDT</div>
        <QrBlock address={ADDR} network="Binance Smart Chain (BEP-20)" />
        <Callout variant="warn">
          Send only USDT on the selected network. Wrong-network transfers may not be recoverable.
        </Callout>
      </Card>

      {/* USDT asset detail */}
      <Card>
        <div className="tile" style={{ border: 'none', padding: 0, background: 'transparent' }}>
          <span
            className="row-icon"
            style={{ background: 'rgba(38,161,123,0.16)', color: '#26A17B', font: '700 14px var(--font-body)', flexShrink: 0 }}
          >
            T
          </span>
          <div className="row-main">
            <div className="row-title">Tether USD</div>
            <div className="row-sub">USDT · Stablecoin</div>
          </div>
        </div>
        <div className="eyebrow" style={{ marginTop: 18, color: 'var(--c-muted)' }}>Balance</div>
        <div className="balance" style={{ fontSize: 34, marginTop: 6, color: 'var(--c-text)' }}>
          12,480.50{' '}
          <span className="muted" style={{ font: '500 18px var(--font-body)' }}>USDT</span>
        </div>
      </Card>
    </>
  )
}
