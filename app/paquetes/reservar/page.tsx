'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const input: React.CSSProperties = {
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

function ReservarForm() {
  const searchParams = useSearchParams()
  const paqueteId = searchParams.get('id')
  const [paquete, setPaquete] = useState<any>(null)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState('1')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (paqueteId) {
      fetch('/api/paquetes').then(r => r.json()).then(result => {
        const found = (result.data || []).find((p: any) => p.id === paqueteId)
        setPaquete(found)
      })
    }
  }, [paqueteId])

  const handleReservar = async () => {
    if (!date || !people) {
      setError('Por favor llena todos los campos')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/reservaciones-paquetes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paquete_id: paqueteId, date, people: Number(people), notes })
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
      <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif'}}>
        <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '48px', textAlign: 'center', maxWidth: '480px'}}>
          <p style={{fontSize: '48px', marginBottom: '16px'}}>✅</p>
          <h2 style={{fontSize: '24px', fontWeight: 700, color: '#1a2d4a', marginBottom: '12px'}}>Reserva enviada</h2>
          <p style={{fontSize: '15px', color: '#8a9ab5', marginBottom: '32px'}}>Te contactaremos pronto para confirmar tu reserva</p>
          <Link href="/paquetes" style={{backgroundColor: '#1a2d4a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600}}>
            Ver mas paquetes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif', paddingTop: '100px'}}>
      <div style={{maxWidth: '600px', margin: '0 auto', padding: '0 32px 60px'}}>
        <Link href="/paquetes" style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none', display: 'block', marginBottom: '24px'}}>
          ← Volver a paquetes
        </Link>
        {paquete && (
          <div style={{backgroundColor: '#1a2d4a', borderRadius: '16px', padding: '24px', marginBottom: '32px', color: '#ffffff'}}>
            <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '8px'}}>{paquete.name}</h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px'}}>{paquete.duration} - Max {paquete.max_people} personas</p>
            <p style={{fontSize: '24px', fontWeight: 700, color: '#c9963a', margin: 0}}>{'$'}{paquete.price?.toLocaleString()} MXN</p>
          </div>
        )}
        {error && (
          <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '14px', borderRadius: '8px', marginBottom: '24px'}}>
            {error}
          </div>
        )}
        <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>
            Datos de la reserva
          </h2>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Fecha *</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={input} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Numero de personas *</label>
            <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} min="1" style={input} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Notas adicionales</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Alergias, requerimientos especiales..." style={{...input, resize: 'none'}} />
          </div>
          <button onClick={handleReservar} disabled={loading} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase'}}>
            {loading ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReservarPaquetePage() {
  return (
    <Suspense>
      <ReservarForm />
    </Suspense>
  )
}