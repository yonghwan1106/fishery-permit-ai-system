import { 
  FisheryApplication, 
  DashboardStats, 
  ProcessingStats, 
  RegionalStats,
  Notification,
  SystemConfig
} from '@/types'

// 대시보드 통계 데이터
export const mockDashboardStats: DashboardStats = {
  totalApplications: 2847,
  pendingApplications: 156,
  approvedApplications: 2543,
  rejectedApplications: 148,
  averageProcessingTime: 3.2, // 일
  aiAccuracy: 94.7,
  costSavings: 1850000000, // 18.5억원
  processingTimeReduction: 78.7 // 78.7% 단축
}

// 월별 처리 통계
export const mockProcessingStats: ProcessingStats[] = [
  { period: '2025-01', applications: 245, averageTime: 3.1, aiProcessed: 172, manualProcessed: 73 },
  { period: '2025-02', applications: 198, averageTime: 3.3, aiProcessed: 139, manualProcessed: 59 },
  { period: '2025-03', applications: 267, averageTime: 2.9, aiProcessed: 189, manualProcessed: 78 },
  { period: '2025-04', applications: 289, averageTime: 3.0, aiProcessed: 205, manualProcessed: 84 },
  { period: '2025-05', applications: 312, averageTime: 3.2, aiProcessed: 221, manualProcessed: 91 },
  { period: '2025-06', applications: 156, averageTime: 3.1, aiProcessed: 110, manualProcessed: 46 },
]

// 지역별 통계
export const mockRegionalStats: RegionalStats[] = [
  { region: '부산', applications: 456, approvalRate: 89.2, averageProcessingTime: 2.8, coordinates: [129.0756, 35.1796] },
  { region: '인천', applications: 398, approvalRate: 91.5, averageProcessingTime: 3.1, coordinates: [126.7052, 37.4563] },
  { region: '울산', applications: 267, approvalRate: 87.6, averageProcessingTime: 3.0, coordinates: [129.3114, 35.5384] },
  { region: '목포', applications: 234, approvalRate: 88.9, averageProcessingTime: 3.2, coordinates: [126.3922, 34.8118] },
  { region: '포항', applications: 189, approvalRate: 90.1, averageProcessingTime: 2.9, coordinates: [129.3435, 36.0190] },
  { region: '여수', applications: 167, approvalRate: 86.8, averageProcessingTime: 3.4, coordinates: [127.6622, 34.7604] },
  { region: '통영', applications: 145, approvalRate: 89.7, averageProcessingTime: 3.0, coordinates: [128.4236, 34.8546] },
  { region: '제주', applications: 123, approvalRate: 92.3, averageProcessingTime: 2.7, coordinates: [126.5312, 33.4996] },
]

