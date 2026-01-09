import { createClient } from '@supabase/supabase-js'

// Essas variáveis vêm do arquivo .env que vamos criar já já
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)