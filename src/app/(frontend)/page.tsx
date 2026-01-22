
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SideNavBar from './components/SideNavBar';
import HeroCarousel from './components/HeroCarousel'
import Banner from './components/Banner'
import { cn } from "@/lib/utils";
import './styles.css'
import Footer from './components/Footer'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  
  return (
      <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
        <SideNavBar />
        <Banner></Banner>
        <HeroCarousel/>
        
        {/* Meetings Section */}
        <div className="max-w-full bg-gradient-to-br from-gray-50 to-purple-50 relative pb-[3%]">
        <div className="max-w-full mx-auto px-8 py-16 pb-10 relative">
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
                        <td className="py-3 px-6 text-pink-600 font-light text-center border-r border-pink-400">Valentine&apos;s Day Social</td>
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
      <Footer/>
    </div>
  )
}