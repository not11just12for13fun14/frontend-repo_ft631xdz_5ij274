import { useState } from 'react'

const brandBlue = '#1177bf'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between rounded-b-2xl bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 border border-white/10">
          <a href="#" className="flex items-center gap-2 pl-4">
            <div className="w-8 h-8 rounded-full" style={{background: brandBlue}}></div>
            <span className="text-white text-lg font-semibold tracking-wide">Boccone</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 pr-4">
            <a href="#bocconi" className="text-sm text-white/80 hover:text-white transition">Crea il tuo piatto</a>
            <a href="#menu" className="text-sm text-white/80 hover:text-white transition">Menu</a>
            <a href="#prenota" className="text-sm text-white/80 hover:text-white transition">Prenota</a>
            <a href="/test" className="text-sm text-white/60 hover:text-white transition">Test Backend</a>
            <a href="#prenota" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{background: brandBlue}}>Prenota un tavolo</a>
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden p-3 text-white/80 hover:text-white focus:outline-none pr-4">
            <span className="sr-only">Menu</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-b-2xl bg-black/80 border-x border-b border-white/10 overflow-hidden">
            <a href="#bocconi" className="block px-6 py-4 text-white/90 hover:bg-white/5">Crea il tuo piatto</a>
            <a href="#menu" className="block px-6 py-4 text-white/90 hover:bg-white/5">Menu</a>
            <a href="#prenota" className="block px-6 py-4 text-white/90 hover:bg-white/5">Prenota</a>
            <a href="/test" className="block px-6 py-4 text-white/70 hover:bg-white/5">Test Backend</a>
            <div className="px-6 pb-6">
              <a href="#prenota" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{background: brandBlue}}>Prenota un tavolo</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
