import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function TourDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()
  const { data: tour } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single()

  if (!tour) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p style={{color: '#8a9ab5'}}>Tour no encontrado.</p>
      </div>
    )
  }

  return (
    <main style={{backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>

      {/* IMAGEN HERO */}
      <div style={{position: 'relative', height: '480px', marginTop: '72px'}}>
        <img src={tour.image_url} alt={tour.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,45,74,0.85) 0%, transparent 60%)'
        }}/>
        <div style={{position: 'absolute', bottom: '40px', left: '60px'}}>
          <Link href="/tours" style={{
            fontSize: '12px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            letterSpacing: '1px', display: 'inline-block', marginBottom: '12px'
          }}>
            ← Volver a Tours
          </Link>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
            color: '#ffffff', margin: 0
          }}>
            {tour.name}
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{maxWidth: '900px', margin: '0 auto', padding: '48px 32px'}}>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px'}}>
          {[
            { label: 'Precio por persona', value: `$${tour.price} MXN`, highlight: true },
            { label: 'Duración', value: `⏱ ${tour.duration}`, highlight: false },
            { label: 'Grupo máximo', value: `👥 ${tour.max_people} personas`, highlight: false },
          ].map((stat) => (
            <div key={stat.label} style={{
              backgroundColor: '#ffffff', borderRadius: '12px',
              padding: '24px', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(26,45,74,0.06)',
              border: stat.highlight ? '2px solid #c9963a' : '1px solid #e8edf5'
            }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px', fontWeight: 700,
                color: stat.highlight ? '#c9963a' : '#1a2d4a',
                marginBottom: '6px'
              }}>
                {stat.value}
              </p>
              <p style={{fontSize: '12px', color: '#8a9ab5'}}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '16px',
          padding: '36px', marginBottom: '32px',
          boxShadow: '0 2px 12px rgba(26,45,74,0.06)'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '24px', fontWeight: 700, color: '#1a2d4a', marginBottom: '16px'
          }}>
            Acerca de este tour
          </h2>
          <p style={{fontSize: '15px', color: '#4a5a6a', lineHeight: '1.8'}}>
            {tour.description}
          </p>
        </div>

        {/* BOTÓN RESERVAR */}
        <Link href={`/tours/${id}/reservar`} style={{
          display: 'block', textAlign: 'center',
          backgroundColor: '#c9963a', color: '#1a2d4a',
          padding: '18px', borderRadius: '10px',
          fontSize: '15px', fontWeight: 700, textDecoration: 'none',
          letterSpacing: '2px', textTransform: 'uppercase'
        }}>
          Reservar este Tour
        </Link>
      </div>
    </main>
  )
}