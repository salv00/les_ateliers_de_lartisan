
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ekzifpxggzanaxwnohsd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVremlmcHhnZ3phbmF4d25vaHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNjk2MzcsImV4cCI6MjA2MTk0NTYzN30.OylMdvTJDPWCbpfphR6XTmaKAMGMZzWSZmlCYhvsP_c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  