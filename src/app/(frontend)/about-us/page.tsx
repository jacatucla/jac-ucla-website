import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

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
import brian from '../../../../public/portraits/brian.jpeg';
import ryan from '../../../../public/portraits/ryan.jpeg';
import winnie from '../../../../public/portraits/winnie.jpeg';
import chelsea from '../../../../public/portraits/chelsea.jpeg';
import ian from '../../../../public/portraits/ian.png';
import matthew from '../../../../public/portraits/matthew.jpeg';
import emily from '../../../../public/portraits/emily.jpeg';
import audrey from '../../../../public/portraits/audrey.jpeg';
import daniel from '../../../../public/portraits/daniel.jpeg';
import kai from '../../../../public/portraits/kai.jpeg';
import nao from '../../../../public/portraits/nao.jpeg';
import amy from '../../../../public/portraits/amy.jpeg';
import amana from '../../../../public/portraits/amana.jpeg';
import natalia from '../../../../public/portraits/natalia.jpeg';
import BoardCarousel from '../components/BoardCarousel'



export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const { docs: bannerLinks } = await payload.find({
    collection: 'bannerLinks',
    limit: 15,
  })

  const { docs: boardMembers } = await payload.find({
    collection: 'boardMembers',
    limit: 30,
    depth:1
  })


  const teamMembers = [
    { name: "Brian", role: "President", image: brian, year: 'Senior' , major:'Physiological Science'},
    { name: "Ryan", role: "Vice President", image: ryan, year: 'Senior', major:'Cognitive Science'},
    { name: "Winnie", role: "EVP", image: winnie, year: 'Junior', major: 'Bioengineering'},
    { name: "Chelsea", role: "EVP", image: chelsea, year: 'Junior', major: 'Biology' },
    { name: "Ian", role: "Screener", image:ian, year: 'Junior', major: 'Economics'},
    { name: "Matthew", role: "Webmaster", image: matthew, year: 'Sophomore', major:'Cognitive Science'},
    { name: "Emily", role: "Stashmaster", image: emily, year: 'Junior', major: 'MCDB'},
    { name: "Audrey", role: "Treasurer", image: audrey, year: 'Senior', major: 'MIMG'},
    { name: "Natalia", role: "Secretary", image: natalia, year: 'Senior', major: 'CogSci & Art History'},
    { name: "Daniel", role: "Discord Manager", image: daniel, year: 'Senior', major: 'Electrical Engineering'},
    { name: "Kai", role: "Discord Manager", image: kai, year: 'Sophomore', major:'Biochemistry'},
    { name: "Nao", role: "General Officer", image: nao, year: 'Junior', major: 'Linguistics & Psychology'},
    { name: "Amy", role: "General Officer", image: amy, year: 'Sophomore', major: 'Psychology & English'},
    { name: "Amana", role: "General Officer", image: amana, year: 'Junior', major: 'Stats & Data Science'}

  ];

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
                        src={'/bg3.png'}
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
                                    <p className="text-lg font-normal text-pink-500 tracking-wide text-center leading-relaxed">We&apos;re a club dedicated to facilitating both on and off-campus gatherings for the appreciation of Japanese anime and culture!</p>
                                                                                   
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