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
      <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
        <SideNavBar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2">      
          {/* Decorative Elements */}
          
          {/* Main Content */}
          <div className="max-w-full mx-auto px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa']">
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
      <section className="pt-[1%] pb-0">
            <div className="max-w-full">
              <div className="relative flex items-center w-full flex-col justify-between gap-10">
                <div className='relative w-full pt-0'>
                  <div className="relative w-full aspect-[21/5]">
                    <Image
                      src="/banner2resized.png"
                      alt="Banner"
                      fill
                      className="object-cover"
                    />
                    {/* Social Media Icons Overlay */}
                    
                  </div>
                </div>
                <div className='absolute top-17/64 left-1/4 w-full max-w-[50%] pt-0 z-5 border-4 border-pink-400 rounded-2xl bg-white/55 backdrop-blur-xs shadow-lg pb-[1%]'>
                  <div className='h-[20vh] '>
                    <Image
                      src="/join-recolored2.png" // Path to image
                      alt="Description"
                      fill
                      className='object-contain object-top pt-[1%]'
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center gap-7 pt-[10%] z-10">
                    
                    {/* Discord Icon */}
                    <a href="https://discord.gg/dcvsZgX" target="_blank" rel="noopener noreferrer" 
                       className="bg-white/98 hover:bg-pink-50 p-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-pink-400">
                      <svg className="w-7 h-7 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                    
                    {/* Instagram Icon */}
                    <a href="https://www.instagram.com/p/DPQnq4ojtc1/" target="_blank" rel="noopener noreferrer"
                       className="bg-white/98 hover:bg-pink-50 p-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-pink-400">
                      <svg className="w-7 h-7 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    {/* Linktree Icon */}
                    <a href="https://linktr.ee/jacatucla?utm_source=linktree_profile_share&ltsid=af5f91b0-3be3-4c65-a757-f86259910272&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5ILABEtU55l4z4IpxESumUTWZS946MCwiCmiB7NIJzkXs685XruRDWPXYbY_aem_quC3IdWvkJhmF2zZbbOXng" target="_blank" rel="noopener noreferrer"
                       className="bg-white/98 hover:bg-pink-50 p-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-pink-400">
                      <svg className="w-7 h-7 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.511 5.853l4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
      </section>
    </div>
  )
}