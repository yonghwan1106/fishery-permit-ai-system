'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  Database,
  RefreshCw,
  Plus,
  Fish,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { supabase, SupabaseFisheryApplication } from '@/lib/supabase'
import { toast } from 'sonner'

const statusConfig = {
  pending: { label: '대기중', color: 'bg-gray-500', icon: Clock },
  document_review: { label: '서류검토', color: 'bg-blue-500', icon: Clock },
  ai_processing: { label: 'AI처리중', color: 'bg-purple-500', icon: RefreshCw },
  manual_review: { label: '수동검토', color: 'bg-orange-500', icon: AlertCircle },
  approved: { label: '승인완료', color: 'bg-green-500', icon: CheckCircle },
  rejected: { label: '반려', color: 'bg-red-500', icon: AlertCircle },
  completed: { label: '완료', color: 'bg-emerald-500', icon: CheckCircle }
}

const fisheryTypeConfig = {
  coastal: '연안어업',
  offshore: '근해어업', 
  demarcated: '구획어업',
  distant_water: '원양어업'
}

export default function SupabaseTestPage() {
  const [applications, setApplications] = useState<SupabaseFisheryApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [newApplication, setNewApplication] = useState({
    applicant_name: '',
    applicant_phone: '',
    vessel_name: '',
    vessel_tonnage: '',
    fishing_area: '',
    fishery_type: 'coastal' as const
  })

  // 데이터 로드
  const loadApplications = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('fishery_applications')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error('Error loading applications:', error)
      toast.error('데이터 로드 실패')
    } finally {
      setLoading(false)
    }
  }

  // 새 신청 추가
  const handleAddApplication = async () => {
    if (!newApplication.applicant_name || !newApplication.vessel_name) {
      toast.error('필수 정보를 입력해주세요')
      return
    }

    try {
      const applicationNumber = `F${new Date().getFullYear()}${String(Date.now()).slice(-6)}`
      
      const { data, error } = await supabase
        .from('fishery_applications')
        .insert({
          application_number: applicationNumber,
          applicant_name: newApplication.applicant_name,
          applicant_phone: newApplication.applicant_phone,
          vessel_name: newApplication.vessel_name,
          vessel_tonnage: parseFloat(newApplication.vessel_tonnage) || 0,
          fishing_area: newApplication.fishing_area,
          fishery_type: newApplication.fishery_type,
          status: 'pending'
        })
        .select()

      if (error) throw error
      
      toast.success('새 신청이 추가되었습니다!')
      setNewApplication({
        applicant_name: '',
        applicant_phone: '',
        vessel_name: '',
        vessel_tonnage: '',
        fishing_area: '',
        fishery_type: 'coastal'
      })
      loadApplications()
    } catch (error) {
      console.error('Error adding application:', error)
      toast.error('신청 추가 실패')
    }
  }

  // 상태 업데이트
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('fishery_applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      
      toast.success('상태가 업데이트되었습니다!')
      loadApplications()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('상태 업데이트 실패')
    }
  }

  useEffect(() => {
    loadApplications()

    // 실시간 구독 설정
    const subscription = supabase
      .channel('applications')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'fishery_applications' 
        }, 
        (payload) => {
          console.log('Real-time update:', payload)
          loadApplications() // 데이터 새로고침
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-marine-50">
      {/* Header */}
      <div className="border-b border-white/20 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  홈으로
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">실시간 신청 현황</h1>
                <p className="text-xs text-gray-600">Supabase 연동 테스트</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="animate-pulse">
                <Database className="mr-1 h-3 w-3" />
                실시간 연동
              </Badge>
              <Button onClick={loadApplications} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                새로고침
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-ocean-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">총 신청</p>
                  <p className="text-3xl font-bold text-blue-900">{applications.length}</p>
                </div>
                <Fish className="h-12 w-12 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">AI 처리중</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {applications.filter(app => app.status === 'ai_processing').length}
                  </p>
                </div>
                <RefreshCw className="h-12 w-12 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">승인완료</p>
                  <p className="text-3xl font-bold text-green-900">
                    {applications.filter(app => app.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">검토중</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {applications.filter(app => ['manual_review', 'document_review'].includes(app.status)).length}
                  </p>
                </div>
                <AlertCircle className="h-12 w-12 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 새 신청 추가 폼 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>새 신청 추가 (Supabase 테스트)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="신청자명"
                value={newApplication.applicant_name}
                onChange={(e) => setNewApplication(prev => ({ ...prev, applicant_name: e.target.value }))}
              />
              <Input
                placeholder="연락처"
                value={newApplication.applicant_phone}
                onChange={(e) => setNewApplication(prev => ({ ...prev, applicant_phone: e.target.value }))}
              />
              <Input
                placeholder="어선명"
                value={newApplication.vessel_name}
                onChange={(e) => setNewApplication(prev => ({ ...prev, vessel_name: e.target.value }))}
              />
              <Input
                placeholder="어선 톤수"
                type="number"
                value={newApplication.vessel_tonnage}
                onChange={(e) => setNewApplication(prev => ({ ...prev, vessel_tonnage: e.target.value }))}
              />
              <Input
                placeholder="어업 구역"
                value={newApplication.fishing_area}
                onChange={(e) => setNewApplication(prev => ({ ...prev, fishing_area: e.target.value }))}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={newApplication.fishery_type}
                onChange={(e) => setNewApplication(prev => ({ 
                  ...prev, 
                  fishery_type: e.target.value as 'coastal' | 'offshore' | 'demarcated' | 'distant_water'
                }))}
              >
                <option value="coastal">연안어업</option>
                <option value="offshore">근해어업</option>
                <option value="demarcated">구획어업</option>
                <option value="distant_water">원양어업</option>
              </select>
            </div>
            <div className="mt-4">
              <Button onClick={handleAddApplication} className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                신청 추가
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 신청 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>실시간 신청 현황</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">데이터 로딩 중...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <Fish className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">신청 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, index) => {
                  const status = statusConfig[app.status]
                  const Icon = status.icon
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{app.application_number}</h3>
                            <Badge variant="secondary" className={`${status.color} text-white`}>
                              <Icon className="mr-1 h-3 w-3" />
                              {status.label}
                            </Badge>
                            <Badge variant="outline">
                              {fisheryTypeConfig[app.fishery_type]}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">신청자:</span> {app.applicant_name}
                            </div>
                            <div>
                              <span className="font-medium">어선명:</span> {app.vessel_name}
                            </div>
                            <div>
                              <span className="font-medium">톤수:</span> {app.vessel_tonnage}톤
                            </div>
                            <div>
                              <span className="font-medium">어업구역:</span> {app.fishing_area}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            신청일: {new Date(app.submitted_at).toLocaleString('ko-KR')}
                          </div>
                        </div>
                        
                        <div className="ml-4 flex space-x-2">
                          {app.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateStatus(app.id, 'ai_processing')}
                            >
                              AI 처리 시작
                            </Button>
                          )}
                          {app.status === 'ai_processing' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateStatus(app.id, 'approved')}
                            >
                              승인
                            </Button>
                          )}
                          {app.status === 'manual_review' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateStatus(app.id, 'approved')}
                            >
                              승인
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
