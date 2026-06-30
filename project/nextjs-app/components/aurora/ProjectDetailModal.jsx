'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@/lib/icons'
import { fmt, fmt2 } from '@/lib/format'

const ALLOCATIONS = [
  {
    id: 'SecureNest',
    color: '#3FB984',
    icon: '🔒',
    desc: 'Guaranteed return · lower risk · 90-day term',
    callout: 'Aurora Vault guarantees the return of lent Aurora Points.',
  },
  {
    id: 'TrustBox',
    color: '#D97706',
    icon: '📦',
    desc: 'Non-guaranteed return · higher yield · 120-day term',
    callout: 'Aurora Points are not guaranteed and remain subject to associated risks.',
  },
]

const CHIPS_AP = [5000, 20000, 50000, 100000]

function ModalOverlay({ open, onClose, children }) {
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
      {children}
    </div>
  )
}

function StepIndicator({ view }) {
  const steps = ['Allocation', 'Amount', 'Review']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {steps.map((label, i) => {
        const idx = i + 1
        const done = view > idx
        const active = view === idx
        const muted = view < idx
        const bg    = done ? 'var(--c-accent)' : active ? 'var(--c-elevated)' : 'var(--c-elevated)'
        const fg    = done ? 'var(--c-on-accent)' : active ? 'var(--c-text)' : 'var(--c-muted)'
        const ring  = done ? 'var(--c-accent)' : active ? 'var(--c-border-strong)' : 'var(--c-border)'
        const lbl   = done ? 'var(--c-accent)' : active ? 'var(--c-text)' : 'var(--c-muted)'
        const bar   = done ? 'var(--c-accent)' : 'var(--c-elevated)'
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: i < steps.length - 1 ? 10 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 12px/1 Inter', background: bg, color: fg, border: `1.5px solid ${ring}` }}>{idx}</span>
              <span style={{ font: '500 12px/1 Inter', color: lbl }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1.5, borderRadius: 2, background: bar, width: 24 }} />}
          </div>
        )
      })}
    </div>
  )
}

/**
 * @param {{ project: object, open: boolean, onClose: Function }} props
 *
 * project: { title, location, category, risk, raisedPct, raised, goal, investors, daysLeft, apy?, minXp?, summary? }
 */
