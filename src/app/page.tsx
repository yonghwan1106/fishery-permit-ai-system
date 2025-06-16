'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Fish, 
  Clock, 
  Zap,
  ChevronRight,
  Play,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Sparkles,
  Menu,
  X
} from 'lucide-react'
import { mockDashboardStats } from '@/data/mockData'
import { formatNumber, formatCurrency, formatPercentage } from '@/lib/utils'
import Link from 'next/link'

export default function HomePage() {
  const [currentStat, setCurrentStat] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroStats = [
    { 
      label: '처리시간 단축', 
      value: '80%', 
      icon: Clock,
      description: '15일 → 3일',
      color: 'text-green-600'
    },
    { 
      label: '업무 자동화', 
      value: '70%', 
      icon: Zap,
      description: '연간 3만건',
      color: 'text-blue-600'
    },
    { 
      label: '무중단 서비스', 
      value: '24시간', 
      icon: Clock,
      description: '365일 운영',
      color: 'text-purple-600'
    },
    { 
      label: 'AI 정확도', 
      value: '94.7%', 
      icon: CheckCircle,
      description: '지속적 개선',
      color: 'text-orange-600'
    }
  ]

  const features = [
    {
      title: 'AI 서류 검증',
      description: 'OCR과 자연어 처리를 활용한 실시간 서류 유효성 검증',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      title: '위험도 자동 분류',
      description: '머신러닝 기반 신청건 위험도 자동 평가 및 분류',
      icon: AlertCircle,
      color: 'bg-orange-500'
    },
    {
      title: '실시간 모니터링',
      description: '전국 어업허가 현황 실시간 추적 및 분석',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      title: '스마트 알림',
      description: '유효기간 만료, 처리 완료 등 자동 알림 시스템',
      icon: Sparkles,
      color: 'bg-purple-500'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % heroStats.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [heroStats.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-marine-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 및 사이트명 */}
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-ocean-600">
                <Fish className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">어업허가 AI 시스템</h1>
                <p className="text-xs text-gray-600">해양수산부 규제혁신과제</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-sm font-bold text-gray-900">어업허가 AI 시스템</h1>
              </div>
            </div>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/demo">
                <Button 
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <Play className="mr-2 h-4 w-4" />
                  AI 데모 보기
                </Button>
              </Link>
              
              <Link href="/apply">
                <Button variant="ghost" className="text-gray-600 hover:text-ocean-600">
                  신청하기
                </Button>
              </Link>
              <Link href="/status">
                <Button variant="ghost" className="text-gray-600 hover:text-ocean-600">
                  진행상황
                </Button>
              </Link>
              <Link href="/insights">
                <Button variant="ghost" className="text-gray-600 hover:text-ocean-600">
                  데이터 인사이트
                </Button>
              </Link>
              <Link href="/supabase-test">
                <Button variant="ghost" className="text-gray-600 hover:text-ocean-600">
                  실시간 DB
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">
                  관리자
                </Button>
              </Link>
            </div>

            {/* 모바일 햄버거 메뉴 버튼 */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* 모바일 메뉴 드롭다운 */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-gray-200 bg-white"
              >
                <div className="px-4 py-4 space-y-3">
                  <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="default"
                      className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Play className="mr-3 h-4 w-4" />
                      AI 데모 보기
                    </Button>
                  </Link>
                  
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-ocean-600">
                      신청하기
                    </Button>
                  </Link>
                  
                  <Link href="/status" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-ocean-600">
                      진행상황
                    </Button>
                  </Link>
                  
                  <Link href="/insights" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-ocean-600">
                      데이터 인사이트
                    </Button>
                  </Link>
                  
                  <Link href="/supabase-test" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-ocean-600">
                      실시간 DB
                    </Button>
                  </Link>
                  
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      관리자
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="info" className="mb-6">
              🚀 해양수산부 규제혁신과제 프로토타입
            </Badge>
            <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
              어업허가가{' '}
              <span className="gradient-text">이렇게 빨라도</span>{' '}
              되나요?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-600">
              AI 기술로 15일 → 3일, 80% 단축된 처리시간을 경험해보세요
            </p>
          </motion.div>

          {/* Animated Stats */}
          <motion.div 
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 ${
                  currentStat === index ? 'scale-105 shadow-xl' : 'hover:scale-105'
                }`}
                whileHover={{ y: -5 }}
              >
                <stat.icon className={`mx-auto h-8 w-8 ${stat.color} mb-3`} />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* AI 데모 보기를 주 액션으로 강조 */}
            <Link href="/demo">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                AI 데모 체험하기
              </Button>
            </Link>
            
            <Link href="/apply">
              <Button size="xl" variant="outline" className="w-full sm:w-auto group">
                지금 신청하기
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-ocean-100 opacity-20 animate-float"></div>
        <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-marine-100 opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              AI가 바꾸는 어업허가 시스템
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              최첨단 AI 기술로 어업인과 공무원 모두를 위한 혁신적인 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4 transition-transform group-hover:scale-110`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">놀라운 성과 지표</h3>
            <p className="text-lg sm:text-xl text-ocean-100 max-w-2xl mx-auto">
              AI 도입으로 달성한 정량적 효과를 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {formatNumber(mockDashboardStats.totalApplications)}
              </div>
              <div className="text-ocean-200">총 처리 건수</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {formatPercentage(mockDashboardStats.processingTimeReduction)}
              </div>
              <div className="text-ocean-200">처리시간 단축</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {formatCurrency(mockDashboardStats.costSavings)}
              </div>
              <div className="text-ocean-200">연간 절약 비용</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {formatPercentage(mockDashboardStats.aiAccuracy)}
              </div>
              <div className="text-ocean-200">AI 정확도</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean-50 to-marine-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              지금 바로 체험해보세요
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              몇 번의 클릭만으로 AI 기반 어업허가 시스템의 혁신적인 기능을 직접 경험할 수 있습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/demo">
                <Button 
                  size="xl" 
                  className="w-full sm:min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  라이브 데모 시작
                </Button>
              </Link>
              <Link href="/apply">
                <Button size="xl" variant="outline" className="w-full sm:min-w-[200px]">
                  신청 시뮬레이션
                </Button>
              </Link>
              <Link href="/insights">
                <Button size="xl" variant="outline" className="w-full sm:min-w-[200px]">
                  <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  데이터 인사이트
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-ocean-600">
              <Fish className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">어업허가 AI 자동심사 시스템</h4>
              <p className="text-xs sm:text-sm text-gray-400">해양수산부 규제혁신과제 프로토타입</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm sm:text-base text-gray-400">
              © 2025 박용환. 해양수산부 규제혁신과제 대국민 공모전 출품작
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              개발자: 박용환 | 연락처: 010-7939-3123 | 이메일: sanoramyun8@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}