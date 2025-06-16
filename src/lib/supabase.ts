import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface SupabaseFisheryApplication {
  id: string
  application_number: string
  applicant_name: string
  applicant_phone: string
  applicant_email?: string
  fishery_type: 'coastal' | 'offshore' | 'demarcated' | 'distant_water'
  vessel_name: string
  vessel_tonnage: number
  fishing_area: string
  status: 'pending' | 'document_review' | 'ai_processing' | 'manual_review' | 'approved' | 'rejected' | 'completed'
  submitted_at: string
  expected_completion_date?: string
  completed_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface SupabaseUser {
  id: string
  name: string
  email: string
  phone?: string
  role: 'applicant' | 'reviewer' | 'admin'
  created_at: string
  updated_at: string
}
