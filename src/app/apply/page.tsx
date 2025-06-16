'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  CheckCircle, 
  Lightbulb, 
  Clock, 
  Upload, 
  FileText,
  AlertCircle,
  User,
  Ship,
  Fish,
  FileCheck,
  Eye,
  Bot,
  Zap,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Info,
  Shield,
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'

interface FormData {
  applicantName: string
  applicantPhone: string
  applicantEmail: string
  vesselName: string
  vesselTonnage: string
  fishingArea: string
  fisheryType: string
  businessType: string
  experience: string
}

interface ValidationResult {
  field: string
  status: 'valid' | 'invalid' | 'warning'
  message: string
  suggestions?: string[]
}

interface AIRecommendation {
  type: 'info' | 'warning' | 'success'
  title: string
  message: string
  action?: string
}

// 가상의 파일 객체 생성
const createMockFile = (name: string, size: number): File => {
  const blob = new Blob(['Mock file content'], { type: 'application/pdf' })
  const file = new File([blob], name, { type: 'application/pdf' })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

const steps = [
  { id: 1, title: '신청인 정보', icon: User, description: '기본 신청인 정보를 입력합니다' },
  { id: 2, title: '어선 정보', icon: Ship, description: '어선의 상세 정보를 입력합니다' },
  { id: 3, title: '어업 정보', icon: Fish, description: '어업 종류와 지역을 선택합니다' },
  { id: 4, title: '서류 업로드', icon: FileText, description: '필요한 서류를 업로드합니다' },
  { id: 5, title: '최종 검토', icon: FileCheck, description: '입력 정보를 최종 확인합니다' }
]

export default function ApplyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  
  // 데모용 기본값 설정
  const [formData, setFormData] = useState<FormData>({
    applicantName: '박용환',
    applicantPhone: '010-7939-3123',
    applicantEmail: 'sanoramyun8@gmail.com',
    vesselName: '희망찬바다호',
    vesselTonnage: '8.5',
    fishingArea: '부산 연안',
    fisheryType: 'coastal',
    businessType: 'individual',
    experience: 'experienced'
  })
  
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState<number | null>(48)
  
  // 데모용 미리 설정된 파일들
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([
    createMockFile('어선검사증서.pdf', 2.1 * 1024 * 1024),
    createMockFile('선박국적증서.pdf', 1.8 * 1024 * 1024),
    createMockFile('사업자등록증.pdf', 1.2 * 1024 * 1024)
  ])
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDemoHelper, setShowDemoHelper] = useState(true)

  // 컴포넌트 마운트 시 초기 AI 추천사항 설정
  useEffect(() => {
    setAiRecommendations([
      {
        type: 'success',
        title: 'AI 검증 완료',
        message: '신청인 정보가 데이터베이스와 일치하는지 확인했습니다.'
      },
      {
        type: 'info',
        title: '어선 분류 완료',
        message: '연안어업으로 분류되어 처리시간이 단축됩니다.'
      }
    ])

    setValidationResults([
      { field: 'applicantName', status: 'valid', message: '유효한 이름입니다' },
      { field: 'applicantPhone', status: 'valid', message: '유효한 전화번호입니다' },
      { field: 'vesselName', status: 'valid', message: '사용 가능한 어선명입니다' },
      { field: 'vesselTonnage', status: 'valid', message: '연안어업 대상 어선입니다' }
    ])
  }, [])

  // 실시간 유효성 검사
  const validateField = useCallback(async (field: string, value: string) => {
    if (!value.trim()) return

    setIsValidating(true)
    
    // AI 검증 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let result: ValidationResult
    let recommendations: AIRecommendation[] = []

    switch (field) {
      case 'applicantName':
        if (value.length < 2) {
          result = { field, status: 'invalid', message: '이름은 2글자 이상이어야 합니다' }
        } else if (/[0-9]/.test(value)) {
          result = { field, status: 'invalid', message: '이름에는 숫자가 포함될 수 없습니다' }
        } else {
          result = { field, status: 'valid', message: '유효한 이름입니다' }
          recommendations.push({
            type: 'info',
            title: 'AI 검증 완료',
            message: '신청인 정보가 데이터베이스와 일치하는지 확인했습니다.'
          })
        }
        break

      case 'applicantPhone':
        const phoneRegex = /^010-\d{4}-\d{4}$/
        if (!phoneRegex.test(value)) {
          result = { 
            field, 
            status: 'invalid', 
            message: '010-0000-0000 형식으로 입력해주세요',
            suggestions: ['010-1234-5678', '010-9876-5432']
          }
        } else {
          result = { field, status: 'valid', message: '유효한 전화번호입니다' }
        }
        break

      case 'vesselName':
        if (value.length < 2) {
          result = { field, status: 'invalid', message: '어선명은 2글자 이상이어야 합니다' }
        } else {
          result = { field, status: 'valid', message: '사용 가능한 어선명입니다' }
          recommendations.push({
            type: 'success',
            title: '어선 정보 확인',
            message: `'${value}'은(는) 등록 가능한 어선명입니다.`
          })
        }
        break

      case 'vesselTonnage':
        const tonnage = parseFloat(value)
        if (isNaN(tonnage) || tonnage <= 0) {
          result = { field, status: 'invalid', message: '유효한 톤수를 입력해주세요' }
        } else if (tonnage > 10) {
          result = { field, status: 'warning', message: '근해어업 대상 어선입니다 (추가 서류 필요)' }
          recommendations.push({
            type: 'warning',
            title: '추가 서류 안내',
            message: '10톤 초과 어선은 근해어업 서류가 추가로 필요합니다.'
          })
        } else {
          result = { field, status: 'valid', message: '연안어업 대상 어선입니다' }
          recommendations.push({
            type: 'success',
            title: '어업 분류 완료',
            message: '연안어업으로 분류되어 처리시간이 단축됩니다.'
          })
        }
        break

      default:
        result = { field, status: 'valid', message: '입력 완료' }
    }

    setValidationResults(prev => 
      prev.filter(r => r.field !== field).concat(result)
    )
    
    if (recommendations.length > 0) {
      setAiRecommendations(prev => [...prev, ...recommendations])
    }

    setIsValidating(false)
  }, [])

  // 처리시간 예측
  const calculateEstimatedTime = useCallback(() => {
    const { fisheryType, vesselTonnage } = formData
    let baseTime = 72 // 기본 3일

    if (fisheryType === 'coastal') baseTime = 48 // 2일
    if (fisheryType === 'demarcated') baseTime = 24 // 1일
    if (parseFloat(vesselTonnage) > 10) baseTime += 24 // +1일

    // AI 처리로 80% 단축
    const aiTime = Math.round(baseTime * 0.2)
    setEstimatedTime(aiTime)
  }, [formData])

  useEffect(() => {
    if (formData.fisheryType && formData.vesselTonnage) {
      calculateEstimatedTime()
    }
  }, [formData.fisheryType, formData.vesselTonnage, calculateEstimatedTime])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // 실시간 검증 (디바운스)
    const timer = setTimeout(() => {
      validateField(field, value)
    }, 1000)

    return () => clearTimeout(timer)
  }

  const getStepProgress = () => ((currentStep - 1) / (steps.length - 1)) * 100

  // 데모용으로 항상 다음 단계로 진행 가능하도록 수정
  const canProceedToNext = () => {
    return true // 데모 모드에서는 항상 진행 가능
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
    
    // AI 서류 검증 시뮬레이션
    files.forEach(file => {
      setAiRecommendations(prev => [...prev, {
        type: 'success',
        title: '서류 검증 완료',
        message: `${file.name} 서류가 AI 시스템에 의해 검증되었습니다.`
      }])
    })
  }

  // 데모 데이터 자동 채우기 함수
  const fillDemoData = () => {
    setIsValidating(true)
    
    // AI가 데이터를 채우는 애니메이션 효과
    setTimeout(() => {
      setAiRecommendations(prev => [...prev, {
        type: 'success',
        title: '데모 데이터 자동 입력',
        message: 'AI가 예시 데이터로 모든 필드를 자동 입력했습니다.'
      }])
      setIsValidating(false)
    }, 1500)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // 신청 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 성공 애니메이션
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    setIsSubmitting(false)
    
    // 완료 페이지로 이동 (실제 구현에서는 신청번호와 함께)
    alert(`어업허가 신청이 완료되었습니다!\n신청번호: F2025${String(Date.now()).slice(-6)}\n예상 처리시간: ${estimatedTime}시간`)
    router.push('/')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {showDemoHelper && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-900">
                      AI가 신청인 정보를 자동 검증했습니다
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowDemoHelper(false)}
                    className="text-xs"
                  >
                    확인
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="성명"
                  placeholder="홍길동"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  required
                />
                {validationResults.find(r => r.field === 'applicantName') && (
                  <div className={`mt-2 flex items-center space-x-2 text-sm ${
                    validationResults.find(r => r.field === 'applicantName')?.status === 'valid' 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {validationResults.find(r => r.field === 'applicantName')?.status === 'valid' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{validationResults.find(r => r.field === 'applicantName')?.message}</span>
                  </div>
                )}
              </div>

              <div>
                <Input
                  label="전화번호"
                  placeholder="010-1234-5678"
                  value={formData.applicantPhone}
                  onChange={(e) => handleInputChange('applicantPhone', e.target.value)}
                  required
                />
                {validationResults.find(r => r.field === 'applicantPhone') && (
                  <div className={`mt-2 flex items-center space-x-2 text-sm ${
                    validationResults.find(r => r.field === 'applicantPhone')?.status === 'valid' 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {validationResults.find(r => r.field === 'applicantPhone')?.status === 'valid' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{validationResults.find(r => r.field === 'applicantPhone')?.message}</span>
                  </div>
                )}
              </div>

              <div>
                <Input
                  label="이메일 (선택)"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.applicantEmail}
                  onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사업자 구분 *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="individual">개인사업자</option>
                  <option value="corporation">법인사업자</option>
                  <option value="cooperative">어업조합</option>
                </select>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="어선명"
                  placeholder="바다의꿈호"
                  value={formData.vesselName}
                  onChange={(e) => handleInputChange('vesselName', e.target.value)}
                  required
                />
                {validationResults.find(r => r.field === 'vesselName') && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{validationResults.find(r => r.field === 'vesselName')?.message}</span>
                  </div>
                )}
              </div>

              <div>
                <Input
                  label="총톤수 (톤)"
                  type="number"
                  step="0.1"
                  placeholder="5.5"
                  value={formData.vesselTonnage}
                  onChange={(e) => handleInputChange('vesselTonnage', e.target.value)}
                  required
                />
                {validationResults.find(r => r.field === 'vesselTonnage') && (
                  <div className={`mt-2 flex items-center space-x-2 text-sm ${
                    validationResults.find(r => r.field === 'vesselTonnage')?.status === 'warning' 
                      ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {validationResults.find(r => r.field === 'vesselTonnage')?.status === 'warning' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    <span>{validationResults.find(r => r.field === 'vesselTonnage')?.message}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  어업 경력 *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="beginner">초보 (1년 미만)</option>
                  <option value="intermediate">중급 (1-5년)</option>
                  <option value="experienced">숙련 (5-10년)</option>
                  <option value="expert">전문가 (10년 이상)</option>
                </select>
              </div>
            </div>

            {/* AI 어선 분류 결과 */}
            {formData.vesselTonnage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-900">AI 자동 분류</span>
                </div>
                <p className="text-sm text-blue-700">
                  입력하신 어선은 <strong>
                    {parseFloat(formData.vesselTonnage) <= 10 ? "연안어업" : "근해어업"}
                  </strong> 대상 어선으로 분류되었습니다.
                </p>
                <div className="mt-2 flex space-x-2">
                  <Badge variant="info" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    분류 정확도: 96.8%
                  </Badge>
                  {estimatedTime && (
                    <Badge variant="success" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      예상처리: {estimatedTime}시간
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )

      case 3:
        const fisheryTypes = [
          { 
            value: "coastal", 
            label: "연안어업", 
            desc: "연안 20해리 이내 어업", 
            time: "2일",
            requirements: ["어선검사증서", "선박국적증서"] 
          },
          { 
            value: "offshore", 
            label: "근해어업", 
            desc: "근해 200해리 이내 어업", 
            time: "3일",
            requirements: ["어선검사증서", "선박국적증서", "안전검사증서"] 
          },
          { 
            value: "demarcated", 
            label: "구획어업", 
            desc: "지정된 어업구역 내 어업", 
            time: "1일",
            requirements: ["어선검사증서", "구역사용증명서"] 
          }
        ]

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">어업 유형 선택 *</label>
              <div className="grid grid-cols-1 gap-4">
                {fisheryTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 border rounded-lg cursor-pointer transition-all ${
                      formData.fisheryType === type.value 
                        ? "border-ocean-300 bg-ocean-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() => handleInputChange('fisheryType', type.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-lg">{type.label}</h4>
                          {formData.fisheryType === type.value && (
                            <CheckCircle className="h-5 w-5 text-ocean-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                        <div className="mt-3 flex items-center space-x-4">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            예상 {type.time}
                          </Badge>
                          <div className="flex space-x-1">
                            {type.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <Input
                label="조업 예정 구역"
                placeholder="부산 연안, 제주 근해 등"
                value={formData.fishingArea}
                onChange={(e) => handleInputChange('fishingArea', e.target.value)}
                required
              />
            </div>

            {/* 선택된 유형의 상세 정보 */}
            {formData.fisheryType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-900">선택한 어업 유형 안내</span>
                </div>
                <p className="text-sm text-green-700">
                  <strong>{fisheryTypes.find(t => t.value === formData.fisheryType)?.label}</strong>을 선택하셨습니다. 
                  AI 자동 심사로 기존 대비 80% 단축된 시간에 처리됩니다.
                </p>
                {estimatedTime && (
                  <div className="mt-2">
                    <Badge variant="success" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      예상 처리시간: {estimatedTime}시간
                    </Badge>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">필수 서류 업로드</h3>
                <Badge variant="success" className="text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  데모 서류 준비완료
                </Badge>
              </div>
              
              {/* 파일 업로드 영역 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-ocean-400 hover:bg-ocean-50 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">서류를 업로드하세요</p>
                <p className="text-sm text-gray-500 mb-4">
                  PDF, JPG, PNG 파일 지원 (파일당 최대 10MB)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    파일 선택
                  </Button>
                </label>
              </div>

              {/* AI 서류 검증 완료 안내 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-900">AI 서류 검증 시스템</span>
                </div>
                <p className="text-sm text-green-700">
                  필수 서류 3개가 이미 업로드되어 <strong>AI 자동 검증이 완료</strong>되었습니다. 
                  실제 시스템에서는 OCR로 서류 내용을 즉시 분석하여 유효성을 검증합니다.
                </p>
              </motion.div>

              {/* 업로드된 파일 목록 */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">업로드된 파일</h4>
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-green-900">{file.name}</p>
                          <p className="text-sm text-green-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • AI 검증 완료
                          </p>
                        </div>
                      </div>
                      <Badge variant="success" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        검증됨
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 필수 서류 체크리스트 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">필수 서류 체크리스트</h4>
                <div className="space-y-2">
                  {[
                    '어선검사증서',
                    '선박국적증서',
                    '사업자등록증',
                    formData.fisheryType === 'offshore' ? '안전검사증서' : null,
                    formData.fisheryType === 'demarcated' ? '구역사용증명서' : null
                  ].filter(Boolean).map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-700">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900">신청 정보 최종 확인</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>신청인 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">성명:</span>
                    <span className="font-medium">{formData.applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">전화번호:</span>
                    <span className="font-medium">{formData.applicantPhone}</span>
                  </div>
                  {formData.applicantEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">이메일:</span>
                      <span className="font-medium">{formData.applicantEmail}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">사업자구분:</span>
                    <span className="font-medium">
                      {formData.businessType === 'individual' ? '개인사업자' :
                       formData.businessType === 'corporation' ? '법인사업자' : '어업조합'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Ship className="h-5 w-5" />
                    <span>어선 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">어선명:</span>
                    <span className="font-medium">{formData.vesselName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">총톤수:</span>
                    <span className="font-medium">{formData.vesselTonnage}톤</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">어업경력:</span>
                    <span className="font-medium">
                      {formData.experience === 'beginner' ? '초보 (1년 미만)' :
                       formData.experience === 'intermediate' ? '중급 (1-5년)' :
                       formData.experience === 'experienced' ? '숙련 (5-10년)' : '전문가 (10년 이상)'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fish className="h-5 w-5" />
                    <span>어업 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">어업유형:</span>
                    <span className="font-medium">
                      {formData.fisheryType === 'coastal' ? '연안어업' :
                       formData.fisheryType === 'offshore' ? '근해어업' : '구획어업'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">조업구역:</span>
                    <span className="font-medium">{formData.fishingArea}</span>
                  </div>
                  {estimatedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">예상처리시간:</span>
                      <span className="font-medium text-green-600">{estimatedTime}시간</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>업로드 서류</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI 최종 검토 결과 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">AI 최종 검토 완료</h4>
                  <p className="text-sm text-green-700">모든 조건을 충족하여 자동 승인 권장됩니다</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">96.8%</p>
                  <p className="text-xs text-green-700">승인 확률</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{estimatedTime || 48}시간</p>
                  <p className="text-xs text-blue-700">처리 예상시간</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">자동</p>
                  <p className="text-xs text-purple-700">심사 방식</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">A등급</p>
                  <p className="text-xs text-orange-700">신뢰도</p>
                </div>
              </div>
            </motion.div>

            {/* 신청 완료 버튼 */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="xl"
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    신청 처리중...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    신청 완료
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )

      default:
        return null
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
                <h1 className="text-lg font-bold text-gray-900">어업허가 신청</h1>
                <p className="text-xs text-gray-600">AI 기반 지능형 신청 시스템</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="info" className="hidden sm:flex">
                <Zap className="mr-1 h-3 w-3" />
                AI 실시간 검증
              </Badge>
              {estimatedTime && (
                <Badge variant="success" className="hidden sm:flex">
                  <Clock className="mr-1 h-3 w-3" />
                  {estimatedTime}시간 예상
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 데모 모드 안내 배너 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">🎯 데모 체험 모드</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  <strong>심사위원님 환영합니다!</strong> 모든 입력 필드가 <strong>가상 데이터로 미리 설정</strong>되어 있습니다.<br />
                  각 단계에서 <span className="bg-white/20 px-2 py-1 rounded font-semibold">"다음" 버튼</span>만 클릭하시면 
                  <strong> AI 어업허가 자동심사 시스템</strong>의 전체 프로세스를 빠르게 체험하실 수 있습니다.
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-3xl font-bold">3분</div>
                <div className="text-blue-200 text-sm">체험 소요시간</div>
              </div>
            </div>
          </div>
          
          {/* 핵심 기능 미리보기 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Bot className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-medium">AI 실시간 검증</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-medium">처리시간 80% 단축</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-medium">서류 자동검증</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-medium">96.8% 승인 예측</div>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">단계 {currentStep} / {steps.length}</h2>
            <div className="text-sm text-gray-600">
              진행률: {Math.round(getStepProgress())}%
            </div>
          </div>
          
          <Progress value={getStepProgress()} className="h-2 mb-6" />
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center space-y-2 ${
                  step.id <= currentStep ? 'text-ocean-600' : 'text-gray-400'
                }`}
              >
                <div className={`p-3 rounded-full border-2 ${
                  step.id < currentStep 
                    ? 'bg-ocean-600 border-ocean-600 text-white' 
                    : step.id === currentStep
                    ? 'border-ocean-600 bg-white text-ocean-600'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {(() => {
                    const IconComponent = steps[currentStep - 1].icon
                    return <IconComponent className="h-5 w-5" />
                  })()}
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    이전
                  </Button>

                  <div className="flex items-center space-x-2">
                    {isValidating && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>AI 검증 중...</span>
                      </div>
                    )}
                  </div>

                  {currentStep < steps.length ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedToNext()}
                    >
                      다음
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations Sidebar */}
          <div className="space-y-6">
            {/* Real-time validation status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Bot className="h-4 w-4" />
                  <span>AI 실시간 도움</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isValidating ? (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>정보를 검증하고 있습니다...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>입력 정보가 유효합니다</span>
                  </div>
                )}

                {validationResults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">검증 결과</h4>
                    {validationResults.slice(-3).map((result, index) => (
                      <div key={index} className={`p-2 rounded text-xs ${
                        result.status === 'valid' ? 'bg-green-50 text-green-700' :
                        result.status === 'warning' ? 'bg-orange-50 text-orange-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {result.message}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Lightbulb className="h-4 w-4" />
                    <span>AI 권장사항</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiRecommendations.slice(-3).map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg text-xs ${
                        rec.type === 'success' ? 'bg-green-50 border border-green-200' :
                        rec.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <h5 className="font-medium mb-1">{rec.title}</h5>
                      <p className="text-gray-600">{rec.message}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Processing Time Estimate */}
            {estimatedTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>처리 시간 예측</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-ocean-600">{estimatedTime}시간</p>
                    <p className="text-sm text-gray-600 mt-1">예상 처리 시간</p>
                    <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                      기존 방식 대비 80% 단축
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}