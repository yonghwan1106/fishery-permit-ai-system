'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  FileText,
  MapPin,
  Settings,
  Download,
  RefreshCw,
  Eye,
  Activity,
  Shield,
  Database
} from 'lucide-react'
import Link from 'next/link'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  mockDashboardStats, 
  mockProcessingStats, 
  mockRegionalStats,
  mockNotifications,
  mockProcessingQueue 
} from '@/data/mockData'

// 차트 색상
const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// 실시간 데이터 시뮬레이션
const realtimeData = [
  { time: '09:00', applications: 45, processing: 32, completed: 28 },
  { time: '10:00', applications: 52, processing: 38, completed: 35 },
  { time: '11:00', applications: 48, processing: 41, completed: 42 },
  { time: '12:00', applications: 38, processing: 35, completed: 39 },
  { time: '13:00', applications: 55, processing: 42, completed: 45 },
  { time: '14:00', applications: 61, processing: 48, completed: 52 },
  { time: '15:00', applications: 58, processing: 45, completed: 48 },
  { time: '16:00', applications: 42, processing: 38, completed: 41 }
]

// AI 성능 데이터
const aiPerformanceData = [
  { metric: '정확도', current: 94.7, target: 90, status: 'good' },
  { metric: '처리속도', current: 0.3, target: 1.0, status: 'excellent' },
  { metric: '자동화율', current: 78.5, target: 70, status: 'good' },
  { metric: '사용자만족도', current: 92.1, target: 85, status: 'excellent' }
]

// 지역별 처리 현황 (확장된 데이터)
const regionData = [
  { 
    region: '부산광역시', 
    applications: 156, 
    pending: 23,
    processing: 18,
    completed: 115,
    waitTime: 4.2, 
    status: 'urgent',
    trend: '+12',
    efficiency: 74,
    lastUpdate: '방금'
  },
  { 
    region: '인천광역시', 
    applications: 89, 
    pending: 12,
    processing: 8,
    completed: 69,
    waitTime: 2.1, 
    status: 'warning',
    trend: '+5',
    efficiency: 85,
    lastUpdate: '2분전'
  },
  { 
    region: '울산광역시', 
    applications: 67, 
    pending: 3,
    processing: 5,
    completed: 59,
    waitTime: 0.8, 
    status: 'normal',
    trend: '+2',
    efficiency: 92,
    lastUpdate: '1분전'
  },
  { 
    region: '목포시', 
    applications: 45, 
    pending: 5,
    processing: 4,
    completed: 36,
    waitTime: 1.2, 
    status: 'normal',
    trend: '+3',
    efficiency: 88,
    lastUpdate: '3분전'
  },
  { 
    region: '포항시', 
    applications: 34, 
    pending: 2,
    processing: 3,
    completed: 29,
    waitTime: 0.9, 
    status: 'normal',
    trend: '+1',
    efficiency: 91,
    lastUpdate: '1분전'
  },
  { 
    region: '여수시', 
    applications: 28, 
    pending: 1,
    processing: 2,
    completed: 25,
    waitTime: 0.6, 
    status: 'normal',
    trend: '+0',
    efficiency: 94,
    lastUpdate: '방금'
  },
  { 
    region: '제주시', 
    applications: 23, 
    pending: 1,
    processing: 1,
    completed: 21,
    waitTime: 0.4, 
    status: 'normal',
    trend: '+1',
    efficiency: 96,
    lastUpdate: '방금'
  }
]

