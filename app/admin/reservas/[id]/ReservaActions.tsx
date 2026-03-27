'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ReservaActions({ reservationId, currentStatus }: { reservationId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateStatus = async (status: string) => {
    setLoading(true)
    await supabase
      .from('reservations')
      .update({ status })
      .eq('id', reservationId)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex gap-3 mt-4">
      {currentStatus !== 'confirmada' && (
        <button
          onClick={() => updateStatus('confirmada')}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          ✅ Confirmar
        </button>
      )}
      {currentStatus !== 'cancelada' && (
        <button
          onClick={() => updateStatus('cancelada')}
          disabled={loading}
          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50"
        >
          ❌ Cancelar
        </button>
      )}
      {currentStatus !== 'pendiente' && (
        <button
          onClick={() => updateStatus('pendiente')}
          disabled={loading}
          className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
        >
          🕐 Pendiente
        </button>
      )}
    </div>
  )
}