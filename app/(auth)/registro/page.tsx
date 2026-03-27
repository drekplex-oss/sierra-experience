'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegistroPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegistro = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) {
      setError('Error al registrarse. Intenta con otro correo.')
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{paddingTop: '72px', backgroundColor: '#f5f0e8'}}>
      <div style={{
        backgroundColor: '#ffffff', padding: '48px', borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(26,45,74,0.08)', width: '100%', maxWidth: '420px'
      }}>
        <h1 style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#1a2d4a', textAlign: 'center', marginBottom: '8px'}}>
          Crear Cuenta
        </h1>
        <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8a9ab5', textAlign: 'center', marginBottom: '32px'}}>
          Regístrate para reservar tus tours
        </p>
        {error && (
          <p style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}}>
            {error}
          </p>
        )}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px',
              fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none',
              color: '#1a2d4a'
            }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px',
              fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none',
              color: '#1a2d4a'
            }}
          />
          <input
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: '1px solid #dde3ee', borderRadius: '8px', padding: '14px 16px',
              fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none',
              color: '#1a2d4a'
            }}
          />
          <button
            onClick={handleRegistro}
            disabled={loading}
            style={{
              backgroundColor: '#c9963a', color: '#1a2d4a', border: 'none',
              padding: '14px', borderRadius: '8px', fontSize: '14px',
              fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </div>
        <p style={{textAlign: 'center', fontSize: '13px', color: '#8a9ab5', marginTop: '24px', fontFamily: 'Inter, sans-serif'}}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" style={{color: '#c9963a', fontWeight: 600, textDecoration: 'none'}}>
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}