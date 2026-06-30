import './globals.css'
import AppShell from '@/components/layout/AppShell'

export const metadata = {
  title: 'Aurora Vault — Borealis Finance',
  description: 'Invest, deposit, and grow your crypto assets with Aurora Vault.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sulphur+Point:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
