'use client'

import { useState, useEffect } from 'react'

export default function HotelesPage() {
  const [hoteles, setHoteles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hoteles')
      .then(r => r.json())
      .then(result => {
        setHoteles(result.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const stars = (n: number) => Array.from({length: 5}, (_, i) => (
    <span key={i} style={{color: i < n ? '#c9963a' : '#e2e8f0', fontSize: '14px'}}>★</span>
  ))

  if (loading) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8'}}>
      <p style={{color: '#8a9ab5', fontFamily: 'Inter, sans-serif'}}>Cargando...</p>
    </div>
  )

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>

      <section style={{
        position: 'relative', paddingTop: '160px', paddingBottom: '80px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,40,0.7) 0%, rgba(10,20,40,0.5) 100%)'}} />
        <div style={{position: 'relative', zIndex: 2}}>
          <p style={{fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#c9963a', marginBottom: '16px', fontWeight: 600}}>Sierra Tarahumara</p>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.1}}>Hospedaje</h1>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7}}>
            Hoteles, cabañas y haciendas en los destinos más bellos de Chihuahua
          </p>
          <div style={{display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '40px'}}>
            {[
              { valor: `${hoteles.length}+`, label: 'Propiedades' },
              { valor: '5★', label: 'Calificación máx.' },
              { valor: '100%', label: 'Verificados' },
            ].map((s) => (
              <div key={s.label} style={{textAlign: 'center'}}>
                <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: '#c9963a', margin: 0}}>{s.valor}</p>
                <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: '1px'}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{backgroundColor: '#ffffff', borderBottom: '1px solid #e8edf5', padding: '0 32px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', padding: '16px 0', overflowX: 'auto'}}>
          {['Todos', 'Lodge', 'Cabaña', 'Hotel', 'Hacienda'].map((f) => (
            <span key={f} style={{padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, backgroundColor: f === 'Todos' ? '#1a2d4a' : '#f0f4f8', color: f === 'Todos' ? '#ffffff' : '#8a9ab5', whiteSpace: 'nowrap', cursor: 'pointer'}}>
              {f}
            </span>
          ))}
        </div>
      </section>

      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '64px 32px'}}>
        {hoteles.length === 0 ? (
          <div style={{textAlign: 'center', padding: '80px 0'}}>
            <p style={{fontSize: '48px', marginBottom: '16px'}}>🏨</p>
            <p style={{fontSize: '18px', color: '#8a9ab5'}}>No hay hoteles disponibles por el momento</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px'}}>
            {hoteles.map((hotel) => (
              <div key={hotel.id} style={{backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,45,74,0.08)', border: '1px solid #e8edf5', display: 'flex', flexDirection: 'column'}}>

                <div style={{position: 'relative', height: '240px', overflow: 'hidden'}}>
                  {hotel.image_url ? (
                    <img src={hotel.image_url} alt={hotel.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={{width: '100%', height: '100%', backgroundColor: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{fontSize: '48px'}}>🏨</span>
                    </div>
                  )}
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,40,0.7) 0%, transparent 50%)'}} />
                  <div style={{position: 'absolute', top: '16px', left: '16px', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '5px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px'}}>
                    {hotel.type}
                  </div>
                  <div style={{position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <div>
                      <div style={{marginBottom: '4px'}}>{stars(hotel.rating || 5)}</div>
                      <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.2}}>{hotel.name}</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.7)', margin: '0 0 2px', letterSpacing: '1px'}}>DESDE</p>
                      <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#c9963a', margin: 0}}>
                        {'$'}{hotel.price?.toLocaleString()}
                      </p>
                      <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: 0}}>MXN / noche</p>
                    </div>
                  </div>
                </div>

                <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <p style={{fontSize: '13px', color: '#6a7a8a', marginBottom: '16px', lineHeight: '1.7',
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {hotel.description}
                  </p>

                  {hotel.amenities && (
                    <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0f4f8'}}>
                      <p style={{fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px'}}>Servicios incluidos</p>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                        {hotel.amenities.split(',').slice(0, 4).map((a: string) => (
                          <span key={a} style={{backgroundColor: '#f0f4f8', color: '#4a5a6a', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 500}}>
                            {a.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{display: 'flex', gap: '6px', marginBottom: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '14px'}}>👥</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Máx. {hotel.max_people} personas</span>
                    </div>
                    <span style={{color: '#e2e8f0', margin: '0 4px'}}>|</span>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '14px'}}>📍</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Sierra Tarahumara</span>
                    </div>
                  </div>

                  <a href={`/hoteles/reservar?id=${hotel.id}`} style={{display: 'block', textAlign: 'center', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxSizing: 'border-box'}}>
                    Consultar disponibilidad →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{backgroundColor: '#1a2d4a', padding: '80px 32px', textAlign: 'center'}}>
        <p style={{fontSize: '11px', letterSpacing: '4px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600}}>Grupos y eventos</p>
        <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '16px'}}>
          ¿Buscas hospedaje para grupo?
        </h2>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7}}>
          Tenemos tarifas especiales para grupos, familias y eventos corporativos en toda la sierra
        </p>
        <a href="/contacto" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '16px 40px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none'}}>
          Solicitar cotización grupal
        </a>
      </section>

    </main>
  )
}