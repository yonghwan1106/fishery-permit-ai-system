'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Fish, Home, ArrowLeft, Search, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-marine-50 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-ocean-100 rounded-full flex items-center justify-center">
                <Fish className="w-16 h-16 text-ocean-500" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-marine-200 rounded-full opacity-60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-ocean-200 rounded-full opacity-40"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 
            아래 링크를 통해 원하는 페이지를 찾아보세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Home className="w-8 h-8 text-ocean-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">홈페이지</h3>
              <p className="text-sm text-gray-600 mb-4">
                어업허가 AI 시스템의 메인 페이지로 이동
              </p>
              <Link href="/">
                <Button size="sm" className="w-full">
                  홈으로 이동
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Search className="w-8 h-8 text-ocean-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">AI 데모</h3>
              <p className="text-sm text-gray-600 mb-4">
                실시간 AI 자동심사 시스템을 체험해보세요
              </p>
              <Link href="/demo">
                <Button size="sm" variant="outline" className="w-full">
                  데모 체험
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>이전 페이지</span>
            </Button>
          </Link>
          
          <Link href="/apply">
            <Button className="flex items-center space-x-2">
              <Fish className="w-4 h-4" />
              <span>어업허가 신청</span>
            </Button>
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">
            문제가 지속될 경우 아래로 연락주세요
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>010-7939-3123</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>sanoramyun8@gmail.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}