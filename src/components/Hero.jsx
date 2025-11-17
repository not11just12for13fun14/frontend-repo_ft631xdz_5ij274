import { motion } from 'framer-motion'

const brandBlue = '#1177bf'

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
        {/* Orbital gradients */}
        <motion.div
          className="absolute -inset-20 opacity-30"
          style={{
            background:
              `radial-gradient(circle at 20% 10%, ${brandBlue}33, transparent 40%),
               radial-gradient(circle at 80% 30%, ${brandBlue}22, transparent 40%),
               radial-gradient(circle at 50% 80%, ${brandBlue}22, transparent 45%)`
          }}
          animate={{
            filter: [
              'hue-rotate(0deg) saturate(1)',
              'hue-rotate(10deg) saturate(1.1)',
              'hue-rotate(0deg) saturate(1)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <motion.h1
              className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Boccone
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-white/80 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Il ristorante dove la prima portata è un viaggio di piccoli assaggi. Componi il tuo piatto con bocconi di diverse paste e condimenti, per un'esperienza su misura.
            </motion.p>
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#bocconi" className="rounded-full px-6 py-3 font-semibold text-white shadow-lg hover:shadow-[0_12px_40px_rgba(17,119,191,0.5)] transition" style={{background: brandBlue}}>Crea il tuo piatto</a>
              <a href="#menu" className="rounded-full px-6 py-3 font-semibold text-white/90 border border-white/20 hover:bg-white/5 transition">Scopri il menu</a>
            </motion.div>
            <div className="mt-10 flex items-center gap-6 text-white/70">
              <div>
                <div className="text-3xl font-bold text-white">12+</div>
                <div className="text-sm">Paste artigianali</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-sm">Salse e condimenti</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-sm">Combinazioni</div>
              </div>
            </div>
          </div>

          {/* Animated bocconi board */}
          <div className="relative">
            <motion.div className="relative grid grid-cols-3 gap-4 p-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } }
              }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/90 text-sm"
                  style={{ boxShadow: `0 10px 30px ${brandBlue}22` }}
                  variants={{
                    hidden: { opacity: 0, y: 20, rotate: -2 },
                    show: { opacity: 1, y: 0, rotate: 0 }
                  }}
                  whileHover={{ scale: 1.05, boxShadow: `0 12px 40px ${brandBlue}44` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  Boccone {i + 1}
                </motion.div>
              ))}
            </motion.div>
            <div className="absolute -inset-4 border border-white/10 rounded-3xl pointer-events-none" style={{boxShadow: `0 0 60px ${brandBlue}33 inset`}}></div>

            {/* floating badges */}
            <motion.div className="absolute -top-6 -right-4 text-white/90 text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6 }}
            >Nuovo format</motion.div>
            <motion.div className="absolute -bottom-6 -left-4 text-white/90 text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 }}
            >Personalizza</motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
