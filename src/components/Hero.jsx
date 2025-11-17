const brandBlue = '#1177bf'

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-20" style={{background: `radial-gradient(circle at 20% 10%, ${brandBlue}33, transparent 40%), radial-gradient(circle at 80% 30%, ${brandBlue}22, transparent 40%), radial-gradient(circle at 50% 80%, ${brandBlue}22, transparent 45%)`}}></div>
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
              Boccone
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Il ristorante dove la prima portata è un viaggio di piccoli assaggi. Componi il tuo piatto con bocconi di diverse paste e condimenti, per un'esperienza su misura.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#bocconi" className="rounded-full px-6 py-3 font-semibold text-white shadow-lg" style={{background: brandBlue}}>Crea il tuo piatto</a>
              <a href="#menu" className="rounded-full px-6 py-3 font-semibold text-white/90 border border-white/20 hover:bg-white/5 transition">Scopri il menu</a>
            </div>
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

          <div className="relative">
            {/* Bocconi visual */}
            <div className="relative grid grid-cols-3 gap-4 p-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/90 text-sm" style={{boxShadow: `0 10px 30px ${brandBlue}22`}}>
                  Boccone {i+1}
                </div>
              ))}
            </div>
            <div className="absolute -inset-4 border border-white/10 rounded-3xl pointer-events-none" style={{boxShadow: `0 0 60px ${brandBlue}33 inset`}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
