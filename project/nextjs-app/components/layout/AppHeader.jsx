'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from '@/lib/icons'
import Button from '@/components/ui/Button'
import TransactionModal from '@/components/aurora/TransactionModal'

const TITLES = {
  '/':             'Dashboard',
  '/wallet':       'Wallet',
  '/invest':       'Invest',
  '/vault':        'Aura Vault',
  '/transactions': 'Transactions',
  '/admin':        'Admin',
  '/admin/audit':  'Audit Trail',
}

export default function AppHeader() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('light')
  const [topUpOpen, setTopUpOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('aurora-theme') ?? 'light'
    setTheme(stored)
    document.documentElement.setAttribute('data-theme', stored)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('aurora-theme', next)
  }

  const title = TITLES[pathname] ?? 'Aurora Vault'

  return (
    <header className="app-header">
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1>{title}</h1>
      </div>
      <div className="app-search" role="search" aria-label="Search">
        <Icon name="search" />
        <span>Search</span>
        <span className="kbd">⌘K</span>
      </div>
      <button className="icon-btn" aria-label="Notifications">
        <Icon name="bell" />
      </button>
      <button className="icon-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={toggleTheme}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      </button>
      <Button variant="accent" icon="in" style={{ height: 40 }} onClick={() => setTopUpOpen(true)}>
        Top up
      </Button>
      <TransactionModal flow="topup" open={topUpOpen} onClose={() => setTopUpOpen(false)} />
    </header>
  )
}
