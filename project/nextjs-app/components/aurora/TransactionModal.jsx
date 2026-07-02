'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@/lib/icons'
import { fmt2 } from '@/lib/format'

const USDT_ADDR = '0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a'

function qrSvg(seed) {
  const size = 25, cell = 8
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  function rand() { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296 }
  function inBox(x, y, bx, by) { return x >= bx && x < bx + 7 && y >= by && y < by + 7 }
  function isFinder(x, y) { return inBox(x, y, 0, 0) || inBox(x, y, size - 7, 0) || inBox(x, y, 0, size - 7) }
  const dim = size * cell
  const parts = [`<rect x="0" y="0" width="${dim}" height="${dim}" fill="#fff"/>`]
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinder(x, y)) continue
      if (rand() > 0.52) parts.push(`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#090916"/>`)
    }
  }
  function finder(bx, by) {
    return `<rect x="${bx*cell}" y="${by*cell}" width="${7*cell}" height="${7*cell}" fill="#090916"/>` +
      `<rect x="${(bx+1)*cell}" y="${(by+1)*cell}" width="${5*cell}" height="${5*cell}" fill="#fff"/>` +
      `<rect x="${(bx+2)*cell}" y="${(by+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#090916"/>`
  }
  parts.push(finder(0, 0), finder(size-7, 0), finder(0, size-7))
  return `<svg viewBox="0 0 ${dim} ${dim}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
}

function ModalShell({ open, onClose, title, step, totalSteps, width, children }) {
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(5,3,12,0.66)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ width: width || 440, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', background: 'var(--c-modal)', border: '1px solid var(--c-border)', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px 16px' }}>
          <span style={{ font: "700 17px/1.1 'Sulphur Point'", letterSpacing: '-0.01em', color: 'var(--c-text)' }}>{title}</span>
          <button onClick={onClose} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', borderRadius: 9999 }}>
            <Icon name="close" />
          </button>
        </div>
        {totalSteps > 1 && (
          <div style={{ display: 'flex', gap: 6, padding: '0 22px 18px' }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <span key={i} style={{ flex: 1, height: 3, borderRadius: 9999, background: i <= step ? 'var(--c-accent)' : 'var(--c-elevated)' }} />
            ))}
          </div>
        )}
        <div style={{ padding: '4px 22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── Top-up flow (3 steps) ── */
function TopupModal({ open, onClose }) {
  const [step, setStep]             = useState(0)
  const [rawAmt, setRawAmt]         = useState('')
  const [txHash, setTxHash]         = useState('')
  const [copiedAddr, setCopiedAddr] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  function reset() { setStep(0); setRawAmt(''); setTxHash(''); setCopiedAddr(false); setSubmitted(false) }
  function handleClose() { onClose(); setTimeout(reset, 200) }

  const amount = parseFloat(rawAmt) || 0
  const amtErr = rawAmt && amount < 10 ? 'Minimum deposit is 10 USDT' : ''
  const amtOk  = amount >= 10

  function copyAddr() {
    navigator.clipboard.writeText(USDT_ADDR).then(() => {
      setCopiedAddr(true); setTimeout(() => setCopiedAddr(false), 2000)
    })
  }

  function submitRequest() {
    setStep(2)
    setTimeout(() => setSubmitted(true), 1500)
  }

  const CHIPS = [100, 500, 1000, 5000]

  return (
    <ModalShell open={open} onClose={handleClose} title="Add funds" step={step} totalSteps={3} width={440}>
      {/* Step 0 — amount */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ font: '400 12px/1 Inter', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Amount to deposit</div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 16 }}>
              <input
                type="text"
                inputMode="decimal"
                value={rawAmt}
                onChange={(e) => setRawAmt(e.target.value)}
                placeholder="0"
                style={{ width: 150, background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', font: "700 44px/1 'Sulphur Point'", color: 'var(--c-text)', padding: 0 }}
              />
              <span style={{ font: '500 18px/1 Inter', color: 'var(--c-muted)' }}>USDT</span>
            </div>
            {!amtErr && amount > 0 && <div style={{ font: '400 13px/1.3 Inter', color: 'var(--c-muted)', marginTop: 8 }}>≈ ${fmt2(amount)} USD</div>}
            {amtErr && <div style={{ font: '400 12px/1.3 Inter', color: '#F87171', marginTop: 8 }}>{amtErr}</div>}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CHIPS.map((v) => (
              <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setRawAmt(String(v))}>
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-accent full" disabled={!amtOk} onClick={() => setStep(1)}>Continue</button>
        </div>
      )}

      {/* Step 1 — deposit address + TX hash */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, background: 'var(--c-elevated)', border: '1px solid var(--c-border)' }}>
            <div>
              <div style={{ font: '400 11px/1 Inter', color: 'var(--c-muted)' }}>You're depositing</div>
              <div style={{ font: '600 17px/1.2 Inter', color: 'var(--c-text)', marginTop: 5 }}>{fmt2(amount)} USDT</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ font: '400 11px/1 Inter', color: 'var(--c-muted)' }}>Channel</div>
              <div style={{ font: '500 13px/1.2 Inter', color: 'var(--c-text)', marginTop: 5 }}>USDT</div>
            </div>
          </div>

          <div style={{ alignSelf: 'center', width: 172, height: 172, background: '#fff', borderRadius: 14, padding: 11 }} dangerouslySetInnerHTML={{ __html: qrSvg(USDT_ADDR) }} />
          <div style={{ font: '400 12px/1.3 Inter', color: 'var(--c-muted)', textAlign: 'center' }}>Scan the QR or copy the receiving address below</div>

          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>Receiving wallet address</div>
            <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '12px 14px', font: '400 12px/1.5 Inter', color: 'var(--c-text)', wordBreak: 'break-all' }}>{USDT_ADDR}</div>
          </div>

          <button type="button" className="btn btn-secondary full" onClick={copyAddr}>
            <Icon name="copy" />{copiedAddr ? 'Copied!' : 'Copy address'}
          </button>

          <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'var(--c-warn-bg)', border: '1px solid var(--c-warn-border)' }}>
            <span style={{ flex: 'none', color: 'var(--c-amber-ink)', display: 'flex' }}><Icon name="shield" /></span>
            <div style={{ font: '500 12px/1.5 Inter', color: 'var(--c-warn-body)' }}>Send only USDT to this address. Wrong-asset transfers may not be recoverable.</div>
          </div>

          <div style={{ height: 1, background: 'var(--c-border)' }} />
          <div style={{ font: '400 12px/1.4 Inter', color: 'var(--c-muted)' }}>After sending, confirm your transfer so our team can verify and credit your wallet.</div>

          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>Transaction hash</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: '0 16px', height: 46 }}>
              <span style={{ flex: 'none', color: 'var(--c-muted)', display: 'flex' }}><Icon name="hash" /></span>
              <input
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x… or transaction ID"
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', font: '400 13px/1 Inter', color: 'var(--c-text)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(0)}>Back</button>
            <button type="button" className="btn btn-accent" style={{ flex: 2 }} disabled={!txHash.trim()} onClick={submitRequest}>Submit request</button>
          </div>
        </div>
      )}

      {/* Step 2 — status */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '14px 6px 8px' }}>
          {!submitted ? (
            <>
              <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid var(--c-border)', borderTopColor: 'var(--c-accent)', animation: 'auroraSpin .9s linear infinite' }} />
              <div style={{ font: "700 20px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Submitting your request</div>
              <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 300 }}>Sending your transfer details for {fmt2(amount)} USDT.</div>
            </>
          ) : (
            <>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-warn-bg)', color: 'var(--c-amber-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="clock-big" style={{ width: 28, height: 28 }} />
              </div>
              <div style={{ font: "700 22px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Request submitted</div>
              <div style={{ font: '400 14px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 320 }}>Your deposit of {fmt2(amount)} USDT is pending admin approval. We'll verify your transaction and credit your wallet, usually within a few hours.</div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4, padding: 14, borderRadius: 10, background: 'var(--c-elevated)', border: '1px solid var(--c-border)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                  <span style={{ color: 'var(--c-muted)' }}>Amount</span>
                  <span style={{ color: 'var(--c-text)' }}>{fmt2(amount)} USDT</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                  <span style={{ color: 'var(--c-muted)' }}>Channel</span>
                  <span style={{ color: 'var(--c-text)' }}>USDT</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, font: '400 13px/1 Inter' }}>
                  <span style={{ color: 'var(--c-muted)', flex: 'none' }}>Tx hash</span>
                  <span style={{ color: 'var(--c-text)', wordBreak: 'break-all', textAlign: 'right' }}>{txHash.length > 20 ? `${txHash.slice(0, 10)}…${txHash.slice(-6)}` : txHash}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                  <span style={{ color: 'var(--c-muted)' }}>Status</span>
                  <span style={{ color: 'var(--c-amber-ink)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-amber-ink)' }} />
                    Pending approval
                  </span>
                </div>
              </div>
              <button type="button" className="btn btn-accent full" style={{ marginTop: 2 }} onClick={handleClose}>Done</button>
            </>
          )}
        </div>
      )}
    </ModalShell>
  )
}

/* ── Withdraw flow ── */
function WithdrawModal({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [rawAmt, setRawAmt] = useState('')
  const AVAIL = 12480.5
  const amount = parseFloat(rawAmt) || 0
  const amtErr = rawAmt && (amount < 10 ? 'Minimum withdrawal is 10 USDT' : amount > AVAIL ? `Max ${fmt2(AVAIL)} USDT available` : '')
  const amtOk = amount >= 10 && amount <= AVAIL
  const CHIPS = [100, 500, 1000, 5000]

  function reset() { setStep(0); setRawAmt('') }
  function handleClose() { onClose(); setTimeout(reset, 200) }

  return (
    <ModalShell open={open} onClose={handleClose} title="Withdraw USDT" step={step} totalSteps={3} width={440}>
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ font: '400 12px/1 Inter', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Amount to withdraw</div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 16 }}>
              <input
                type="text"
                inputMode="decimal"
                value={rawAmt}
                onChange={(e) => setRawAmt(e.target.value)}
                placeholder="0"
                style={{ width: 150, background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', font: "700 44px/1 'Sulphur Point'", color: 'var(--c-text)', padding: 0 }}
              />
              <span style={{ font: '500 18px/1 Inter', color: 'var(--c-muted)' }}>USDT</span>
            </div>
            <div style={{ font: '400 13px/1.3 Inter', color: 'var(--c-muted)', marginTop: 8 }}>{fmt2(AVAIL)} USDT available</div>
            {amtErr && <div style={{ font: '400 12px/1.3 Inter', color: '#F87171', marginTop: 4 }}>{amtErr}</div>}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CHIPS.map((v) => (
              <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setRawAmt(String(v))}>
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-accent full" disabled={!amtOk} onClick={() => setStep(1)}>Continue</button>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-muted)' }}>Confirm the destination address and amount below.</div>
          <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Amount', `${fmt2(amount)} USDT`], ['Network', 'BEP-20'], ['To', `${ADDR_BEP20.slice(0,10)}…${ADDR_BEP20.slice(-6)}`], ['Fee', '~0.80 USDT']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                <span style={{ color: 'var(--c-text)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(0)}>Back</button>
            <button type="button" className="btn btn-accent" style={{ flex: 2 }} onClick={() => setStep(2)}>Withdraw</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '14px 6px 8px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-pos-bg)', color: 'var(--c-pos-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check-big" style={{ width: 28, height: 28 }} />
          </div>
          <div style={{ font: "700 22px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Withdrawal sent</div>
          <div style={{ font: '400 14px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 300 }}>Your withdrawal of {fmt2(amount)} USDT is being processed on-chain.</div>
          <button type="button" className="btn btn-accent full" style={{ marginTop: 2 }} onClick={handleClose}>Done</button>
        </div>
      )}
    </ModalShell>
  )
}

/* ── Redeem flow ── */
function RedeemModal({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [rawAmt, setRawAmt] = useState('')
  const AVAIL = 1240.5
  const amount = parseFloat(rawAmt) || 0
  const amtOk = amount >= 1 && amount <= AVAIL
  const CHIPS = [100, 500, 1000, 1240]

  function reset() { setStep(0); setRawAmt('') }
  function handleClose() { onClose(); setTimeout(reset, 200) }

  return (
    <ModalShell open={open} onClose={handleClose} title="Redeem AUR" step={step} totalSteps={2} width={440}>
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ font: '400 12px/1 Inter', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Amount to redeem</div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 16 }}>
              <input
                type="text"
                inputMode="decimal"
                value={rawAmt}
                onChange={(e) => setRawAmt(e.target.value)}
                placeholder="0"
                style={{ width: 150, background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', font: "700 44px/1 'Sulphur Point'", color: 'var(--c-text)', padding: 0 }}
              />
              <span style={{ font: '500 18px/1 Inter', color: 'var(--c-muted)' }}>AUR</span>
            </div>
            <div style={{ font: '400 13px/1.3 Inter', color: 'var(--c-muted)', marginTop: 8 }}>1,240.50 AUR available</div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CHIPS.map((v) => (
              <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setRawAmt(String(v))}>
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-accent full" disabled={!amtOk} onClick={() => setStep(1)}>Continue</button>
        </div>
      )}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '14px 6px 8px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-pos-bg)', color: 'var(--c-pos-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check-big" style={{ width: 28, height: 28 }} />
          </div>
          <div style={{ font: "700 22px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Redeemed</div>
          <div style={{ font: '400 14px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 300 }}>You redeemed {fmt2(amount)} AUR for cash.</div>
          <button type="button" className="btn btn-accent full" style={{ marginTop: 2 }} onClick={handleClose}>Done</button>
        </div>
      )}
    </ModalShell>
  )
}

/**
 * @param {{ flow: 'topup'|'withdraw'|'redeem', open: boolean, onClose: Function }} props
 */
export default function TransactionModal({ flow, open, onClose }) {
  if (flow === 'topup')    return <TopupModal    open={open} onClose={onClose} />
  if (flow === 'withdraw') return <WithdrawModal  open={open} onClose={onClose} />
  if (flow === 'redeem')   return <RedeemModal    open={open} onClose={onClose} />
  return null
}
