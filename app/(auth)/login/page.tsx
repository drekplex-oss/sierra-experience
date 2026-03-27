'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Mountain, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'registro'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }
    window.location.replace('/')
  }

  const handleRegistro = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor llena todos los campos')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (!terms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setError('Error al crear cuenta: ' + error.message)
      setLoading(false)
      return
    }
    window.location.replace('/')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '12px 12px 12px 44px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#1a2d4a',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#eef2f7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '24px'}}>

      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px'}}>
        <Mountain style={{width: '32px', height: '32px', color: '#c9963a'}} />
        <div>
          <p style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#1a2d4a', margin: 0}}>Sierra Experience</p>
          <p style={{fontSize: '10px', letterSpacing: '3px', color: '#8a9ab5', textTransform: 'uppercase', margin: 0}}>Tarahumara</p>
        </div>
      </div>

      <div style={{backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)'}}>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#f0f4f8', borderRadius: '10px', padding: '4px', marginBottom: '28px'}}>
          {(['login', 'registro'] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setError('') }} style={{
              padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600,
              backgroundColor: tab === t ? '#ffffff' : 'transparent',
              color: tab === t ? '#1a2d4a' : '#8a9ab5',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s',
            }}>
              {t === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{backgroundColor: '#fff0f0', color: '#c0392b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px'}}>
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Correo</label>
              <div style={{position: 'relative'}}>
                <Mail style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#8a9ab5'}} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Contraseña</label>
              <div style={{position: 'relative'}}>
                <Lock style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#8a9ab5'}} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8a9ab5', cursor: 'pointer'}}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Recordarme
              </label>
              <a href="#" style={{fontSize: '13px', color: '#c9963a', textDecoration: 'none'}}>¿Olvidaste tu contraseña?</a>
            </div>
            <button onClick={handleLogin} disabled={loading} style={{backgroundColor: '#c9963a', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
              {loading ? 'Entrando...' : 'Iniciar Sesión →'}
            </button>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Nombre</label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8a9ab5', fontSize: '16px'}}>👤</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Correo</label>
              <div style={{position: 'relative'}}>
                <Mail style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#8a9ab5'}} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Contraseña</label>
              <div style={{position: 'relative'}}>
                <Lock style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#8a9ab5'}} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimo 8 caracteres" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2d4a', marginBottom: '8px'}}>Confirmar Contraseña</label>
              <div style={{position: 'relative'}}>
                <Lock style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#8a9ab5'}} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite tu contraseña" style={inputStyle} />
              </div>
            </div>
            <label style={{display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#8a9ab5', cursor: 'pointer'}}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} style={{marginTop: '2px'}} />
              <span>Acepto los <a href="#" style={{color: '#c9963a', textDecoration: 'none'}}>Términos y Condiciones</a> y la <a href="#" style={{color: '#c9963a', textDecoration: 'none'}}>Política de Privacidad</a></span>
            </label>
            <button onClick={handleRegistro} disabled={loading} style={{backgroundColor: '#c9963a', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'}}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta →'}
            </button>
          </div>
        )}

        <div style={{borderTop: '1px solid #e8edf5', marginTop: '24px', paddingTop: '20px', textAlign: 'center'}}>
          <p style={{fontSize: '13px', color: '#8a9ab5'}}>
            ¿Necesitas ayuda? <a href="/contacto" style={{color: '#c9963a', textDecoration: 'none'}}>Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  )
}