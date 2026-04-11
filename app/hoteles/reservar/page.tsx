'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #dde3ee',
  borderRadius: '8px',
  padding: '14px 16px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#1a2d4a',
  backgroundColor: '#ffffff',
}

function ReservarHotelForm() {
  const searchParams = useSearchParams()
  const hotelId = searchParams.get('id')
  const [hotel, setHotel] = useState<any>(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [people, setPeople] = useState('1')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (hotelId) {
      fetch('/api/hoteles').then(r => r.json()).then(result => {
        const found = (result.data || []).find((h: any) => h.id === hotelId)
        setHotel(found)
      })
    }
  }, [hotelId])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 0)
    }
  }, [success])

  const noches = checkIn && checkOut
    ? Math.max(0, Math.floor((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  const total = hotel ? hotel.price * noches : 0

  const handleReservar = async () => {
    if (!checkIn || !checkOut || !people) {
      setError('Por favor llena todos los campos')
      return
    }
    if (noches < 1) {
      setError('La fecha de salida debe ser posterior a la de llegada')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/reservaciones-hoteles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotel_id: hotelId, check_in: checkIn, check_out: checkOut, people: Number(people), notes })
    })
    const result = await res.json()
    if (result.error) {
      setError(result.error === 'No autenticado' ? 'Debes iniciar sesion para reservar' : 'Error: ' + result.error)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif', paddingTop: '120px', paddingBottom: '80px'}}>
        <div style={{maxWidth: '480px', margin: '0 auto', padding: '0 32px', textAlign: 'center'}}>
          <div style={{backgroundColor: '#ffffff', borderRadius: '20px', padding: '60px 48px', boxShadow: '0 4px 24px rgba(26,45,74,0.10)'}}>
            <p style={{fontSize: '56px', marginBottom: '20px'}}>✅</p>
            <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#1a2d4a', marginBottom: '12px'}}>Reserva enviada</h2>
            <p style={{fontSize: '15px', color: '#8a9ab5', marginBottom: '32px', lineHeight: 1.7}}>
              Te contactaremos pronto para confirmar tu reserva en {hotel?.name}
            </p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <Link href="/dashboard" style={{backgroundColor: '#1a2d4a', color: '#ffffff', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', textAlign: 'center'}}>
                Ver mis reservas
              </Link>
              <Link href="/hoteles" style={{backgroundColor: '#f0f4f8', color: '#1a2d4a', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', textAlign: 'center'}}>
                Ver mas hoteles
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

        <Link href="/hoteles" style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none', display: 'block', marginBottom: '24px'}}>
          ← Volver a hoteles
        </Link>

        {hotel && (
          <div style={{backgroundColor: '#1a2d4a', borderRadius: '20px', overflow: 'hidden', marginBottom: '28px', boxShadow: '0 4px 24px rgba(26,45,74,0.15)', display: 'flex'}}>
            {hotel.image_url && (
              <img src={hotel.image_url} alt={hotel.name} style={{width: '40%', height: '160px', objectFit: 'cover', flexShrink: 0}} />
            )}
            <div style={{padding: '20px', flex: 1}}>
              <p style={{fontSize: '10px', letterSpacing: '2px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600}}>{hotel.type}</p>
              <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', lineHeight: 1.3}}>{hotel.name}</h2>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '10px'}}>Máx. {hotel.max_people} personas</p>
              <p style={{fontSize: '20px', fontWeight: 700, color: '#c9963a', margin: 0}}>
                {'$'}{hotel.price?.toLocaleString()} <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 400}}>MXN / noche</span>
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

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
                Check-in *
              </label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} style={inputStyle} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
                Check-out *
              </label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={new Date().toISOString().split('T')[0]} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
              Numero de personas *
            </label>
            <input type="number" value={people} onChange={e => setPeople(e.target.value)} min="1" style={inputStyle} />
          </div>

          <div>
            <label style={{display: 'block', fontSize: '11px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>
              Notas adicionales
            </label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Peticiones especiales, llegada tarde, etc..." style={{...inputStyle, resize: 'none', fontFamily: 'Inter, sans-serif'}} />
          </div>

          {noches > 0 && (
            <div style={{backgroundColor: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <span style={{fontSize: '14px', color: '#6a7a8a'}}>${hotel?.price?.toLocaleString()} MXN x {noches} {noches === 1 ? 'noche' : 'noches'}</span>
                <span style={{fontSize: '14px', color: '#1a2d4a', fontWeight: 600}}>${(hotel?.price * noches).toLocaleString()} MXN</span>
              </div>
              <div style={{borderTop: '1px solid #e8edf5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '15px', fontWeight: 700, color: '#1a2d4a'}}>Total estimado</span>
                <span style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#c9963a'}}>${total.toLocaleString()} MXN</span>
              </div>
            </div>
          )}

          <button onClick={handleReservar} disabled={loading} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px'}}>
            {loading ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReservarHotelPage() {
  return (
    <Suspense>
      <ReservarHotelForm />
    </Suspense>
  )
}