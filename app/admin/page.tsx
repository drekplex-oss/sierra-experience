import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  const user = session.user

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && user.email !== 'jobanfierro6@gmail.com') redirect('/')

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*, tours(name, price), profiles(full_name)')
    .order('created_at', { ascending: false })

  const { data: reservationsPaquetes } = await supabase
    .from('reservations_paquetes')
    .select('*, paquetes(name, price)')
    .order('created_at', { ascending: false })

  const { data: reservationsHoteles } = await supabase
    .from('reservations_hoteles')
    .select('*, hoteles(name, price)')
    .order('created_at', { ascending: false })

  const { data: allProfiles } = await supabase
    .from('profiles')
    .select('id, full_name')

  const profileMap: Record<string, string> = {}
  allProfiles?.forEach(p => { profileMap[p.id] = p.full_name || 'Sin nombre' })

  const today = new Date().toISOString().split('T')[0]
  const total = reservations?.length || 0
  const pendientes = reservations?.filter(r => r.status === 'pendiente').length || 0
  const confirmadas = reservations?.filter(r => r.status === 'confirmada').length || 0
  const canceladas = reservations?.filter(r => r.status === 'cancelada').length || 0
  const ingresos = reservations?.filter(r => r.status !== 'cancelada').reduce((sum, r) => sum + (r.tours?.price || 0) * r.people, 0) || 0
  const proximasHoy = reservations?.filter(r => r.date === today) || []

  const meses: Record<string, number> = {}
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = d.toLocaleDateString('es-MX', { month: 'short', year: '2-digit' })
    meses[key] = 0
  }
  reservations?.forEach(r => {
    const d = new Date(r.created_at)
    const key = d.toLocaleDateString('es-MX', { month: 'short', year: '2-digit' })
    if (key in meses) meses[key]++
  })
  const maxMes = Math.max(...Object.values(meses), 1)

  const tourCount: Record<string, { name: string, count: number }> = {}
  reservations?.forEach(r => {
    const id = r.tour_id
    if (!tourCount[id]) tourCount[id] = { name: r.tours?.name || 'Sin nombre', count: 0 }
    tourCount[id].count++
  })
  const toursPopulares = Object.values(tourCount).sort((a, b) => b.count - a.count).slice(0, 3)

  const statusStyle: Record<string, { bg: string, color: string }> = {
    pendiente:  { bg: '#fff8e6', color: '#b7791f' },
    confirmada: { bg: '#e6f7ee', color: '#276749' },
    cancelada:  { bg: '#fff0f0', color: '#c0392b' },
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>
      <aside style={{width: '260px', backgroundColor: '#0f1923', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '32px 0', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50}}>
        <div style={{padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
          <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px'}}>Sierra Experience</p>
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
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Dashboard</h1>
          <p style={{fontSize: '13px', color: '#8a9ab5'}}>{user.email}</p>
        </div>

        <div style={{padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px'}}>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
            {[
              { label: 'Nuevo Tour', href: '/admin/tours/nuevo', icon: '🏔️', desc: 'Agregar un tour nuevo' },
              { label: 'Ver Tours', href: '/admin/tours', icon: '📋', desc: 'Gestionar tours existentes' },
              { label: 'Nuevo Paquete', href: '/admin/paquetes/nuevo', icon: '📦', desc: 'Agregar un paquete nuevo' },
              { label: 'Ver Paquetes', href: '/admin/paquetes', icon: '🗂️', desc: 'Gestionar paquetes existentes' },
              { label: 'Nuevo Hotel', href: '/admin/hoteles/nuevo', icon: '🏨', desc: 'Agregar un hotel nuevo' },
              { label: 'Ver Clientes', href: '/admin/clientes', icon: '👥', desc: 'Lista de clientes' },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', textDecoration: 'none', boxShadow: '0 2px 12px rgba(26,45,74,0.06)', border: '1px solid #e8edf5', display: 'flex', alignItems: 'center', gap: '16px'}}>
                <span style={{fontSize: '28px'}}>{item.icon}</span>
                <div>
                  <p style={{fontSize: '15px', fontWeight: 700, color: '#1a2d4a', marginBottom: '4px'}}>{item.label}</p>
                  <p style={{fontSize: '12px', color: '#8a9ab5'}}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px'}}>
            {[
              { label: 'Total Reservas', value: total, color: '#1a2d4a', bg: '#ffffff' },
              { label: 'Pendientes', value: pendientes, color: '#b7791f', bg: '#fff8e6' },
              { label: 'Confirmadas', value: confirmadas, color: '#276749', bg: '#e6f7ee' },
              { label: 'Canceladas', value: canceladas, color: '#c0392b', bg: '#fff0f0' },
              { label: 'Ingresos Est.', value: `$${ingresos.toLocaleString('es-MX')}`, color: '#c9963a', bg: '#fdf6ec' },
            ].map((stat) => (
              <div key={stat.label} style={{backgroundColor: stat.bg, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(26,45,74,0.06)', border: '1px solid #e8edf5'}}>
                <p style={{fontSize: stat.label === 'Ingresos Est.' ? '18px' : '32px', fontWeight: 700, color: stat.color, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: '6px'}}>{stat.value}</p>
                <p style={{fontSize: '11px', color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase'}}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
            <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', marginBottom: '24px'}}>Reservas por Mes</h2>
              <div style={{display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px'}}>
                {Object.entries(meses).map(([mes, count]) => (
                  <div key={mes} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end'}}>
                    <p style={{fontSize: '12px', fontWeight: 700, color: '#1a2d4a'}}>{count}</p>
                    <div style={{width: '100%', borderRadius: '6px 6px 0 0', backgroundColor: count > 0 ? '#c9963a' : '#e8edf5', height: `${Math.max((count / maxMes) * 120, 4)}px`}} />
                    <p style={{fontSize: '10px', color: '#8a9ab5', textAlign: 'center'}}>{mes}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', marginBottom: '24px'}}>Tours Mas Populares</h2>
              {toursPopulares.length > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {toursPopulares.map((t, i) => (
                    <div key={t.name} style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: i === 0 ? '#c9963a' : i === 1 ? '#1a2d4a' : '#8a9ab5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, flexShrink: 0}}>{i + 1}</div>
                      <div style={{flex: 1}}>
                        <p style={{fontSize: '14px', fontWeight: 600, color: '#1a2d4a', marginBottom: '4px'}}>{t.name}</p>
                        <div style={{height: '6px', borderRadius: '3px', backgroundColor: '#f0f4f8'}}>
                          <div style={{height: '100%', borderRadius: '3px', backgroundColor: i === 0 ? '#c9963a' : '#1a2d4a', width: `${(t.count / (toursPopulares[0]?.count || 1)) * 100}%`}} />
                        </div>
                      </div>
                      <p style={{fontSize: '13px', fontWeight: 700, color: '#8a9ab5'}}>{t.count}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{fontSize: '14px', color: '#8a9ab5'}}>Sin reservas aun</p>
              )}
            </div>
          </div>

          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
            <div style={{padding: '24px 32px', borderBottom: '1px solid #e8edf5', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Reservas para Hoy</h2>
              <span style={{backgroundColor: proximasHoy.length > 0 ? '#e6f7ee' : '#f0f4f8', color: proximasHoy.length > 0 ? '#276749' : '#8a9ab5', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{proximasHoy.length} reservas</span>
            </div>
            {proximasHoy.length > 0 ? (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{backgroundColor: '#f8fafd'}}>
                    {['Cliente', 'Tour', 'Personas', 'Estado'].map((h) => (
                      <th key={h} style={{textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proximasHoy.map((res) => (
                    <tr key={res.id} style={{borderTop: '1px solid #f0f4f8'}}>
                      <td style={{padding: '14px 24px', fontSize: '14px', color: '#1a2d4a', fontWeight: 500}}>{res.profiles?.full_name || 'Sin nombre'}</td>
                      <td style={{padding: '14px 24px', fontSize: '14px', color: '#4a5a6a'}}>{res.tours?.name}</td>
                      <td style={{padding: '14px 24px', fontSize: '13px', color: '#8a9ab5'}}>{res.people}</td>
                      <td style={{padding: '14px 24px'}}>
                        <span style={{backgroundColor: statusStyle[res.status]?.bg, color: statusStyle[res.status]?.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{res.status.charAt(0).toUpperCase() + res.status.slice(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{padding: '32px', textAlign: 'center', color: '#8a9ab5', fontSize: '14px'}}>No hay reservas programadas para hoy</p>
            )}
          </div>

          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
            <div style={{padding: '24px 32px', borderBottom: '1px solid #e8edf5'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Reservas de Tours</h2>
            </div>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f8fafd'}}>
                  {['Cliente', 'Tour', 'Fecha', 'Personas', 'Estado', 'Accion'].map((h) => (
                    <th key={h} style={{textAlign: 'left', padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations?.map((res) => (
                  <tr key={res.id} style={{borderTop: '1px solid #f0f4f8'}}>
                    <td style={{padding: '16px 24px', fontSize: '14px', color: '#1a2d4a', fontWeight: 500}}>{res.profiles?.full_name || 'Sin nombre'}</td>
                    <td style={{padding: '16px 24px', fontSize: '14px', color: '#4a5a6a'}}>{res.tours?.name}</td>
                    <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{new Date(res.date).toLocaleDateString('es-MX')}</td>
                    <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{res.people}</td>
                    <td style={{padding: '16px 24px'}}>
                      <span style={{backgroundColor: statusStyle[res.status]?.bg, color: statusStyle[res.status]?.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{res.status.charAt(0).toUpperCase() + res.status.slice(1)}</span>
                    </td>
                    <td style={{padding: '16px 24px'}}>
                      <Link href={`/admin/reservas/${res.id}`} style={{fontSize: '13px', color: '#c9963a', textDecoration: 'none', fontWeight: 600}}>Gestionar</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
            <div style={{padding: '24px 32px', borderBottom: '1px solid #e8edf5'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Reservas de Paquetes</h2>
            </div>
            {reservationsPaquetes && reservationsPaquetes.length > 0 ? (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{backgroundColor: '#f8fafd'}}>
                    {['Cliente', 'Paquete', 'Fecha', 'Personas', 'Estado', 'Accion'].map((h) => (
                      <th key={h} style={{textAlign: 'left', padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservationsPaquetes.map((res) => (
                    <tr key={res.id} style={{borderTop: '1px solid #f0f4f8'}}>
                      <td style={{padding: '16px 24px', fontSize: '14px', color: '#1a2d4a', fontWeight: 500}}>{profileMap[res.user_id] || 'Sin nombre'}</td>
                      <td style={{padding: '16px 24px', fontSize: '14px', color: '#4a5a6a'}}>{res.paquetes?.name}</td>
                      <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{new Date(res.date).toLocaleDateString('es-MX')}</td>
                      <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{res.people}</td>
                      <td style={{padding: '16px 24px'}}>
                        <span style={{backgroundColor: statusStyle[res.status]?.bg, color: statusStyle[res.status]?.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{res.status.charAt(0).toUpperCase() + res.status.slice(1)}</span>
                      </td>
                      <td style={{padding: '16px 24px'}}>
                        <Link href={`/admin/reservas-paquetes/${res.id}`} style={{fontSize: '13px', color: '#c9963a', textDecoration: 'none', fontWeight: 600}}>Gestionar</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{padding: '32px', textAlign: 'center', color: '#8a9ab5', fontSize: '14px'}}>No hay reservas de paquetes aun</p>
            )}
          </div>

          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
            <div style={{padding: '24px 32px', borderBottom: '1px solid #e8edf5'}}>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Reservas de Hoteles</h2>
            </div>
            {reservationsHoteles && reservationsHoteles.length > 0 ? (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{backgroundColor: '#f8fafd'}}>
                    {['Cliente', 'Hotel', 'Check-in', 'Check-out', 'Personas', 'Estado', 'Accion'].map((h) => (
                      <th key={h} style={{textAlign: 'left', padding: '14px 24px', fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservationsHoteles.map((res) => (
                    <tr key={res.id} style={{borderTop: '1px solid #f0f4f8'}}>
                      <td style={{padding: '16px 24px', fontSize: '14px', color: '#1a2d4a', fontWeight: 500}}>{profileMap[res.user_id] || 'Sin nombre'}</td>
                      <td style={{padding: '16px 24px', fontSize: '14px', color: '#4a5a6a'}}>{res.hoteles?.name}</td>
                      <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{new Date(res.check_in).toLocaleDateString('es-MX')}</td>
                      <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{new Date(res.check_out).toLocaleDateString('es-MX')}</td>
                      <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>{res.people}</td>
                      <td style={{padding: '16px 24px'}}>
                        <span style={{backgroundColor: statusStyle[res.status]?.bg, color: statusStyle[res.status]?.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{res.status.charAt(0).toUpperCase() + res.status.slice(1)}</span>
                      </td>
                      <td style={{padding: '16px 24px'}}>
                        <Link href={`/admin/reservas-hoteles/${res.id}`} style={{fontSize: '13px', color: '#c9963a', textDecoration: 'none', fontWeight: 600}}>Gestionar</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{padding: '32px', textAlign: 'center', color: '#8a9ab5', fontSize: '14px'}}>No hay reservas de hoteles aun</p>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}