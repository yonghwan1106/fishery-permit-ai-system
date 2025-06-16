// 어업 관련 기본 타입들
export interface FisheryApplication {
  id: string
  applicationNumber: string
  applicantName: string
  applicantPhone: string
  applicantEmail?: string
  fisheryType: FisheryType
  vesselName: string
  vesselTonnage: number
  fishingArea: string
  status: ApplicationStatus
  submittedAt: Date
  expectedCompletionDate?: Date
  completedAt?: Date
  documents: Document[]
  aiAnalysis?: AIAnalysis
  reviewHistory: ReviewHistory[]
  notes?: string
}

export type FisheryType = 'coastal' | 'offshore' | 'demarcated' | 'distant_water'

export type ApplicationStatus = 
  | 'pending'           // 대기중
  | 'document_review'   // 서류 검토
  | 'ai_processing'     // AI 처리중
  | 'manual_review'     // 수동 검토
  | 'approved'          // 승인
  | 'rejected'          // 반려
  | 'completed'         // 완료

export interface Document {
  id: string
  name: string
  type: DocumentType
  file?: File
  url?: string
  size: number
  uploadedAt: Date
  status: DocumentStatus
  aiVerification?: DocumentVerification
}

export type DocumentType = 
  | 'vessel_inspection'     // 어선검사증서
  | 'vessel_registration'   // 선박국적증서
  | 'business_license'      // 사업자등록증
  | 'lease_agreement'       // 임차권증명서
  | 'corporate_registration' // 법인등기사항증명서
  | 'other'                 // 기타

export type DocumentStatus = 'pending' | 'verified' | 'rejected' | 'processing'

export interface DocumentVerification {
  isValid: boolean
  confidence: number
  extractedData: Record<string, any>
  issues: string[]
  verifiedAt: Date
}

// AI 분석 결과
export interface AIAnalysis {
  id: string
  applicationId: string
  riskLevel: RiskLevel
  confidence: number
  processingTime: number // 예상 처리시간 (시간)
  recommendations: string[]
  flags: string[]
  analysisDetails: AnalysisDetails
  createdAt: Date
}

export type RiskLevel = 'low' | 'medium' | 'high'

export interface AnalysisDetails {
  documentQuality: number
  complianceScore: number
  historicalData?: any
  similarCases?: any[]
}

// 검토 이력
export interface ReviewHistory {
  id: string
  reviewerId: string
  reviewerName: string
  action: ReviewAction
  comment?: string
  timestamp: Date
}

export type ReviewAction = 
  | 'submitted'
  | 'ai_reviewed'
  | 'approved'
  | 'rejected'
  | 'requested_documents'
  | 'completed'

// 통계 및 대시보드 타입
export interface DashboardStats {
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  rejectedApplications: number
  averageProcessingTime: number
  aiAccuracy: number
  costSavings: number
  processingTimeReduction: number
}

export interface ProcessingStats {
  period: string
  applications: number
  averageTime: number
  aiProcessed: number
  manualProcessed: number
}

export interface RegionalStats {
  region: string
  applications: number
  approvalRate: number
  averageProcessingTime: number
  coordinates: [number, number]
}

// 사용자 타입
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  permissions: Permission[]
}

export type UserRole = 'applicant' | 'reviewer' | 'admin' | 'super_admin'

export type Permission = 
  | 'view_applications'
  | 'review_applications'
  | 'approve_applications'
  | 'view_statistics'
  | 'manage_users'
  | 'system_admin'

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 폼 데이터 타입
export interface ApplicationFormData {
  applicantName: string
  applicantPhone: string
  applicantEmail?: string
  fisheryType: FisheryType
  vesselName: string
  vesselTonnage: number
  fishingArea: string
  documents: File[]
}

export interface FilterOptions {
  status?: ApplicationStatus[]
  fisheryType?: FisheryType[]
  dateRange?: {
    from: Date
    to: Date
  }
  region?: string[]
  riskLevel?: RiskLevel[]
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

export interface TimeSeriesData {
  date: string
  value: number
  category?: string
}

// 알림 타입
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

// 시스템 설정 타입
export interface SystemConfig {
  aiThresholds: {
    lowRisk: number
    mediumRisk: number
    highRisk: number
  }
  processingLimits: {
    maxDocumentSize: number
    maxDocumentsPerApplication: number
    aiTimeoutMinutes: number
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    reminderDays: number
  }
}

// 검색 및 필터 타입
export interface SearchQuery {
  q?: string
  filters?: FilterOptions
  sort?: {
    field: string
    direction: 'asc' | 'desc'
  }
  page?: number
  limit?: number
}

// 업로드 진행상황 타입
export interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  error?: string
}