import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const brandBlue = '#1177bf'
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/dishes?featured=true`)
        if (!res.ok) throw new Error('errore')
        const data = await res.json()
        setDishes(data)
      } catch (e) {
        setDishes([
          { id: '1', name: 'Rigatoni all’Amatriciana', description: 'Guanciale croccante, pomodoro, pecorino', price: 12.5, featured: true, tags: ['piccante'] },
          { id: '2', name: 'Spaghetti al Pomodoro', description: 'Sugo di pomodoro San Marzano e basilico', price: 9.0, featured: true, tags: ['veg'] },
          { id: '3', name: 'Tagliatelle al Ragù', description: 'Ragù lento della casa', price: 13.0, featured: true, tags: ['classico'] }
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="menu" className="relative py-24 bg-white overflow-hidden">
      {/* floating stripe */}
      <motion.div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: brandBlue }} animate={{ x: [0, 10, 0], y: [0, -6, 0] }} transition={{ duration: 10, repeat: Infinity }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">I nostri piatti</h2>
          <p className="text-black/60 mt-2">Classici italiani e creazioni stagionali. Perfetti anche in versione boccone.</p>
        </div>

        {loading ? (
          <p className="text-black/60">Caricamento…</p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {dishes.map(d => (
              <motion.div
                key={d.id}
                className="rounded-2xl border border-black/10 p-6 bg-white hover:shadow-xl transition"
                style={{boxShadow: `0 10px 30px ${brandBlue}11`}}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3, boxShadow: `0 16px 40px ${brandBlue}22` }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">{d.name}</h3>
                    <p className="text-sm text-black/60">{d.description}</p>
                  </div>
                  <div className="text-black font-bold">€ {Number(d.price).toFixed(2)}</div>
                </div>
                {d.tags && d.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {d.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-black/5 text-black/70 border border-black/10">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
