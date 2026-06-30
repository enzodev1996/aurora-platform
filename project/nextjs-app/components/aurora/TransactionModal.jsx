'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Callout from '@/components/ui/Callout'
import QrBlock from './QrBlock'
import { AmountStep, SummaryRow, SuccessStep } from './ModalParts'
import { fmt, fmt2 } from '@/lib/format'

const ADDR = '0x9C4d8f2a3B1e7D5c0A6f4E2b8C1d9F0e7A3b2D7a'

const FLOWS = {
  topup: {
    title: 'Add funds',
    chips: [100, 500, 1000, 5000],
    steps: [
      {
        primary: 'Continue',
        guard: (amount) => amount >= 10,
        render: (amount, setAmount, chips) => (
          <AmountStep label="Amount to deposit" unit="USDT" sub={`≈ $${fmt2(amount)}`} chips={chips} amount={amount} onPick={setAmount} />
        ),
      },
      {
        primary: "I've sent it",
        back: true,
        render: (amount) => (
          <>
            <p className="muted" style={{ textAlign: 'center', font: '400 13px var(--font-body)', margin: 0 }}>
              Send <b style={{ color: 'var(--c-text)' }}>{fmt2(amount)} USDT</b> to the address below
            </p>
            <QrBlock address={ADDR} network="Binance Smart Chain (BEP-20)" />
            <Callout variant="warn">
              Send only USDT on the selected network. Wrong-network transfers may not be recoverable.
            </Callout>
          </>
        ),
      },
      {
        primary: 'Done',
        done: true,
        render: (amount) => (
          <SuccessStep
            icon="clock" iconColor="var(--c-amber-ink)" iconBg="var(--c-warn-bg)"
            title="Request submitted"
            body={`Your deposit of ${fmt2(amount)} USDT is pending admin approval. We'll verify your transaction and credit your wallet, usually within a few hours.`}
            rows={[
              ['Amount', `${fmt2(amount)} USDT`],
              ['Network', 'BEP-20'],
              ['Status', 'Pending review', 'var(--c-amber-ink)'],
            ]}
          />
        ),
      },
    ],
  },

  withdraw: {
    title: 'Withdraw USDT',
    chips: [100, 500, 1000, 5000],
    steps: [
      {
        primary: 'Continue',
        guard: (amount) => amount >= 10 && amount <= 12480.5,
        render: (amount, setAmount, chips) => (
          <AmountStep label="Amount to withdraw" unit="USDT" sub="12,480.50 USDT available" chips={chips} amount={amount} onPick={setAmount} />
        ),
      },
      {
        primary: 'Withdraw',
        back: true,
        render: (amount) => (
          <>
            <p className="muted" style={{ font: '400 13px/1.5 var(--font-body)', margin: 0 }}>
              Confirm the destination address and amount.
            </p>
            <div className="tile" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
              <SummaryRow k="Amount" v={`${fmt2(amount)} USDT`} />
              <SummaryRow k="Network" v="BEP-20" />
              <SummaryRow k="To" v={`${ADDR.slice(0, 10)}…${ADDR.slice(-6)}`} />
              <SummaryRow k="Network fee" v="0.80 USDT" color="var(--c-muted)" />
            </div>
          </>
        ),
      },
      {
        primary: 'Done',
        done: true,
        render: (amount) => (
          <SuccessStep
            icon="check" iconColor="var(--c-pos-ink)" iconBg="var(--c-pos-bg)"
            title="Withdrawal sent"
            body={`Your withdrawal of ${fmt2(amount)} USDT is being processed on-chain.`}
            rows={[
              ['Status', 'Broadcasting', 'var(--c-info-ink)'],
              ['Est. arrival', '~2 min'],
            ]}
          />
        ),
      },
    ],
  },

  redeem: {
    title: 'Redeem AUR',
    chips: [100, 500, 1000, 1240],
    steps: [
      {
        primary: 'Continue',
        guard: (amount) => amount >= 1 && amount <= 1240.5,
        render: (amount, setAmount, chips) => (
          <AmountStep label="Amount to redeem" unit="AUR" sub="1,240.50 AUR available" chips={chips} amount={amount} onPick={setAmount} />
        ),
      },
      {
        primary: 'Done',
        done: true,
        render: (amount) => (
          <SuccessStep
            icon="check" iconColor="var(--c-pos-ink)" iconBg="var(--c-pos-bg)"
            title="Redeemed"
            body={`You redeemed ${fmt2(amount)} AUR for cash.`}
            rows={[['Cash credited', `$${fmt2(amount * 0.98)}`, 'var(--c-pos-ink)']]}
          />
        ),
      },
    ],
  },

  vault: {
    title: 'Top up Aura Vault',
    chips: [100, 500, 1000, 5000],
    steps: [
      {
        primary: 'Continue',
        guard: (amount) => amount >= 10,
        render: (amount, setAmount, chips) => (
          <AmountStep label="Amount to top up" unit="USDT" sub={`You'll receive ${fmt(amount * 100)} AP`} chips={chips} amount={amount} onPick={setAmount} />
        ),
      },
      {
        primary: 'Submit request',
        back: true,
        render: (amount) => (
          <>
            <p className="muted" style={{ textAlign: 'center', font: '400 13px var(--font-body)', margin: 0 }}>
              Send <b style={{ color: 'var(--c-text)' }}>{fmt2(amount)} USDT</b> — you&apos;ll receive{' '}
              <b style={{ color: 'var(--c-violet)' }}>{fmt(amount * 100)} AP</b>
            </p>
            <QrBlock address={ADDR} network="Binance Smart Chain (BEP-20)" />
            <Callout variant="warn">
              Send only USDT on the selected network. Wrong-network transfers may not be recoverable. Top-ups are credited after our finance team verifies your transfer.
            </Callout>
          </>
        ),
      },
      {
        primary: 'Done',
        done: true,
        render: (amount) => (
          <SuccessStep
            icon="clock" iconColor="var(--c-amber-ink)" iconBg="var(--c-warn-bg)"
            title="Top-up submitted"
            body={`Your request for ${fmt(amount * 100)} AP is pending review. Aura Points are credited once your transfer is verified.`}
            rows={[
              ['Amount', `${fmt2(amount)} USDT`],
              ['Aurora Points', `+${fmt(amount * 100)} AP`, 'var(--c-violet)'],
              ['Status', 'Pending review', 'var(--c-amber-ink)'],
            ]}
          />
        ),
      },
    ],
  },
}

/**
 * @param {{ flow: 'topup'|'withdraw'|'redeem'|'vault', open: boolean, onClose: Function }} props
 */
export default function TransactionModal({ flow, open, onClose }) {
  const config = FLOWS[flow]
  const [stepIdx, setStepIdx] = useState(0)
  const [amount, setAmount] = useState(0)

  function handleClose() {
    onClose()
    setTimeout(() => { setStepIdx(0); setAmount(0) }, 200)
  }

  if (!config) return null
  const step = config.steps[stepIdx]
  const disabled = !!(step.guard && !step.guard(amount))

  function handlePrimary() {
    if (disabled) return
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
      title={config.title}
      step={stepIdx + 1}
      totalSteps={config.steps.length}
      footer={
        <>
          {step.back && (
            <Button variant="secondary" style={{ flex: 1 }} onClick={handleBack}>Back</Button>
          )}
          <Button variant="accent" style={{ flex: step.back ? 2 : 1 }} disabled={disabled} onClick={handlePrimary}>
            {step.primary}
          </Button>
        </>
      }
    >
      {step.render(amount, setAmount, config.chips)}
    </Modal>
  )
}
