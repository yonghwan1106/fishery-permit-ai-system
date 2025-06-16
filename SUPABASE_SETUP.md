# Supabase 연동 가이드

## 🚀 빠른 시작

### 1. Supabase 프로젝트 설정

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: fishery-permit-ai-system
   - **Database Password**: 22qjsrlf67!
   - **Region**: Northeast Asia (Seoul) 권장

### 2. 데이터베이스 테이블 생성

Supabase SQL Editor에서 다음 쿼리 실행:

```sql
-- applications 테이블 생성
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_number VARCHAR(20) UNIQUE NOT NULL,
  applicant_name VARCHAR(100) NOT NULL,
  applicant_phone VARCHAR(20),
  fishery_type VARCHAR(20) NOT NULL,
  vessel_name VARCHAR(100) NOT NULL,
  vessel_tonnage DECIMAL(10,2),
  fishing_area TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 정책 생성
CREATE POLICY "Anyone can view applications" ON applications
FOR SELECT USING (true);

CREATE POLICY "Anyone can insert applications" ON applications
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update applications" ON applications
FOR UPDATE USING (true);
```

### 3. 환경변수 설정

`.env.local` 파일에 Supabase 프로젝트 정보 추가:

```env
# Supabase 설정 (Settings > API에서 확인)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 패키지 설치

```bash
npm install @supabase/supabase-js
```

### 5. 코드 적용

다음 파일들을 확인하고 적용:

- `src/lib/supabase.ts` - Supabase 클라이언트 설정
- `src/lib/applicationService.ts` - 데이터베이스 서비스 함수들
- `src/examples/supabase-integration-example.tsx` - 신청 페이지 연동 예시
- `src/examples/admin-supabase-integration.tsx` - 관리자 페이지 연동 예시

## 🎯 주요 기능

### ✅ 구현된 기능

- [x] 어업허가 신청 데이터 저장
- [x] 실시간 신청 목록 조회
- [x] 신청 상태 업데이트
- [x] 관리자 대시보드 실시간 연동

### 🚧 확장 가능한 기능

- [ ] 파일 업로드 (Supabase Storage)
- [ ] 실시간 알림 (Supabase Realtime)
- [ ] 사용자 인증 (Supabase Auth)
- [ ] 이메일 알림 (Supabase Edge Functions)

## 🛠 개발 팁

### Supabase Studio 활용

1. **Table Editor**: 데이터 직접 확인/수정
2. **SQL Editor**: 복잡한 쿼리 실행
3. **API Docs**: 자동 생성된 API 문서 확인
4. **Logs**: 실시간 로그 모니터링

### 실시간 업데이트

```javascript
// 실시간 구독 예시
const subscription = supabase
  .channel('applications')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'applications' },
    (payload) => {
      console.log('실시간 변경:', payload)
      // 상태 업데이트 로직
    }
  )
  .subscribe()
```

## 📊 데이터 구조

### applications 테이블

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | UUID | 기본키 |
| application_number | VARCHAR(20) | 신청번호 (고유) |
| applicant_name | VARCHAR(100) | 신청자명 |
| applicant_phone | VARCHAR(20) | 연락처 |
| fishery_type | VARCHAR(20) | 어업종류 |
| vessel_name | VARCHAR(100) | 선박명 |
| vessel_tonnage | DECIMAL(10,2) | 선박톤수 |
| fishing_area | TEXT | 조업구역 |
| status | VARCHAR(20) | 처리상태 |
| created_at | TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | 수정일시 |

## 🔒 보안 설정

### Row Level Security (RLS)

현재 설정: 모든 사용자가 읽기/쓰기 가능 (데모용)

**프로덕션 환경에서는 다음과 같이 설정 권장:**

```sql
-- 인증된 사용자만 접근
CREATE POLICY "Authenticated users only" ON applications
FOR ALL USING (auth.uid() IS NOT NULL);

-- 본인 신청만 조회
CREATE POLICY "Users can view own applications" ON applications
FOR SELECT USING (auth.uid()::text = user_id);
```

## 🚀 배포 시 주의사항

1. **환경변수**: Vercel 환경변수에 Supabase 정보 추가
2. **CORS 설정**: Supabase에서 허용할 도메인 설정
3. **API 키 보안**: anon key는 공개용, service_role key는 서버에서만 사용

---

**🎯 이제 실제 데이터베이스와 연동된 고도화된 프로토타입을 경험해보세요!**
