import Sidebar from './Sidebar'
import AppHeader from './AppHeader'
import FloatingNav from './FloatingNav'

/**
 * Root layout shell. AppHeader receives onTopUp so pages can wire modals later.
 * For now it's a no-op — modals live in their respective page client wrappers.
 */
export default function AppShell({ children }) {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="app-main">
        <AppHeader />
        <main className="app-content" id="main-content">
          {children}
        </main>
      </div>
      <FloatingNav />
    </div>
  )
}
