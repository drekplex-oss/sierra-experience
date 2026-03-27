import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function ToursPage() {
  const supabase = createClient()
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  return (
    <main style={{backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>

      {/* HERO */}
      <section style={{
        position: 'relative', paddingTop: '160px', paddingBottom: '80px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,40,0.7) 0%, rgba(10,20,40,0.5) 100%)'}} />
        <div style={{position: 'relative', zIndex: 2}}>
          <p style={{fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#c9963a', marginBottom: '16px', fontWeight: 600}}>
            Sierra Tarahumara
          </p>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.1}}>
            Nuestros Tours
          </h1>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7}}>
            Expediciones únicas a los destinos más espectaculares de Chihuahua
          </p>
          <div style={{display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '40px'}}>
            {[
              { valor: `${tours?.length || 0}+`, label: 'Tours disponibles' },
              { valor: '100%', label: 'Guías certificados' },
              { valor: '5★', label: 'Calificación promedio' },
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
          {['Todos', '1 día', '2 días', 'Multidia', 'Cultura', 'Aventura'].map((f) => (
            <span key={f} style={{padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, backgroundColor: f === 'Todos' ? '#1a2d4a' : '#f0f4f8', color: f === 'Todos' ? '#ffffff' : '#8a9ab5', whiteSpace: 'nowrap', cursor: 'pointer'}}>
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* TOURS GRID */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '64px 32px'}}>
        {tours && tours.length > 0 ? (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px'}}>
            {tours.map((tour) => (
              <div key={tour.id} style={{backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,45,74,0.08)', border: '1px solid #e8edf5', display: 'flex', flexDirection: 'column'}}>

                <div style={{position: 'relative', height: '240px', overflow: 'hidden'}}>
                  <img src={tour.image_url} alt={tour.name} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s'}} />
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,40,0.6) 0%, transparent 60%)'}} />
                  <div style={{position: 'absolute', top: '16px', right: '16px', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '5px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px'}}>
                    {tour.duration}
                  </div>
                  <div style={{position: 'absolute', bottom: '16px', left: '16px'}}>
                    <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: '0 0 2px', letterSpacing: '1px'}}>DESDE</p>
                    <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#c9963a', margin: 0}}>
                      {'$'}{tour.price?.toLocaleString()}
                      <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: 400}}> MXN</span>
                    </p>
                  </div>
                </div>

                <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '10px', lineHeight: 1.3}}>
                    {tour.name}
                  </h2>
                  <p style={{fontSize: '13px', color: '#6a7a8a', marginBottom: '20px', lineHeight: '1.7', flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {tour.description}
                  </p>

                  <div style={{display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0f4f8'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '16px'}}>👥</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Máx. {tour.max_people} personas</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <span style={{fontSize: '16px'}}>📍</span>
                      <span style={{fontSize: '12px', color: '#8a9ab5'}}>Sierra Tarahumara</span>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                    <Link href={`/tours/${tour.id}`} style={{textAlign: 'center', backgroundColor: '#f0f4f8', color: '#1a2d4a', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>
                      Ver detalles
                    </Link>
                    <Link href={`/tours/${tour.id}/reservar`} style={{textAlign: 'center', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none'}}>
                      Reservar →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '80px 0'}}>
            <p style={{fontSize: '48px', marginBottom: '16px'}}>🏔️</p>
            <p style={{fontSize: '18px', color: '#8a9ab5'}}>No hay tours disponibles por el momento</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{backgroundColor: '#1a2d4a', padding: '80px 32px', textAlign: 'center'}}>
        <p style={{fontSize: '11px', letterSpacing: '4px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600}}>
          Experiencia personalizada
        </p>
        <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '16px'}}>
          ¿No encuentras lo que buscas?
        </h2>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7}}>
          Diseñamos tours privados a tu medida para grupos, familias o viajeros individuales
        </p>
        <Link href="/contacto" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '16px 40px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none'}}>
          Contactar a un especialista
        </Link>
      </section>

    </main>
  )
}