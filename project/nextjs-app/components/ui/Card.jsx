/**
 * @param {{ title?: string, action?: React.ReactNode, children: React.ReactNode, className?: string, style?: object }} props
 */
export default function Card({ title, action, children, className = '', style }) {
  return (
    <section className={`card ${className}`} style={style}>
      {(title || action) && (
        <div className="card-head">
          {title && <span className="card-title">{title}</span>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
