import Sidebar from './Sidebar'
import AppHeader from './AppHeader'
import FloatingNav from './FloatingNav'

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
