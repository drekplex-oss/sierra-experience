'use client'
import Link from 'next/link'
import { Mountain, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Contacto', href: '/contacto' },
  ]

  const popularTours = [
    { name: 'Barrancas del Cobre', href: '/tours' },
    { name: 'Cascada Cusárare', href: '/tours' },
    { name: 'Lago Arareko', href: '/tours' },
    { name: 'Tren Chepe', href: '/tours' },
  ]

  return (
    <footer style={{backgroundColor: '#1a2d4a', color: '#ffffff', fontFamily: 'Inter, sans-serif'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '64px 32px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px'}}>

          {/* BRAND */}
          <div>
            <Link href="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
              <Mountain style={{width: '28px', height: '28px', color: '#c9963a'}} />
              <div>
                <span style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', display: 'block'}}>
                  Sierra Experience
                </span>
                <span style={{fontSize: '9px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase'}}>
                  Tarahumara
                </span>
              </div>
            </Link>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '24px'}}>
              Tu puerta de entrada a las majestuosas Barrancas del Cobre y la cultura Rarámuri.
            </p>
            <div style={{display: 'flex', gap: '16px'}}>
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} style={{
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.3s',
                  display: 'flex', alignItems: 'center',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c9963a')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  <Icon style={{width: '18px', height: '18px'}} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#ffffff'}}>
              Enlaces Rápidos
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none', transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c9963a')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* POPULAR TOURS */}
          <div>
            <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#ffffff'}}>
              Tours Populares
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {popularTours.map((tour) => (
                <li key={tour.name}>
                  <Link href={tour.href} style={{
                    fontSize: '13px', color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none', transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c9963a')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {tour.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#ffffff'}}>
              Contacto
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <li style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                <MapPin style={{width: '16px', height: '16px', color: '#c9963a', marginTop: '2px', flexShrink: 0}} />
                <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)'}}>Creel, Chihuahua, México</span>
              </li>
              <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Phone style={{width: '16px', height: '16px', color: '#c9963a', flexShrink: 0}} />
                <a href="tel:+526141234567" style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none'}}>
                  +52 614 123 4567
                </a>
              </li>
              <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Mail style={{width: '16px', height: '16px', color: '#c9963a', flexShrink: 0}} />
                <a href="mailto:info@sierraexperience.com" style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none'}}>
                  info@sierraexperience.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: '48px', paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)'}}>
            © {currentYear} Sierra Experience Tarahumara. Todos los derechos reservados.
          </p>
          <div style={{display: 'flex', gap: '24px'}}>
            <Link href="#" style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>
              Privacidad
            </Link>
            <Link href="#" style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none'}}>
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}