'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/lib/icons'

const USER_ROUTES = [
  { href: '/',             label: 'Dashboard',    icon: 'grid'   },
  { href: '/wallet',       label: 'Wallet',       icon: 'wallet' },
  { href: '/invest',       label: 'Invest',       icon: 'invest' },
  { href: '/vault',        label: 'Aura Vault',   icon: 'vault'  },
  { href: '/transactions', label: 'Transactions', icon: 'list'   },
]

const ADMIN_ROUTES = [
  { href: '/admin',        label: 'Admin Queue',  icon: 'admin'  },
  { href: '/admin/audit',  label: 'Audit Trail',  icon: 'audit'  },
]

export default function FloatingNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const fabRef = useRef(null)
  const panelRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  /* Close on Escape */
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape' && open) {
        close()
        fabRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, close])

  /* Close when route changes */
  useEffect(() => { close() }, [pathname, close])

  /* Focus first link when panel opens */
  useEffect(() => {
    if (open) {
      const first = panelRef.current?.querySelector('a, button')
      first?.focus()
    }
  }, [open])

  function isActive(href) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Invisible backdrop — click outside to close */}
      {open && (
        <div
          className="floating-nav-backdrop"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        id="floating-nav-panel"
        className={`floating-nav-panel ${open ? 'open' : 'closed'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        <NavGroup label="User" routes={USER_ROUTES} isActive={isActive} onNav={close} />
        <div className="fnav-divider" />
        <NavGroup label="Admin" routes={ADMIN_ROUTES} isActive={isActive} onNav={close} />
      </div>

      {/* FAB */}
      <button
        ref={fabRef}
        className="floating-nav-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="floating-nav-panel"
      >
        <Icon name={open ? 'close' : 'grid'} />
      </button>
    </>
  )
}

function NavGroup({ label, routes, isActive, onNav }) {
  return (
    <div>
      <div className="fnav-group-label" aria-hidden="true">{label}</div>
      {routes.map((r) => (
        <Link
          key={r.href}
          href={r.href}
          className={`fnav-link${isActive(r.href) ? ' active' : ''}`}
          aria-current={isActive(r.href) ? 'page' : undefined}
          onClick={onNav}
        >
          <Icon name={r.icon} />
          <span>{r.label}</span>
          {isActive(r.href) && (
            <span
              style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--c-accent)', flexShrink: 0 }}
              aria-hidden="true"
            />
          )}
        </Link>
      ))}
    </div>
  )
}
