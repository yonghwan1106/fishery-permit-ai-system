'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Download,
  Phone,
  Mail,
  MapPin,
  Bot,
  Zap,
  Calendar,
  User,
  Ship,
  Fish,
  Eye,
  Bell,
  RefreshCw,
  TrendingUp,
  Shield,
  Star,
  MessageCircle,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface ApplicationStatus {
  applicationId: string
  applicantName: string
  applicationDate: string
  currentStep: number
  totalSteps: number
  status: 'pending' | 'processing' | 'review' | 'approved' | 'rejected' | 'completed'
  estimatedCompletion: string
  actualCompletion?: string
  vesselInfo: {
    name: string
    tonnage: string
    type: string
  }
  fisheryInfo: {
    type: string
    area: string
  }
  processingDetails: {
    aiAnalysis: {
      status: 'completed' | 'processing' | 'pending'
      accuracy: number
      riskLevel: 'low' | 'medium' | 'high'
    }
    documentVerification: {
      status: 'completed' | 'processing' | 'pending'
      missingDocs: string[]
    }
    manualReview: {
      status: 'completed' | 'processing' | 'pending' | 'not_required'
      reviewer?: string
      comments?: string
    }
  }
  notifications: Array<{
    type: 'info' | 'warning' | 'success' | 'error'
    title: string
    message: string
    timestamp: string
    read: boolean
  }>
}

const statusSteps = [
  {
    id: 1,
    title: '접수 완료',
    description: '신청서가 접수되었습니다',
    icon: FileText,
    color: 'blue'
  },
  {
    id: 2,
    title: 'AI 자동 분석',
    description: 'AI가 서류를 분석하고 있습니다',
    icon: Bot,
    color: 'purple'
  },
  {
    id: 3,
    title: '서류 검증',
    description: '제출 서류를 검증하고 있습니다',
    icon: Shield,
    color: 'orange'
  },
  {
    id: 4,
    title: '심사 진행',
    description: '담당자가 심사를 진행하고 있습니다',
    icon: Eye,
    color: 'teal'
  },
  {
    id: 5,
    title: '승인 완료',
    description: '어업허가가 승인되었습니다',
    icon: CheckCircle,
    color: 'green'
  }
]

const mockApplications: { [key: string]: ApplicationStatus } = {
  'F2025001234': {
    applicationId: 'F2025001234',
    applicantName: '홍길동',
    applicationDate: '2025-06-15',
    currentStep: 3,
    totalSteps: 5,
    status: 'processing',
    estimatedCompletion: '2025-06-18 15:00',
    vesselInfo: {
      name: '바다의꿈호',
      tonnage: '8.5',
      type: '연안어업'
    },
    fisheryInfo: {
      type: '연안어업',
      area: '부산 연안'
    },
    processingDetails: {
      aiAnalysis: {
        status: 'completed',
        accuracy: 96.8,
        riskLevel: 'low'
      },
      documentVerification: {
        status: 'processing',
        missingDocs: []
      },
      manualReview: {
        status: 'pending'
      }
    },
    notifications: [
      {
        type: 'success',
        title: 'AI 분석 완료',
        message: 'AI 시스템이 서류 분석을 완료했습니다. 정확도 96.8%로 자동 승인 권장되었습니다.',
        timestamp: '2025-06-15 14:30',
        read: false
      },
      {
        type: 'info',
        title: '신청 접수 완료',
        message: '어업허가 신청이 정상적으로 접수되었습니다.',
        timestamp: '2025-06-15 09:15',
        read: true
      }
    ]
  },
  'F2025001235': {
    applicationId: 'F2025001235',
    applicantName: '김어부',
    applicationDate: '2025-06-14',
    currentStep: 5,
    totalSteps: 5,
    status: 'completed',
    estimatedCompletion: '2025-06-17 10:00',
    actualCompletion: '2025-06-16 14:20',
    vesselInfo: {
      name: '황금어장호',
      tonnage: '12.3',
      type: '근해어업'
    },
    fisheryInfo: {
      type: '근해어업',
      area: '제주 근해'
    },
    processingDetails: {
      aiAnalysis: {
        status: 'completed',
        accuracy: 94.2,
        riskLevel: 'low'
      },
      documentVerification: {
        status: 'completed',
        missingDocs: []
      },
      manualReview: {
        status: 'completed',
        reviewer: '해양수산부 김담당',
        comments: '모든 조건을 충족하여 승인 처리합니다.'
      }
    },
    notifications: [
      {
        type: 'success',
        title: '어업허가 승인 완료',
        message: '어업허가가 최종 승인되었습니다. 허가증을 다운로드 받으실 수 있습니다.',
        timestamp: '2025-06-16 14:20',
        read: false
      },
      {
        type: 'info',
        title: '담당자 심사 완료',
        message: '담당자 심사가 완료되어 최종 승인 단계로 이동했습니다.',
        timestamp: '2025-06-16 11:30',
        read: true
      }
    ]
  }
}

