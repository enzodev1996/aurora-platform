'use client'

/**
 * Filter chip (controlled). Parent manages active state.
 * @param {{ active?: boolean, onClick?: Function, children: React.ReactNode }} props
 */
export default function Chip({ active, onClick, children }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      className={`chip${active ? ' on' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
