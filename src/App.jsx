import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BocconiBuilder from './components/BocconiBuilder'
import Menu from './components/Menu'
import Reservation from './components/Reservation'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <BocconiBuilder />
      <Menu />
      <Reservation />
      <footer className="bg-black border-t border-white/10 text-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Boccone</p>
          <p className="text-white/50">Nero • Bianco • <span style={{color:'#1177bf'}}>Blu #1177bf</span></p>
        </div>
      </footer>
    </div>
  )
}

export default App
