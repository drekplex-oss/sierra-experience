'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NuevoHotelPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('Hotel')
  const [rating, setRating] = useState('4.5')
  const [maxPeople, setMaxPeople] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [amenities, setAmenities] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCrear = async () => {
    if (!name || !price || !maxPeople) {
      setError('Por favor llena todos los campos obligatorios')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/hoteles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
        type,
        rating: Number(rating),
        max_people: Number(maxPeople),
        image_url: imageUrl,
        amenities,
      })
    })
    const result = await res.json()
    if (result.error) {
      setError('Error: ' + result.error)
      setLoading(false)
    } else {
      window.location.href = '/admin/hoteles'
    }
  }

  const input = {
    width: '100%',
    border: '1px solid #dde3ee',
    borderRadius: '8px',
    padding: '14px 16px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    color: '#1a2d4a',
    backgroundColor: '#ffffff',
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>
      <div style={{backgroundColor: '#ffffff', padding: '20px 40px', borderBottom: '1px solid #e8edf5', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: '24px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Nuevo Hotel</h1>
        <Link href="/admin/hoteles" style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none'}}>Volver</Link>
      </div>
      <div style={{maxWidth: '700px', margin: '40px auto', padding: '0 40px'}}>
        {error && (
          <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '14px', borderRadius: '8px', marginBottom: '24px'}}>
            {error}
          </div>
        )}
        <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Nombre *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Hotel Mision Creel" style={input} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Descripcion</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{...input, resize: 'none'}} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Amenidades</label>
            <textarea value={amenities} onChange={(e) => setAmenities(e.target.value)} rows={2} placeholder="WiFi, Estacionamiento, Desayuno..." style={{...input, resize: 'none'}} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Precio (MXN) *</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1800" style={input} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
                <option value="Hotel">Hotel</option>
                <option value="Cabana">Cabana</option>
                <option value="Hostal">Hostal</option>
                <option value="Lodge">Lodge</option>
              </select>
            </div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Calificacion</label>
              <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="4.5" min="1" max="5" step="0.1" style={input} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>Capacidad *</label>
              <input type="number" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} placeholder="4" style={input} />
            </div>
          </div>
          <div>
            <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textTransform: 'uppercase', marginBottom: '8px'}}>URL de imagen</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." style={input} />
            {imageUrl && (
              <img src={imageUrl} alt="Preview" style={{marginTop: '12px', width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px'}} />
            )}
          </div>
          <button onClick={handleCrear} disabled={loading} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase'}}>
            {loading ? 'Creando...' : 'Crear Hotel'}
          </button>
        </div>
      </div>
    </div>
  )
}