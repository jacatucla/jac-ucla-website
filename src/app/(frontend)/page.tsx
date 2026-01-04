import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SideNavBar from './components/SideNavBar';
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
    <SideNavBar></SideNavBar>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">      
  {/* Decorative Elements */}
  
  {/* Main Content */}
  <div className="container mx-auto px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa']">
    <div className="grid md:grid-cols-2 gap-12 items-center w-100/100 h-100/100 absolute top-0 left-0 bg-[url('/bg3.png')] bg-cover">
      {/* Left Side - Text Content */}
      <div className="space-y-8 flex flex-col items-center md:items-end scale-78 relative left-88/100">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          
          <Card className="inline-block border-4 border-pink-400 bg-white/65 backdrop-blur-xs py-12 px-12 rounded-2xl shadow-2xl hover:backdrop-blur-s transform transition-all duration-300 hover:scale-103 hover:shadow-pink-300/50 hover:bg-white/80">
            <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
              JAPANESE
            </h1>
            <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
              ANIMATION
            </h1>
            <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-2 tracking-wider">
              CLUB
              <span className="text-2xl text-pink-600 font-light relative -top-1"> @ UCLA</span>
            </h1>
            
            <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6"></div>
            <div className="text-center space-y-3 text-pink-600">
              <div className="flex items-center justify-center gap-2 text-lg font-light">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Thursday 7-9PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg font-light">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Math Science 4000A</span>
              </div>
            </div>                
          </Card>
        </div>
      </div>
      
      {/* Right Side - Empty space for custom illustration */}
      <div className="relative">
        {/* Space reserved for illustration */}
      </div>
    </div>
  </div>
  
  <div className="absolute top-0 left-0 w-96 h-96 opacity-20">
    <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300">
      <circle cx="60" cy="20" r="3" fill="currentColor" />
      <circle cx="40" cy="40" r="4" fill="currentColor" />
      <circle cx="70" cy="60" r="2" fill="currentColor" />
      <circle cx="50" cy="80" r="3" fill="currentColor" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
    </svg>
  </div>
</div>
</div>
  )
}
