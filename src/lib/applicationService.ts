import { supabase, ApplicationDB } from '@/lib/supabase'

// 어업허가 신청 데이터를 Supabase에 저장하는 함수
export async function createApplication(data: Omit<ApplicationDB, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase
      .from('applications')
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Error creating application:', error)
    return { success: false, error: error }
  }
}

// 모든 신청 조회
export async function getApplications() {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching applications:', error)
    return { success: false, error }
  }
}

// 특정 신청 조회
export async function getApplicationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching application:', error)
    return { success: false, error }
  }
}

// 신청 상태 업데이트
export async function updateApplicationStatus(id: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error updating application:', error)
    return { success: false, error }
  }
}
