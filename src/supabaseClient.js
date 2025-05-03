import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xbsfkjlloaqaeezsfzqt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhic2Zramxsb2FxYWVlenNmenF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTE0ODIsImV4cCI6MjA2MTc4NzQ4Mn0.JO_HvLlqisUc8mBcp_CFNcOnGd6H2fGqzdCnt9FaViI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
