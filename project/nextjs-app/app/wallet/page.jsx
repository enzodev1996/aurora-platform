import Card from '@/components/ui/Card'
import QrBlock from '@/components/aurora/QrBlock'
import WalletActions from '@/components/aurora/WalletActions'
import UsdtCard from '@/components/aurora/UsdtCard'

const ADDR = '0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a'

export default function WalletPage() {
  return (
    <>
      {/* Wallet balance hero */}
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
        <WalletActions />
      </Card>

      {/* USDT asset card */}
      <UsdtCard balance="12,480.50" />

      {/* Deposit address */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div className="card-title">Deposit address</div>
          <div className="muted" style={{ font: '400 12px/1.3 var(--font-body)', marginTop: 5 }}>Network · Binance Network (BEP-20)</div>
        </div>
        <QrBlock address={ADDR} />
      </Card>
    </>
  )
}
