'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye,
  BarChart3,
  Zap,
  ArrowLeft,
  Download,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react'
import Link from 'next/link'

interface ProcessingStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  duration: number
  details?: string[]
}

interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high'
  confidence: number
  processingTime: number
  extractedData: Record<string, any>
  validationResults: Array<{
    field: string
    status: 'valid' | 'invalid' | 'warning'
    message: string
  }>
  recommendations: string[]
}

export default function DemoPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: 'upload',
      title: 'OCR 문서 스캔',
      description: '업로드된 PDF/이미지에서 텍스트를 추출합니다',
      status: 'pending',
      progress: 0,
      duration: 2000,
      details: ['텍스트 영역 감지', '문자 인식 및 추출', '데이터 구조화']
    },
    {
      id: 'extraction',
      title: '핵심 정보 추출',
      description: '어선명, 톤수, 선주 등 핵심 정보를 추출합니다',
      status: 'pending',
      progress: 0,
      duration: 1500,
      details: ['어선 정보 파싱', '선주 정보 확인', '유효기간 검증']
    },
    {
      id: 'validation',
      title: '법령 데이터베이스 대조',
      description: '수산업법령과 대조하여 유효성을 검증합니다',
      status: 'pending',
      progress: 0,
      duration: 2500,
      details: ['법령 규정 확인', '필수 서류 검증', '기준 충족 여부 판단']
    },
    {
      id: 'risk_analysis',
      title: 'AI 위험도 분석',
      description: '머신러닝으로 신청건의 위험도를 평가합니다',
      status: 'pending',
      progress: 0,
      duration: 1800,
      details: ['패턴 분석', '리스크 스코어링', '분류 알고리즘 적용']
    },
    {
      id: 'report',
      title: '최종 결과 생성',
      description: '심사 결과와 권고사항을 생성합니다',
      status: 'pending',
      progress: 0,
      duration: 1000,
      details: ['결과 리포트 작성', '권고사항 도출', '최종 검토']
    }
  ])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setAnalysisResult(null)
      setCurrentStep(-1)
      setProcessingSteps(prev => prev.map(step => ({
        ...step,
        status: 'pending' as const,
        progress: 0
      })))
    }
  }, [])

  const startProcessing = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setCurrentStep(0)

    // 각 단계별 처리 시뮬레이션
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i)
      
      // 현재 단계를 processing 상태로 변경
      setProcessingSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'processing' } : step
      ))

      // 진행률 애니메이션
      const duration = processingSteps[i].duration
      const steps = 100
      const interval = duration / steps

      for (let progress = 0; progress <= 100; progress += 2) {
        await new Promise(resolve => setTimeout(resolve, interval * 2))
        setProcessingSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, progress } : step
        ))
      }

      // 완료 상태로 변경
      setProcessingSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed', progress: 100 } : step
      ))

      // 짧은 대기 시간
      await new Promise(resolve => setTimeout(resolve, 300))
    }

    // 분석 결과 생성
    const mockResult: AnalysisResult = {
      riskLevel: Math.random() > 0.7 ? 'medium' : 'low',
      confidence: 92 + Math.random() * 6,
      processingTime: processingSteps.reduce((sum, step) => sum + step.duration, 0) / 1000,
      extractedData: {
        vesselName: '바다의꿈호',
        tonnage: '5.5톤',
        owner: '김어부',
        registrationNumber: 'KR-12345',
        expiryDate: '2026-12-31',
        inspectionDate: '2025-05-15'
      },
      validationResults: [
        { field: '어선명', status: 'valid', message: '유효한 어선명입니다' },
        { field: '톤수', status: 'valid', message: '허용 범위 내의 톤수입니다' },
        { field: '선주정보', status: 'valid', message: '등록된 선주입니다' },
        { field: '유효기간', status: 'warning', message: '6개월 후 갱신 필요' }
      ],
      recommendations: [
        '자동 승인 권장',
        '표준 처리 프로세스 적용',
        '6개월 후 갱신 알림 설정'
      ]
    }

    setAnalysisResult(mockResult)
    setIsProcessing(false)
    setCurrentStep(-1)
  }

  const resetDemo = () => {
    setUploadedFile(null)
    setAnalysisResult(null)
    setCurrentStep(-1)
    setIsProcessing(false)
    setProcessingSteps(prev => prev.map(step => ({
      ...step,
      status: 'pending' as const,
      progress: 0
    })))
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'low': return '낮음'
      case 'medium': return '보통'
      case 'high': return '높음'
      default: return '알 수 없음'
    }
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
                <h1 className="text-lg font-bold text-gray-900">AI 데모 시연</h1>
                <p className="text-xs text-gray-600">실시간 어업허가 자동심사 체험</p>
              </div>
            </div>
            <Badge variant="info" className="hidden sm:flex">
              🚀 실시간 AI 처리 데모
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 설명 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI 자동심사 시스템 실시간 데모
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            어선검사증서 PDF를 업로드하면 AI가 실시간으로 문서를 분석하고 
            어업허가 심사를 자동으로 수행하는 과정을 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 업로드 및 처리 영역 */}
          <div className="space-y-6">
            {/* 파일 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>서류 업로드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    uploadedFile 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-ocean-400 hover:bg-ocean-50'
                  }`}
                  onDrop={(e) => {
                    e.preventDefault()
                    const files = Array.from(e.dataTransfer.files) as File[]
                    onDrop(files)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-sm font-medium text-green-700">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          어선검사증서 PDF 파일을 드래그하거나 클릭하여 업로드
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG 파일 지원 (최대 10MB)
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // 실제 구현에서는 파일 선택 다이얼로그 열기
                          const mockFile = new File(['mock content'], '어선검사증서_바다의꿈호.pdf', {
                            type: 'application/pdf',
                            lastModified: Date.now()
                          })
                          onDrop([mockFile])
                        }}
                      >
                        샘플 파일 사용
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 처리 시작 버튼 */}
            <div className="flex space-x-4">
              <Button
                onClick={startProcessing}
                disabled={!uploadedFile || isProcessing}
                className="flex-1"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    AI 분석 진행중...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    AI 분석 시작
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetDemo}
                variant="outline"
                disabled={isProcessing}
              >
                초기화
              </Button>
            </div>

            {/* 처리 과정 시각화 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>AI 처리 과정</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processingSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: currentStep === index ? 1 : 
                               step.status === 'completed' ? 1 : 0.5 
                    }}
                    className={`p-4 rounded-lg border ${
                      step.status === 'completed' ? 'bg-green-50 border-green-200' :
                      step.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                      step.status === 'error' ? 'bg-red-50 border-red-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : step.status === 'processing' ? (
                          <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                        ) : step.status === 'error' ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      {step.status === 'processing' && (
                        <div className="text-right">
                          <div className="text-xs font-mono text-blue-600">
                            {step.progress}%
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {(step.status === 'processing' || step.status === 'completed') && (
                      <Progress 
                        value={step.progress} 
                        className={`h-1 ${step.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`} 
                      />
                    )}

                    {/* 상세 단계 */}
                    {currentStep === index && step.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-1"
                      >
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2 text-xs text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              step.progress > (detailIndex + 1) * 33 ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 결과 영역 */}
          <div className="space-y-6">
            {analysisResult ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* 분석 결과 요약 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Eye className="h-5 w-5" />
                        <span>AI 분석 결과</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 위험도 */}
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="text-sm font-medium text-gray-700">위험도 분류</p>
                          <p className="text-xs text-gray-500">머신러닝 기반 자동 분류</p>
                        </div>
                        <Badge className={`${getRiskColor(analysisResult.riskLevel)} border`}>
                          {getRiskLabel(analysisResult.riskLevel)}
                        </Badge>
                      </div>

                      {/* 신뢰도 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">AI 신뢰도</span>
                          <span className="font-mono text-ocean-600">
                            {analysisResult.confidence.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={analysisResult.confidence} className="h-2" />
                      </div>

                      {/* 처리 시간 */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-700">처리 시간</span>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-lg font-bold text-blue-600">
                            {analysisResult.processingTime.toFixed(1)}초
                          </p>
                          <p className="text-xs text-blue-500">기존 수동처리: 3-5일</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 추출된 데이터 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>추출된 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(analysisResult.extractedData).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {key === 'vesselName' ? '어선명' :
                               key === 'tonnage' ? '톤수' :
                               key === 'owner' ? '선주' :
                               key === 'registrationNumber' ? '등록번호' :
                               key === 'expiryDate' ? '유효기간' :
                               key === 'inspectionDate' ? '검사일자' : key}
                            </p>
                            <p className="font-mono text-sm text-gray-900">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 유효성 검증 결과 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>유효성 검증</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {analysisResult.validationResults.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                          <div className="flex items-center space-x-2">
                            {result.status === 'valid' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : result.status === 'warning' ? (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">{result.field}</span>
                          </div>
                          <p className="text-xs text-gray-600">{result.message}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* 권고사항 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>AI 권고사항</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* 액션 버튼 */}
                  <div className="flex space-x-4">
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      결과 다운로드
                    </Button>
                    <Button variant="outline" onClick={resetDemo}>
                      다시 시도
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    분석 결과 대기중
                  </h3>
                  <p className="text-gray-600">
                    서류를 업로드하고 AI 분석을 시작하세요
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Before/After 비교 섹션 */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">처리 방식 비교</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 기존 방식 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-center">기존 수동 처리</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">평균 처리시간</span>
                        <span className="font-bold text-red-600">3-5일</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">업무 시간</span>
                        <span className="font-bold text-red-600">8시간/건</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">오류 가능성</span>
                        <span className="font-bold text-red-600">5-10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">24시간 처리</span>
                        <span className="font-bold text-red-600">불가능</span>
                      </div>
                    </div>
                  </div>

                  {/* AI 방식 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-center">AI 자동 처리</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">평균 처리시간</span>
                        <span className="font-bold text-green-600">{analysisResult.processingTime.toFixed(1)}초</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">업무 시간</span>
                        <span className="font-bold text-green-600">5분/건</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">오류 가능성</span>
                        <span className="font-bold text-green-600">2-3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">24시간 처리</span>
                        <span className="font-bold text-green-600">가능</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 개선 효과 */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-ocean-50 to-ocean-100 rounded-full px-6 py-3 border border-ocean-200">
                    <Zap className="h-5 w-5 text-ocean-600" />
                    <span className="font-semibold text-ocean-700">
                      처리시간 99.8% 단축 | 업무효율성 95% 향상 | 연간 18억원 절약
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}