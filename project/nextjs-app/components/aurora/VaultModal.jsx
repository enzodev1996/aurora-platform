'use client'
import { useState, useEffect, useRef } from 'react'
import { Icon } from '@/lib/icons'
import { fmt, fmt2 } from '@/lib/format'

const VAULT_ADDR = '0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a'

function ModalShell({ open, onClose, title, subtitle, step, totalSteps, children }) {
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(5,3,12,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ width: 480, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', background: 'var(--c-modal)', border: '1px solid var(--c-border)', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 22px 16px' }}>
          <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 10, background: 'rgba(120,40,232,0.16)', color: 'var(--c-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "700 17px/1.1 'Sulphur Point'", letterSpacing: '-0.01em', color: 'var(--c-text)' }}>{title}</div>
            {subtitle && <div style={{ font: '400 12px/1.3 Inter', color: 'var(--c-muted)', marginTop: 3 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', borderRadius: 9999 }}>
            <Icon name="close" />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 22px 18px' }}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <span key={i} style={{ flex: 1, height: 3, borderRadius: 9999, background: i <= step ? 'var(--c-accent)' : 'var(--c-elevated)' }} />
          ))}
        </div>
        <div style={{ padding: '0 22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * @param {{ open: boolean, onClose: Function }} props
 */
export default function VaultModal({ open, onClose }) {
  const [step, setStep]       = useState(0)
  const [copiedAddr, setCopiedAddr] = useState(false)
  const [rawAmt, setRawAmt]   = useState('')
  const [txHash, setTxHash]   = useState('')
  const [wallet, setWallet]   = useState('')
  const [file, setFile]       = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  function reset() {
    setStep(0); setCopiedAddr(false); setRawAmt(''); setTxHash(''); setWallet(''); setFile(null); setDragOver(false); setSubmitted(false)
  }
  function handleClose() { onClose(); setTimeout(reset, 200) }

  const amount = parseFloat(rawAmt) || 0
  const points = Math.round(amount * 100)
  const formValid = amount >= 10 && txHash.trim() && wallet.trim()
  const CHIPS = [100, 500, 1000, 5000]

  function copyAddr() {
    navigator.clipboard.writeText(VAULT_ADDR).then(() => {
      setCopiedAddr(true); setTimeout(() => setCopiedAddr(false), 2000)
    })
  }

  function handleFile(f) {
    if (f && f.type.startsWith('image/')) setFile(f)
  }

  function submitVault() {
    setStep(3)
    setTimeout(() => setSubmitted(true), 1500)
  }

  return (
    <ModalShell
      open={open}
      onClose={handleClose}
      title="Top up Aura Vault"
      subtitle="1 USDT = 100 Aurora Points"
      step={step}
      totalSteps={4}
    >
      {/* Step 0 — instructions */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ font: '400 13px/1.6 Inter', color: 'var(--c-muted)' }}>Add Aura Points by transferring USDT from your own wallet to the Aura Vault address below, then submit your transaction details for verification.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Send USDT from your wallet to the Aura Vault receiving address.',
              'Copy your transaction hash, amount, and sending wallet address.',
              'Upload a screenshot as proof and submit for finance review.',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ width: 24, height: 24, flex: 'none', borderRadius: 9999, background: 'var(--c-elevated)', border: '1px solid var(--c-border)', color: 'var(--c-violet)', font: '600 12px/1 Inter', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-text)', opacity: 0.85 }}>{text}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>Aura Vault receiving address · BEP-20</div>
            <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '12px 14px', font: '400 12px/1.5 Inter', color: 'var(--c-text)', wordBreak: 'break-all' }}>{VAULT_ADDR}</div>
          </div>

          <button type="button" className="btn btn-secondary full" onClick={copyAddr}>
            <Icon name="copy" />{copiedAddr ? 'Copied!' : 'Copy address'}
          </button>

          <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.22)' }}>
            <span style={{ flex: 'none', color: '#FCA5A5', display: 'flex' }}><Icon name="shield" /></span>
            <div style={{ font: '500 12px/1.5 Inter', color: '#FCA5A5' }}>Send only USDT on the BEP-20 network to this exact address. Wrong-network or wrong-address transfers may not be recoverable.</div>
          </div>

          <button type="button" className="btn btn-accent full" onClick={() => setStep(1)}>
            I&apos;ve sent the funds <Icon name="arrow" />
          </button>
        </div>
      )}

      {/* Step 1 — form */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>USDT amount sent</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: '0 16px', height: 48 }}>
              <input
                type="text"
                inputMode="decimal"
                value={rawAmt}
                onChange={(e) => setRawAmt(e.target.value)}
                placeholder="0"
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', font: '600 17px/1 Inter', color: 'var(--c-text)' }}
              />
              <span style={{ font: '500 14px/1 Inter', color: 'var(--c-muted)' }}>USDT</span>
            </div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 9 }}>
              {CHIPS.map((v) => (
                <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setRawAmt(String(v))}>
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            {amount >= 10 && (
              <div style={{ font: '400 12px/1.3 Inter', color: 'var(--c-violet)', marginTop: 10 }}>You&apos;ll receive {fmt(points).toLocaleString()} AP</div>
            )}
          </div>

          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>Transaction hash (TX hash)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: '0 16px', height: 46 }}>
              <span style={{ flex: 'none', color: 'var(--c-muted)', display: 'flex' }}><Icon name="hash" /></span>
              <input
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x… transaction hash"
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', font: '400 13px/1 Inter', color: 'var(--c-text)' }}
              />
            </div>
          </div>

          <div>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 8 }}>Your wallet address (sender)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: '0 16px', height: 46 }}>
              <span style={{ flex: 'none', color: 'var(--c-muted)', display: 'flex' }}><Icon name="wallet" /></span>
              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x… your sending address"
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', font: '400 13px/1 Inter', color: 'var(--c-text)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(0)}>Back</button>
            <button type="button" className="btn btn-accent" style={{ flex: 2 }} disabled={!formValid} onClick={() => setStep(2)}>Continue</button>
          </div>
        </div>
      )}

      {/* Step 2 — upload screenshot */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-muted)' }}>Upload a screenshot of your completed transaction as proof of payment.</div>

          {!file ? (
            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', padding: '34px 20px', border: `1.5px dashed ${dragOver ? 'var(--c-accent)' : 'var(--c-border)'}`, borderRadius: 14, background: dragOver ? 'rgba(42,217,183,0.05)' : 'transparent', cursor: 'pointer', transition: 'border-color .15s ease, background-color .15s ease' }}
            >
              <span style={{ width: 52, height: 52, borderRadius: 9999, background: 'rgba(42,217,183,0.10)', color: 'var(--c-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="upload-cloud" style={{ width: 24, height: 24 }} />
              </span>
              <div style={{ font: '500 14px/1.3 Inter', color: 'var(--c-text)' }}>Drag &amp; drop your screenshot here</div>
              <div style={{ font: '400 12px/1.3 Inter', color: 'var(--c-muted)' }}>or <span style={{ color: 'var(--c-accent)' }}>browse files</span> · PNG, JPG up to 10MB</div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} style={{ display: 'none' }} />
            </label>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid var(--c-border)', borderRadius: 12, background: 'var(--c-elevated)' }}>
              <img src={URL.createObjectURL(file)} alt="proof" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '500 13px/1.2 Inter', color: 'var(--c-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                <div style={{ font: '400 12px/1.3 Inter', color: 'var(--c-pos-ink)', marginTop: 4 }}>✓ Uploaded</div>
              </div>
              <button type="button" onClick={() => setFile(null)} style={{ background: 'transparent', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', display: 'flex', padding: 4 }}>
                <Icon name="trash" />
              </button>
            </div>
          )}

          <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
              <span style={{ color: 'var(--c-muted)' }}>Amount</span>
              <span style={{ color: 'var(--c-text)' }}>{fmt2(amount)} USDT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
              <span style={{ color: 'var(--c-muted)' }}>Aurora Points</span>
              <span style={{ color: 'var(--c-violet)' }}>+{fmt(points)} AP</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
            <button type="button" className="btn btn-accent" style={{ flex: 2 }} onClick={submitVault}>Submit request</button>
          </div>
        </div>
      )}

      {/* Step 3 — status */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {!submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '10px 6px 4px' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid var(--c-border)', borderTopColor: 'var(--c-accent)', animation: 'auroraSpin .9s linear infinite' }} />
              <div style={{ font: "700 20px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Verifying your top-up</div>
              <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 300 }}>Our finance team is checking your transaction hash, amount, wallet address, and proof.</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '8px 6px 2px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-warn-bg)', color: 'var(--c-amber-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="clock-big" style={{ width: 28, height: 28 }} />
                </div>
                <div style={{ font: "700 22px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Request submitted</div>
                <div style={{ font: '400 14px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 320 }}>Your top-up request is pending finance team review. Aurora Points are credited once your transfer is verified, usually within a few hours.</div>
              </div>

              <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Amount', `${fmt2(amount)} USDT`], ['Aurora Points', `+${fmt(points)} AP`, 'var(--c-violet)'], ['Network', 'BEP-20'], ['Status', 'Pending review', 'var(--c-amber-ink)']].map(([k, v, color]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                    <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                    <span style={{ color: color || 'var(--c-text)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <button type="button" className="btn btn-accent full" onClick={handleClose}>Done</button>
            </>
          )}
        </div>
      )}
    </ModalShell>
  )
}