export default function AdminPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('today')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [liveStats, setLiveStats] = useState(mockDashboardStats)
  const [sortBy, setSortBy] = useState('waitTime')
  const [filterStatus, setFilterStatus] = useState('all')

  // 실시간 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        totalApplications: prev.totalApplications + Math.floor(Math.random() * 3),
        pendingApplications: Math.max(0, prev.pendingApplications + Math.floor(Math.random() * 5) - 2),
        aiAccuracy: 94.5 + Math.random() * 0.4
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500'
      case 'warning': return 'bg-orange-500'
      case 'normal': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'urgent': return { variant: 'destructive' as const, label: '긴급', icon: '🔴' }
      case 'warning': return { variant: 'warning' as const, label: '주의', icon: '🟡' }
      case 'normal': return { variant: 'success' as const, label: '정상', icon: '🟢' }
      default: return { variant: 'secondary' as const, label: '알수없음', icon: '⚫' }
    }
  }

  // 지역 통계 계산
  const regionStats = {
    urgent: regionData.filter(r => r.status === 'urgent').length,
    warning: regionData.filter(r => r.status === 'warning').length,
    normal: regionData.filter(r => r.status === 'normal').length,
    total: regionData.length
  }

  // 필터링 및 정렬
  const filteredAndSortedRegions = regionData
    .filter(region => filterStatus === 'all' || region.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'waitTime': return b.waitTime - a.waitTime
        case 'applications': return b.applications - a.applications
        case 'efficiency': return a.efficiency - b.efficiency
        case 'region': return a.region.localeCompare(b.region)
        default: return 0
      }
    })

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
                <h1 className="text-lg font-bold text-gray-900">관리자 대시보드</h1>
                <p className="text-xs text-gray-600">실시간 어업허가 모니터링 시스템</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="animate-pulse">
                <Activity className="mr-1 h-3 w-3" />
                실시간 연결
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                설정
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">실시간 현황</h2>
          <div className="flex space-x-2">
            {['today', 'week', 'month'].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
              >
                {range === 'today' ? '오늘' : range === 'week' ? '이번주' : '이번달'}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 신청</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {liveStats.totalApplications.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12% (전월 대비)
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">처리 대기</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {liveStats.pendingApplications}
                    </p>
                    <p className="text-sm text-orange-600 flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      평균 대기시간 2.3시간
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI 정확도</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {liveStats.aiAccuracy.toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <Shield className="h-4 w-4 mr-1" />
                      목표치 90% 달성
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">처리 시간</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {liveStats.averageProcessingTime}일
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <Zap className="h-4 w-4 mr-1" />
                      78% 단축
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Real-time Activity Chart */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>실시간 활동</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realtimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="applications" 
                        stackId="1"
                        stroke="#0ea5e9" 
                        fill="#0ea5e9" 
                        fillOpacity={0.6}
                        name="신규 신청"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="processing" 
                        stackId="1"
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.6}
                        name="처리중"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="completed" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                        name="처리 완료"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Regional Monitoring Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>실시간 지역별 현황</span>
                </div>
                <Badge variant="secondary" className="animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Status Summary */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{regionStats.urgent}</div>
                  <div className="text-xs text-red-700">🔴 긴급 처리</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{regionStats.warning}</div>
                  <div className="text-xs text-orange-700">🟡 주의 관찰</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{regionStats.normal}</div>
                  <div className="text-xs text-green-700">🟢 정상 운영</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{regionStats.total}</div>
                  <div className="text-xs text-blue-700">📍 전체 지역</div>
                </div>
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">전체 상태</option>
                    <option value="urgent">🔴 긴급</option>
                    <option value="warning">🟡 주의</option>
                    <option value="normal">🟢 정상</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="waitTime">대기시간순</option>
                    <option value="applications">신청수순</option>
                    <option value="efficiency">효율성순</option>
                    <option value="region">지역명순</option>
                  </select>
                </div>
                <div className="text-xs text-gray-500">
                  {filteredAndSortedRegions.length}개 지역 표시 중
                </div>
              </div>

              {/* Regional Status Table */}
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {filteredAndSortedRegions.map((region, index) => {
                  const statusInfo = getStatusBadge(region.status)
                  return (
                    <motion.div
                      key={region.region}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer ${
                        region.status === 'urgent' ? 'bg-red-50 border-red-200 hover:bg-red-100' :
                        region.status === 'warning' ? 'bg-orange-50 border-orange-200 hover:bg-orange-100' :
                        'bg-green-50 border-green-200 hover:bg-green-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(region.status)} animate-pulse`}></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{region.region}</h4>
                            <p className="text-xs text-gray-600">업데이트: {region.lastUpdate}</p>
                          </div>
                        </div>
                        <Badge variant={statusInfo.variant} className="text-xs">
                          {statusInfo.icon} {statusInfo.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-4 mt-3 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{region.applications}</div>
                          <div className="text-xs text-gray-600">총 신청</div>
                          <div className="text-xs text-green-600">({region.trend})</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{region.pending}</div>
                          <div className="text-xs text-gray-600">대기중</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{region.processing}</div>
                          <div className="text-xs text-gray-600">처리중</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{region.completed}</div>
                          <div className="text-xs text-gray-600">완료</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            region.waitTime > 3 ? 'text-red-600' : 
                            region.waitTime > 1.5 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {region.waitTime}h
                          </div>
                          <div className="text-xs text-gray-600">대기시간</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>처리 효율성</span>
                          <span>{region.efficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              region.efficiency >= 90 ? 'bg-green-500' :
                              region.efficiency >= 80 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${region.efficiency}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center justify-end space-x-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          상세보기
                        </Button>
                        {region.status === 'urgent' && (
                          <Button variant="destructive" size="sm" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            긴급대응
                          </Button>
                        )}
                        {region.status === 'warning' && (
                          <Button variant="warning" size="sm" className="text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            조치필요
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-xs text-gray-600">
                  마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    리포트
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Settings className="h-3 w-3 mr-1" />
                    알림설정
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* AI Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>AI 성능 지표</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {aiPerformanceData.map((item, index) => (
                  <div key={item.metric} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {item.metric}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">
                          {item.metric === '처리속도' ? `${item.current}분` : `${item.current}%`}
                        </span>
                        <Badge 
                          variant={item.status === 'excellent' ? 'success' : 'info'}
                          className="text-xs"
                        >
                          {item.status === 'excellent' ? '우수' : '양호'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        value={item.metric === '처리속도' ? (item.target / item.current) * 100 : item.current} 
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500">
                        목표: {item.metric === '처리속도' ? `${item.target}분` : `${item.target}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Processing Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>처리 대기열</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProcessingQueue.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        item.priority === 'high' ? 'bg-red-100' :
                        item.priority === 'medium' ? 'bg-orange-100' : 'bg-green-100'
                      }`}>
                        <FileText className={`h-4 w-4 ${
                          item.priority === 'high' ? 'text-red-600' :
                          item.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.id}</p>
                        <p className="text-xs text-gray-600">{item.applicant} • {item.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          item.priority === 'high' ? 'destructive' :
                          item.priority === 'medium' ? 'warning' : 'secondary'
                        }
                        className="text-xs mb-1"
                      >
                        {item.priority === 'high' ? '긴급' : item.priority === 'medium' ? '보통' : '일반'}
                      </Badge>
                      <p className="text-xs text-gray-500">{item.estimatedTime}분 예상</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  전체 대기열 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processing Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>처리 방식 비교 분석</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before/After Comparison */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">월별 처리 효율성</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockProcessingStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="aiProcessed" fill="#10b981" name="AI 처리" />
                      <Bar dataKey="manualProcessed" fill="#f59e0b" name="수동 처리" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cost Savings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">비용 절감 효과</h4>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <div className="text-center">
                      <p className="text-sm text-green-700 mb-2">연간 절약 비용</p>
                      <p className="text-3xl font-bold text-green-600">18.5억원</p>
                      <p className="text-sm text-green-600 mt-1">인건비 및 운영비 절감</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">처리시간</p>
                      <p className="text-2xl font-bold text-blue-600">78%</p>
                      <p className="text-xs text-blue-600">단축</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">인력 효율성</p>
                      <p className="text-2xl font-bold text-purple-600">3배</p>
                      <p className="text-xs text-purple-600">향상</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Activity Log */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>최근 활동 로그</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.slice(0, 5).map((notification, index) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'success' ? 'bg-green-100' :
                        notification.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : notification.type === 'warning' ? (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleTimeString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                일일 리포트 다운로드
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                성능 분석 보고서
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                사용자 관리
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                시스템 설정
              </Button>
              
              {/* System Status */}
              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-3">시스템 상태</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI 엔진</span>
                    <Badge variant="success" className="text-xs">정상</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">데이터베이스</span>
                    <Badge variant="success" className="text-xs">정상</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API 서버</span>
                    <Badge variant="success" className="text-xs">정상</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">파일 저장소</span>
                    <Badge variant="warning" className="text-xs">점검중</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}