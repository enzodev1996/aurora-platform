'use client'

import * as React from 'react'
import { ResponsiveContainer, Tooltip } from 'recharts'

const ChartContext = React.createContext(null)

export function ChartContainer({ config = {}, children, className, style }) {
  const cssVars = Object.fromEntries(
    Object.entries(config).flatMap(([key, val]) => {
      const entries = []
      if (val.color) entries.push([`--color-${key}`, val.color])
      return entries
    })
  )

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} style={{ ...cssVars, ...style }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

export function ChartTooltipContent({ active, payload, label, hideLabel }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--c-modal)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '8px 12px', font: '400 12px/1.4 Inter', color: 'var(--c-text)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
      {!hideLabel && label && <div style={{ color: 'var(--c-muted)', marginBottom: 4 }}>{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color || entry.fill }} />
          <span style={{ color: 'var(--c-muted)' }}>{entry.name}:</span>
          <span style={{ fontWeight: 500 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export { Tooltip as ChartTooltip }
