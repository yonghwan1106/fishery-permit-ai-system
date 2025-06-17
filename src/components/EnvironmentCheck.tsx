'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertTriangle, Database } from 'lucide-react'

interface EnvironmentStatus {
  supabaseUrl: boolean
  supabaseKey: boolean
  connection: boolean
}

export default function EnvironmentCheck() {
  const [status, setStatus] = useState<EnvironmentStatus>({
    supabaseUrl: false,
    supabaseKey: false,
    connection: false
  })

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setStatus({
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      connection: !!(supabaseUrl && supabaseKey)
    })
  }, [])

  const getStatusIcon = (isReady: boolean) => {
    return isReady ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusBadge = (isReady: boolean, label: string) => {
    return (
      <Badge 
        variant={isReady ? "success" : "destructive"}
        className="flex items-center space-x-1"
      >
        {getStatusIcon(isReady)}
        <span>{label}</span>
      </Badge>
    )
  }

  const allReady = status.supabaseUrl && status.supabaseKey && status.connection

  return (
    <Card className={`mb-4 ${allReady ? 'border-green-200' : 'border-red-200'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className={`h-5 w-5 ${allReady ? 'text-green-600' : 'text-red-600'}`} />
            <div>
              <h3 className="font-semibold text-gray-900">
                환경 설정 상태
              </h3>
              <p className="text-sm text-gray-600">
                {allReady ? 'Supabase 연결 준비 완료' : '환경변수 설정이 필요합니다'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {getStatusBadge(status.supabaseUrl, 'Supabase URL')}
            {getStatusBadge(status.supabaseKey, 'API Key')}
            {getStatusBadge(status.connection, '연결 준비')}
          </div>
        </div>

        {!allReady && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">설정 필요:</p>
                <ul className="text-yellow-700 space-y-1">
                  {!status.supabaseUrl && <li>• NEXT_PUBLIC_SUPABASE_URL 환경변수 설정</li>}
                  {!status.supabaseKey && <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY 환경변수 설정</li>}
                </ul>
                <p className="mt-2 text-yellow-600">
                  Vercel Dashboard → Settings → Environment Variables에서 설정하세요.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
