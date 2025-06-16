'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calculator,
  Brain,
  Lightbulb,
  Globe,
  PieChart,
  Activity,
  Target,
  Zap,
  DollarSign,
  Users,
  Fish,
  Calendar,
  Settings,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts'
import { mockRegionalStats, mockProcessingStats } from '@/data/mockData'

// 차트 색상
const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16']

// 어업 종류별 데이터
const fisheryTypeData = [
  { type: '연안어업', permits: 1847, revenue: 2.3, vessels: 987, growth: 5.2 },
  { type: '근해어업', permits: 924, revenue: 4.7, vessels: 456, growth: -2.1 },
  { type: '구획어업', permits: 634, revenue: 1.8, vessels: 234, growth: 8.7 },
  { type: '원양어업', permits: 156, revenue: 8.9, vessels: 89, growth: 12.3 }
]

// 계절별 트렌드 데이터
const seasonalData = [
  { month: '1월', coastal: 45, offshore: 78, demarcated: 23, deep_sea: 12 },
  { month: '2월', coastal: 52, offshore: 65, demarcated: 28, deep_sea: 15 },
  { month: '3월', coastal: 78, offshore: 89, demarcated: 45, deep_sea: 18 },
  { month: '4월', coastal: 156, offshore: 124, demarcated: 67, deep_sea: 23 },
  { month: '5월', coastal: 234, offshore: 178, demarcated: 89, deep_sea: 34 },
  { month: '6월', coastal: 289, offshore: 234, demarcated: 123, deep_sea: 45 },
  { month: '7월', coastal: 234, offshore: 298, demarcated: 167, deep_sea: 56 },
  { month: '8월', coastal: 198, offshore: 267, demarcated: 145, deep_sea: 48 },
  { month: '9월', coastal: 167, offshore: 234, demarcated: 123, deep_sea: 42 },
  { month: '10월', coastal: 145, offshore: 198, demarcated: 98, deep_sea: 38 },
  { month: '11월', coastal: 89, offshore: 145, demarcated: 67, deep_sea: 28 },
  { month: '12월', coastal: 67, offshore: 98, demarcated: 45, deep_sea: 22 }
]

// 예측 데이터
const predictionData = [
  { year: '2023', actual: 2450, predicted: null },
  { year: '2024', actual: 2847, predicted: 2680 },
  { year: '2025', actual: null, predicted: 3240 },
  { year: '2026', actual: null, predicted: 3580 },
  { year: '2027', actual: null, predicted: 3890 }
]

// 규제 영향 시나리오
const regulationScenarios = [
  { 
    name: '현행 유지', 
    permits: 2847, 
    processing_time: 3.2, 
    cost: 18.5,
    satisfaction: 92.1 
  },
  { 
    name: '규제 완화', 
    permits: 3420, 
    processing_time: 2.1, 
    cost: 12.3,
    satisfaction: 95.8 
  },
  { 
    name: '규제 강화', 
    permits: 2234, 
    processing_time: 4.8, 
    cost: 28.7,
    satisfaction: 86.2 
  }
]

// 경제 효과 데이터
const economicImpactData = [
  { category: '인건비 절감', value: 8.5, percentage: 46 },
  { category: '시간 단축', value: 4.2, percentage: 23 },
  { category: '오류 감소', value: 3.1, percentage: 17 },
  { category: '효율성 향상', value: 2.7, percentage: 14 }
]

