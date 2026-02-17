import { createClient } from '@supabase/supabase-js'

export function serverSupabase(config) {
    return createClient(
        config.public.supabaseUrl,
        config.supabaseKey || config.public.supabaseKey
    )
}