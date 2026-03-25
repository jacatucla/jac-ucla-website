
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


function mapPayloadToSchedule(doc: any) {
  return Array.from({ length: 10 }, (_, i) => {
    const weekKey = `Week ${i + 1}`;
    const weekData = doc[weekKey] ?? {};
    return {
      week: weekKey,
      thursday: weekData.Thursday || "---",
      saturday: weekData.Saturday || "---",
    };
  });
}


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const { docs: basicInfo } = await payload.find({
    collection: 'basic',
    limit: 1,
  })

  let location, day, time, quarter, bgImage;
  if(basicInfo.length === 0)
  {
    location = "Haines A25";
    day = "Thursday";
    time = "7-9 PM";
    quarter = "Winter";
    bgImage = "/bg3.png";
  }
  else
  {
    location = basicInfo.at(0)?.Location;
    day = basicInfo.at(0)?.Day;
    time = basicInfo.at(0)?.Time;
    quarter = basicInfo.at(0)?.Quarter;
    bgImage = (basicInfo.at(0)?.bgImage as { url?: string })?.url;
  }

  const { docs: schedule } = await payload.find({
    collection: 'event',
    limit: 1,
  })

  let scheduleData;


  if(schedule.length === 0){
    scheduleData = [
    { week: "Week 1", thursday: "Special Screening + Water Balloons", saturday: "---" },
    { week: "Week 2", thursday: "Seasonal Screening Selection", saturday: "Winter Formal!!!" },
    { week: "Week 3", thursday: "Auction", saturday: "---" },
    { week: "Week 4", thursday: "Presentation Night", saturday: "Sawtelle" },
    { week: "Week 5", thursday: "Fresh Produce Art Collab", saturday: "---" },
    { week: "Week 6", thursday: "Valentine's Day Social", saturday: "Koreatown" },
    { week: "Week 7", thursday: "Karaoke Night", saturday: "---" },
    { week: "Week 8", thursday: "Pictionary", saturday: "---" },
    { week: "Week 9", thursday: "Raffle & Officer Elections", saturday: "Dessert Night" },
    { week: "Week 10", thursday: "No Meeting", saturday: "---" },
  ];
  }
  else
  {
    scheduleData = mapPayloadToSchedule(schedule.at(0))
  }

  const { docs: carousel } = await payload.find({
    collection: 'carouselSlide',
    limit: 15,
  })

  const { docs: bannerLinks } = await payload.find({
    collection: 'bannerLinks',
    limit: 15,
  })
  


  
  return (
      <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
        <SideNavBar />
        <Banner links = {bannerLinks}></Banner>
        <HeroCarousel location = {location} day = {day} time = {time} slideList={carousel} bgImage={bgImage ?? '/bg3.png'}/>
        
        {/* Meetings Section */}
        {/* Meetings Section */}
        <div className="max-w-full bg-gradient-to-br from-gray-50 to-purple-50 relative pb-[3%]">
          <div className="max-w-full mx-auto px-4 md:px-8 py-16 pb-10 relative">
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 absolute inset-0 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/animebg.png')] bg-repeat bg-[size:400px_400px] opacity-80 pointer-events-none"></div>
            
            <div className="max-w-3xl mx-auto relative z-10" id='events'>
              {/* Header Box */}
              <div className="border-4 border-pink-400 rounded-2xl p-6 md:p-8 pb-1 md:pb-2 bg-white/55 backdrop-blur-xs shadow-lg mb-8">
                <h2 className="text-3xl md:text-5xl font-light text-pink-600 text-center mb-6 tracking-wider font-['Comfortaa']">
                  MEETINGS
                </h2>
                <div className="h-px bg-pink-400 mb-6"></div>
                <p className="text-center text-pink-600 font-['Comfortaa'] font-light text-base md:text-lg mb-0">
                  Weekly anime meetings/screenings are held {day}s at {time} in {location}. We also hold some social events on Saturdays.
                </p>
              </div>
              
              {/* Table Box */}
              <div className="border-4 border-pink-400 rounded-2xl pl-6 pr-6 md:pr-8 md:pl-8 bg-white/55 backdrop-blur-xs shadow-lg overflow-hidden">
                <div className="p-6 md:p-8 pb-4">
                  <h3 className="text-3xl md:text-5xl font-light text-pink-600 text-center tracking-wider font-['Comfortaa'] uppercase">
                    {quarter} Schedule
                  </h3>
                </div>

                <div className="h-px bg-pink-400 mb-6"></div>


                <Card className="relative overflow-hidden p-0 shadow-none border-none bg-transparent">
                  {/* Scroll wrapper for mobile */}
                  <div className="overflow-x-auto px-4 md:px-2 py-6 pb-12">
                    <table className="w-full min-w-[500px] md:min-w-0 font-['Comfortaa'] border-collapse border-2 border-pink-400">
                      <thead>
                        <tr className="border-b-2 border-pink-400 bg-pink-50/20">
                          <th className="py-3 px-2 md:px-6 text-sm md:text-lg font-light text-pink-600 border-r-2 border-pink-400">WEEK</th>
                          <th className="py-3 px-2 md:px-6 text-sm md:text-lg font-light text-pink-600 border-r-2 border-pink-400">THURSDAY</th>
                          <th className="py-3 px-2 md:px-6 text-sm md:text-lg font-light text-pink-600">SATURDAY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleData.map((item, index) => (
                          <tr 
                            key={index} 
                            className={cn(
                              "hover:bg-pink-50/30 transition-colors",
                              index !== scheduleData.length - 1 ? "border-b border-pink-400" : ""
                            )}
                          >
                            <td className="py-3 px-2 md:px-6 text-xs md:text-base text-pink-600 font-light text-center border-r border-pink-400">
                              {item.week}
                            </td>
                            <td className="py-3 px-2 md:px-6 text-xs md:text-base text-pink-600 font-light text-center border-r border-pink-400">
                              {item.thursday}
                            </td>
                            <td className="py-3 px-2 md:px-6 text-xs md:text-base text-pink-600 font-light text-center">
                              {item.saturday}
                            </td>
                          </tr>
                        ))}
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