// 샘플 어업허가 신청 데이터
export const mockApplications: FisheryApplication[] = [
  {
    id: 'app_001',
    applicationNumber: 'F2025060001',
    applicantName: '김어부',
    applicantPhone: '010-1234-5678',
    applicantEmail: 'kim.fisher@email.com',
    fisheryType: 'coastal',
    vesselName: '바다의꿈호',
    vesselTonnage: 5.5,
    fishingArea: '부산 연안',
    status: 'ai_processing',
    submittedAt: new Date('2025-06-01T09:30:00'),
    expectedCompletionDate: new Date('2025-06-03T17:00:00'),
    documents: [
      {
        id: 'doc_001',
        name: '어선검사증서.pdf',
        type: 'vessel_inspection',
        size: 2048576,
        uploadedAt: new Date('2025-06-01T09:30:00'),
        status: 'verified',
        aiVerification: {
          isValid: true,
          confidence: 0.96,
          extractedData: { vesselName: '바다의꿈호', tonnage: 5.5 },
          issues: [],
          verifiedAt: new Date('2025-06-01T09:32:00')
        }
      },
      {
        id: 'doc_002',
        name: '선박국적증서.pdf',
        type: 'vessel_registration',
        size: 1856432,
        uploadedAt: new Date('2025-06-01T09:31:00'),
        status: 'verified',
        aiVerification: {
          isValid: true,
          confidence: 0.94,
          extractedData: { vesselName: '바다의꿈호', owner: '김어부' },
          issues: [],
          verifiedAt: new Date('2025-06-01T09:33:00')
        }
      }
    ],
    aiAnalysis: {
      id: 'ai_001',
      applicationId: 'app_001',
      riskLevel: 'low',
      confidence: 0.95,
      processingTime: 18,
      recommendations: ['자동 승인 권장', '모든 서류 유효성 확인됨'],
      flags: [],
      analysisDetails: {
        documentQuality: 96,
        complianceScore: 94
      },
      createdAt: new Date('2025-06-01T09:35:00')
    },
    reviewHistory: [
      {
        id: 'rev_001',
        reviewerId: 'ai_system',
        reviewerName: 'AI 시스템',
        action: 'ai_reviewed',
        comment: 'AI 1차 심사 완료 - 자동 승인 권장',
        timestamp: new Date('2025-06-01T09:35:00')
      }
    ]
  },
  {
    id: 'app_002',
    applicationNumber: 'F2025060002',
    applicantName: '이선장',
    applicantPhone: '010-9876-5432',
    fisheryType: 'offshore',
    vesselName: '태평양호',
    vesselTonnage: 25.8,
    fishingArea: '제주 근해',
    status: 'manual_review',
    submittedAt: new Date('2025-05-28T14:20:00'),
    expectedCompletionDate: new Date('2025-06-02T17:00:00'),
    documents: [
      {
        id: 'doc_003',
        name: '어선검사증서_태평양호.pdf',
        type: 'vessel_inspection',
        size: 3145728,
        uploadedAt: new Date('2025-05-28T14:20:00'),
        status: 'verified'
      },
      {
        id: 'doc_004',
        name: '선박국적증서_태평양호.pdf',
        type: 'vessel_registration',
        size: 2097152,
        uploadedAt: new Date('2025-05-28T14:22:00'),
        status: 'processing'
      }
    ],
    aiAnalysis: {
      id: 'ai_002',
      applicationId: 'app_002',
      riskLevel: 'medium',
      confidence: 0.78,
      processingTime: 72,
      recommendations: ['수동 검토 필요', '어선 톤수 재확인 권장'],
      flags: ['톤수 불일치 가능성'],
      analysisDetails: {
        documentQuality: 82,
        complianceScore: 76
      },
      createdAt: new Date('2025-05-28T14:30:00')
    },
    reviewHistory: [
      {
        id: 'rev_002',
        reviewerId: 'ai_system',
        reviewerName: 'AI 시스템',
        action: 'ai_reviewed',
        comment: 'AI 분석 완료 - 수동 검토 필요',
        timestamp: new Date('2025-05-28T14:30:00')
      }
    ]
  },
  {
    id: 'app_003',
    applicationNumber: 'F2025060003',
    applicantName: '박사장',
    applicantPhone: '010-5555-7777',
    fisheryType: 'demarcated',
    vesselName: '금강호',
    vesselTonnage: 12.3,
    fishingArea: '서해 구획어업',
    status: 'approved',
    submittedAt: new Date('2025-05-25T11:15:00'),
    expectedCompletionDate: new Date('2025-05-28T17:00:00'),
    completedAt: new Date('2025-05-27T16:30:00'),
    documents: [
      {
        id: 'doc_005',
        name: '어선검사증서.pdf',
        type: 'vessel_inspection',
        size: 1966080,
        uploadedAt: new Date('2025-05-25T11:15:00'),
        status: 'verified'
      }
    ],
    aiAnalysis: {
      id: 'ai_003',
      applicationId: 'app_003',
      riskLevel: 'low',
      confidence: 0.92,
      processingTime: 24,
      recommendations: ['자동 승인 가능'],
      flags: [],
      analysisDetails: {
        documentQuality: 91,
        complianceScore: 89
      },
      createdAt: new Date('2025-05-25T11:30:00')
    },
    reviewHistory: [
      {
        id: 'rev_003',
        reviewerId: 'ai_system',
        reviewerName: 'AI 시스템',
        action: 'ai_reviewed',
        timestamp: new Date('2025-05-25T11:30:00')
      },
      {
        id: 'rev_004',
        reviewerId: 'admin_001',
        reviewerName: '김담당',
        action: 'approved',
        comment: '모든 조건 충족, 승인 처리',
        timestamp: new Date('2025-05-27T16:30:00')
      }
    ]
  }
]

