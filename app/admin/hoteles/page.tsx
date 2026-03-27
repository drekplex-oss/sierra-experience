'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminHotelesPage() {
  const [hoteles, setHoteles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch('/api/hoteles')
        const result = await res.json()
        console.log('hoteles result:', result)
        setHoteles(result.data || [])
      } catch (e) {
        console.error('error cargando hoteles:', e)
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>
      <div style={{backgroundColor: '#ffffff', padding: '20px 40px', borderBottom: '1px solid #e8edf5', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{fontSize: '24px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Hoteles</h1>
        <Link href="/admin/hoteles/nuevo" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none'}}>
          + Nuevo Hotel
        </Link>
      </div>
      <div style={{padding: '32px 40px'}}>
        {loading ? (
          <p style={{color: '#8a9ab5'}}>Cargando hoteles...</p>
        ) : hoteles.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 0'}}>
            <p style={{color: '#8a9ab5', marginBottom: '24px'}}>No hay hoteles todavia</p>
            <Link href="/admin/hoteles/nuevo" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>
              Crear primer hotel
            </Link>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {hoteles.map((hotel) => (
              <div key={hotel.id} style={{backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,45,74,0.06)'}}>
                {hotel.image_url ? (
                  <img src={hotel.image_url} alt={hotel.name} style={{width: '100%', height: '160px', objectFit: 'cover'}} />
                ) : (
                  <div style={{width: '100%', height: '160px', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{color: '#8a9ab5', fontSize: '13px'}}>Sin imagen</p>
                  </div>
                )}
                <div style={{padding: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>{hotel.name}</h3>
                    <span style={{backgroundColor: '#fff8e6', color: '#b7791f', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600}}>{hotel.type}</span>
                  </div>
                  <p style={{fontSize: '13px', color: '#8a9ab5', margin: '0 0 12px'}}>Cap. {hotel.max_people} personas</p>
                  <p style={{fontSize: '20px', fontWeight: 700, color: '#c9963a', margin: '0 0 16px'}}>{'$'}{hotel.price?.toLocaleString()} MXN/noche</p>
                  <Link href={'/admin/hoteles/' + hotel.id} style={{display: 'block', textAlign: 'center', backgroundColor: '#f0f4f8', color: '#1a2d4a', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}