import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Footer from '../components/Footer'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import SideNavBar from '../components/SideNavBar';
import Banner from '../components/Banner'
import { cn } from "@/lib/utils";
import '../styles.css'
import BoardCarousel from '../components/BoardCarousel'



// Statically render this page and refresh it at most once every 5 minutes.
// Payload collection hooks call revalidatePath('/about-us') on edit.
export const revalidate = 300

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // One round trip instead of three sequential ones.
  const [{ docs: bannerLinks }, { docs: boardMembers }, { docs: basicInfo }] = await Promise.all([
    payload.find({ collection: 'bannerLinks', limit: 15 }),
    payload.find({ collection: 'boardMembers', limit: 30, depth: 1 }),
    payload.find({ collection: 'basic', limit: 1 }),
  ])

  let bgImage;
  if(basicInfo.length === 0)
  {
    bgImage = '/bg3.png';
  }
  else
  {
    bgImage = (basicInfo.at(0)?.bgImage as { url?: string })?.url;
  }



 return(
    <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
        <SideNavBar></SideNavBar>
        <Banner links = {bannerLinks}></Banner>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2">      
            <div className="max-w-full mx-auto flex items-center justify-center min-h-screen font-['Comfortaa']">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0">
                <div className="absolute inset-0 z-0">
                    <div
                      className='absolute inset-0 transition-opacity duration-700 ease-in-out'
                      
                    >
                      <Image
                        src={bgImage ?? '/bg3.png'}
                        alt="Background"
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                        quality={100}
                      />
                    </div>
            </div>   
                              {/* Left Side - Text Content */}
                              <div className="space-y-8 flex flex-col items-center md:items-end scale-75 relative left-1/2 -translate-x-1/2 md:left-3/4 md:translate-x-0">
                                <div className="relative">
                                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                   
                                  <Card className="inline-block border-4 border-pink-400 bg-white/65 backdrop-blur-sm py-12 px-8 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-pink-300/50 hover:bg-white/80 max-w-md">
                                    <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider text-center">
                                      ABOUT JAC
                                    </h1>
                                    <h1 className="text-2xl md:text-3xl font-light text-pink-600 mb-6 tracking-wider text-center">
                                    @ UCLA
                                    </h1>
                                    <p className="text-lg font-normal text-pink-500 tracking-wide text-center leading-relaxed">We&apos;re the largest anime club on UCLA campus dedicated to facilitating meetups and socials for all things anime!</p>
                                                                                   
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-full bg-gradient-to-br from-gray-50 to-purple-50 relative py-15">
        <div className="max-w-full mx-auto relative">
        <div className="max-w-full bg-gradient-to-br from-gray-50 to-purple-50 relative">
        <div className="max-w-full mx-auto relative">
          <div className="absolute inset-0 bg-[url('/animebg.png')] bg-repeat bg-[size:400px_400px] opacity-80 pointer-events-none object-center"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 px-4">
            <h2 className="text-4xl font-light text-pink-600 text-center mb-15 tracking-wider">
              Meet The Board
            </h2>
            
            {/* Call the Client Component here */}
            <BoardCarousel members={boardMembers} />
          </div>
        </div>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
 );

}