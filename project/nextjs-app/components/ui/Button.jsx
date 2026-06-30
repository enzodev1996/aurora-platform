import { Icon } from '@/lib/icons'

/**
 * @param {{ variant?: 'accent'|'secondary'|'primary'|'link', full?: boolean, icon?: string, disabled?: boolean, onClick?: Function, children: React.ReactNode, className?: string, style?: object, type?: string }} props
 */
export default function Button({ variant = 'secondary', full, icon, disabled, onClick, children, className = '', style, type = 'button' }) {
  const cls = ['btn', `btn-${variant}`, full ? 'full' : '', className].filter(Boolean).join(' ')
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} style={style}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
