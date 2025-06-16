import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '어업허가 AI 자동심사 시스템',
  description: '해양수산부 규제혁신과제 - AI 기술을 활용한 어업허가 처리 자동화 시스템',
  keywords: ['어업허가', 'AI', '자동심사', '해양수산부', '규제혁신'],
  authors: [{ name: '박용환' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '어업허가 AI 자동심사 시스템',
    description: '해양수산부 규제혁신과제 - AI 기술을 활용한 어업허가 처리 자동화 시스템',
    type: 'website',
    locale: 'ko_KR',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div id="root" className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}