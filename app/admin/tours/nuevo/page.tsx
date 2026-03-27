'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NuevoTourPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [maxPeople, setMaxPeople] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCrear = async () => {
    if (!name || !price || !duration || !maxPeople) {
      setError('Por favor llena todos los campos obligatorios')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, description,
        price: Number(price),
        duration,
        max_people: Number(maxPeople),
        image_url: imageUrl,
      })
    })

    const result = await res.json()

    if (result.error) {
      setError('Error: ' + result.error)
      setLoading(false)
    } else {
      window.location.href = '/admin/tours'
    }
  }

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
            Nuevo Tour
          </h1>
          <Link href="/admin/tours" style={{fontSize: '13px', color: '#8a9ab5', textDecoration: 'none'}}>
            ← Volver a Tours
          </Link>
        </div>

        <div style={{maxWidth: '700px', margin: '40px auto', padding: '0 40px'}}>
          {error && (
            <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '14px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px'}}>
              {error}
            </div>
          )}

          <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', boxShadow: '0 2px 12px rgba(26,45,74,0.06)', display: 'flex', flexDirection: 'column', gap: '24px'}}>

            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                Nombre del tour *
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Cascadas de la Sierra"
                style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', boxSizing: 'border-box'}} />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                Descripción
              </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe el tour..."
                style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'}} />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                  Precio (MXN) *
                </label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="850"
                  style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', boxSizing: 'border-box'}} />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                  Duración *
                </label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Ej: 1 día"
                  style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', boxSizing: 'border-box'}} />
              </div>
            </div>

            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                Máximo de personas *
              </label>
              <input type="number" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} placeholder="12"
                style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', boxSizing: 'border-box'}} />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'}}>
                URL de imagen
              </label>
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..."
                style={{width: '100%', border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px', fontSize: '14px', color: '#1a2d4a', outline: 'none', boxSizing: 'border-box'}} />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" style={{marginTop: '12px', width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px'}} />
              )}
            </div>

            <button
              onClick={handleCrear}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#c9963a99' : '#c9963a',
                color: '#1a2d4a', border: 'none', padding: '16px',
                borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '2px', textTransform: 'uppercase'
              }}
            >
              {loading ? 'Creando...' : 'Crear Tour'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}