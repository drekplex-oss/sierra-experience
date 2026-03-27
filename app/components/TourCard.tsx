'use client'

import Link from 'next/link'
import { useState } from 'react'

interface TourCardProps {
  img: string
  tag: string
  title: string
  large?: boolean
}

export default function TourCard({ img, tag, title, large = false }: TourCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{position: 'relative', overflow: 'hidden', height: large ? '520px' : '248px'}}>
      <img
        src={img}
        alt={title}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 55%)'
      }}/>
      <div style={{position: 'absolute', bottom: large ? '36px' : '24px', left: large ? '36px' : '24px', right: large ? '36px' : '24px'}}>
        <p style={{fontSize: '9px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'sans-serif'}}>
          {tag}
        </p>
        <h3 style={{fontSize: large ? '26px' : '20px', color: '#faf8f5', fontFamily: 'Georgia, serif', margin: '0 0 16px'}}>
          {title}
        </h3>
        <Link href="/tours" style={{
          fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
          color: '#c9a84c', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)',
          paddingBottom: '2px', fontFamily: 'sans-serif'
        }}>
          Descubrir →
        </Link>
      </div>
    </div>
  )
}