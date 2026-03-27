import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminClientesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  const { data: clientes } = await supabase
    .from('profiles')
    .select('*, reservations(count)')
    .eq('role', 'cliente')
    .order('created_at', { ascending: false })

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>

      {/* SIDEBAR */}
      <aside style={{
        width: '260px', backgroundColor: '#0f1923', flexShrink: 0,
        display: 'flex', flexDirection: 'column', padding: '32px 0',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50
      }}>
        <div style={{padding: '0 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
          <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px'}}>
            Sierra Experience
          </p>
          <p style={{fontSize: '10px', letterSpacing: '3px', color: '#c9963a', textTransform: 'uppercase'}}>
            Panel Admin
          </p>
        </div>
        <nav style={{padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px'}}>
          {[
            { label: 'Dashboard', href: '/admin', icon: '📊' },
            { label: 'Tours', href: '/admin/tours', icon: '🏔️' },
            { label: 'Clientes', href: '/admin/clientes', icon: '👥' },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '8px', textDecoration: 'none',
              color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500,
            }}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)'}}>
          <Link href="/" style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>
            ← Ver sitio
          </Link>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main style={{marginLeft: '260px', flex: 1, backgroundColor: '#f0f4f8', minHeight: '100vh'}}>
        <div style={{
          backgroundColor: '#ffffff', padding: '20px 40px',
          borderBottom: '1px solid #e8edf5',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>
            Clientes
          </h1>
          <span style={{
            backgroundColor: '#e6f7ee', color: '#276749',
            padding: '6px 16px', borderRadius: '999px',
            fontSize: '13px', fontWeight: 600
          }}>
            {clientes?.length || 0} registrados
          </span>
        </div>

        <div style={{padding: '40px'}}>
          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f8fafd'}}>
                  {['Cliente', 'Teléfono', 'Reservas', 'Miembro desde'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '14px 24px',
                      fontSize: '11px', fontWeight: 600, color: '#8a9ab5',
                      letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientes?.map((cliente) => (
                  <tr key={cliente.id} style={{borderTop: '1px solid #f0f4f8'}}>
                    <td style={{padding: '16px 24px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          backgroundColor: '#1a2d4a', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#c9963a', fontWeight: 700, fontSize: '16px',
                          fontFamily: "'Playfair Display', Georgia, serif"
                        }}>
                          {cliente.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span style={{fontSize: '14px', fontWeight: 600, color: '#1a2d4a'}}>
                          {cliente.full_name || 'Sin nombre'}
                        </span>
                      </div>
                    </td>
                    <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>
                      {cliente.phone || '—'}
                    </td>
                    <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>
                      {cliente.reservations?.[0]?.count || 0} reservas
                    </td>
                    <td style={{padding: '16px 24px', fontSize: '13px', color: '#8a9ab5'}}>
                      {new Date(cliente.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
                {(!clientes || clientes.length === 0) && (
                  <tr>
                    <td colSpan={4} style={{padding: '48px', textAlign: 'center', color: '#8a9ab5', fontSize: '14px'}}>
                      No hay clientes registrados aún
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}