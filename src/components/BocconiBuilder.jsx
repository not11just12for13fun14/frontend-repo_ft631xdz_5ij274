import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const brandBlue = '#1177bf'
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const pastaExamples = [
  { name: 'Spaghetti', tag: 'classica' },
  { name: 'Rigatoni', tag: 'corposa' },
  { name: 'Fusilli', tag: 'spirale' },
  { name: 'Tortiglioni', tag: 'corposa' },
  { name: 'Orecchiette', tag: 'pugliese' },
  { name: 'Tagliatelle', tag: 'sfoglia' },
]

const salse = [
  { name: 'Pomodoro', tag: 'veg' },
  { name: 'Cacio e pepe', tag: 'formaggio' },
  { name: 'Pesto', tag: 'veg' },
  { name: 'Carbonara', tag: 'uovo' },
  { name: 'Amatriciana', tag: 'piccante' },
]

export default function BocconiBuilder() {
  const [selected, setSelected] = useState([])
  const [title, setTitle] = useState('Il mio piatto')
  const [price, setPrice] = useState(0)
  const maxBites = 5

  useEffect(() => {
    // Simple pricing: each pasta bite 3€, each sauce adds +1€ flat once present
    const pastaCount = selected.filter(x => x.type === 'pasta').length
    const hasSauce = selected.some(x => x.type === 'salsa')
    const computed = pastaCount * 3 + (hasSauce ? 1 : 0)
    setPrice(computed)
  }, [selected])

  const toggleItem = (item) => {
    const exists = selected.find(x => x.name === item.name && x.type === item.type)
    if (exists) {
      setSelected(prev => prev.filter(x => !(x.name === item.name && x.type === item.type)))
    } else {
      if (selected.length >= maxBites) return
      setSelected(prev => [...prev, item])
    }
  }

  const saveBuild = async () => {
    try {
      const payload = {
        title,
        items: selected.map(x => `${x.type}:${x.name}`),
        price
      }
      const res = await fetch(`${baseUrl}/bocconi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Errore salvataggio')
      const data = await res.json()
      alert(`Salvato! ID: ${data.id}`)
    } catch (e) {
      alert('Impossibile salvare ora. Riprova più tardi.')
    }
  }

  return (
    <section id="bocconi" className="relative py-24 bg-black text-white overflow-hidden">
      {/* flowing edge accent */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${brandBlue}55, transparent 60%)` }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Costruisci la tua prima portata a bocconi</h2>
          <p className="text-white/70 mt-2 max-w-2xl">Scegli piccoli assaggi di paste e salse per creare un piatto unico. Massimo {maxBites} bocconi.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selezione */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-semibold mb-3">Paste</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {pastaExamples.map((p) => {
                  const active = selected.some(x => x.name === p.name && x.type === 'pasta')
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ y: -2, boxShadow: `0 10px 30px ${brandBlue}33` }}
                      key={p.name}
                      onClick={() => toggleItem({ ...p, type: 'pasta' })}
                      className={`rounded-xl px-4 py-3 text-left border transition ${active ? 'border-transparent' : 'border-white/15 hover:border-white/30'}`}
                      style={{background: active ? brandBlue : 'transparent'}}
                    >
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-white/70">Boccone 3€</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Salse</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {salse.map((s) => {
                  const active = selected.some(x => x.name === s.name && x.type === 'salsa')
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ y: -2, boxShadow: `0 10px 30px ${brandBlue}33` }}
                      key={s.name}
                      onClick={() => toggleItem({ ...s, type: 'salsa' })}
                      className={`rounded-xl px-4 py-3 text-left border transition ${active ? 'border-transparent' : 'border-white/15 hover:border-white/30'}`}
                      style={{background: active ? brandBlue : 'transparent'}}
                    >
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-white/70">+1€ una volta</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Riepilogo */}
          <div className="lg:col-span-1">
            <motion.div
              className="rounded-2xl border border-white/10 p-6 sticky top-24"
              style={{boxShadow: `0 10px 30px ${brandBlue}22`}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2" style={{ outline: 'none', boxShadow: `0 0 0 0 ${brandBlue}` }} placeholder="Dai un nome al tuo piatto" />
              <ul className="space-y-2 mb-4 min-h-[44px]">
                <AnimatePresence initial={false}>
                  {selected.length === 0 && (
                    <li className="text-white/60 text-sm">Nessun boccone selezionato</li>
                  )}
                  {selected.map((x, idx) => (
                    <motion.li
                      key={`${x.type}-${x.name}`}
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm">{x.type === 'pasta' ? 'Pasta' : 'Salsa'} • {x.name}</span>
                      <button onClick={() => toggleItem(x)} className="text-white/70 hover:text-white">×</button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70">Prezzo</span>
                <span className="text-xl font-bold">€ {price.toFixed(2)}</span>
              </div>
              <button disabled={selected.length === 0} onClick={saveBuild} className="w-full rounded-full px-5 py-3 font-semibold text-white disabled:opacity-50 hover:shadow-[0_12px_40px_rgba(17,119,191,0.4)] transition" style={{background: brandBlue}}>Salva la composizione</button>
              <p className="text-xs text-white/50 mt-3">Prezzi indicativi per la demo.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
