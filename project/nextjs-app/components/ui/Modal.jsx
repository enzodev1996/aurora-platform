'use client'
import { useEffect, useRef } from 'react'
import { Icon } from '@/lib/icons'

/**
 * Multi-step modal shell.
 * @param {{ open: boolean, onClose: Function, title: string, step: number, totalSteps: number, children: React.ReactNode }} props
 */
export default function Modal({ open, onClose, title, step = 1, totalSteps = 1, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) dialogRef.current?.focus()
  }, [open])

  if (!open) return null

  const bars = Array.from({ length: totalSteps }, (_, i) => {
    const cls = i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''
    return <div key={i} className={`step-bar ${cls}`} />
  })

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={dialogRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <div className="modal-head">
          <span className="modal-title">{title}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close" style={{ border: 'none', width: 32, height: 32 }}>
            <Icon name="close" />
          </button>
        </div>
        {totalSteps > 1 && <div className="step-bars">{bars}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
