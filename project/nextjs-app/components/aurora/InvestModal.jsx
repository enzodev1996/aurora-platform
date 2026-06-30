'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Callout from '@/components/ui/Callout'
import { Icon } from '@/lib/icons'
import { fmt, fmt2 } from '@/lib/format'
import { SummaryRow, SuccessStep } from './ModalParts'

const CHIPS_AP = [5000, 20000, 50000, 100000]

const ALLOCATIONS = [
  { id: 'SecureNest', name: 'SecureNest', desc: 'Guaranteed return · lower risk · 90-day term', icon: 'vault', color: '#0C7A63' },
  { id: 'TrustBox',    name: 'TrustBox',  desc: 'Non-guaranteed return · higher yield · 120-day term', icon: 'shield', color: '#B45309' },
]

/**
 * @param {{ project?: string, open: boolean, onClose: Function }} props
 */
export default function InvestModal({ project, open, onClose }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [alloc, setAlloc] = useState(null)
  const [amount, setAmount] = useState(0)

  function handleClose() {
    onClose()
    setTimeout(() => { setStepIdx(0); setAlloc(null); setAmount(0) }, 200)
  }

  const xp = amount / 100
  const isTrustBox = alloc === 'TrustBox'
  const accentColor = isTrustBox ? 'var(--c-amber-ink)' : 'var(--c-teal-ink)'
  const term = isTrustBox ? '120 days' : '90 days'

  const steps = [
    { primary: 'Continue', guard: !!alloc, back: false },
    { primary: 'Review request', guard: amount >= 1000 && amount <= 248500, back: true },
    { primary: 'Submit request', guard: true, back: true },
    { primary: 'Done', guard: true, back: false, done: true },
  ]
  const step = steps[stepIdx]

  function handlePrimary() {
    if (!step.guard) return
    if (step.done) { handleClose(); return }
    setStepIdx((i) => i + 1)
  }
  function handleBack() {
    setStepIdx((i) => Math.max(0, i - 1))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Invest in project"
      step={stepIdx + 1}
      totalSteps={steps.length}
      footer={
        <>
          {step.back && <Button variant="secondary" style={{ flex: 1 }} onClick={handleBack}>Back</Button>}
          <Button variant="accent" style={{ flex: step.back ? 2 : 1 }} disabled={!step.guard} onClick={handlePrimary}>
            {step.primary}
          </Button>
        </>
      }
    >
      {stepIdx === 0 && (
        <>
          <p className="muted" style={{ font: '400 13px/1.5 var(--font-body)', margin: '0 0 4px' }}>
            Choose how to allocate your Aurora Points.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ALLOCATIONS.map((a) => {
              const on = alloc === a.id
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAlloc(a.id)}
                  style={{
                    all: 'unset', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: 14, borderRadius: 12,
                    border: `1px solid ${on ? a.color : 'var(--c-border)'}`,
                    background: on ? `${a.color}14` : 'var(--c-elevated)',
                  }}
                >
                  <span style={{ width: 36, height: 36, flex: 'none', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${a.color}22`, color: a.color }}>
                    <Icon name={a.icon} />
                  </span>
                  <span style={{ display: 'block' }}>
                    <span style={{ display: 'block', font: '600 14px/1.2 var(--font-body)' }}>{a.name}</span>
                    <span className="muted" style={{ display: 'block', font: '400 12px/1.4 var(--font-body)', marginTop: 3 }}>{a.desc}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <Callout variant="info" icon="info">
            <strong>SecureNest</strong> — Aurora Vault guarantees the return of lent Aurora Points.<br />
            <strong>TrustBox</strong> — Aurora Points are not guaranteed and remain subject to associated risks.
          </Callout>
        </>
      )}

      {stepIdx === 1 && (
        <>
          {project && (
            <div className="badge-violet" style={{ margin: '0 auto 4px', display: 'flex', width: 'fit-content' }}>{project}</div>
          )}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, margin: '0 auto 4px', padding: '5px 11px',
              borderRadius: 9999, background: isTrustBox ? 'rgba(180,83,9,0.10)' : 'rgba(12,122,99,0.10)',
              border: `1px solid ${isTrustBox ? 'rgba(180,83,9,0.28)' : 'rgba(12,122,99,0.28)'}`,
              color: accentColor, font: '500 12px var(--font-body)', width: 'fit-content', textAlign: 'center',
            }}
          >
            {alloc || '—'}
          </div>
          <div className="eyebrow" style={{ textAlign: 'center', color: 'var(--c-muted)' }}>Aurora Points to lend</div>
          <div className="amount-display">
            <span className="amount-num">{fmt(amount)}</span>{' '}
            <span className="muted" style={{ font: '500 18px var(--font-body)' }}>AP</span>
            <div className="muted" style={{ font: '400 13px var(--font-body)', marginTop: 6 }}>
              {fmt2(xp)} Aura XP · ${fmt2(xp)} · ₱{fmt(Math.round(xp * 58))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CHIPS_AP.map((v) => (
              <button key={v} type="button" className={`chip${amount === v ? ' on' : ''}`} onClick={() => setAmount(v)}>
                {fmt(v)}
              </button>
            ))}
          </div>
        </>
      )}

      {stepIdx === 2 && (
        <>
          <p className="muted" style={{ font: '400 13px/1.5 var(--font-body)', margin: 0 }}>
            Review your lending arrangement. Transactions between users and Aurora Vault are structured as lending arrangements, not investments.
          </p>
          <div style={{ background: 'var(--c-elevated)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ font: '500 11px var(--font-body)', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
              Calculated conversion
            </div>
            <SummaryRow k="Rate" v="100 AP = 1 Aura XP" color="var(--c-muted)" />
            <SummaryRow k="Aurora Points" v={`${fmt(amount)} AP`} />
            <SummaryRow k="Aura XP" v={`${fmt2(xp)} XP`} color={accentColor} />
            <SummaryRow k="USDT equivalent" v={`≈ $${fmt2(xp)}`} color="var(--c-accent)" />
            <SummaryRow k="PHP equivalent" v={`≈ ₱${fmt(Math.round(xp * 58))}`} />
          </div>
          <div className="tile" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
            <SummaryRow k="Allocation" v={alloc} color={accentColor} />
            {project && <SummaryRow k="Project" v={project} />}
            <SummaryRow k="Term" v={term} />
            <SummaryRow k="Risk" v={isTrustBox ? 'Higher (not guaranteed)' : 'Lower (guaranteed)'} color={accentColor} />
          </div>
          <Callout variant="info" icon="info">
            <strong>Project usage notice.</strong> Projects listed under SecureNests and TrustBoxes represent the intended use cases where Aurora Vault plans to deploy the borrowed Aurora Points.
          </Callout>
        </>
      )}

      {stepIdx === 3 && (
        <SuccessStep
          icon="check" iconColor="var(--c-pos-ink)" iconBg="var(--c-pos-bg)"
          title="Request submitted"
          body={`Your ${alloc || ''} lending request has been submitted. Aurora Points will be allocated once confirmed.`}
          rows={[
            ['Allocation', alloc, accentColor],
            ['AP lent', `${fmt(amount)} AP`],
            ['Aura XP', `${fmt2(xp)} XP`, accentColor],
            [`Active ${alloc || ''}s`, isTrustBox ? '3' : '4', accentColor],
          ]}
        />
      )}
    </Modal>
  )
}
