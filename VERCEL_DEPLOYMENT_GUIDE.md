# Vercel 배포 문제 해결 가이드

## 🚨 현재 문제
- URL: https://fishery-permit-ai-system-9qku.vercel.app/supabase-test
- 에러: 404 NOT_FOUND (DEPLOYMENT_NOT_FOUND)

## 🔧 해결 단계

### 1. Vercel Dashboard 환경변수 설정

1. [Vercel Dashboard](https://vercel.com/dashboard) → 프로젝트 선택
2. **Settings** → **Environment Variables** 클릭
3. 다음 환경변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://soiblqqvtdeqognuruct.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaWJscXF2dGRlcW9nbnVydWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTIyNDIsImV4cCI6MjA2NTYyODI0Mn0.ntc0Kptn7JjIdgwsXmc8qCC1ZudoxyTBlFBNjsNEOts
```

### 2. 프로젝트 재배포

#### 방법 1: Git Push로 자동 배포
```bash
cd C:\MYCLAUDE_PROJECT\fishery_permit_ai_system\02_nextjs_prototype
git add .
git commit -m "Fix: Supabase integration and environment variables"
git push origin main
```

#### 방법 2: Vercel CLI 사용
```bash
npm i -g vercel
vercel --prod
```

#### 방법 3: Vercel Dashboard에서 수동 재배포
1. Vercel Dashboard → **Deployments** 탭
2. 최신 배포 옆 **...** 버튼 클릭
3. **Redeploy** 선택

### 3. 빌드 로그 확인

Vercel Dashboard → **Functions** → **Build Logs**에서 에러 확인

### 4. 도메인 재설정 (필요시)

새로운 Vercel 프로젝트 생성:
1. Vercel → **New Project**
2. GitHub 저장소 다시 연결
3. 환경변수 재설정
4. 배포

## 🎯 빠른 해결책

### Option A: 새 프로젝트로 재배포
```bash
cd C:\MYCLAUDE_PROJECT\fishery_permit_ai_system\02_nextjs_prototype
vercel --prod --force
```

### Option B: GitHub Actions 자동 배포 설정

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## 🔍 문제 예방책

### 1. .env.example 파일 업데이트
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. next.config.js 환경변수 명시
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig
```

### 3. 환경변수 체크 컴포넌트 추가

`src/components/EnvironmentCheck.tsx`:
```tsx
'use client'

export default function EnvironmentCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>환경변수 오류:</strong> Supabase 설정이 누락되었습니다.
      </div>
    )
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      ✅ Supabase 연결 준비 완료
    </div>
  )
}
```

## 📞 추가 지원

문제가 계속되면:
1. Vercel Support 문의
2. GitHub 저장소 설정 재확인  
3. 새로운 Vercel 프로젝트 생성 고려

---

## 🎯 즉시 실행할 명령어

```bash
# 1. 환경변수 확인
echo $NEXT_PUBLIC_SUPABASE_URL

# 2. 빌드 테스트
npm run build

# 3. 재배포
git add .
git commit -m "Fix: Deployment and environment variables"
git push origin main
```
