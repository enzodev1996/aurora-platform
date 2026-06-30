'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

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
      if (rand() > 0.52) parts.push(`<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="#090916"/>`)
    }
  }
  function finder(bx, by) {
    return `<rect x="${bx*cell}" y="${by*cell}" width="${7*cell}" height="${7*cell}" fill="#090916"/>` +
      `<rect x="${(bx+1)*cell}" y="${(by+1)*cell}" width="${5*cell}" height="${5*cell}" fill="#fff"/>` +
      `<rect x="${(bx+2)*cell}" y="${(by+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#090916"/>`
  }
  parts.push(finder(0, 0), finder(size - 7, 0), finder(0, size - 7))
  return `<svg viewBox="0 0 ${dim} ${dim}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
}

/**
 * @param {{ address: string, network?: string }} props
 */
export default function QrBlock({ address, network }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {network && <div className="muted" style={{ font: '400 12px/1.3 var(--font-body)' }}>Network · {network}</div>}
      <div className="qr" dangerouslySetInnerHTML={{ __html: qrSvg(address) }} aria-label="QR code for deposit address" />
      <div className="tile" style={{ wordBreak: 'break-all', font: '400 12px/1.5 var(--font-body)' }}>
        {address}
      </div>
      <Button variant="secondary" full icon="copy" onClick={copy}>
        {copied ? 'Copied!' : 'Copy address'}
      </Button>
    </>
  )
}
