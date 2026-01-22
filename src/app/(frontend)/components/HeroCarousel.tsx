'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideDetail {
  icon: 'clock' | 'location' | 'calendar' | 'users' | 'message' | 'mail';
  text: string;
}

interface Slide {
  type?: 'default' | 'image-only' | 'image-text-link';
  title?: string[];
  subtitle?: string;
  details?: SlideDetail[];
  bgImage: string;
  text?: string;
  link?: string;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [autoScrollKey, setAutoScrollKey] = useState<number>(0);

  // Auto-scroll effect with reset capability
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [autoScrollKey]);

  const slides: Slide[] = [
    {
      type: 'default',
      title: ['JAPANESE', 'ANIMATION', 'CLUB'],
      subtitle: '@ UCLA',
      details: [
        { icon: 'clock', text: 'Thursday 7-9PM' },
        { icon: 'location', text: 'Haines A25' }
      ],
      bgImage: '/bg3.png'
    },
    {
      type: 'image-only',
      bgImage: '/bg3.png'
    },
    {
      type: 'image-text-link',
      bgImage: '/bg3.png',
      text: 'Join Our Community',
      link: 'https://discord.gg/yourserver'
    },
  ];

  const minSwipeDistance = 50;

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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoScrollKey(prev => prev + 1);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoScrollKey(prev => prev + 1);
  };

  const getIcon = (iconName: SlideDetail['icon']): React.ReactElement | null => {
    switch (iconName) {
      case 'clock':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'location':
        return (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </>
        );
      case 'calendar':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        );
      case 'users':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        );
      case 'message':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        );
      case 'mail':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        );
      default:
        return null;
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fadeIn > div {
          opacity: 1 !important;
        }
      `}</style>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300">
          <circle cx="60" cy="20" r="3" fill="currentColor" />
          <circle cx="40" cy="40" r="4" fill="currentColor" />
          <circle cx="70" cy="60" r="2" fill="currentColor" />
          <circle cx="50" cy="80" r="3" fill="currentColor" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa']">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0 bg-cover transition-all duration-700 ease-in-out" 
             style={{ backgroundImage: `url('${slides[currentSlide].bgImage}')` }}>
          
          {/* Slide Content */}
          {slides[currentSlide].type === 'image-only' ? (
            // Image-only slide - no content overlay
            <div className="hidden"></div>
          ) : slides[currentSlide].type === 'image-text-link' ? (
            // Image with text and link as button
            <div className="absolute inset-0 flex items-end justify-center pb-32 animate-fadeIn"
                 key={currentSlide}>
              <a 
                href={slides[currentSlide].link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <button className="relative bg-white/70 backdrop-blur-sm text-pink-600 font-light text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-pink-300 shadow-md hover:shadow-lg hover:bg-white/80 hover:scale-102 transition-all duration-300 tracking-wide">
                  {slides[currentSlide].text}
                </button>
              </a>
            </div>
          ) : (
            // Default slide with full content
            <div className="space-y-8 flex flex-col items-center md:items-end scale-75 md:scale-75 sm:scale-90 relative md:left-3/4 left-0 animate-fadeIn"
                 key={currentSlide}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                 
                <Card className="inline-block border-4 border-pink-400 bg-white/65 backdrop-blur-sm py-8 sm:py-12 px-8 sm:px-12 rounded-2xl shadow-2xl hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-pink-300/50 hover:bg-white/80">
                  {slides[currentSlide].title?.map((line, index) => (
                    <h1 key={index} className="text-xl sm:text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
                      {line}
                      {index === slides[currentSlide].title!.length - 1 && (
                        <span className="text-2xl sm:text-3xl text-pink-600 font-light relative -top-1">
                          {' '}{slides[currentSlide].subtitle}
                        </span>
                      )}
                    </h1>
                  ))}
                  
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6"></div>
                  
                  <div className="text-center space-y-3 text-pink-600">
                    {slides[currentSlide].details?.map((detail, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-base sm:text-lg font-light">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getIcon(detail.icon)}
                        </svg>
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
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-23 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoScrollKey(prev => prev + 1);
            }}
            className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-pink-600' 
                : 'bg-pink-300 hover:bg-pink-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;