'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, Star, Shield, Award, Heart, DollarSign, Clock, Headphones, ArrowRight, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const [destino, setDestino] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [viajeros, setViajeros] = useState('2 Viajeros')

  const destinos = [
    { nombre: 'Barrancas del Cobre', rating: '4.9', tours: 8, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop', desc: 'El sistema de cañones más grande de México' },
    { nombre: 'Creel', rating: '4.8', tours: 6, img: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&h=600&fit=crop', desc: 'Pueblo Mágico, puerta de la Sierra Tarahumara' },
    { nombre: 'Cascada Basaseachi', rating: '4.9', tours: 4, img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop', desc: 'La cascada más alta de México, 265 m de caída' },
    { nombre: 'Divisadero', rating: '4.8', tours: 5, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', desc: 'Teleférico con vista a las Barrancas del Cobre' },
    { nombre: 'Batopilas', rating: '4.7', tours: 3, img: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=800&h=600&fit=crop', desc: 'Pueblo colonial enclavado en la barranca' },
    { nombre: 'Paquimé', rating: '4.9', tours: 3, img: 'https://images.unsplash.com/photo-1539650116574-75c0c6d05a0a?w=800&h=600&fit=crop', desc: 'Patrimonio UNESCO, zona arqueológica única' },
  ]

  const tours = [
    { nombre: 'Ruta del Chepe Express', lugar: 'Sierra Tarahumara', dias: '5 días', rating: '4.9', reviews: 128, tags: ['Tren panorámico', 'Barrancas'], precio: 8500, precioAntes: 9500, img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop', featured: true, ahorro: 'Ahorra $1,000' },
    { nombre: 'Barrancas del Cobre 3 días', lugar: 'Creel, Chihuahua', dias: '3 días', rating: '4.8', reviews: 96, tags: ['Senderismo', 'Naturaleza'], precio: 4200, precioAntes: 4800, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop', featured: true, ahorro: 'Ahorra $600' },
    { nombre: 'Cascada Basaseachi', lugar: 'Parque Nacional', dias: '1 día', rating: '4.9', reviews: 74, tags: ['Cascada 265m', 'Naturaleza'], precio: 850, precioAntes: null, img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop', featured: false, ahorro: null },
    { nombre: 'Sierra Tarahumara Completa', lugar: 'Chihuahua', dias: '7 días', rating: '4.7', reviews: 156, tags: ['Todo incluido', 'Cultura Rarámuri'], precio: 14500, precioAntes: 16000, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', featured: true, ahorro: 'Ahorra $1,500' },
  ]

  const beneficios = [
    { icon: <Shield size={28} />, titulo: 'Viaje Seguro', desc: 'Tu seguridad es nuestra prioridad. Todos los tours incluyen seguro y soporte 24/7.' },
    { icon: <Award size={28} />, titulo: 'Guías Expertos Locales', desc: 'Vive los destinos con guías apasionados que conocen cada rincón de la Sierra.' },
    { icon: <Heart size={28} />, titulo: 'Experiencias Únicas', desc: 'Cada tour equilibra maravillas naturales con experiencias culturales auténticas.' },
    { icon: <DollarSign size={28} />, titulo: 'Mejor Precio', desc: '¿Encontraste un precio más bajo? Lo igualamos y te damos 10% adicional de descuento.' },
    { icon: <Clock size={28} />, titulo: 'Reserva Flexible', desc: 'Los planes cambian. Cancelación gratuita hasta 30 días antes de tu salida.' },
    { icon: <Headphones size={28} />, titulo: 'Soporte 24/7', desc: 'Nuestros expertos siempre están disponibles para ayudarte donde estés.' },
  ]

  const testimonios = [
    { inicial: 'C', nombre: 'Carlos Mendoza', tipo: 'Viajero Aventurero', destino: 'Barrancas del Cobre, Chihuahua', texto: 'Las Barrancas del Cobre son simplemente impresionantes. El viaje en el Chepe fue una experiencia que no olvidaré jamás. Todo perfectamente organizado.' },
    { inicial: 'A', nombre: 'Ana López', tipo: 'Luna de Miel', destino: 'Creel y Batopilas, Chihuahua', texto: 'Creel y Batopilas superaron todas mis expectativas. La cultura Rarámuri es fascinante y el paisaje de la sierra es de otro mundo. Volveremos pronto.' },
    { inicial: 'R', nombre: 'Roberto Soto', tipo: 'Viajero Solo', destino: 'Cascada Basaseachi, Chihuahua', texto: 'La cascada de Basaseachi es la más impresionante de mi vida. El servicio fue excelente, muy profesionales y conocedores de toda la región.' },
  ]

  const inputBase: React.CSSProperties = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px',
    padding: '12px 14px 12px 40px', fontSize: '14px', color: '#1a1a2e',
    backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a2e' }}>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative', height: '100vh', minHeight: '750px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,20,50,0.75) 0%, rgba(10,20,50,0.45) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', width: '100%', maxWidth: '900px' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(201,150,58,0.2)', border: '1px solid rgba(201,150,58,0.5)', borderRadius: '999px', padding: '8px 20px', marginBottom: '28px' }}>
            <Star size={14} style={{ color: '#c9963a', fill: '#c9963a' }} />
            <span style={{ fontSize: '13px', color: '#c9963a', fontWeight: 600 }}>Agencia de Viajes #1 en Sierra Tarahumara 2025</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Descubre tu Próxima<br />Gran Aventura
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.8 }}>
            Explora las Barrancas del Cobre, Pueblos Mágicos y maravillas naturales de Chihuahua con tours expertos.
          </p>

          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '56px', flexWrap: 'wrap' }}>
            {[{ n: '50+', l: 'Destinos' }, { n: '200+', l: 'Paquetes' }, { n: '15k+', l: 'Viajeros Felices' }, { n: '98%', l: 'Satisfacción' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#c9963a', margin: '0 0 4px' }}>{s.n}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0, letterSpacing: '1px' }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* BUSCADOR */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px 28px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Destino</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#c9963a' }} />
                  <input type="text" placeholder="¿A dónde vas?" value={destino} onChange={e => setDestino(e.target.value)} style={inputBase} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Llegada</label>
                <div style={{ position: 'relative' }}>
                  <Calendar style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#c9963a' }} />
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={inputBase} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Salida</label>
                <div style={{ position: 'relative' }}>
                  <Calendar style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#c9963a' }} />
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={inputBase} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Viajeros</label>
                <div style={{ position: 'relative' }}>
                  <Users style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#c9963a' }} />
                  <select value={viajeros} onChange={e => setViajeros(e.target.value)} style={{ ...inputBase, appearance: 'none' as const }}>
                    {['1 Viajero', '2 Viajeros', '3 Viajeros', '4+ Viajeros'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <Link href="/tours" style={{ backgroundColor: '#c9963a', color: '#ffffff', padding: '13px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                <Search size={16} /> Buscar Tours
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESTINOS POPULARES ── */}
      <div style={{ backgroundColor: '#f9fafb', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#c9963a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Destinos Populares</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.2 }}>Explora Chihuahua</h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px', maxWidth: '500px', lineHeight: 1.7 }}>De cascadas impresionantes a ciudades históricas, descubre nuestros destinos más buscados.</p>
            </div>
            <Link href="/tours" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c9963a', textDecoration: 'none', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Ver todos los destinos <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {destinos.map((d) => (
              <Link key={d.nombre} href="/tours" style={{ textDecoration: 'none', borderRadius: '16px', overflow: 'hidden', display: 'block', position: 'relative', height: '300px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                <img src={d.img} alt={d.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,50,0.85) 0%, rgba(10,20,50,0.1) 60%)' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '999px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e' }}>{d.rating}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>· {d.tours} tours</span>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 6px' }}>{d.nombre}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.78)', margin: '0 0 12px' }}>{d.desc}</p>
                  <span style={{ fontSize: '13px', color: '#c9963a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Explorar destino <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOURS DESTACADOS ── */}
      <div style={{ backgroundColor: '#ffffff', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#c9963a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Tours Destacados</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.2 }}>Experiencias Inolvidables</h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px', maxWidth: '500px', lineHeight: 1.7 }}>Tours diseñados para sumergirte en la cultura local y la naturaleza de la Sierra Tarahumara.</p>
            </div>
            <Link href="/tours" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c9963a', textDecoration: 'none', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Ver todos los tours <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
            {tours.map((t) => (
              <div key={t.nombre} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
                    {t.featured && (
                      <span style={{ backgroundColor: '#c9963a', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px' }}>Destacado</span>
                    )}
                    {t.ahorro && (
                      <span style={{ backgroundColor: '#10b981', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px' }}>{t.ahorro}</span>
                    )}
                  </div>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '12px', color: '#c9963a', fontWeight: 600, marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.lugar}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>{t.nombre}</h3>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6b7280' }}>
                      <Clock size={14} /> {t.dias}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6b7280' }}>
                      <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> {t.rating} ({t.reviews})
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ backgroundColor: '#f3f4f6', color: '#374151', fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>Desde</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#1a1a2e' }}>${t.precio.toLocaleString()}</span>
                        {t.precioAntes && <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>${t.precioAntes.toLocaleString()}</span>}
                      </div>
                    </div>
                    <Link href="/tours" style={{ backgroundColor: '#1a2d4a', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                      Ver Tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '2px solid #1a2d4a', color: '#1a2d4a', padding: '14px 36px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
              Ver todos los paquetes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <div style={{ backgroundColor: '#f9fafb', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#c9963a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Por qué elegirnos</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#1a1a2e', marginBottom: '16px' }}>Viaja con Confianza</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>Nos esforzamos para que tu viaje sea perfecto, seguro e inolvidable desde el primer contacto.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {beneficios.map((b) => (
              <div key={b.titulo} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px 28px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(201,150,58,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9963a', marginBottom: '20px' }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>{b.titulo}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIOS ── */}
      <div style={{ backgroundColor: '#ffffff', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#c9963a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Testimonios</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#1a1a2e' }}>Lo que dicen nuestros viajeros</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {testimonios.map((r) => (
              <div key={r.nombre} style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '32px', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '28px', fontStyle: 'italic' }}>
                  "{r.texto}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9963a', fontSize: '18px', fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", flexShrink: 0 }}>
                    {r.inicial}
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 2px' }}>{r.nombre}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{r.tipo}</p>
                    <p style={{ fontSize: '12px', color: '#c9963a', margin: 0, fontWeight: 500 }}>{r.destino}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{
        position: 'relative', padding: '140px 32px', textAlign: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=600&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,20,50,0.80) 0%, rgba(10,20,50,0.65) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, color: '#ffffff', marginBottom: '20px', lineHeight: 1.15 }}>
            ¿Listo para tu próxima aventura?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.80)', marginBottom: '48px', lineHeight: 1.7 }}>
            Únete a miles de viajeros que han descubierto la Sierra Tarahumara con nosotros. Tu viaje de vida comienza aquí.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/tours" style={{ backgroundColor: '#c9963a', color: '#ffffff', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
              Comenzar a Planear
            </Link>
            <Link href="/contacto" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.4)', color: '#ffffff', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
              Contáctanos
            </Link>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '40px' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>Suscríbete para recibir ofertas exclusivas y tips de viaje</p>
            <div style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto' }}>
              <input type="email" placeholder="tu@email.com" style={{ flex: 1, border: 'none', borderRadius: '8px 0 0 8px', padding: '14px 18px', fontSize: '14px', outline: 'none', color: '#1a1a2e' }} />
              <button style={{ backgroundColor: '#c9963a', color: '#ffffff', border: 'none', borderRadius: '0 8px 8px 0', padding: '14px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}