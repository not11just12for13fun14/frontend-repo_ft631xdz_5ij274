import { useState } from 'react'

const brandBlue = '#1177bf'
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Reservation() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' })
  const [status, setStatus] = useState(null)

  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Invio…')
    try {
      const res = await fetch(`${baseUrl}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: Number(form.guests) })
      })
      if (!res.ok) throw new Error('Errore prenotazione')
      setStatus('✅ Prenotazione inviata! Ti contatteremo a breve.')
      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' })
    } catch (e) {
      setStatus('❌ Errore. Riprova più tardi.')
    }
  }

  return (
    <section id="prenota" className="relative py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Prenota un tavolo</h2>
            <p className="text-white/70 mt-2">Siamo aperti a pranzo e cena. Compila il modulo e confermeremo la disponibilità.</p>
            <div className="mt-6 rounded-2xl border border-white/10 p-6 text-white/80">
              <p className="mb-2"><span className="font-semibold text-white">Indirizzo:</span> Via del Gusto 12, Roma</p>
              <p className="mb-2"><span className="font-semibold text-white">Telefono:</span> +39 06 1234 5678</p>
              <p className=""><span className="font-semibold text-white">Orari:</span> 12:00–15:00, 19:00–23:00</p>
            </div>
          </div>

          <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-black/70">Nome</label>
                <input name="name" value={form.name} onChange={update} required className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-black/70">Email</label>
                <input name="email" type="email" value={form.email} onChange={update} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-black/70">Telefono</label>
                <input name="phone" value={form.phone} onChange={update} required className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-black/70">Data</label>
                <input name="date" type="date" value={form.date} onChange={update} required className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-black/70">Ora</label>
                <input name="time" type="time" value={form.time} onChange={update} required className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-black/70">Persone</label>
                <input name="guests" type="number" min="1" max="20" value={form.guests} onChange={update} required className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-black/70">Note</label>
                <textarea name="notes" value={form.notes} onChange={update} rows="3" className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <button className="mt-4 w-full rounded-full px-5 py-3 font-semibold text-white" style={{background: brandBlue}}>Prenota</button>
            {status && <p className="mt-3 text-sm">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
