/**
 * @param {{ label: string, value: string|number, unit?: string, style?: object }} props
 */
export default function KpiTile({ label, value, unit, style }) {
  return (
    <div className="metric" style={style}>
      <div className="metric-label">{label}</div>
      <div className="metric-val tabular">
        {value}{unit && <span className="muted" style={{ fontSize: 14, fontWeight: 400, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  )
}
