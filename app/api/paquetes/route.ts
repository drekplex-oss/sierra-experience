import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const body = await request.json()

  const { data, error } = await supabase.from('paquetes').insert({
    name: body.name,
    description: body.description,
    price: body.price,
    duration: body.duration,
    max_people: body.max_people,
    image_url: body.image_url,
    includes: body.includes,
    active: true
  }).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ data })
}

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('paquetes').select('*').eq('active', true).order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ data })
}
