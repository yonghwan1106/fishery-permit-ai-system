import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 포맷팅
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 숫자 포맷팅
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR')
}

export function formatCurrency(amount: number): string {
  return `${formatNumber(amount)}원`
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

// 처리시간 계산
export function calculateProcessingTime(type: 'traditional' | 'ai'): number {
  if (type === 'traditional') {
    return 15 // 15일
  }
  // AI 처리 시간 (랜덤하게 1-5일)
  return Math.floor(Math.random() * 5) + 1
}

// 파일 크기 포맷팅
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 진행률 계산
export function calculateProgress(current: number, total: number): number {
  return Math.min(Math.round((current / total) * 100), 100)
}

// 대기시간 포맷팅
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}초`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}분`
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return `${hours}시간`
  } else {
    const days = Math.floor(seconds / 86400)
    return `${days}일`
  }
}

// 신청번호 생성
export function generateApplicationNumber(): string {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  return `F${year}${month}${random}`
}

// 상태에 따른 배지 색상
export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'processing':
    case 'in_review':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
    case 'failed':
      return 'bg-red-100 text-red-800'
    case 'pending':
    case 'waiting':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

// 상태 한국어 변환
export function getStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return '대기중'
    case 'processing':
      return '심사중'
    case 'in_review':
      return '검토중'
    case 'completed':
      return '완료'
    case 'approved':
      return '승인'
    case 'rejected':
      return '반려'
    case 'failed':
      return '실패'
    default:
      return status
  }
}

// 어업 종류 한국어 변환
export function getFisheryTypeText(type: string): string {
  switch (type) {
    case 'coastal':
      return '연안어업'
    case 'offshore':
      return '근해어업'
    case 'demarcated':
      return '구획어업'
    case 'distant_water':
      return '원양어업'
    default:
      return type
  }
}

// AI 정확도 계산 (시뮬레이션)
export function calculateAIAccuracy(): number {
  // 92-98% 사이의 랜덤한 정확도
  return Math.random() * 6 + 92
}

// 처리 시간 예측 (AI 기반)
export function predictProcessingTime(complexity: 'low' | 'medium' | 'high'): number {
  switch (complexity) {
    case 'low':
      return Math.random() * 24 + 1 // 1-24시간
    case 'medium':
      return Math.random() * 48 + 24 // 1-3일
    case 'high':
      return Math.random() * 120 + 72 // 3-8일
    default:
      return 24
  }
}

// 디바운스 함수
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 지연 함수 (애니메이션용)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 랜덤 ID 생성
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// 배열 셔플
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 성공 확률 계산 (문서 품질 기반)
export function calculateSuccessProbability(documentQuality: number): number {
  // 문서 품질 점수 (0-100)를 기반으로 성공 확률 계산
  if (documentQuality >= 90) return 95 + Math.random() * 5
  if (documentQuality >= 80) return 85 + Math.random() * 10
  if (documentQuality >= 70) return 70 + Math.random() * 15
  if (documentQuality >= 60) return 50 + Math.random() * 20
  return 30 + Math.random() * 30
}

// 비용 절감 계산
export function calculateCostSavings(applicationsPerYear: number): {
  traditionalCost: number
  aiCost: number
  savings: number
  savingsPercentage: number
} {
  const costPerApplication = 50000 // 건당 5만원
  const aiEfficiency = 0.7 // 70% 효율성 증대
  
  const traditionalCost = applicationsPerYear * costPerApplication
  const aiCost = traditionalCost * (1 - aiEfficiency)
  const savings = traditionalCost - aiCost
  const savingsPercentage = (savings / traditionalCost) * 100
  
  return {
    traditionalCost,
    aiCost,
    savings,
    savingsPercentage
  }
}