'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const [reservations, setReservations] = useState<any[]>([])
  const [reservationsPaquetes, setReservationsPaquetes] = useState<any[]>([])
  const [reservationsHoteles, setReservationsHoteles] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'tours' | 'paquetes' | 'hoteles'>('tours')
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setEmail(user.email || '')

      const { data: tours } = await supabase
        .from('reservations')
        .select('*, tours(name, image_url, duration, price)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setReservations(tours || [])

      const { data: paquetes } = await supabase
        .from('reservations_paquetes')
        .select('*, paquetes(name, image_url, duration, price)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setReservationsPaquetes(paquetes || [])

      const { data: hoteles } = await supabase
        .from('reservations_hoteles')
        .select('*, hoteles(name, image_url, type, price)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setReservationsHoteles(hoteles || [])

      setLoading(false)
    }
    fetchData()
  }, [])

  const statusColor: Record<string, { bg: string, text: string }> = {
    pendiente:  { bg: '#fff8e6', text: '#b7791f' },
    confirmada: { bg: '#e6f7ee', text: '#276749' },
    cancelada:  { bg: '#fff0f0', text: '#c0392b' },
  }

  if (loading) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8'}}>
      <p style={{color: '#8a9ab5', fontFamily: 'Inter, sans-serif'}}>Cargando...</p>
    </div>
  )

  return (
    <main style={{backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingTop: '96px', paddingBottom: '64px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto', padding: '0 32px'}}>
        <div style={{marginBottom: '32px'}}>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#1a2d4a', marginBottom: '8px'}}>Mis Reservas</h1>
          <p style={{fontSize: '14px', color: '#8a9ab5'}}>{email}</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#ffffff', borderRadius: '12px', padding: '4px', marginBottom: '32px', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
          {([
            { key: 'tours', label: 'Tours' },
            { key: 'paquetes', label: 'Paquetes' },
            { key: 'hoteles', label: 'Hoteles' },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, backgroundColor: tab === t.key ? '#1a2d4a' : 'transparent', color: tab === t.key ? '#ffffff' : '#8a9ab5', transition: 'all 0.2s'}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'tours' && (
          reservations.length > 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {reservations.map((res) => (
                <div key={res.id} style={{backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(26,45,74,0.06)', overflow: 'hidden', display: 'flex'}}>
                  {res.tours?.image_url && <img src={res.tours.image_url} alt={res.tours.name} style={{width: '160px', height: '140px', objectFit: 'cover', flexShrink: 0}} />}
                  <div style={{padding: '24px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                      <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '8px'}}>{res.tours?.name}</h2>
                      <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>📅 {new Date(res.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>👥 {res.people} {res.people === 1 ? 'persona' : 'personas'}</p>
                      {res.notes && <p style={{fontSize: '13px', color: '#8a9ab5'}}>📝 {res.notes}</p>}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px'}}>
                      <span style={{backgroundColor: statusColor[res.status]?.bg, color: statusColor[res.status]?.text, padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>
                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </span>
                      <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#c9963a'}}>
                        {'$'}{(res.tours?.price * res.people).toLocaleString()} MXN
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '80px 0'}}>
              <p style={{fontSize: '16px', color: '#8a9ab5', marginBottom: '24px'}}>No tienes reservas de tours aun</p>
              <Link href="/tours" style={{fontSize: '14px', fontWeight: 600, color: '#1a2d4a', backgroundColor: '#c9963a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'}}>Ver Tours</Link>
            </div>
          )
        )}

        {tab === 'paquetes' && (
          reservationsPaquetes.length > 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {reservationsPaquetes.map((res) => (
                <div key={res.id} style={{backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(26,45,74,0.06)', overflow: 'hidden', display: 'flex'}}>
                  {res.paquetes?.image_url && <img src={res.paquetes.image_url} alt={res.paquetes.name} style={{width: '160px', height: '140px', objectFit: 'cover', flexShrink: 0}} />}
                  <div style={{padding: '24px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                      <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '8px'}}>{res.paquetes?.name}</h2>
                      <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>📅 {new Date(res.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>👥 {res.people} {res.people === 1 ? 'persona' : 'personas'}</p>
                      {res.notes && <p style={{fontSize: '13px', color: '#8a9ab5'}}>📝 {res.notes}</p>}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px'}}>
                      <span style={{backgroundColor: statusColor[res.status]?.bg, color: statusColor[res.status]?.text, padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>
                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </span>
                      <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#c9963a'}}>
                        {'$'}{(res.paquetes?.price * res.people).toLocaleString()} MXN
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '80px 0'}}>
              <p style={{fontSize: '16px', color: '#8a9ab5', marginBottom: '24px'}}>No tienes reservas de paquetes aun</p>
              <Link href="/paquetes" style={{fontSize: '14px', fontWeight: 600, color: '#1a2d4a', backgroundColor: '#c9963a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'}}>Ver Paquetes</Link>
            </div>
          )
        )}

        {tab === 'hoteles' && (
          reservationsHoteles.length > 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {reservationsHoteles.map((res) => {
                const noches = Math.max(0, Math.floor(
                  (new Date(res.check_out).getTime() - new Date(res.check_in).getTime()) / (1000 * 60 * 60 * 24)
                ))
                const total = (res.hoteles?.price || 0) * noches
                return (
                  <div key={res.id} style={{backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(26,45,74,0.06)', overflow: 'hidden', display: 'flex'}}>
                    {res.hoteles?.image_url && <img src={res.hoteles.image_url} alt={res.hoteles.name} style={{width: '160px', height: '140px', objectFit: 'cover', flexShrink: 0}} />}
                    <div style={{padding: '24px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <div>
                        <p style={{fontSize: '11px', letterSpacing: '2px', color: '#c9963a', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px'}}>{res.hoteles?.type}</p>
                        <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '8px'}}>{res.hoteles?.name}</h2>
                        <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>📅 Check-in: {new Date(res.check_in).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>📅 Check-out: {new Date(res.check_out).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '4px'}}>🌙 {noches} {noches === 1 ? 'noche' : 'noches'} · 👥 {res.people} {res.people === 1 ? 'persona' : 'personas'}</p>
                        {res.notes && <p style={{fontSize: '13px', color: '#8a9ab5'}}>📝 {res.notes}</p>}
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px'}}>
                        <span style={{backgroundColor: statusColor[res.status]?.bg, color: statusColor[res.status]?.text, padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </span>
                        <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#c9963a'}}>
                          {'$'}{total.toLocaleString()} MXN
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '80px 0'}}>
              <p style={{fontSize: '16px', color: '#8a9ab5', marginBottom: '24px'}}>No tienes reservas de hoteles aun</p>
              <Link href="/hoteles" style={{fontSize: '14px', fontWeight: 600, color: '#1a2d4a', backgroundColor: '#c9963a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'}}>Ver Hoteles</Link>
            </div>
          )
        )}

      </div>
    </main>
  )
}