'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mountain, Menu, X, Calendar, User, LogOut, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [lang, setLang] = useState<'ES' | 'EN'>('ES')
  const pathname = usePathname()
  const isHome = pathname === '/'
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setIsAdmin(profile?.role === 'admin' || user.email === 'jobanfierro6@gmail.com')
      } else {
        setIsAdmin(false)
      }
    }
    getUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => getUser())
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    setUser(null)
    setIsAdmin(false)
    await fetch('/api/auth', { method: 'DELETE' })
    window.location.replace('/login')
  }

  const navItems = [
    { name: lang === 'ES' ? 'Tours' : 'Tours', href: '/tours' },
    { name: lang === 'ES' ? 'Paquetes' : 'Packages', href: '/paquetes' },
    { name: lang === 'ES' ? 'Hoteles' : 'Hotels', href: '/hoteles' },
    { name: lang === 'ES' ? 'Contacto' : 'Contact', href: '/contacto' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const isDark = !scrolled && isHome

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      backgroundColor: isDark ? 'transparent' : 'rgba(255,252,247,0.97)',
      backdropFilter: isDark ? 'none' : 'blur(12px)',
      borderBottom: isDark ? 'none' : '1px solid rgba(201,150,58,0.15)',
      padding: scrolled ? '12px 0' : '20px 0',
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

        {/* LOGO */}
        <Link href="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <Mountain style={{width: '28px', height: '28px', color: '#c9963a'}} />
          <div style={{display: 'flex', flexDirection: 'column', lineHeight: 1.1}}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '18px', fontWeight: 700,
              color: isDark ? '#ffffff' : '#1a2d4a',
            }}>
              Sierra Experience
            </span>
            <span style={{
              fontSize: '9px', letterSpacing: '3px',
              color: isDark ? 'rgba(255,255,255,0.7)' : '#8a9ab5',
              textTransform: 'uppercase'
            }}>
              Tarahumara
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div style={{display: 'flex', alignItems: 'center', gap: '28px'}}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px', fontWeight: 500,
              textDecoration: 'none',
              color: isDark
                ? isActive(item.href) ? '#c9963a' : 'rgba(255,255,255,0.9)'
                : isActive(item.href) ? '#c9963a' : '#3a4a5a',
              borderBottom: isActive(item.href) ? '2px solid #c9963a' : '2px solid transparent',
              paddingBottom: '2px',
              transition: 'all 0.3s ease',
            }}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>

          {/* LANG TOGGLE */}
          <button
            onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: isDark ? 'rgba(255,255,255,0.15)' : '#f0f4f8',
              border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid #dde3ee',
              borderRadius: '20px', padding: '6px 12px',
              color: isDark ? '#ffffff' : '#1a2d4a',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Globe style={{width: '14px', height: '14px'}} />
            {lang}
          </button>

          {user ? (
            <>
              <Link href={isAdmin ? '/admin' : '/dashboard'} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
                textDecoration: 'none',
                color: isDark ? 'rgba(255,255,255,0.85)' : '#3a4a5a',
                padding: '8px 16px',
                border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid #ddd',
                borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <User style={{width: '14px', height: '14px'}} />
                {isAdmin ? 'Admin' : 'Mis Reservas'}
              </Link>
              <button onClick={handleLogout} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', background: 'none',
                color: isDark ? 'rgba(255,255,255,0.7)' : '#8a9ab5',
                border: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 0'
              }}>
                <LogOut style={{width: '14px', height: '14px'}} />
                Salir
              </button>
            </>
          ) : (
            <Link href="/login" style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
              color: isDark ? 'rgba(255,255,255,0.85)' : '#3a4a5a',
              padding: '8px 16px',
              border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid #ddd',
              borderRadius: '6px',
            }}>
              <User style={{width: '14px', height: '14px'}} />
              {lang === 'ES' ? 'Iniciar Sesión' : 'Sign In'}
            </Link>
          )}

          <Link href="/tours" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#1a2d4a', backgroundColor: '#c9963a',
            padding: '10px 20px', borderRadius: '6px',
          }}>
            <Calendar style={{width: '14px', height: '14px'}} />
            {lang === 'ES' ? 'Reservar' : 'Book Now'}
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            color: isDark ? '#ffffff' : '#1a2d4a'
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X style={{width: '24px', height: '24px'}} /> : <Menu style={{width: '24px', height: '24px'}} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          backgroundColor: 'rgba(255,252,247,0.98)',
          backdropFilter: 'blur(12px)',
          padding: '16px 32px 24px',
          borderTop: '1px solid rgba(201,150,58,0.15)',
          display: 'flex', flexDirection: 'column', gap: '12px'
        }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500,
              textDecoration: 'none',
              color: isActive(item.href) ? '#c9963a' : '#1a2d4a',
              padding: '8px 0', borderBottom: '1px solid rgba(201,150,58,0.1)',
            }}>
              {item.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link href={isAdmin ? '/admin' : '/dashboard'} style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', textDecoration: 'none', color: '#3a4a5a', padding: '10px 0'}}>
                {isAdmin ? 'Panel Admin' : 'Mis Reservas'}
              </Link>
              <button onClick={handleLogout} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', background: 'none', border: 'none',
                color: '#c0392b', padding: '10px 0', textAlign: 'left'
              }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link href="/login" style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', textDecoration: 'none', color: '#3a4a5a', padding: '10px 0'}}>
              Iniciar Sesión
            </Link>
          )}
          <Link href="/tours" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', color: '#1a2d4a',
            backgroundColor: '#c9963a', padding: '12px 20px',
            borderRadius: '6px', textAlign: 'center',
          }}>
            Reservar Tour
          </Link>
        </div>
      )}
    </nav>
  )
}