export default function InsightsPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('year')
  const [costCalculatorInputs, setCostCalculatorInputs] = useState({
    applications: 1000,
    averageTime: 15,
    hourlyRate: 50000
  })

  const calculateCostSavings = () => {
    const { applications, averageTime, hourlyRate } = costCalculatorInputs
    const currentCost = applications * averageTime * 8 * hourlyRate
    const aiCost = applications * 3 * 2 * hourlyRate
    const savings = currentCost - aiCost
    return {
      currentCost: currentCost / 100000000, // 억원
      aiCost: aiCost / 100000000, // 억원
      savings: savings / 100000000, // 억원
      savingsPercentage: ((savings / currentCost) * 100).toFixed(1)
    }
  }

  const costAnalysis = calculateCostSavings()

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
                <h1 className="text-lg font-bold text-gray-900">데이터 인사이트 센터</h1>
                <p className="text-xs text-gray-600">정책 수립 지원 및 예측 분석</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="info" className="animate-pulse">
                <Brain className="mr-1 h-3 w-3" />
                AI 분석 엔진
              </Badge>
 
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">어업 현황 분석</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {['overview', 'trends', 'predictions', 'regulations'].map((view) => (
                <Button
                  key={view}
                  variant={selectedView === view ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView(view)}
                >
                  {view === 'overview' ? '개요' : 
                   view === 'trends' ? '트렌드' : 
                   view === 'predictions' ? '예측' : '규제영향'}
                </Button>
              ))}
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">전국</option>
              <option value="busan">부산</option>
              <option value="incheon">인천</option>
              <option value="ulsan">울산</option>
            </select>
          </div>
        </div>

        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-ocean-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">총 허가건수</p>
                        <p className="text-3xl font-bold text-blue-900">3,561</p>
                        <p className="text-sm text-blue-600 flex items-center mt-1">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +15.2% (전년 대비)
                        </p>
                      </div>
                      <Fish className="h-12 w-12 text-blue-500 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">경제적 효과</p>
                        <p className="text-3xl font-bold text-green-900">42.8조원</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          수산업 GDP 기여도
                        </p>
                      </div>
                      <BarChart3 className="h-12 w-12 text-green-500 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">종사자 수</p>
                        <p className="text-3xl font-bold text-purple-900">18.7만명</p>
                        <p className="text-sm text-purple-600 flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          직간접 고용 효과
                        </p>
                      </div>
                      <Users className="h-12 w-12 text-purple-500 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-700">AI 효율성</p>
                        <p className="text-3xl font-bold text-orange-900">94.7%</p>
                        <p className="text-sm text-orange-600 flex items-center mt-1">
                          <Zap className="h-4 w-4 mr-1" />
                          자동화 정확도
                        </p>
                      </div>
                      <Brain className="h-12 w-12 text-orange-500 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Regional Interactive Dashboard */}
            <div className="xl:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-ocean-600 to-marine-600 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>전국 어업 현황 대시보드</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      실시간 데이터
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Top Stats Bar */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-ocean-100 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">3,561</div>
                      <div className="text-sm text-blue-700">전국 총계</div>
                      <div className="text-xs text-green-600 mt-1">+15.2%</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">89.3%</div>
                      <div className="text-sm text-green-700">평균 승인률</div>
                      <div className="text-xs text-blue-600 mt-1">+2.1%</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">3.1일</div>
                      <div className="text-sm text-purple-700">평균 처리시간</div>
                      <div className="text-xs text-orange-600 mt-1">-80%</div>
                    </div>
                  </div>

                  {/* Regional Rankings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">지역별 현황 순위</h4>
                      <Badge variant="secondary" className="animate-pulse">
                        <Activity className="mr-1 h-3 w-3" />
                        실시간 업데이트
                      </Badge>
                    </div>
                    
                    {mockRegionalStats
                      .sort((a, b) => b.applications - a.applications)
                      .map((region, index) => {
                        const maxApplications = Math.max(...mockRegionalStats.map(r => r.applications))
                        const percentage = (region.applications / maxApplications) * 100
                        const isTop3 = index < 3
                        
                        return (
                          <motion.div
                            key={region.region}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-4 rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                              isTop3 
                                ? 'bg-gradient-to-r from-blue-50 to-ocean-50 border-blue-200 hover:shadow-blue-200' 
                                : 'bg-gray-50 border-gray-200 hover:bg-white'
                            }`}
                          >
                            {/* Rank Badge */}
                            <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-400' : 
                              index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                            }`}>
                              {index + 1}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <h5 className={`font-semibold ${isTop3 ? 'text-blue-900' : 'text-gray-900'}`}>
                                    {region.region}
                                  </h5>
                                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                                    isTop3 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {region.applications}건
                                  </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="mt-2 mb-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>신청량</span>
                                    <span>{percentage.toFixed(1)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                      className={`h-2 rounded-full ${
                                        isTop3 ? 'bg-gradient-to-r from-blue-500 to-ocean-600' : 'bg-gray-400'
                                      }`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                  </div>
                                </div>
                                
                                {/* Sub Stats */}
                                <div className="grid grid-cols-3 gap-4 text-xs">
                                  <div className="text-center">
                                    <div className={`font-semibold ${isTop3 ? 'text-green-600' : 'text-gray-600'}`}>
                                      {region.approvalRate}%
                                    </div>
                                    <div className="text-gray-500">승인률</div>
                                  </div>
                                  <div className="text-center">
                                    <div className={`font-semibold ${isTop3 ? 'text-blue-600' : 'text-gray-600'}`}>
                                      {region.averageProcessingTime}일
                                    </div>
                                    <div className="text-gray-500">처리시간</div>
                                  </div>
                                  <div className="text-center">
                                    <div className={`font-semibold ${isTop3 ? 'text-purple-600' : 'text-gray-600'}`}>
                                      94.2%
                                    </div>
                                    <div className="text-gray-500">만족도</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Trend Arrow */}
                              <div className="ml-4">
                                <div className={`p-2 rounded-full ${
                                  region.growthRate > 0 ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                  {region.growthRate > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                  )}
                                </div>
                                <div className={`text-xs text-center mt-1 font-medium ${
                                  region.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {region.growthRate > 0 ? '+' : ''}{region.growthRate}%
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                  </div>
                  
                  {/* Live Activity Feed */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-orange-800">실시간 활동</span>
                    </div>
                    <div className="text-xs text-orange-700 space-y-1">
                      <div className="flex justify-between">
                        <span>• 부산: 연안어업 신청 접수</span>
                        <span className="text-orange-500">2분 전</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• 인천: 근해어업 승인 완료</span>
                        <span className="text-orange-500">5분 전</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• 울산: 원양어업 검토 중</span>
                        <span className="text-orange-500">8분 전</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

              {/* Fishery Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>어업 유형별 분포</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={fisheryTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="permits"
                        >
                          {fisheryTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [
                            `${value}건`,
                            props.payload.type
                          ]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* 범례 */}
                  <div className="space-y-2 mt-4">
                    {fisheryTypeData.map((item, index) => (
                      <div key={item.type} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{item.type}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{item.permits}건</span>
                          <Badge 
                            variant={item.growth > 0 ? 'success' : 'destructive'} 
                            className="text-xs"
                          >
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Economic Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>경제적 파급효과 분석</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Interactive Cost Breakdown */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-6">비용 절감 분해 분석</h4>
                    <div className="space-y-4">
                      {economicImpactData.map((item, index) => (
                        <motion.div
                          key={item.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">{item.value}억원</span>
                              <Badge variant="secondary" className="text-xs">
                                {item.percentage}%
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Animated Progress Bar */}
                          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${
                                index === 0 ? 'from-blue-500 to-blue-600' :
                                index === 1 ? 'from-green-500 to-green-600' :
                                index === 2 ? 'from-orange-500 to-orange-600' :
                                'from-purple-500 to-purple-600'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          </div>
                          
                          {/* Impact Indicator */}
                          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                            <span>연간 절감액</span>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-green-600 font-medium">
                                {(item.value * 12).toFixed(1)}억원/년
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Summary Card */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-700 font-medium">총 절감 효과</p>
                          <p className="text-xs text-green-600">월간 누적 기준</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            {economicImpactData.reduce((sum, item) => sum + item.value, 0)}억원
                          </p>
                          <p className="text-xs text-green-500">매월 절약</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ROI & Impact Metrics */}
                  <div className="space-y-6">
                    {/* Main Impact Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-ocean-100 p-6 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                          <DollarSign className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm text-blue-700 mb-2">연간 총 절감 효과</p>
                        <p className="text-4xl font-bold text-blue-600 mb-2">218억원</p>
                        <p className="text-sm text-blue-600">전국 기준 예상액</p>
                      </div>
                    </div>
                    
                    {/* Detailed Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg border border-green-200"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-2xl font-bold text-green-600 mb-1">340%</div>
                        <div className="text-xs text-green-700 font-medium">ROI</div>
                        <div className="text-xs text-green-600">투자 대비 수익률</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-2xl font-bold text-purple-600 mb-1">8개월</div>
                        <div className="text-xs text-purple-700 font-medium">페이백</div>
                        <div className="text-xs text-purple-600">투자 회수 기간</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border border-orange-200"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-2xl font-bold text-orange-600 mb-1">15.2%</div>
                        <div className="text-xs text-orange-700 font-medium">생산성</div>
                        <div className="text-xs text-orange-600">향상률</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg border border-indigo-200"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-2xl font-bold text-indigo-600 mb-1">4.7배</div>
                        <div className="text-xs text-indigo-700 font-medium">효율성</div>
                        <div className="text-xs text-indigo-600">처리 속도</div>
                      </motion.div>
                    </div>
                    
                    {/* Social Impact */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-600" />
                        사회적 파급효과
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">일자리 창출</span>
                          <span className="font-medium text-gray-900">2,840명</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">서비스 만족도</span>
                          <span className="font-medium text-gray-900">94.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">환경 효과</span>
                          <span className="font-medium text-gray-900">CO2 -15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">지역 경제</span>
                          <span className="font-medium text-gray-900">+8.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === 'trends' && (
          <div className="space-y-8">
            {/* Seasonal Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>계절별 신청 패턴 분석</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="coastal" 
                        stackId="1"
                        stroke="#0ea5e9" 
                        fill="#0ea5e9" 
                        fillOpacity={0.6}
                        name="연안어업"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="offshore" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                        name="근해어업"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="demarcated" 
                        stackId="1"
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.6}
                        name="구획어업"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="deep_sea" 
                        stackId="1"
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.6}
                        name="원양어업"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* 인사이트 */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">피크 시즌</h4>
                    <p className="text-sm text-blue-700">
                      6-8월에 가장 높은 신청량을 보이며, 특히 연안어업과 근해어업의 비중이 높습니다.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">성장 추세</h4>
                    <p className="text-sm text-green-700">
                      구획어업이 전년 대비 8.7% 성장하며 가장 높은 증가율을 보이고 있습니다.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900 mb-2">예측</h4>
                    <p className="text-sm text-orange-700">
                      AI 모델에 따르면 내년도 전체 신청량은 15.2% 증가할 것으로 예상됩니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === 'predictions' && (
          <div className="space-y-8">
            {/* Prediction Models */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI 예측 모델링</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="actual" fill="#0ea5e9" name="실제 데이터" />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="AI 예측"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                
                {/* 예측 정확도 */}
                <div className="mt-6 bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-purple-700 mb-2">예측 정확도</p>
                      <p className="text-3xl font-bold text-purple-600">96.2%</p>
                      <p className="text-xs text-purple-600">지난 3년 평균</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-purple-700 mb-2">신뢰 구간</p>
                      <p className="text-3xl font-bold text-purple-600">±5.8%</p>
                      <p className="text-xs text-purple-600">95% 신뢰도</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-purple-700 mb-2">예측 기간</p>
                      <p className="text-3xl font-bold text-purple-600">3년</p>
                      <p className="text-xs text-purple-600">중장기 전망</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === 'regulations' && (
          <div className="space-y-8">
            {/* Regulation Impact Simulation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>규제 영향 시뮬레이션</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regulationScenarios.map((scenario, index) => (
                    <div key={scenario.name} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{scenario.name}</h4>
                        <Badge variant={index === 1 ? 'success' : index === 2 ? 'warning' : 'secondary'}>
                          {index === 1 ? '권장' : index === 2 ? '주의' : '현행'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">허가건수</p>
                          <p className="text-2xl font-bold text-gray-900">{scenario.permits.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">건/년</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">처리시간</p>
                          <p className="text-2xl font-bold text-gray-900">{scenario.processing_time}</p>
                          <p className="text-xs text-gray-500">일</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">운영비용</p>
                          <p className="text-2xl font-bold text-gray-900">{scenario.cost}</p>
                          <p className="text-xs text-gray-500">억원/년</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">만족도</p>
                          <p className="text-2xl font-bold text-gray-900">{scenario.satisfaction}%</p>
                          <p className="text-xs text-gray-500">사용자</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>비용 효과 계산기</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        연간 신청 건수
                      </label>
                      <Input
                        type="number"
                        value={costCalculatorInputs.applications}
                        onChange={(e) => setCostCalculatorInputs(prev => ({
                          ...prev,
                          applications: parseInt(e.target.value) || 0
                        }))}
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        기존 평균 처리시간 (일)
                      </label>
                      <Input
                        type="number"
                        value={costCalculatorInputs.averageTime}
                        onChange={(e) => setCostCalculatorInputs(prev => ({
                          ...prev,
                          averageTime: parseInt(e.target.value) || 0
                        }))}
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        시간당 인건비 (원)
                      </label>
                      <Input
                        type="number"
                        value={costCalculatorInputs.hourlyRate}
                        onChange={(e) => setCostCalculatorInputs(prev => ({
                          ...prev,
                          hourlyRate: parseInt(e.target.value) || 0
                        }))}
                        placeholder="50000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-ocean-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-4">계산 결과</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-700">기존 방식 비용:</span>
                          <span className="font-bold text-blue-900">{costAnalysis.currentCost.toFixed(1)}억원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">AI 방식 비용:</span>
                          <span className="font-bold text-blue-900">{costAnalysis.aiCost.toFixed(1)}억원</span>
                        </div>
                        <div className="border-t border-blue-200 pt-3">
                          <div className="flex justify-between">
                            <span className="text-blue-700">절약 금액:</span>
                            <span className="font-bold text-green-600">{costAnalysis.savings.toFixed(1)}억원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">절약률:</span>
                            <span className="font-bold text-green-600">{costAnalysis.savingsPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">추가 효과</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 처리시간 80% 단축</li>
                        <li>• 오류율 70% 감소</li>
                        <li>• 고객 만족도 15% 향상</li>
                        <li>• 24시간 무중단 서비스</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-900">
              <Lightbulb className="h-5 w-5" />
              <span>AI 정책 추천</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">단기 추천</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  연안어업 신청이 급증하는 6-8월 대비 인력 배치 최적화가 필요합니다.
                </p>
                <Badge variant="info" className="text-xs">우선순위: 높음</Badge>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">중기 추천</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  구획어업 증가 추세에 맞춘 규제 완화 및 절차 간소화를 검토하세요.
                </p>
                <Badge variant="success" className="text-xs">우선순위: 보통</Badge>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">장기 추천</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  원양어업 성장에 대비한 고도화된 AI 모델 개발이 필요합니다.
                </p>
                <Badge variant="warning" className="text-xs">우선순위: 낮음</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}