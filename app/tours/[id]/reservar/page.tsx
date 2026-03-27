'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function ReservarPage() {
  const [tour, setTour] = useState<any>(null)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(1)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
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

  const handleReservar = async () => {
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
      window.location.href = '/dashboard'
    }
  }

  if (!tour) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8'}}>
      <p style={{color: '#8a9ab5', fontFamily: 'Inter, sans-serif'}}>Cargando...</p>
    </div>
  )

  return (
    <main style={{backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingTop: '96px', paddingBottom: '64px'}}>
      <div style={{maxWidth: '600px', margin: '0 auto', padding: '0 32px'}}>

        <div style={{marginBottom: '32px'}}>
          <Link href={`/tours/${params.id}`} style={{fontSize: '12px', color: '#8a9ab5', textDecoration: 'none', letterSpacing: '1px'}}>
            ← Volver al tour
          </Link>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: '#1a2d4a', marginTop: '12px', marginBottom: '4px'}}>
            Reservar Tour
          </h1>
          <p style={{fontSize: '15px', color: '#c9963a', fontWeight: 600}}>{tour.name}</p>
        </div>

        {error && (
          <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px'}}>
            {error}
          </div>
        )}

        <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', boxShadow: '0 2px 16px rgba(26,45,74,0.08)'}}>

          <div style={{marginBottom: '24px'}}>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
              Fecha del tour
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%', border: '1px solid #dde3ee', borderRadius: '8px',
                padding: '14px 16px', fontSize: '14px', color: '#1a2d4a',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{marginBottom: '24px'}}>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
              Número de personas
            </label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              min={1}
              max={tour.max_people}
              style={{
                width: '100%', border: '1px solid #dde3ee', borderRadius: '8px',
                padding: '14px 16px', fontSize: '14px', color: '#1a2d4a',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
            <p style={{fontSize: '12px', color: '#8a9ab5', marginTop: '6px'}}>Máximo {tour.max_people} personas</p>
          </div>

          <div style={{marginBottom: '24px'}}>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
              Notas adicionales (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Alergias, requerimientos especiales, etc."
              style={{
                width: '100%', border: '1px solid #dde3ee', borderRadius: '8px',
                padding: '14px 16px', fontSize: '14px', color: '#1a2d4a',
                outline: 'none', resize: 'none', boxSizing: 'border-box',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>

          <div style={{
            backgroundColor: '#f8fafd', border: '1px solid #e8edf5',
            borderRadius: '10px', padding: '20px', marginBottom: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <p style={{fontSize: '13px', color: '#8a9ab5'}}>Total estimado</p>
            <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#c9963a'}}>
              {"$"}{tour.price * people} MXN
            </p>
          </div>

          <button
            onClick={handleReservar}
            disabled={loading || !date}
            style={{
              width: '100%', backgroundColor: loading || !date ? '#c9963a99' : '#c9963a',
              color: '#1a2d4a', border: 'none', padding: '16px',
              borderRadius: '8px', fontSize: '14px', fontWeight: 700,
              cursor: loading || !date ? 'not-allowed' : 'pointer',
              letterSpacing: '2px', textTransform: 'uppercase'
            }}
          >
            {loading ? 'Enviando reserva...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </main>
  )
}