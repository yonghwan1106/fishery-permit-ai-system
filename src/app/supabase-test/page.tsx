'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EnvironmentCheck from '@/components/EnvironmentCheck'
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

// Mock 데이터 (Supabase 연결 전까지 임시 사용)
const mockApplications = [
  {
    id: '1',
    application_number: 'F2025060001',
    applicant_name: '김어부',
    applicant_phone: '010-1234-5678',
    vessel_name: '바다의꿈호',
    vessel_tonnage: 5.5,
    fishing_area: '부산 연안',
    fishery_type: 'coastal' as const,
    status: 'ai_processing' as const,
    submitted_at: new Date().toISOString()
  },
  {
    id: '2', 
    application_number: 'F2025060002',
    applicant_name: '이선장',
    applicant_phone: '010-9876-5432',
    vessel_name: '태평양호',
    vessel_tonnage: 25.8,
    fishing_area: '제주 근해',
    fishery_type: 'offshore' as const,
    status: 'manual_review' as const,
    submitted_at: new Date().toISOString()
  }
]

export default function SupabaseTestPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [loading, setLoading] = useState(false)

  const handleAddApplication = () => {
    alert('Supabase 연동 후 실제 데이터베이스에 저장됩니다!')
  }

  const updateStatus = (id: string, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus as any } : app
      )
    )
    alert(`상태가 ${statusConfig[newStatus as keyof typeof statusConfig]?.label}로 변경되었습니다!`)
  }

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
                <p className="text-xs text-gray-600">Supabase 연동 준비중 (Mock 데이터)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="warning" className="animate-pulse">
                <Database className="mr-1 h-3 w-3" />
                연동 준비중
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 환경 설정 상태 체크 */}
        <EnvironmentCheck />

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
              <span>새 신청 추가 (데모용)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="신청자명" />
              <Input placeholder="연락처" />
              <Input placeholder="어선명" />
              <Input placeholder="어선 톤수" type="number" />
              <Input placeholder="어업 구역" />
              <select className="px-3 py-2 border border-gray-300 rounded-md">
                <option value="coastal">연안어업</option>
                <option value="offshore">근해어업</option>
                <option value="demarcated">구획어업</option>
                <option value="distant_water">원양어업</option>
              </select>
            </div>
            <div className="mt-4">
              <Button onClick={handleAddApplication} className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                신청 추가 (데모)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 신청 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>신청 현황 (Mock 데이터)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
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

            {/* Supabase 연동 안내 */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-ocean-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <Database className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Supabase 실시간 데이터베이스 연동 준비중
                </h3>
                <p className="text-blue-700 mb-4">
                  환경변수 설정 완료 후 실제 데이터베이스와 연동됩니다.
                </p>
                <div className="text-sm text-blue-600 space-y-1">
                  <div>• 실시간 데이터 동기화</div>
                  <div>• 실제 CRUD 작업</div>
                  <div>• PostgreSQL 데이터베이스</div>
                  <div>• 다중 사용자 실시간 업데이트</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
