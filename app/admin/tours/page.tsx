import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function ToursPage() {
  const supabase = createClient()
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('active', true)

  return (
    <main style={{backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>

      {/* HEADER */}
      <section style={{
        backgroundColor: '#1a2d4a', paddingTop: '140px', paddingBottom: '60px',
        paddingLeft: '32px', paddingRight: '32px', textAlign: 'center'
      }}>
        <p style={{fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9963a', marginBottom: '16px'}}>
          Expediciones
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700,
          color: '#ffffff', margin: '0 0 16px'
        }}>
          Nuestros Tours
        </h1>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: '480px', margin: '0 auto'}}>
          Elige tu próxima aventura en la Sierra Tarahumara
        </p>
      </section>

      {/* LISTA DE TOURS */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '64px 32px'}}>
        {tours && tours.length > 0 ? (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px'}}>
            {tours.map((tour) => (
              <div key={tour.id} style={{
                backgroundColor: '#ffffff', borderRadius: '16px',
                overflow: 'hidden', boxShadow: '0 2px 16px rgba(26,45,74,0.08)',
                border: '1px solid #e8edf5'
              }}>
                <div style={{position: 'relative', overflow: 'hidden', height: '220px'}}>
                  <img
                    src={tour.image_url}
                    alt={tour.name}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    backgroundColor: '#c9963a', color: '#1a2d4a',
                    padding: '4px 12px', borderRadius: '999px',
                    fontSize: '12px', fontWeight: 700
                  }}>
                    {tour.duration}
                  </div>
                </div>
                <div style={{padding: '24px'}}>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '8px'
                  }}>
                    {tour.name}
                  </h2>
                  <p style={{fontSize: '13px', color: '#8a9ab5', marginBottom: '20px', lineHeight: '1.6'}}>
                    {tour.description}
                  </p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <div>
                      <p style={{fontSize: '11px', color: '#8a9ab5', marginBottom: '2px'}}>Desde</p>
                      <p style={{fontSize: '22px', fontWeight: 700, color: '#c9963a', fontFamily: "'Playfair Display', Georgia, serif"}}>
                        {"$"}{tour.price} <span style={{fontSize: '13px', color: '#8a9ab5', fontFamily: 'Inter, sans-serif', fontWeight: 400}}>MXN</span>
                      </p>
                    </div>
                    <p style={{fontSize: '12px', color: '#8a9ab5'}}>
                      👥 Máx. {tour.max_people} personas
                    </p>
                  </div>
                  <Link href={`/tours/${tour.id}`} style={{
                    display: 'block', textAlign: 'center',
                    backgroundColor: '#1a2d4a', color: '#ffffff',
                    padding: '12px', borderRadius: '8px',
                    fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                    letterSpacing: '1px', textTransform: 'uppercase'
                  }}>
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{textAlign: 'center', color: '#8a9ab5', fontSize: '16px'}}>
            No hay tours disponibles por el momento.
          </p>
        )}
      </section>
    </main>
  )
}