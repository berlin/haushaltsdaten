import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(
  supabaseUrl || 'https://your_supabase_url.supabase.co',
  supabaseAnonKey || 'eyJKhbGciOisJIUzI1Nd2iIsInR5cCsI6'
)

export { supabase }
