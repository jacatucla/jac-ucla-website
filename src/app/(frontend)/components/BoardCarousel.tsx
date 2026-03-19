'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { CarouselDots } from './CarouselDots'
import { BoardMember, Media } from '@/payload-types'


export interface BoardProps
{
    members: BoardMember[]
}

export default function BoardCarousel({members}: BoardProps) {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <div className="relative border-4 border-pink-400 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/80 via-pink-50/60 to-white/80 backdrop-blur-md shadow-2xl overflow-visible">
      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-pink-300 rounded-tl-2xl opacity-40"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-pink-300 rounded-br-2xl opacity-40"></div>
      
      <Carousel 
        setApi={setApi} 
        className="w-full" 
        opts={{ align: "center", slidesToScroll: 'auto' }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {members.map((member, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1 md:p-4 h-full">
                <Card className="border-2 border-pink-300 bg-gradient-to-b from-white to-pink-50/30 hover:from-white hover:to-pink-100/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 h-full rounded-2xl overflow-hidden group">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4 relative">
                    {/* Decorative background circle - shadow effect */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-pink-400/40 to-pink-500/60 blur-xl"></div>
                    </div>
                    
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg shrink-0 group-hover:border-pink-300 group-hover:shadow-xl transition-all duration-300">
                      <Image
                        src={(member.Picture as Media).url ?? '/fallback.png'}
                        alt={(member.Picture as Media).alt}
                        fill
                        priority={index < 3}
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="text-center space-y-3 relative z-10">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-pink-700 group-hover:text-pink-800 transition-colors">{member['Member Name']}</h3>
                        <span className="inline-flex items-center relative w-30 md:w-36">
                        <span className="w-0 h-0 border-l-0 border-r-[8px] border-r-pink-100 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></span>
                          <span className="flex-1 px-4 py-1 bg-pink-100 text-pink-600 text-xs font-semibold border-y border-pink-300">
                            {member.Role}
                          </span>
                          <span className="w-0 h-0 border-r-0 border-l-[8px] border-l-pink-100 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></span>
                        </span>
                      </div>
                      
                      {member.Year && (
                        <div className="flex items-center justify-center gap-1 text-sm text-pink-400 tracking-tighter">
                          <span className="font-medium text-right">{member.Year}</span>
                          <span className="text-gray-400 text-center justify-center">|</span>
                          <span className='text-left flex-none truncate'>{member.Major}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-8 bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-2 border-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
        <CarouselNext className="right-0 translate-x-8 bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-2 border-pink-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
      </Carousel>
      <div className="mt-8">
        <CarouselDots api={api} />
      </div>
    </div>
  )
}