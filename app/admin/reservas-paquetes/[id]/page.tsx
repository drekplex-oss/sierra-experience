import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function GestionarReservaPaquetePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  const { data: reservation } = await supabase
    .from('reservations_paquetes')
    .select('*, paquetes(name, price, duration, image_url)')
    .eq('id', id)
    .single()

  if (!reservation) redirect('/admin')

  const { data: clientProfile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', reservation.user_id)
    .single()

  async function updateStatus(formData: FormData) {
    'use server'
    const status = formData.get('status') as string
    const supabase = await createServerSupabaseClient()
    await supabase.from('reservations_paquetes').update({ status }).eq('id', id)
    revalidatePath(`/admin/reservas-paquetes/${id}`)
  }

  const total = (reservation.paquetes?.price || 0) * reservation.people

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>
      <aside style={{width: '260px', backgroundColor: '#0f1923', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '32px 0', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50}}>
        <div style={{padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
          <p style={{fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px'}}>Sierra Experience</p>
          <p style={{fontSize: '10px', letterSpacing: '3px', color: '#c9963a', textTransform: 'uppercase'}}>Panel Admin</p>
        </div>
        <nav style={{padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px'}}>
          {[
            { label: 'Dashboard', href: '/admin', icon: '📊' },
            { label: 'Tours', href: '/admin/tours', icon: '🏔️' },
            { label: 'Paquetes', href: '/admin/paquetes', icon: '📦' },
            { label: 'Hoteles', href: '/admin/hoteles', icon: '🏨' },
            { label: 'Clientes', href: '/admin/clientes', icon: '👥' },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500}}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div style={{padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)'}}>
          <Link href="/" style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>Ver sitio</Link>
        </div>
      </aside>

      <main style={{marginLeft: '260px', flex: 1, backgroundColor: '#f0f4f8', minHeight: '100vh'}}>
        <div style={{backgroundColor: '#ffffff', padding: '20px 40px', borderBottom: '1px solid #e8edf5', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Gestionar Reserva</h1>
          <Link href="/admin" style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none'}}>← Volver al Dashboard</Link>
        </div>

        <div style={{maxWidth: '680px', margin: '40px auto', padding: '0 40px'}}>
          <div style={{backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,45,74,0.10)'}}>

            {reservation.paquetes?.image_url && (
              <img src={reservation.paquetes.image_url} alt={reservation.paquetes.name} style={{width: '100%', height: '220px', objectFit: 'cover'}} />
            )}

            <div style={{padding: '28px 32px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
                <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>{reservation.paquetes?.name}</h2>
                <span style={{
                  backgroundColor: reservation.status === 'confirmada' ? '#e6f7ee' : reservation.status === 'cancelada' ? '#fff0f0' : '#fff8e6',
                  color: reservation.status === 'confirmada' ? '#276749' : reservation.status === 'cancelada' ? '#c0392b' : '#b7791f',
                  padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap'
                }}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px'}}>
                <p style={{fontSize: '14px', color: '#4a5a6a', margin: 0}}>👤 <strong>Cliente:</strong> {clientProfile?.full_name || 'Sin nombre'}</p>
                {clientProfile?.phone && (
                  <p style={{fontSize: '14px', color: '#4a5a6a', margin: 0}}>📞 <strong>Tel:</strong> {clientProfile.phone}</p>
                )}
                <p style={{fontSize: '14px', color: '#4a5a6a', margin: 0}}>📅 <strong>Fecha:</strong> {new Date(reservation.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style={{fontSize: '14px', color: '#4a5a6a', margin: 0}}>👥 <strong>Personas:</strong> {reservation.people}</p>
                <p style={{fontSize: '14px', color: '#276749', margin: 0, fontWeight: 700}}>💰 <strong>Total:</strong> {'$'}{total.toLocaleString()} MXN</p>
                {reservation.notes && (
                  <p style={{fontSize: '14px', color: '#4a5a6a', margin: 0}}>📝 <strong>Notas:</strong> {reservation.notes}</p>
                )}
              </div>

              <form action={updateStatus} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                <button name="status" value="confirmada" style={{padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, backgroundColor: '#22c55e', color: '#ffffff'}}>
                  ✔ Confirmar
                </button>
                <button name="status" value="cancelada" style={{padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, backgroundColor: '#ef4444', color: '#ffffff'}}>
                  ✖ Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}