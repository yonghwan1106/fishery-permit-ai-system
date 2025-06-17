// admin 페이지에 추가할 실시간 데이터 조회 예시

import { getApplications } from '@/lib/applicationService'
import { useState, useEffect } from 'react'
import { SupabaseFisheryApplication } from '@/lib/supabase'

// 컴포넌트 내부에 추가할 상태
const [realApplications, setRealApplications] = useState<SupabaseFisheryApplication[]>([])
const [isLoading, setIsLoading] = useState(false)
const [lastUpdated, setLastUpdated] = useState<string>('')

// 실제 데이터베이스에서 신청 목록 가져오기
const fetchRealApplications = async () => {
  setIsLoading(true)
  try {
    const result = await getApplications()
    
    if (result.success && result.data) {
      setRealApplications(result.data)
      setLastUpdated(new Date().toLocaleString('ko-KR'))
    } else {
      console.error('Failed to fetch applications:', result.error)
    }
  } catch (error) {
    console.error('Error fetching applications:', error)
  } finally {
    setIsLoading(false)
  }
}

// 컴포넌트 마운트 시 데이터 가져오기
useEffect(() => {
  fetchRealApplications()
  
  // 30초마다 실시간 업데이트
  const interval = setInterval(fetchRealApplications, 30000)
  return () => clearInterval(interval)
}, [])

// JSX에 추가할 실제 데이터 표시 예시
<Card className="mt-8">
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle className="flex items-center space-x-2">
      <Database className="h-5 w-5" />
      <span>실시간 데이터베이스 현황</span>
    </CardTitle>
    <div className="flex items-center space-x-2">
      <Badge variant="success" className="animate-pulse">
        <Activity className="mr-1 h-3 w-3" />
        실시간 연동
      </Badge>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={fetchRealApplications}
        disabled={isLoading}
      >
        {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        새로고침
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>총 {realApplications.length}건의 신청</span>
        <span>최종 업데이트: {lastUpdated}</span>
      </div>
      
      {realApplications.length > 0 ? (
        <div className="space-y-3">
          {realApplications.slice(0, 5).map((app) => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{app.applicant_name}</div>
                <div className="text-sm text-gray-600">
                  {app.application_number} | {app.vessel_name} | {app.fishery_type}
                </div>
              </div>
              <Badge 
                variant={
                  app.status === 'approved' ? 'success' : 
                  app.status === 'rejected' ? 'destructive' : 
                  'warning'
                }
              >
                {app.status}
              </Badge>
            </div>
          ))}
          
          {realApplications.length > 5 && (
            <div className="text-center text-gray-500 text-sm">
              ... 외 {realApplications.length - 5}건 더
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          아직 등록된 신청이 없습니다.
        </div>
      )}
    </div>
  </CardContent>
</Card>
