'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselSlide } from '@/payload-types';

interface SlideDetail {
  icon: 'clock' | 'location' | 'calendar' | 'users' | 'message' | 'mail';
  text: string | undefined;
}

interface Slide {
  type?: 'default' | 'image-only' | 'image-text-link' | 'image-text-card' | 'image-text-card-bottom' | 'image-text-card-button';
  title?: string[];
  subtitle?: string;
  details?: SlideDetail[];
  bgImage: string;
  text?: string;
  description?: string;
  description2?: string;
  link?: string;
  buttonText?: string;
}

export interface CarouselProp
{
    location: string | undefined,
    day: string | undefined,
    time: string | undefined,
    slideList: CarouselSlide[]
}

const HeroCarousel = ({location, day, time, slideList}: CarouselProp) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [autoScrollKey, setAutoScrollKey] = useState<number>(0);

  let dateTime = day + " " +time;

  const slides: Slide[] = [
    {
      type: 'default',
      title: ['JAPANESE', 'ANIMATION', 'CLUB'],
      subtitle: '@ UCLA',
      details: [
        { icon: 'clock', text: dateTime },
        { icon: 'location', text: location }
      ],
      bgImage: '/bg3.png'
    },
    {
      type: 'image-text-card-bottom',
      bgImage: '/carousel/screenings.png',
      text: 'Quarterly Screenings',
      description: 'Violet Evergarden &',
      description2: 'Land of the Lustrous'
    },
    {
      type: 'image-text-link',
      bgImage: '/carousel/officer apps.JPG',
      text: 'Officers Applications Open',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdxeTrauNwfp4r_iglzEFjtEf8JGWcENVwJCWNdm3YuzJ6kmg/viewform',
      buttonText: 'Apply Now'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoScrollKey, slides.length]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoScrollKey(prev => prev + 1);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoScrollKey(prev => prev + 1);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  const getIcon = (iconName: SlideDetail['icon']): React.ReactElement | null => {
    switch (iconName) {
      case 'clock': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'location': return <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>;
      case 'calendar': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'users': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />;
      case 'message': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />;
      case 'mail': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
      default: return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0.2; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fadeIn > div { opacity: 1 !important; }
      `}</style>

      {/* BACKGROUND IMAGE LAYER - Optimized */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.bgImage}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.bgImage}
              alt="Background"
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300">
          <circle cx="60" cy="20" r="3" fill="currentColor" />
          <circle cx="40" cy="40" r="4" fill="currentColor" />
          <circle cx="70" cy="60" r="2" fill="currentColor" />
          <circle cx="50" cy="80" r="3" fill="currentColor" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* MAIN CONTENT LAYER - Restored original grid and positions */}
      <div className="max-w-full mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa'] relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0">
          
          {slides[currentSlide].type === 'image-only' ? (
            <div className="hidden"></div>
          ) : slides[currentSlide].type === 'image-text-card-button' ? (
            <div className="absolute inset-0 flex items-center justify-center animate-fadeIn" key={currentSlide}>
              <div className="relative max-w-xl w-xl mx-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 transition duration-500"></div>
                <Card className="relative border-4 border-pink-400 bg-white/75 backdrop-blur-sm py-4 sm:py-5 px-6 sm:px-8 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-pink-300/50 hover:bg-white/85">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 tracking-wider text-center mb-1">{slides[currentSlide].text}</h2>
                  {slides[currentSlide].description && (
                    <>
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-1"></div>
                      <div className="text-sm sm:text-base text-pink-600 font-semibold text-center italic">
                        {slides[currentSlide].description}<br/>{slides[currentSlide].description2}
                      </div>
                    </>
                  )}
                  <div className="flex justify-center mt-4">
                    <a href={slides[currentSlide].link} target="_blank" rel="noopener noreferrer" className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <button className="relative bg-white/70 backdrop-blur-sm text-pink-600 font-semibold text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-3 border-pink-600 shadow-lg hover:bg-white/80 hover:scale-102 transition-all duration-300">
                        {slides[currentSlide].buttonText}
                      </button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          ) : slides[currentSlide].type === 'image-text-link' ? (
            <div className="absolute inset-0 flex items-center justify-center animate-fadeIn" key={currentSlide}>
              <div className="relative max-w-md w-md mx-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 transition duration-500"></div>
                <Card className="relative border-4 border-pink-400 bg-white/75 backdrop-blur-sm py-4 sm:py-5 px-6 sm:px-8 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:bg-white/85">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 tracking-wider text-center mb-1">{slides[currentSlide].text}</div>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-4"></div>
                  <div className="flex justify-center">
                    <a href={slides[currentSlide].link} target="_blank" rel="noopener noreferrer" className="group relative">
                      <button className="relative bg-white/30 backdrop-blur-sm text-pink-600 font-semibold text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-3 border-pink-400 shadow-lg hover:bg-white/80 transition-all duration-300">
                        {slides[currentSlide].buttonText}
                      </button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          ) : slides[currentSlide].type === 'image-text-card-bottom' ? (
            <div className="absolute inset-0 flex items-end justify-center animate-fadeIn pb-20" key={currentSlide}>
              <div className="relative max-w-md mx-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 transition duration-500"></div>
                <Card className="relative border-4 border-pink-400 bg-white/75 backdrop-blur-sm py-4 sm:py-5 px-6 sm:px-8 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:bg-white/85">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 tracking-wider text-center mb-1">{slides[currentSlide].text}</h2>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-1"></div>
                  <div className="text-sm sm:text-base text-pink-600 font-semibold text-center italic">
                    {slides[currentSlide].description}<br/>{slides[currentSlide].description2}
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8 flex flex-col items-center md:items-end scale-75 md:scale-75 sm:scale-90 relative md:left-3/4 left-0 animate-fadeIn" key={currentSlide}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 transition duration-500"></div>
                <Card className="inline-block border-4 border-pink-400 bg-white/65 backdrop-blur-sm py-8 sm:py-12 px-8 sm:px-12 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105">
                  {slides[currentSlide].title?.map((line, index) => (
                    <h1 key={index} className="text-xl sm:text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
                      {line} {index === slides[currentSlide].title!.length - 1 && (
                        <span className="text-2xl sm:text-3xl text-pink-600 font-light relative -top-1">{' '}{slides[currentSlide].subtitle}</span>
                      )}
                    </h1>
                  ))}
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6"></div>
                  <div className="text-center space-y-3 text-pink-600">
                    {slides[currentSlide].details?.map((detail, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-base sm:text-lg font-light">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">{getIcon(detail.icon)}</svg>
                        <span>{detail.text}</span>
                      </div>
                    ))}
                  </div>                
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-4 md:left-23 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg transition-all z-30 backdrop-blur-sm" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg transition-all z-30 backdrop-blur-sm" aria-label="Next slide">
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); setAutoScrollKey(prev => prev + 1); }}
            className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-pink-600' : 'bg-pink-300 hover:bg-pink-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;