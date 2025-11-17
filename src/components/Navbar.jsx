import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const brandBlue = '#1177bf'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => {
      setElevated(window.scrollY > 4)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Scroll progress bar */}
      <motion.div className="h-0.5 origin-left" style={{ background: brandBlue, scaleX }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`relative mt-1 flex h-16 items-center justify-between rounded-b-2xl border transition-all ${elevated ? 'bg-black/70 backdrop-blur border-white/15 shadow-[0_10px_30px_rgba(17,119,191,0.15)]' : 'bg-black/40 supports-[backdrop-filter]:bg-black/30 border-white/10'}`}>
          <a href="#" className="flex items-center gap-2 pl-4 group">
            <div className="relative w-8 h-8">
              <span className="absolute inset-0 rounded-full" style={{ background: brandBlue }}></span>
              <span className="absolute inset-0 rounded-full blur-md opacity-70" style={{ background: brandBlue }}></span>
            </div>
            <span className="text-white text-lg font-semibold tracking-wide">Boccone</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 pr-4">
            <a href="#bocconi" className="nav-link">Crea il tuo piatto</a>
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#prenota" className="nav-link">Prenota</a>
            <a href="/test" className="text-sm text-white/60 hover:text-white transition">Test Backend</a>
            <a href="#prenota" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-[0_8px_24px_rgba(17,119,191,0.45)] transition" style={{background: brandBlue}}>Prenota un tavolo</a>
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

      <style>{`
        .nav-link { position: relative; font-size: 0.9rem; color: rgba(255,255,255,0.8); transition: color .2s ease; }
        .nav-link:hover { color: white; }
        .nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -8px; height: 2px; background: ${brandBlue}; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; border-radius: 9999px; }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </header>
  )
}
