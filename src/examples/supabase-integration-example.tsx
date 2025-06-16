// apply 페이지에 추가할 코드 예시

import { createApplication } from '@/lib/applicationService'
import { useState } from 'react'

// 컴포넌트 내부에 추가할 상태와 함수들
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitResult, setSubmitResult] = useState<string | null>(null)

// 실제 데이터베이스에 저장하는 함수
const handleRealSubmit = async () => {
  setIsSubmitting(true)
  setSubmitResult(null)

  try {
    // 신청번호 생성 (실제로는 더 정교한 로직 필요)
    const applicationNumber = `F${new Date().getFullYear()}${String(Date.now()).slice(-8)}`

    const applicationData = {
      application_number: applicationNumber,
      applicant_name: formData.applicantName,
      applicant_phone: formData.applicantPhone,
      fishery_type: formData.fisheryType,
      vessel_name: formData.vesselName,
      vessel_tonnage: formData.vesselTonnage,
      fishing_area: formData.fishingArea,
      status: 'pending' as const
    }

    const result = await createApplication(applicationData)

    if (result.success) {
      setSubmitResult(`✅ 신청이 성공적으로 저장되었습니다! 신청번호: ${applicationNumber}`)
      // 성공 시 폼 초기화나 다른 페이지로 이동 가능
    } else {
      setSubmitResult('❌ 신청 저장 중 오류가 발생했습니다.')
    }
  } catch (error) {
    console.error('Submit error:', error)
    setSubmitResult('❌ 신청 저장 중 오류가 발생했습니다.')
  } finally {
    setIsSubmitting(false)
  }
}

// JSX에 추가할 버튼 예시
<div className="mt-6 space-y-4">
  {/* 기존 데모 버튼 */}
  <Button 
    onClick={handleSubmit}
    className="w-full"
    size="lg"
  >
    데모 신청 (시뮬레이션)
  </Button>

  {/* 새로 추가할 실제 DB 저장 버튼 */}
  <Button 
    onClick={handleRealSubmit}
    disabled={isSubmitting || !isFormValid()}
    variant="outline"
    className="w-full"
    size="lg"
  >
    {isSubmitting ? '저장 중...' : '실제 데이터베이스에 저장'}
  </Button>

  {submitResult && (
    <div className={`p-4 rounded-lg text-sm ${
      submitResult.includes('✅') 
        ? 'bg-green-50 text-green-700 border border-green-200' 
        : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      {submitResult}
    </div>
  )}
</div>
