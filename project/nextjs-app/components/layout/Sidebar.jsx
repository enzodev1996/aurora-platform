'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/lib/icons'

const NAV = [
  { href: '/',             label: 'Dashboard',    icon: 'grid'   },
  { href: '/wallet',       label: 'Wallet',       icon: 'wallet' },
  { href: '/invest',       label: 'Invest',       icon: 'invest' },
  { href: '/vault',        label: 'Aura Vault',   icon: 'vault'  },
  { href: '/transactions', label: 'Transactions', icon: 'list'   },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="app-sidebar">
      {/* Brand */}
      <div className="brand">
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="sidebarMark" cx="50%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#9F5BF0" />
              <stop offset="100%" stopColor="#7828E8" />
            </radialGradient>
          </defs>
          <rect x="4" y="4" width="32" height="32" rx="10" fill="url(#sidebarMark)" />
          <circle cx="20" cy="20" r="6" fill="var(--c-canvas)" />
        </svg>
        <div>
          <div className="brand-name">Aurora Vault</div>
          <div className="brand-sub">Borealis Finance</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav" aria-label="Main navigation">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item${isActive(item.href) ? ' active' : ''}`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-foot">
        <div className="avatar" aria-hidden="true">AM</div>
        <div className="sidebar-user-meta">
          <div style={{ font: '500 13px/1.2 var(--font-body)' }}>Alex Mercer</div>
          <div className="muted" style={{ font: '400 11px/1.3 var(--font-body)', marginTop: 2 }}>Verified · Pro</div>
        </div>
        <Link
          href="/admin"
          className="icon-btn"
          title="Admin"
          style={{ marginLeft: 'auto', width: 34, height: 34, border: 'none' }}
          aria-label="Admin settings"
        >
          <Icon name="settings" />
        </Link>
      </div>
    </aside>
  )
}
