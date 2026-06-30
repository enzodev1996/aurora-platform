import { Icon } from '@/lib/icons'

/**
 * @param {{ variant?: 'warn'|'info'|'error', icon?: string, children: React.ReactNode }} props
 */
export default function Callout({ variant = 'warn', icon, children }) {
  const defaultIcon = variant === 'info' ? 'info' : 'shield'
  return (
    <div className={`callout ${variant}`}>
      <span className="ico">
        <Icon name={icon ?? defaultIcon} />
      </span>
      <div className="txt">{children}</div>
    </div>
  )
}
