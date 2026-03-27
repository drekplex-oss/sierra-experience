'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditarTourPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [maxPeople, setMaxPeople] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .eq('id', params.id)
        .single()
      if (data) {
        setName(data.name)
        setDescription(data.description || '')
        setPrice(String(data.price))
        setDuration(data.duration)
        setMaxPeople(String(data.max_people))
        setImageUrl(data.image_url || '')
        setActive(data.active)
      }
    }
    fetchTour()
  }, [])

  const handleGuardar = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase
      .from('tours')
      .update({
        name,
        description,
        price: Number(price),
        duration,
        max_people: Number(maxPeople),
        image_url: imageUrl,
        active
      })
      .eq('id', params.id)

    if (error) {
      setError('Error al guardar: ' + error.message)
    } else {
      router.push('/admin/tours')
    }
    setLoading(false)
  }

  const handleEliminar = async () => {
    if (!confirm('¿Estás seguro de eliminar este tour?')) return
    setLoading(true)
    await supabase.from('tours').delete().eq('id', params.id)
    router.push('/admin/tours')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🏔️ Sierra Experience — Admin</h1>
        <Link href="/admin/tours" className="text-sm hover:text-green-200">← Volver a Tours</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Editar Tour</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del tour *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (MXN) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración *</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Máximo de personas *</label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de imagen</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 accent-green-600"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Tour activo (visible para clientes)</label>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleGuardar}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              onClick={handleEliminar}
              disabled={loading}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}