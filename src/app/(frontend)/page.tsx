import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SideNavBar from './components/SideNavBar';
import { cn } from "@/lib/utils";
import './styles.css'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  
  return (
      <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen overscroll-none'>
        <SideNavBar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2">      
          {/* Decorative Elements */}
          
          {/* Main Content */}
          <div className="container mx-auto px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa']">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0 bg-[url('/bg3.png')] bg-cover">
              {/* Left Side - Text Content */}
              <div className="space-y-8 flex flex-col items-center md:items-end scale-75 relative left-3/4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  
                  <Card className="inline-block border-4 border-pink-400 bg-white/65 backdrop-blur-sm py-12 px-12 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-pink-300/50 hover:bg-white/80">
                    <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
                      JAPANESE
                    </h1>
                    <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
                      ANIMATION
                    </h1>
                    <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-2 tracking-wider">
                      CLUB
                      <span className="text-3xl text-pink-600 font-light relative -top-1"> @ UCLA</span>
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
                        <span>Haines A25</span>
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
        
        {/* Meetings Section */}
        <div className="container bg-gradient-to-br from-gray-50 to-purple-50 relative">
        <div className="container mx-auto px-8 py-16 relative">
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 absolute inset-0 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/animebg.png')] bg-repeat bg-[size:400px_400px] opacity-80 pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto relative z-10" id='events'>
            <div className="border-4 border-pink-400 rounded-2xl p-8 bg-white/55 backdrop-blur-xs shadow-lg mb-8 pb-[14px]">
              <h2 className="text-4xl md:text-5xl font-light text-pink-600 text-center mb-6 tracking-wider font-['Comfortaa']">
                MEETINGS
              </h2>
              <div className="h-px bg-pink-400 mb-6"></div>
              <p className="text-center text-pink-600 font-['Comfortaa'] font-light text-lg mb-0">
                Weekly meetings/screenings are held Thursdays at 7-9PM in Haines A25. We also hold some social events on Saturdays.
              </p>
            </div>
            
            <div className="border-4 border-pink-400 rounded-2xl bg-white/55 backdrop-blur-xs shadow-lg overflow-hidden">
              <div className="p-8 pb-4 pt-10">
                <h3 className="border-0 text-3xl md:text-4xl font-light text-pink-600 text-center tracking-wider font-['Comfortaa']">
                  WINTER SCHEDULE
                </h3>
              </div>
              <Card className="relative overflow-hidden p-0 shadow-none border-none flex justify-center px-8 py-6 pb-4 pt-0 bg-transparent">
                <div className="flex justify-center px-8 py-6 pb-12">
                  <table className="w-23/24 font-['Comfortaa'] border-spacing-0 border-2 border-b-1 border-r-1 border-l-1 border-pink-400">
                    <thead>
                      <tr className="border-b-2 border-r-2 border-l-2 border-pink-400">
                        <th className="text-center py-3 px-6 text-lg font-light text-pink-600 tracking-wider border-r-2 border-pink-400">WEEK</th>
                        <th className="text-center py-3 px-6 text-lg font-light text-pink-600 tracking-wider border-r-2 border-pink-400">THURSDAY</th>
                        <th className="text-center py-3 px-6 text-lg font-light text-pink-600 tracking-wider">SATURDAY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 1</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Special Screening + Water Balloons</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 2</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Seasonal Screening Selection</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">Winter Formal!!!</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 3</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Auction</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 4</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Presentation Night</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">Sawtelle</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 5</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Fresh Produce Art Collab</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 6</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Valentine's Day Social</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">Koreatown</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 7</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Karaoke Night</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 8</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Pictionary</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                      <tr className="border-b border-pink-400 hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 9</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Raffle & Officer Elections</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">Dessert Night</td>
                      </tr>
                      <tr className="hover:bg-pink-50/30 transition-colors">
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Week 10</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">No Meeting</td>
                        <td className="py-3 px-6 text-pink-600 font-light text-center">---</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <section className="py-10">
            <div className="container">
              <div className="flex w-full flex-col justify-between gap-10">
                
              </div>
            </div>
      </section>
    </div>
  )
}