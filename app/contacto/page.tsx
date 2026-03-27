'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactoPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [asunto, setAsunto] = useState('tour')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!nombre || !email || !mensaje) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSuccess(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
    padding: '13px 16px', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', color: '#1a2d4a', backgroundColor: '#f8fafc',
    fontFamily: 'Inter, sans-serif',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#1a2d4a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif'}}>

      {/* HERO */}
      <section style={{
        position: 'relative', paddingTop: '160px', paddingBottom: '80px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,40,0.75) 0%, rgba(10,20,40,0.5) 100%)'}} />
        <div style={{position: 'relative', zIndex: 2}}>
          <p style={{fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#c9963a', marginBottom: '16px', fontWeight: 600}}>
            Estamos para ayudarte
          </p>
          <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.1}}>
            Contacto
          </h1>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7}}>
            Platica con nuestros especialistas y diseña tu aventura perfecta en la Sierra Tarahumara
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section style={{maxWidth: '1100px', margin: '0 auto', padding: '80px 32px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px', alignItems: 'start'}}>

        {/* INFO */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>

          <div>
            <p style={{fontSize: '11px', letterSpacing: '3px', color: '#c9963a', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px'}}>Sierra Experience</p>
            <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: '#1a2d4a', marginBottom: '16px', lineHeight: 1.2}}>
              Hablemos de tu proximo viaje
            </h2>
            <p style={{fontSize: '15px', color: '#6a7a8a', lineHeight: 1.8}}>
              Nuestro equipo de especialistas en turismo de aventura y cultura Tarahumara esta listo para ayudarte a planear la experiencia perfecta.
            </p>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {[
              { icon: <Phone size={18} />, label: 'Telefono', valor: '+52 (614) 123-4567' },
              { icon: <Mail size={18} />, label: 'Correo', valor: 'hola@sierraexperience.mx' },
              { icon: <MapPin size={18} />, label: 'Ubicacion', valor: 'Creel, Chihuahua, Mexico' },
              { icon: <Clock size={18} />, label: 'Horario', valor: 'Lun - Dom: 8:00 AM - 8:00 PM' },
            ].map((item) => (
              <div key={item.label} style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                <div style={{width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9963a', flexShrink: 0}}>
                  {item.icon}
                </div>
                <div>
                  <p style={{fontSize: '11px', fontWeight: 600, color: '#8a9ab5', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px'}}>{item.label}</p>
                  <p style={{fontSize: '15px', fontWeight: 600, color: '#1a2d4a', margin: 0}}>{item.valor}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{backgroundColor: '#1a2d4a', borderRadius: '16px', padding: '24px'}}>
            <p style={{fontSize: '13px', fontWeight: 700, color: '#c9963a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px'}}>Respuesta rapida</p>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0}}>
              Respondemos todos los mensajes en menos de 2 horas durante nuestro horario de atencion. Para grupos de 10+ personas contamos con atencion prioritaria.
            </p>
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            {[
              { label: 'Facebook', href: 'https://facebook.com', color: '#1877f2' },
              { label: 'Instagram', href: 'https://instagram.com', color: '#e1306c' },
              { label: 'WhatsApp', href: 'https://wa.me/526141234567', color: '#25d366' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #e8edf5', fontSize: '12px', fontWeight: 600, color: '#1a2d4a', textDecoration: 'none', boxShadow: '0 2px 8px rgba(26,45,74,0.06)'}}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* FORM */}
        {success ? (
          <div style={{backgroundColor: '#ffffff', borderRadius: '20px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 4px 24px rgba(26,45,74,0.08)'}}>
            <p style={{fontSize: '56px', marginBottom: '20px'}}>✅</p>
            <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#1a2d4a', marginBottom: '12px'}}>Mensaje enviado</h3>
            <p style={{fontSize: '15px', color: '#8a9ab5', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto 32px'}}>
              Gracias por contactarnos. Te responderemos en menos de 2 horas.
            </p>
            <button onClick={() => setSuccess(false)} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer'}}>
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <div style={{backgroundColor: '#ffffff', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 24px rgba(26,45,74,0.08)'}}>
            <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1a2d4a', marginBottom: '32px'}}>
              Envíanos un mensaje
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={labelStyle}>Nombre *</label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Correo *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={inputStyle} />
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={labelStyle}>Telefono</label>
                  <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+52 614 000 0000" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Asunto</label>
                  <select value={asunto} onChange={e => setAsunto(e.target.value)} style={inputStyle}>
                    <option value="tour">Informacion de tour</option>
                    <option value="paquete">Paquete turistico</option>
                    <option value="hotel">Hospedaje</option>
                    <option value="grupo">Viaje en grupo</option>
                    <option value="personalizado">Tour personalizado</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Mensaje *</label>
                <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} rows={5} placeholder="Cuentanos sobre tu viaje ideal, fechas, numero de personas..." style={{...inputStyle, resize: 'none'}} />
              </div>
              <button onClick={handleSubmit} disabled={loading || !nombre || !email || !mensaje} style={{backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: (!nombre || !email || !mensaje) ? 0.6 : 1}}>
                {loading ? 'Enviando...' : <><Send size={16} /> Enviar mensaje</>}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* MAPA */}
      <section style={{backgroundColor: '#1a2d4a', padding: '80px 32px', textAlign: 'center'}}>
        <p style={{fontSize: '11px', letterSpacing: '4px', color: '#c9963a', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600}}>
          Donde estamos
        </p>
        <h2 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', marginBottom: '16px'}}>
          Creel, Pueblo Magico
        </h2>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7}}>
          Ubicados en el corazon de la Sierra Tarahumara, puerta de entrada a las Barrancas del Cobre
        </p>
        <a href="https://maps.google.com/?q=Creel,Chihuahua,Mexico" target="_blank" rel="noopener noreferrer" style={{backgroundColor: '#c9963a', color: '#1a2d4a', padding: '16px 40px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none'}}>
          Ver en Google Maps
        </a>
      </section>

    </main>
  )
}