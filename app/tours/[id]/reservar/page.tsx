'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #dde3ee', borderRadius: '8px',
  padding: '14px 16px', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box', color: '#1a2d4a', backgroundColor: '#ffffff',
}

export default function ReservarPage() {
  const [tour, setTour] = useState<any>(null)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(1)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await supabase.from('tours').select('*').eq('id', params.id).single()
      setTour(data)
    }
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
    }
    fetchTour()
    checkUser()
  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 0)
    }
  }, [success])

  const handleReservar = async () => {
    if (!date) { setError('Por favor selecciona una fecha'); return }
    setLoading(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { error } = await supabase.from('reservations').insert({
      user_id: user.id,
      tour_id: params.id,
      date, people, notes,
      status: 'pendiente'
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (!tour) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8'}}>
      <p style={{color: '#8a9ab5', fontFamily: 'Inter, sans-serif'}}>Cargando...</p>
    </div>
  )

  if (success) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif', paddingTop: '120px', paddingBottom: '80px'}}>
        <div style={{maxWidth: '480px', margin: '0 auto', padding: '0 32px', textAlign: 'center'}}>
          <div style={{backgroundColor: '#ffffff', borderRadius: '20px', padding: '60px 48px', boxShadow: '0 4px 24px rgba(26,45,74,0.10)'}}>
            <p style={{fontSize: '56px', marginBottom: '20px'}}>✅</p>
            <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#1a2d4a', marginBottom: '12px'}}>Reserva enviada</h2>
            <p style={{fontSize: '15px', color: '#8a9ab5', marginBottom: '32px', lineHeight: 1.7}}>
              Te contactaremos pronto para confirmar tu reserva de {tour?.name}
            </p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <Link href="/dashboard" style={{backgroundColor: '#1a2d4a', color: '#ffffff', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', textAlign: 'center'}}>
                Ver mis reservas
              </Link>
              <Link href="/tours" style={{backgroundColor: '#f0f4f8', color: '#1a2d4a', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', textAlign: 'center'}}>
                Ver mas tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>
      <div style={{maxWidth: '640px', margin: '0 auto', padding: '120px 32px 60px'}}>

        <Link href={`/tours/${params.id}`} style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none', display: 'block', marginBottom: '24px'}}>
          ← Volver al tour
        </Link>

        {tour && (
          <div style={{backgroundColor: '#1a2d4a', borderRadius: '20px', overflow: 'hidden', marginBottom: '28px', boxShadow: '0 4px 24px rgba(26,45,74,0.15)', display: 'flex', gap: '0'}}>
            {tour.image_url && (
              <img src={tour.image_url} alt={tour.name} style={{width: '40%', height: '160px', objectFit: 'cover', flexShrink: 0}} />
            )}
            <div style={{padding: '20px', flex: 1}}>
              <p style={{fontSize: '10px', letterSpacing: '2px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600}}>{tour.duration}</p>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', lineHeight: 1.3}}>{tour.name}</h2>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '10px'}}>Máx. {tour.max_people} personas</p>
              <p style={{fontSize: '20px', fontWeight: 700, color: '#c9963a', margin: 0}}>
                {'$'}{tour.price?.toLocaleString()} <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 400}}>MXN/persona</span>
              </p>
            </div>
          </div>
        )}

        {error && (
          <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px'}}>
            {error}
          </div>
        )}

        <div style={{backgroundColor: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 24px rgba(26,45,74,0.08)', display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>
            Datos de la reserva
          </h2>

          <div>
            <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
              Fecha del tour *
            </label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} style={inputStyle} />
          </div>

          <div>
            <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
              Número de personas *
            </label>
            <input type="number" value={people} onChange={e => setPeople(Number(e.target.value))} min={1} max={tour.max_people} style={inputStyle} />
            <p style={{fontSize: '12px', color: '#8a9ab5', marginTop: '6px'}}>Máximo {tour.max_people} personas</p>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
              Notas adicionales
            </label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Alergias, requerimientos especiales, etc." style={{...inputStyle, resize: 'none', fontFamily: 'Inter, sans-serif'}} />
          </div>

          <div style={{backgroundColor: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: '15px', fontWeight: 700, color: '#1a2d4a'}}>Total estimado</span>
              <span style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#c9963a'}}>${(tour.price * people).toLocaleString()} MXN</span>
            </div>
          </div>

          <button onClick={handleReservar} disabled={loading || !date} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: loading || !date ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: '1px', opacity: loading || !date ? 0.7 : 1}}>
            {loading ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </div>
  )
}