// 실시간 알림 데이터
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'success',
    title: '신규 신청 자동 승인',
    message: 'F2025060015 - 연안어업 신청이 AI 시스템에 의해 자동 승인되었습니다.',
    read: false,
    createdAt: new Date(Date.now() - 300000), // 5분 전
    actionUrl: '/admin/applications/F2025060015'
  },
  {
    id: 'notif_002',
    type: 'warning',
    title: '수동 검토 필요',
    message: 'F2025060014 - 근해어업 신청에서 서류 불일치가 발견되어 수동 검토가 필요합니다.',
    read: false,
    createdAt: new Date(Date.now() - 900000), // 15분 전
    actionUrl: '/admin/applications/F2025060014'
  },
  {
    id: 'notif_003',
    type: 'info',
    title: 'AI 성능 보고서',
    message: '일일 AI 정확도: 94.7% (목표치 90% 달성)',
    read: true,
    createdAt: new Date(Date.now() - 3600000), // 1시간 전
  }
]

// 시스템 설정
export const mockSystemConfig: SystemConfig = {
  aiThresholds: {
    lowRisk: 85,
    mediumRisk: 70,
    highRisk: 50
  },
  processingLimits: {
    maxDocumentSize: 10485760, // 10MB
    maxDocumentsPerApplication: 10,
    aiTimeoutMinutes: 30
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: true,
    reminderDays: 3
  }
}

// 차트용 시계열 데이터
export const mockTimeSeriesData = {
  dailyApplications: [
    { date: '2025-06-01', value: 12 },
    { date: '2025-06-02', value: 8 },
    { date: '2025-06-03', value: 15 },
    { date: '2025-06-04', value: 9 },
    { date: '2025-06-05', value: 11 },
    { date: '2025-06-06', value: 13 },
    { date: '2025-06-07', value: 10 },
  ],
  processingTimes: [
    { date: '2025-01', traditional: 15, ai: 3.2 },
    { date: '2025-02', traditional: 15, ai: 3.1 },
    { date: '2025-03', traditional: 15, ai: 2.9 },
    { date: '2025-04', traditional: 15, ai: 3.0 },
    { date: '2025-05', traditional: 15, ai: 3.2 },
    { date: '2025-06', traditional: 15, ai: 3.1 },
  ]
}

// AI 처리 성능 데이터
export const mockAIPerformance = {
  accuracy: 94.7,
  processingSpeed: 0.3, // 분
  costReduction: 78.5,
  satisfactionRate: 92.1
}

// 실시간 대기열 데이터
export const mockProcessingQueue = [
  { id: 'F2025060020', applicant: '최어부', type: 'coastal', priority: 'high', estimatedTime: 15 },
  { id: 'F2025060021', applicant: '정선장', type: 'offshore', priority: 'medium', estimatedTime: 45 },
  { id: 'F2025060022', applicant: '한사장', type: 'demarcated', priority: 'low', estimatedTime: 120 },
]

// 지역별 어업 현황 (지도용)
export const mockFishingAreaData = [
  { name: '부산연안', coordinates: [129.0756, 35.1796], vessels: 234, permits: 456 },
  { name: '인천연안', coordinates: [126.7052, 37.4563], vessels: 189, permits: 398 },
  { name: '제주근해', coordinates: [126.5312, 33.4996], vessels: 87, permits: 123 },
  { name: '동해근해', coordinates: [129.3435, 36.0190], vessels: 156, permits: 267 },
  { name: '서해구획', coordinates: [126.3922, 34.8118], vessels: 98, permits: 189 },
]