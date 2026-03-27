import { createClient } from '@/lib/supabase'
import Link from 'next/link'

// 1. Definimos la interfaz del Tour
type Tour = {
  id: string
  name: string
  description: string
  image_url: string
  duration: string
  price: number
  max_people: number
  active: boolean
  created_at: string
}

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
        </div>
      </section>

      {/* TOURS GRID */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '64px 32px'}}>
        {tours && tours.length > 0 ? (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px'}}>
            {/* 2. AQUÍ APLICAMOS EL TIPO :Tour PARA EVITAR EL ERROR DE ANY */}
            {tours.map((tour: Tour) => (
              <div key={tour.id} style={{backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,45,74,0.08)', border: '1px solid #e8edf5', display: 'flex', flexDirection: 'column'}}>

                <div style={{position: 'relative', height: '240px', overflow: 'hidden'}}>
                  <img src={tour.image_url} alt={tour.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  <div style={{position: 'absolute', top: '16px', right: '16px', backgroundColor: '#c9963a', color: '#1a2d4a', padding: '5px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700}}>
                    {tour.duration}
                  </div>
                </div>

                <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a2d4a', marginBottom: '10px'}}>
                    {tour.name}
                  </h2>
                  <p style={{fontSize: '13px', color: '#6a7a8a', marginBottom: '20px', lineHeight: '1.7', flex: 1}}>
                    {tour.description}
                  </p>

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
            <p style={{fontSize: '18px', color: '#8a9ab5'}}>No hay tours disponibles por el momento</p>
          </div>
        )}
      </section>
    </main>
  )
}