export default function StatusPage() {
  const [searchId, setSearchId] = useState('')
  const [application, setApplication] = useState<ApplicationStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError('신청번호를 입력해주세요')
      return
    }

    setIsSearching(true)
    setSearchError('')
    
    // 검색 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const foundApplication = mockApplications[searchId.toUpperCase()]
    
    if (foundApplication) {
      setApplication(foundApplication)
      setSearchError('')
    } else {
      setSearchError('해당 신청번호를 찾을 수 없습니다. 신청번호를 다시 확인해주세요.')
      setApplication(null)
    }
    
    setIsSearching(false)
  }

  const handleRefresh = async () => {
    if (!application) return
    
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 상태 업데이트 시뮬레이션
    const updated = { ...application }
    if (updated.status === 'processing' && Math.random() > 0.7) {
      updated.currentStep = Math.min(updated.currentStep + 1, updated.totalSteps)
      if (updated.currentStep === updated.totalSteps) {
        updated.status = 'completed'
        updated.actualCompletion = new Date().toISOString().slice(0, 16).replace('T', ' ')
      }
    }
    
    setApplication(updated)
    setRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'review': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'approved': case 'completed': return 'text-green-600 bg-green-50 border-green-200'
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '대기중'
      case 'processing': return '처리중'
      case 'review': return '검토중'
      case 'approved': return '승인'
      case 'completed': return '완료'
      case 'rejected': return '반려'
      default: return '알 수 없음'
    }
  }

  const calculateProgress = () => {
    if (!application) return 0
    return (application.currentStep / application.totalSteps) * 100
  }

  const unreadNotifications = application?.notifications.filter(n => !n.read).length || 0

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
                <h1 className="text-lg font-bold text-gray-900">신청 상태 조회</h1>
                <p className="text-xs text-gray-600">실시간 처리 현황을 확인하세요</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {application && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    새로고침
                  </Button>
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="relative">
                      <Bell className="h-3 w-3 mr-1" />
                      {unreadNotifications}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>신청번호 조회</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="신청번호를 입력하세요 (예: F2025001234)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {searchError && (
                  <p className="mt-2 text-sm text-red-600">{searchError}</p>
                )}
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                조회
              </Button>
            </div>
            
            {/* Sample IDs for demo */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">테스트용 신청번호:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchId('F2025001234')}
                  className="text-xs"
                >
                  F2025001234 (처리중)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchId('F2025001235')}
                  className="text-xs"
                >
                  F2025001235 (완료)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <AnimatePresence>
          {application && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>신청 현황</span>
                    </CardTitle>
                    <Badge className={`${getStatusColor(application.status)} border`}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">신청번호</p>
                      <p className="font-medium text-lg">{application.applicationId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">신청인</p>
                      <p className="font-medium text-lg">{application.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">신청일</p>
                      <p className="font-medium text-lg">{application.applicationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {application.status === 'completed' ? '완료일' : '예상 완료일'}
                      </p>
                      <p className="font-medium text-lg text-green-600">
                        {application.actualCompletion || application.estimatedCompletion}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        진행률: {application.currentStep}/{application.totalSteps}
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round(calculateProgress())}%
                      </span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>

                  {/* Processing Steps */}
                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const isCompleted = step.id <= application.currentStep
                      const isCurrent = step.id === application.currentStep
                      const IconComponent = step.icon

                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center space-x-4 p-4 rounded-lg border ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : isCurrent
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`p-2 rounded-full ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : isCurrent
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <IconComponent className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              isCompleted ? 'text-green-900' : isCurrent ? 'text-blue-900' : 'text-gray-600'
                            }`}>
                              {step.title}
                            </h4>
                            <p className={`text-sm ${
                              isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {step.description}
                            </p>
                          </div>
                          {isCurrent && (
                            <div className="flex items-center space-x-2">
                              <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                              <span className="text-sm text-blue-600">처리중</span>
                            </div>
                          )}
                          {isCompleted && (
                            <Badge variant="success" className="text-xs">
                              완료
                            </Badge>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Vessel & Fishery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-base">
                          <Ship className="h-4 w-4" />
                          <span>어선 정보</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">어선명:</span>
                          <span className="font-medium">{application.vesselInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">총톤수:</span>
                          <span className="font-medium">{application.vesselInfo.tonnage}톤</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">어업유형:</span>
                          <span className="font-medium">{application.vesselInfo.type}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-base">
                          <Fish className="h-4 w-4" />
                          <span>어업 정보</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">어업종류:</span>
                          <span className="font-medium">{application.fisheryInfo.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">조업구역:</span>
                          <span className="font-medium">{application.fisheryInfo.area}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* AI Processing Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bot className="h-5 w-5" />
                        <span>AI 분석 결과</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className="p-3 bg-purple-100 rounded-full">
                              <Bot className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">
                            {application.processingDetails.aiAnalysis.accuracy}%
                          </p>
                          <p className="text-sm text-gray-600">분석 정확도</p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className={`p-3 rounded-full ${
                              application.processingDetails.aiAnalysis.riskLevel === 'low' 
                                ? 'bg-green-100' : 'bg-orange-100'
                            }`}>
                              <Shield className={`h-6 w-6 ${
                                application.processingDetails.aiAnalysis.riskLevel === 'low' 
                                  ? 'text-green-600' : 'text-orange-600'
                              }`} />
                            </div>
                          </div>
                          <p className={`text-2xl font-bold ${
                            application.processingDetails.aiAnalysis.riskLevel === 'low' 
                              ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {application.processingDetails.aiAnalysis.riskLevel === 'low' ? '낮음' : '보통'}
                          </p>
                          <p className="text-sm text-gray-600">위험도</p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <Zap className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">자동</p>
                          <p className="text-sm text-gray-600">처리 방식</p>
                        </div>
                      </div>

                      {application.processingDetails.aiAnalysis.riskLevel === 'low' && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">자동 승인 권장</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            AI 분석 결과 모든 조건을 충족하여 자동 승인이 권장됩니다.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Manual Review (if applicable) */}
                  {application.processingDetails.manualReview.status !== 'not_required' && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Eye className="h-5 w-5" />
                          <span>담당자 검토</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {application.processingDetails.manualReview.status === 'completed' ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">담당자:</span>
                              <span className="font-medium">{application.processingDetails.manualReview.reviewer}</span>
                            </div>
                            {application.processingDetails.manualReview.comments && (
                              <div>
                                <p className="text-gray-600 text-sm mb-2">검토 의견:</p>
                                <p className="p-3 bg-gray-50 border rounded-lg text-sm">
                                  {application.processingDetails.manualReview.comments}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : application.processingDetails.manualReview.status === 'processing' ? (
                          <div className="text-center py-4">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">담당자가 검토 중입니다</p>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">담당자 검토 대기 중</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Download Section (if completed) */}
                  {application.status === 'completed' && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Download className="h-5 w-5" />
                          <span>허가증 다운로드</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div>
                              <h4 className="font-medium text-green-900">어업허가증 발급 완료</h4>
                              <p className="text-sm text-green-700">허가증을 다운로드 받으실 수 있습니다.</p>
                            </div>
                          </div>
                          <Button variant="success">
                            <Download className="mr-2 h-4 w-4" />
                            다운로드
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-base">
                        <Phone className="h-4 w-4" />
                        <span>담당자 정보</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">담당 부서</p>
                        <p className="font-medium">해양수산부 어업정책과</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">연락처</p>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">044-200-5333</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">이메일</p>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">fishery@korea.kr</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">근무시간</p>
                        <p className="text-sm">평일 09:00-18:00</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4" />
                          <span>알림</span>
                        </div>
                        {unreadNotifications > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {application.notifications.slice(0, 3).map((notification, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            notification.type === 'success' ? 'bg-green-50 border-green-200' :
                            notification.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                            notification.type === 'error' ? 'bg-red-50 border-red-200' :
                            'bg-blue-50 border-blue-200'
                          } ${!notification.read ? 'ring-2 ring-blue-200' : ''}`}
                        >
                          <div className="flex items-start space-x-2">
                            {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                            {notification.type === 'warning' && <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />}
                            {notification.type === 'error' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />}
                            {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600 mt-0.5" />}
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{notification.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {application.notifications.length > 3 && (
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          모든 알림 보기
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-base">
                        <Settings className="h-4 w-4" />
                        <span>빠른 기능</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        신청서 보기
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        담당자 상담
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        문의하기
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!application && !isSearching && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">신청 상태를 조회하세요</h3>
            <p className="text-gray-600 mb-6">신청번호를 입력하여 실시간 처리 현황을 확인할 수 있습니다.</p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 이용 안내</h4>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• 신청번호는 신청 완료 시 제공됩니다</li>
                  <li>• 24시간 실시간 상태 확인 가능</li>
                  <li>• AI 자동 분석으로 처리 속도 80% 단축</li>
                  <li>• SMS/이메일 알림 서비스 제공</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
