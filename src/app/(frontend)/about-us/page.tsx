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



export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  

  const teamMembers = [
    { name: "Brian", role: "President", image: brian },
    { name: "Ryan", role: "Vice President", image: ryan },
    { name: "Winnie", role: "EVP", image: winnie },
    { name: "Chelsea", role: "EVP", image: chelsea },
    { name: "Ian", role: "Screener", image:ian },
    { name: "Matthew", role: "Webmaster", image: matthew },
    { name: "Emily", role: "Stashmaster", image: emily },
    { name: "Audrey", role: "Treasurer", image: audrey },
    { name: "Natalia", role: "Secretary", image: natalia},
    { name: "Daniel", role: "Discord Manager", image: daniel },
    { name: "Kai", role: "Discord Manager", image: kai },
    { name: "Nao", role: "General Officer", image: nao },
    { name: "Amy", role: "General Officer", image: amy },
    { name: "Amana", role: "General Officer", image: amana }

  ];

 return(
    <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
        <SideNavBar></SideNavBar>
        <Banner></Banner>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2">      
            <div className="max-w-full mx-auto flex items-center justify-center min-h-screen font-['Comfortaa']">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0 bg-[url('/bg3.png')] bg-cover">
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
        <div className="max-w-full bg-gradient-to-br from-gray-50 to-purple-50 relative py-20">
        <div className="max-w-full mx-auto relative">
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 absolute inset-0 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/animebg.png')] bg-repeat bg-[size:400px_400px] opacity-80 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 px-4">
            <h2 className="text-4xl font-light text-pink-600 text-center mb-12 tracking-wider">
              Meet The Board
            </h2>
            
            <div className="border-4 border-pink-400 rounded-2xl p-8 md:p-12 bg-white/65 backdrop-blur-sm shadow-2xl overflow-visible">
              <Carousel className="w-full" opts={{align: "center", slidesToScroll: 'auto'}}>
                <CarouselContent className="-ml-2 md:-ml-4">
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 md:p-4">
                      <Card className="border-2 border-pink-300 bg-white/80 hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <CardContent className="flex flex-col aspect-square items-center justify-center p-6 space-y-4">
                          
                          {/* IMAGE CONTAINER */}
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200">
                            
                              // Inside your teamMembers.map
                              <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              priority={index < 3}
                              placeholder="blur"
                              // This is a Base64 encoded 1x1 pixel of #FCE4EC (Light Pink)
                              className="object-cover duration-700 ease-in-out group-hover:opacity-75"
                            />
                            
                          </div>

                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-700">{member.name}</h3>
                            <p className="text-pink-400 font-medium">{member.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-12 bg-pink-400 hover:bg-pink-500 text-white border-pink-400" />
                <CarouselNext className="right-0 translate-x-12 bg-pink-400 hover:bg-pink-500 text-white border-pink-400" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
 );

}