// 앱 전역 설정
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || '어업허가 AI 자동심사 시스템',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  description: '해양수산부 규제혁신과제 - AI 기술을 활용한 어업허가 처리 자동화 시스템',
  author: {
    name: '박용환',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'sanoramyun8@gmail.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '010-7939-3123',
    organization: '크리에이티브 넥서스'
  },
  urls: {
    production: 'https://fishery-ai-system.vercel.app',
    development: 'http://localhost:3000',
    api: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.fishery-ai.example.com'
  }
}

// 기능 플래그
export const FEATURES = {
  aiDemo: process.env.NEXT_PUBLIC_ENABLE_AI_DEMO === 'true',
  adminDashboard: process.env.NEXT_PUBLIC_ENABLE_ADMIN_DASHBOARD === 'true',
  insights: process.env.NEXT_PUBLIC_ENABLE_INSIGHTS === 'true',
  mockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true',
  animations: process.env.NEXT_PUBLIC_ANIMATION_ENABLED === 'true',
  realTimeUpdates: process.env.NEXT_PUBLIC_REAL_TIME_UPDATES === 'true'
}

// 업무 관련 상수
export const BUSINESS_CONSTANTS = {
  // 어업 유형
  fisheryTypes: {
    coastal: { label: '연안어업', desc: '연안 20해리 이내', processingDays: 2 },
    offshore: { label: '근해어업', desc: '근해 200해리 이내', processingDays: 3 },
    demarcated: { label: '구획어업', desc: '지정된 어업구역', processingDays: 1 },
    distant_water: { label: '원양어업', desc: '원양 지역', processingDays: 5 }
  },
  
  // 처리 시간 (시간 단위)
  processingTime: {
    traditional: 360, // 15일 * 24시간
    aiReduction: 0.8, // 80% 단축
    minimum: 24, // 최소 1일
    maximum: 168 // 최대 7일
  },
  
  // AI 성능 지표
  aiMetrics: {
    accuracy: 94.7, // 정확도 %
    processingSpeedMinutes: 0.3, // 처리속도 분
    automationRate: 78.5, // 자동화율 %
    satisfactionRate: 92.1 // 만족도 %
  },
  
  // 파일 업로드 제한
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
    allowedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
    timeoutMinutes: 30
  },
  
  // 비용 절감 효과
  costSavings: {
    annualSavings: 1850000000, // 18.5억원
    efficiencyGain: 3, // 3배 향상
    timeReduction: 78.7, // 78.7% 단축
    errorReduction: 70 // 70% 오류 감소
  }
}

// UI 관련 상수
export const UI_CONSTANTS = {
  // 애니메이션 지속시간
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
    pageTransition: 600
  },
  
  // 색상 팔레트
  colors: {
    ocean: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1'
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  
  // 반응형 브레이크포인트
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-인덱스
  zIndex: {
    modal: 50,
    dropdown: 40,
    header: 30,
    overlay: 20,
    content: 10
  }
}

// 메시지 상수
export const MESSAGES = {
  success: {
    applicationSubmitted: '어업허가 신청이 성공적으로 완료되었습니다!',
    fileUploaded: '파일이 성공적으로 업로드되었습니다.',
    aiVerified: 'AI 검증이 완료되었습니다.',
    dataUpdated: '데이터가 업데이트되었습니다.'
  },
  
  error: {
    networkError: '네트워크 연결을 확인해주세요.',
    fileTooBig: '파일 크기가 10MB를 초과합니다.',
    invalidFileType: '지원하지 않는 파일 형식입니다.',
    requiredField: '필수 항목을 입력해주세요.',
    aiProcessingFailed: 'AI 처리 중 오류가 발생했습니다.'
  },
  
  warning: {
    unsavedChanges: '저장하지 않은 변경사항이 있습니다.',
    sessionExpiring: '세션이 곧 만료됩니다.',
    largeTonnage: '10톤 초과 어선은 추가 서류가 필요합니다.'
  },
  
  info: {
    processing: 'AI가 정보를 처리하고 있습니다...',
    aiAnalyzing: '문서를 분석하고 있습니다...',
    estimatedTime: '예상 처리시간: {time}시간',
    nextStep: '다음 단계로 진행해주세요.'
  }
}

// API 엔드포인트
export const API_ENDPOINTS = {
  applications: '/api/applications',
  upload: '/api/upload',
  verify: '/api/verify',
  dashboard: '/api/dashboard',
  insights: '/api/insights',
  users: '/api/users'
}

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  formData: 'fishery_application_form',
  userPreferences: 'user_preferences',
  recentSearches: 'recent_searches',
  draftApplication: 'draft_application'
}

// 날짜 포맷
export const DATE_FORMATS = {
  display: 'YYYY년 MM월 DD일',
  api: 'YYYY-MM-DD',
  timestamp: 'YYYY-MM-DD HH:mm:ss',
  korean: 'YYYY년 MM월 DD일 HH시 mm분'
}