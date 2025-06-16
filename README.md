# 🐟 어업허가 AI 자동심사 시스템

> 해양수산부 규제혁신과제 대국민 공모전 출품작

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-ff69b4)](https://www.framer.com/motion/)

## 📋 프로젝트 개요

AI 기술을 활용하여 기존 15일이 걸리던 어업허가 처리시간을 3일로 80% 단축하는 혁신적인 자동심사 시스템입니다.

### 🎯 핵심 가치 제안
- **시각적 임팩트**: 3장 제안서로 표현할 수 없는 기술의 실제 작동 방식을 실시간 데모로 증명
- **실현 가능성 증명**: 실제 운영 가능한 수준의 UI/UX와 기능으로 구현 역량 입증
- **혁신성 강조**: AI, 실시간 처리, 데이터 시각화 등 최신 기술 적용 사례 제시

## ⭐ 주요 기능

### 🏠 **랜딩 페이지**
- Hero 섹션과 실시간 통계 대시보드
- Before/After 비교 및 성공 지표 시각화
- 애니메이션과 인터랙티브 요소

### 🤖 **AI 데모 시연**
- 실제 서류 업로드 → AI 분석 → 결과 도출 전 과정
- 단계별 소요시간과 정확도 실시간 표시
- OCR 문서 인식 및 유효성 검증 시뮬레이션

### 📝 **지능형 신청 시스템**
- 5단계 다단계 폼과 실시간 진행률 표시
- AI 기반 실시간 유효성 검증 및 피드백
- 개인화된 처리시간 예측 및 맞춤 가이드라인

### 📊 **관리자 대시보드**
- 실시간 워크플로우 및 전국 현황 지도
- AI 성능 모니터링 및 KPI 추적
- 업무량 분석 및 예측 분석

### 🧠 **데이터 인사이트 센터**
- 3D 지역별 현황 지도 및 예측 모델링
- 규제 영향 시뮬레이션 및 비용 효과 계산기
- AI 정책 추천 시스템

## 🛠 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (타입 안전성)
- **Tailwind CSS** (빠른 스타일링)
- **Framer Motion** (고급 애니메이션)

### UI/UX 라이브러리
- **Shadcn/ui** (모던 컴포넌트)
- **Lucide React** (아이콘)
- **Recharts** (데이터 시각화)
- **Canvas Confetti** (성공 애니메이션)

### 데이터 및 상태관리
- **Zustand** (상태관리)
- **Mock API** (프로토타입용 데이터)
- **TypeScript Types** (타입 정의)

## 🚀 시작하기

### 설치 및 실행

\`\`\`bash
# 저장소 클론
git clone [repository-url]
cd fishery_permit_ai_system/02_nextjs_prototype

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
\`\`\`

### 빌드 및 배포

\`\`\`bash
# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm run start

# Vercel 배포 (선택사항)
vercel --prod
\`\`\`

## 📁 프로젝트 구조

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── apply/             # 신청 시스템
│   ├── demo/              # AI 데모
│   ├── admin/             # 관리자 대시보드
│   ├── insights/          # 인사이트 센터
│   └── globals.css        # 글로벌 스타일
├── components/
│   └── ui/                # 재사용 가능한 UI 컴포넌트
├── data/
│   └── mockData.ts        # 목업 데이터
├── lib/
│   └── utils.ts           # 유틸리티 함수
├── types/
│   └── index.ts           # TypeScript 타입 정의
└── hooks/                 # 커스텀 훅
\`\`\`

## 📊 성능 지표

### 번들 크기 (Gzipped)
- **홈페이지**: 4.07 kB
- **AI 데모**: 8.45 kB  
- **신청 시스템**: 15.1 kB
- **관리자 대시보드**: 5.53 kB
- **인사이트 센터**: 18.8 kB

### Core Web Vitals
- **FCP**: < 1.5초
- **LCP**: < 2.5초
- **CLS**: < 0.1

## 🎨 디자인 시스템

### 색상 팔레트
- **Ocean**: #0ea5e9 ~ #0c4a6e (메인 브랜드)
- **Marine**: #f8fafc ~ #0f172a (보조 색상)
- **Success**: #22c55e
- **Warning**: #f59e0b
- **Error**: #ef4444

### 타이포그래피
- **Font Family**: Malgun Gothic, Apple SD Gothic Neo
- **크기**: 12px ~ 48px (Tailwind 스케일)

## 🔧 주요 컴포넌트

### UI 컴포넌트
- `Button` - 다양한 variant와 size 지원
- `Card` - 정보 표시용 카드 컴포넌트  
- `Badge` - 상태 표시용 배지
- `Input` - 폼 입력 필드
- `Progress` - 진행률 표시 바
- `Loading` - 로딩 상태 표시

### 특수 기능
- 실시간 데이터 업데이트 시뮬레이션
- AI 검증 결과 애니메이션
- 지도 기반 지역별 현황 표시
- 차트 및 그래프 시각화

## 📈 데모 시나리오

### 3분 핵심 데모
1. **00:00-00:30**: 홈페이지 → 핵심 가치 제안 및 통계
2. **00:30-01:30**: AI 데모 → 실제 서류 업로드 및 실시간 분석
3. **01:30-02:30**: 관리자 대시보드 → 업무 효율성 혁신
4. **02:30-03:00**: 인사이트 센터 → 정책 지원 기능

### 5분 상세 데모
- 위 3분 + 신청자 관점 사용자 여정
- 예외상황 처리 과정
- 기존 시스템과의 비교 시연

## 👨‍💻 개발자 정보

**박용환**
- 📧 이메일: sanoramyun8@gmail.com  
- 📞 연락처: 010-7939-3123
- 🏢 소속: 크리에이티브 넥서스

## 📄 라이선스

이 프로젝트는 해양수산부 규제혁신과제 대국민 공모전 출품작입니다.

## 🙏 감사의 말

해양수산부 규제혁신과제 대국민 공모전을 통해 이 혁신적인 아이디어를 제안할 기회를 주신 해양수산부에 감사드립니다.

---

💡 **더 나은 대한민국 어업을 위한 AI 혁신** 💡