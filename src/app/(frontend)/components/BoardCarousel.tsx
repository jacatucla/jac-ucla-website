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

// Defined a basic interface for better type safety


export default function BoardCarousel({ teamMembers }: { teamMembers: any[] }) {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <div className="border-4 border-pink-400 rounded-2xl p-8 md:p-12 bg-white/65 backdrop-blur-sm shadow-2xl overflow-visible">
      <Carousel 
        setApi={setApi} 
        className="w-full" 
        opts={{ align: "center", slidesToScroll: 'auto' }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {teamMembers.map((member, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1 md:p-4 h-full">
                <Card className="border-2 border-pink-300 bg-white/80 hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 h-full">
                  {/* Removed aspect-square to allow space for the description */}
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority={index < 3}
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div>
                        <h3 className="text-xl font-semibold text-pink-800">{member.name}</h3>
                        <p className="text-pink-600 font-medium">{member.role}</p>
                      </div>
                      
                      {/* New Description Section */}
                      {member.description && (
                        <p className="text-pink-400 text-sm leading-relaxed line-clamp-4 italic">
                          {member.description}
                        </p>
                      )}
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

      <div className="mt-8">
        <CarouselDots api={api} />
      </div>
    </div>
  )
}