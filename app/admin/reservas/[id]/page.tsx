import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ReservaActions from './ReservaActions'

export default async function AdminReservaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  const { data: res } = await supabase
    .from('reservations')
    .select('*, tours(name, price, image_url), profiles(full_name)')
    .eq('id', id)
    .single()

  if (!res) redirect('/admin')

  const statusColor: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-700',
    confirmada: 'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-700',
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🏔️ Sierra Experience — Admin</h1>
        <Link href="/admin" className="text-sm hover:text-green-200">← Volver al panel</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestionar Reserva</h2>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img src={res.tours?.image_url} alt={res.tours?.name} className="w-full h-48 object-cover" />
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{res.tours?.name}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[res.status]}`}>
                {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">👤 Cliente: <span className="font-semibold">{res.profiles?.full_name || 'Sin nombre'}</span></p>
            <p className="text-gray-600">📅 Fecha: <span className="font-semibold">{new Date(res.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            <p className="text-gray-600">👥 Personas: <span className="font-semibold">{res.people}</span></p>
            <p className="text-gray-600">💰 Total: <span className="font-semibold text-green-700">${res.tours?.price * res.people} MXN</span></p>
            {res.notes && <p className="text-gray-600">📝 Notas: <span className="font-semibold">{res.notes}</span></p>}

            <ReservaActions reservationId={res.id} currentStatus={res.status} />
          </div>
        </div>
      </div>
    </main>
  )
}