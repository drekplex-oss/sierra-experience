import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Sierra Experience Tarahumara | Tours en Creel',
  description: 'Descubre la magia de Creel y las Barrancas del Cobre con tours guiados y experiencias únicas en la Sierra Tarahumara.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{margin: 0, padding: 0, backgroundColor: '#faf8f5'}}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}