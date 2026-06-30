export function fmt(n) {
  return Number(n || 0).toLocaleString('en-US')
}

export function fmt2(n) {
  return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