export default function ProjectDetailModal({ project, open, onClose }) {
  const [view, setView]     = useState(0)  // 0=details, 1=allocation, 2=amount, 3=review, 4=success
  const [alloc, setAlloc]   = useState(null)
  const [rawAmt, setRawAmt] = useState('')
  const [invested, setInvested] = useState(false)

  function reset() { setView(0); setAlloc(null); setRawAmt(''); setInvested(false) }
  function handleClose() { onClose(); setTimeout(reset, 200) }

  if (!project) return null

  const amount = parseFloat(rawAmt) || 0
  const xp = amount / 100
  const allocObj = ALLOCATIONS.find((a) => a.id === alloc)

  const bannerBg = project.category === 'Renewable'
    ? 'linear-gradient(135deg,#0a2218,#0f4a2e)'
    : project.category === 'Agri'
    ? 'linear-gradient(135deg,#1a1a0a,#2a3a0a)'
    : 'linear-gradient(135deg,#0a0a2a,#1a0a3a)'

  function submitInvest() {
    setView(4)
    setTimeout(() => setInvested(true), 800)
  }

  return (
    <ModalOverlay open={open} onClose={handleClose}>
      <div style={{ width: 580, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', background: 'var(--c-modal)', border: '1px solid var(--c-border)', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>

        {/* Banner */}
        <div data-theme="dark" style={{ position: 'relative', height: 150, background: bannerBg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
          <span style={{ font: '700 72px/1 Inter', color: '#fff', opacity: 0.2, userSelect: 'none' }}>
            {project.category === 'Renewable' ? '☀' : project.category === 'Agri' ? '🌱' : '💡'}
          </span>
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 9999, font: '500 11px/1 Inter', background: project.status === 'Funded' ? 'rgba(187,247,208,0.2)' : 'rgba(42,217,183,0.2)', color: project.status === 'Funded' ? '#BBF7D0' : '#2AD9B7', border: '1px solid rgba(42,217,183,0.3)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
              {project.status}
            </span>
          </div>
          <button onClick={handleClose} style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(9,9,22,0.55)', border: '1px solid rgba(255,255,255,0.12)', color: '#F8F8F8', cursor: 'pointer', borderRadius: 9999 }}>
            <Icon name="close" />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Step indicator (shown when not on details) */}
          {view >= 1 && view <= 3 && <StepIndicator view={view} />}

          {/* View 0 — Details */}
          {view === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ font: "700 24px/1.2 'Sulphur Point'", letterSpacing: '-0.01em', color: 'var(--c-text)' }}>{project.title}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {[project.location, project.category].map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 9999, font: '500 12px/1 Inter', background: 'var(--c-elevated)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>{t}</span>
                  ))}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 9999, font: '500 12px/1 Inter', background: project.risk === 'low' ? 'rgba(63,185,132,0.12)' : 'rgba(217,119,6,0.12)', border: `1px solid ${project.risk === 'low' ? 'rgba(63,185,132,0.3)' : 'rgba(217,119,6,0.3)'}`, color: project.risk === 'low' ? '#3FB984' : '#D97706' }}>
                    {project.risk === 'low' ? 'Low risk' : project.risk === 'medium' ? 'Medium risk' : 'High risk'}
                  </span>
                </div>
                {project.summary && (
                  <div style={{ font: '400 14px/1.6 Inter', color: 'var(--c-muted)', marginTop: 14 }}>{project.summary}</div>
                )}
              </div>

              {/* Funding progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 12px/1 Inter', color: 'var(--c-muted)', marginBottom: 10 }}>
                  <span>{project.raised} raised</span>
                  <span>Goal {project.goal}</span>
                </div>
                <div style={{ height: 10, borderRadius: 9999, background: 'var(--c-elevated)', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: `${Math.min(project.raisedPct, 100)}%`, borderRadius: 9999, background: 'linear-gradient(90deg,#2A0F4A,#7828E8,#4C9ED9,#2AD9B7,#5FF0CC)' }} />
                </div>
                <div style={{ font: '500 13px/1 Inter', color: 'var(--c-accent)', marginTop: 8 }}>{project.raisedPct}% funded · {project.investors} investors</div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {[
                  ['Investors', project.investors],
                  ['Days left', project.daysLeft > 0 ? `${project.daysLeft} days` : 'Closed'],
                  ['Target yield', project.apy || '12–15% APY'],
                  ['Min · token', '1,000 AP · 10 XP'],
                ].map(([label, value]) => (
                  <div key={label} style={{ flex: '1 1 118px', background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '13px 14px' }}>
                    <div style={{ font: '400 11px/1 Inter', color: 'var(--c-muted)' }}>{label}</div>
                    <div style={{ font: '500 15px/1 Inter', color: 'var(--c-text)', marginTop: 8 }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Protections */}
              <div>
                <div style={{ font: '500 13px/1 Inter', color: 'var(--c-muted)', marginBottom: 12 }}>Protections</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Escrow protected', 'Verified issuer', 'Quarterly audit'].map((p) => (
                    <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 9999, font: '500 11px/1 Inter', background: 'rgba(63,185,132,0.1)', border: '1px solid rgba(63,185,132,0.25)', color: '#3FB984' }}>
                      <Icon name="check" style={{ width: 12, height: 12 }} />{p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk disclosure */}
              <div style={{ display: 'flex', gap: 10, padding: '13px 14px', borderRadius: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.18)' }}>
                <span style={{ flex: 'none', color: '#FCA5A5', display: 'flex' }}><Icon name="info" /></span>
                <div style={{ font: '400 12px/1.5 Inter', color: '#FCA5A5' }}>Investments in projects carry risk. Returns are not guaranteed. Only invest what you can afford to lose. This is not financial advice.</div>
              </div>

              <button type="button" className="btn btn-accent full" onClick={() => setView(1)}>
                Continue to invest <Icon name="arrow" />
              </button>
            </div>
          )}

          {/* View 1 — Allocation */}
          {view === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ font: '500 13px/1.5 Inter', color: 'var(--c-muted)' }}>Choose how to invest. The two options differ in whether your invested Aura XP is guaranteed.</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {ALLOCATIONS.map((a) => {
                  const on = alloc === a.id
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAlloc(a.id)}
                      style={{ all: 'unset', flex: 1, minWidth: 0, cursor: 'pointer', border: `1.5px solid ${on ? a.color : 'var(--c-border)'}`, background: on ? `${a.color}1A` : 'var(--c-elevated)', borderRadius: 12, padding: 16, transition: 'border-color .15s ease, background-color .15s ease' }}
                    >
                      <span style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}22`, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 18px/1 Inter' }}>{a.icon}</span>
                      <div style={{ font: '600 14px/1.2 Inter', color: 'var(--c-text)', marginTop: 12 }}>{a.id}</div>
                      <div style={{ font: '400 12px/1.4 Inter', color: 'var(--c-muted)', marginTop: 5 }}>{a.desc}</div>
                    </button>
                  )
                })}
              </div>
              {allocObj && (
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'rgba(47,107,216,0.08)', border: '1px solid rgba(47,107,216,0.20)' }}>
                  <span style={{ flex: 'none', color: 'var(--c-info-ink)', display: 'flex' }}><Icon name="info" /></span>
                  <div style={{ font: '400 12px/1.5 Inter', color: 'var(--c-info-ink)' }}>{allocObj.callout}</div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setView(0)}>Back</button>
                <button type="button" className="btn btn-accent" style={{ flex: 2 }} disabled={!alloc} onClick={() => setView(2)}>
                  Continue with {alloc || '—'}
                </button>
              </div>
            </div>
          )}

          {/* View 2 — Amount */}
          {view === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--c-elevated)', border: '1px solid var(--c-border)' }}>
                <button type="button" onClick={() => setView(1)} style={{ background: 'transparent', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', display: 'flex', padding: 2 }}>
                  <Icon name="arrow" style={{ transform: 'rotate(180deg)', width: 16, height: 16 }} />
                </button>
                <span style={{ font: '500 13px/1 Inter', color: 'var(--c-text)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</span>
                <span style={{ flex: 'none', font: '500 11px/1 Inter', padding: '3px 8px', borderRadius: 9999, background: allocObj ? `${allocObj.color}22` : 'var(--c-elevated)', color: allocObj ? allocObj.color : 'var(--c-muted)', border: `1px solid ${allocObj ? allocObj.color + '44' : 'var(--c-border)'}` }}>{alloc}</span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ font: '400 12px/1 Inter', color: 'var(--c-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Aurora Points to invest</div>
                <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={rawAmt}
                    onChange={(e) => setRawAmt(e.target.value)}
                    placeholder="0"
                    style={{ width: 160, background: 'transparent', border: 'none', outline: 'none', textAlign: 'right', font: "700 44px/1 'Sulphur Point'", color: 'var(--c-text)', padding: 0 }}
                  />
                  <span style={{ font: '500 18px/1 Inter', color: 'var(--c-muted)' }}>AP</span>
                </div>
                {amount > 0 && (
                  <div style={{ font: '400 13px/1.3 Inter', color: 'var(--c-muted)', marginTop: 8 }}>≈ {fmt2(xp)} Aura XP · ${fmt2(xp)} USD</div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {CHIPS_AP.map((v) => (
                  <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setRawAmt(String(v))}>
                    {v.toLocaleString()}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'rgba(47,107,216,0.08)', border: '1px solid rgba(47,107,216,0.20)' }}>
                <span style={{ flex: 'none', color: 'var(--c-info-ink)', display: 'flex' }}><Icon name="info" /></span>
                <div style={{ font: '400 12px/1.4 Inter', color: 'var(--c-info-ink)' }}>Rate: 100 AP = 1 Aura XP. Min investment: 1,000 AP.</div>
              </div>

              <button type="button" className="btn btn-accent full" disabled={amount < 1000} onClick={() => setView(3)}>Review request</button>
            </div>
          )}

          {/* View 3 — Review */}
          {view === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ font: '400 13px/1.5 Inter', color: 'var(--c-muted)' }}>Review your lending arrangement. Transactions between users and Aurora Vault are structured as lending arrangements, not investments.</div>
              <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ font: '500 11px/1 Inter', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Conversion</div>
                {[
                  ['Rate', '100 AP = 1 Aura XP', 'var(--c-muted)'],
                  ['Aurora Points', `${fmt(amount)} AP`],
                  ['Aura XP', `${fmt2(xp)} XP`, allocObj?.color],
                  ['USD equivalent', `≈ $${fmt2(xp)}`, 'var(--c-accent)'],
                ].map(([k, v, color]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                    <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                    <span style={{ color: color || 'var(--c-text)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['Allocation', alloc, allocObj?.color],
                  ['Project', project.title],
                  ['Term', alloc === 'TrustBox' ? '120 days' : '90 days'],
                  ['Risk', alloc === 'TrustBox' ? 'Higher (not guaranteed)' : 'Lower (guaranteed)', allocObj?.color],
                ].map(([k, v, color]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                    <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                    <span style={{ color: color || 'var(--c-text)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setView(2)}>Back</button>
                <button type="button" className="btn btn-accent" style={{ flex: 2 }} onClick={submitInvest}>Submit request</button>
              </div>
            </div>
          )}

          {/* View 4 — Success */}
          {view === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '8px 6px 4px' }}>
              {!invested ? (
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid var(--c-border)', borderTopColor: 'var(--c-accent)', animation: 'auroraSpin .9s linear infinite' }} />
              ) : (
                <>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-pos-bg)', color: 'var(--c-pos-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check-big" style={{ width: 28, height: 28 }} />
                  </div>
                  <div style={{ font: "700 22px/1.2 'Sulphur Point'", color: 'var(--c-text)' }}>Request submitted</div>
                  <div style={{ font: '400 14px/1.5 Inter', color: 'var(--c-muted)', maxWidth: 320 }}>Your {alloc} lending request has been submitted. Aurora Points will be allocated once confirmed.</div>
                  <div style={{ width: '100%', background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
                    {[
                      ['Allocation', alloc, allocObj?.color],
                      ['AP lent', `${fmt(amount)} AP`],
                      ['Aura XP', `${fmt2(xp)} XP`, allocObj?.color],
                      ['Project', project.title],
                    ].map(([k, v, color]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 Inter' }}>
                        <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                        <span style={{ color: color || 'var(--c-text)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-accent full" style={{ marginTop: 2 }} onClick={handleClose}>Done</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalOverlay>
  )
}
