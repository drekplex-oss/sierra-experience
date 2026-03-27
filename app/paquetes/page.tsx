'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PaquetesPage() {
  const [paquetes, setPaquetes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/paquetes').then(r => r.json()).then(result => {
      setPaquetes(result.data || [])
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8'}}>
      <p style={{color: '#8a9ab5', fontFamily: 'Inter, sans-serif'}}>Cargando...</p>
    </div>
  )

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>

      {/* HERO */}
      <section style={{
        position: 'relative', paddingTop: '160px', paddingBottom: '80px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,40,0.75) 0%, rgba(10,20,40,0.5) 100%)'}} />
        <div style={{position: 'relative', zIndex: 2}}>
          <p style={{fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#c9963a', marginBottom: '16px', fontWeight: 600}}>
            Todo incluido
          </p>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.1}}>
            Paquetes Turisticos
          </h1>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7}}>
            Vive la Sierra Tarahumara sin preocupaciones. Transporte, hospedaje y guias incluidos
          </p>
          <div style={{display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '40px'}}>
            {[
              { valor: `${paquetes.length}+`, label: 'Paquetes disponibles' },
              { valor: 'Todo', label: 'Incluido' },
              { valor: '100%', label: 'Guias certificados' },
            ].map((s) => (
              <div key={s.label} style={{textAlign: 'center'}}>
                <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: '#c9963a', margin: 0}}>{s.valor}</p>
                <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: '1px'}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section style={{backgroundColor: '#ffffff', borderBottom: '1px solid #e8edf5', padding: '0 32px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', padding: '16px 0', overflowX: 'auto'}}>
          {['Todos', '3 días', '5 días', '7 días', 'Cultura', 'Aventura'].map((f) => (
            <span key={f} style={{padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, backgroundColor: f === 'Todos' ? '#1a2d4a' : '#f0f4f8', color: f === 'Todos' ? '#ffffff' : '#8a9ab5', whiteSpace: 'nowrap', cursor: 'pointer'}}>
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* PAQUETES GRID */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '64px 32px'}}>
        {paquetes.length === 0 ? (
          <div style={{textAlign: 'center', padding: '80px 0'}}>
            <p style={{fontSize: '48px', marginBottom: '16px'}}>📦</p>
            <p style={{fontSize: '18px', color: '#8a9ab5'}}>Proximamente nuevos paquetes</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px'}}>
            {paquetes.map((paquete) => (
              <div key={paquete.id} style={{backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,45,74,0.08)', border: '1px solid #e8edf5', display: 'flex', flexDirection: 'column'}}>

                <div style={{position: 'relative', height: '240px', overflow: 'hidden'}}>
                  {paquete.image_url ? (
                    <img src={paquete.image_url} alt={paquete.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={{width: '100%', height: '100%', backgroundColor: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{fontSize: '48px'}}>📦</span>
                    </div>
                  )}
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,40,0.75) 0%, transparent 50%)'}} />
                  <div style={{position: 'absolute', top: '16px', right: '16px', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '5px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px'}}>
                    {paquete.duration}
                  </div>
                  <div style={{position: 'absolute', bottom: '16px', left: '16px', right: '16px'}}>
                    <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px', lineHeight: 1.2}}>
                      {paquete.name}
                    </h2>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: '1px'}}>DESDE</p>
                      <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#c9963a', margin: 0}}>
                        {'$'}{paquete.price?.toLocaleString()}
                        <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontWeight: 400}}> MXN</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <p style={{fontSize: '13px', color: '#6a7a8a', marginBottom: '16px', lineHeight: '1.7',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {paquete.description}
                  </p>

                  {paquete.includes && (
                    <div style={{backgroundColor: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px'}}>
                      <p style={{fontSize: '10px', fontWeight: 700, color: '#1a2d4a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px'}}>
                        ✓ Que incluye
                      </p>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                        {paquete.includes.split(',').slice(0, 4).map((item: string) => (
                          <span key={item} style={{backgroundColor: '#e6f7ee', color: '#276749', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 500}}>
                            {item.trim()}
                          </span>
                        ))}
                        {paquete.includes.split(',').length > 4 && (
                          <span style={{backgroundColor: '#f0f4f8', color: '#8a9ab5', padding: '3px 10px', borderRadius: '999px', fontSize: '11px'}}>
                            +{paquete.includes.split(',').length - 4} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div style={{display: 'flex', gap: '6px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '14px'}}>👥</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Máx. {paquete.max_people} personas</span>
                    </div>
                    <span style={{color: '#e2e8f0', margin: '0 4px'}}>|</span>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '14px'}}>📍</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Sierra Tarahumara</span>
                    </div>
                  </div>

                  <Link href={`/paquetes/reservar?id=${paquete.id}`} style={{display: 'block', textAlign: 'center', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none'}}>
                    Reservar este paquete →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{backgroundColor: '#1a2d4a', padding: '80px 32px', textAlign: 'center'}}>
        <p style={{fontSize: '11px', letterSpacing: '4px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600}}>
          Paquete a tu medida
        </p>
        <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '16px'}}>
          ¿Quieres un paquete personalizado?
        </h2>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7}}>
          Diseñamos paquetes exclusivos para grupos, lunas de miel, familias y viajeros corporativos
        </p>
        <a href="/contacto" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '16px 40px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none'}}>
          Solicitar paquete personalizado
        </a>
      </section>

    </main>
  )
}