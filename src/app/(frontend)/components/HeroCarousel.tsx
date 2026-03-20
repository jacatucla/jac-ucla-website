'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CarouselSlide } from '@/payload-types'

// ─── Types ────────────────────────────────────────────────────────────────────

type IconName = 'clock' | 'location' | 'calendar' | 'users' | 'message' | 'mail'

interface SlideDetail {
  icon: IconName
  text?: string
}

type SlideWidth = 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl'

const DEFAULT_WIDTH: SlideWidth = 'max-w-xl'

type SlideBase = { bgImage: string; width?: SlideWidth }

type DefaultSlide = SlideBase & {
  type: 'default'
  title: string[]
  subtitle?: string
  details?: SlideDetail[]
}

type ImageOnlySlide = SlideBase & {
  type: 'image-only'
}

type ImageTextCardSlide = SlideBase & {
  type: 'image-text-card' | 'image-text-card-bottom'
  text: string
  description?: string
  description2?: string
}

type ImageTextLinkSlide = SlideBase & {
  type: 'image-text-link' | 'image-text-card-button'
  text: string
  description?: string
  description2?: string
  link: string
  buttonText: string
}

type Slide = DefaultSlide | ImageOnlySlide | ImageTextCardSlide | ImageTextLinkSlide

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CarouselProp {
  location?: string
  day?: string | null
  time?: string
  slideList: CarouselSlide[],
  bgImage: string
}

// ─── Icon helper ──────────────────────────────────────────────────────────────

function getIconPath(name: IconName): React.ReactNode {
  switch (name) {
    case 'clock':
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    case 'location':
      return (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )
    case 'calendar':
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    case 'users':
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    case 'message':
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    case 'mail':
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  }
}

function SlideIcon({ name }: { name: IconName }) {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {getIconPath(name)}
    </svg>
  )
}

// ─── Shared card shell ────────────────────────────────────────────────────────

const CARD_BASE = [
  'relative border-4 border-pink-400 bg-white/75 backdrop-blur-sm rounded-2xl shadow-2xl',
  'hover:backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:bg-white/85',
].join(' ')

function CardShell({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-gray-100 to-pink-300 rounded-3xl blur opacity-20 transition duration-500" />
      <Card className={`${CARD_BASE} ${className}`}>{children}</Card>
    </div>
  )
}

// ─── Per-type slide renderers ─────────────────────────────────────────────────

function DefaultSlideContent({ slide }: { slide: DefaultSlide }) {
  const widthClass = slide.width ?? DEFAULT_WIDTH
  return (
    <div className="space-y-8 flex flex-col items-center md:items-end scale-75 md:scale-75 sm:scale-90 relative md:left-3/4 left-0 animate-fadeIn">
      <CardShell className={`inline-block py-8 sm:py-12 px-8 sm:px-12 ${widthClass}`}>
        {slide.title.map((line, i) => (
          <h1 key={i} className="text-xl sm:text-2xl md:text-3xl font-light text-pink-600 mb-1 tracking-wider">
            {line}
            {i === slide.title.length - 1 && slide.subtitle && (
              <span className="text-2xl sm:text-3xl text-pink-600 font-light relative -top-1">
                {' '}{slide.subtitle}
              </span>
            )}
          </h1>
        ))}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6" />
        <div className="text-center space-y-3 text-pink-600">
          {slide.details?.map((detail, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-base sm:text-lg font-light">
              <SlideIcon name={detail.icon} />
              <span>{detail.text}</span>
            </div>
          ))}
        </div>
      </CardShell>
    </div>
  )
}

function CenteredSlideContent({
  slide,
  position = 'center',
}: {
  slide: ImageTextCardSlide | ImageTextLinkSlide
  position?: 'center' | 'bottom'
}) {
  const hasLink = slide.type === 'image-text-link' || slide.type === 'image-text-card-button'
  const positionClass = position === 'bottom'
    ? 'absolute inset-0 flex items-end justify-center pb-20'
    : 'absolute inset-0 flex items-center justify-center'

  const widthClass = slide.width ?? DEFAULT_WIDTH

  return (
    <div className={`${positionClass} animate-fadeIn`}>
      <div className={`${widthClass} mx-4 w-full`}>
        <CardShell className="py-4 sm:py-5 px-6 sm:px-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 tracking-wider text-center mb-1">
            {slide.text}
          </h2>

          {(slide.description || hasLink || position === 'bottom') && (
            <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-1" />
          )}

          {position === 'bottom' ? (
            <div className="text-sm sm:text-base text-pink-600 font-semibold text-center italic">
              {slide.description}<br />{slide.description2}
            </div>
          ) : slide.description && (
            <p className="text-sm sm:text-base text-pink-600 font-semibold text-center italic">
              {slide.description}
              <br />
              {slide.description2}
            </p>
          )}

          {hasLink && (
            <div className="flex justify-center mt-4">
              <a href={(slide as ImageTextLinkSlide).link} target="_blank" rel="noopener noreferrer">
                <button className="bg-white/30 backdrop-blur-sm text-pink-600 font-semibold text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-pink-400 shadow-lg hover:bg-white/80 transition-all duration-300">
                  {(slide as ImageTextLinkSlide).buttonText}
                </button>
              </a>
            </div>
          )}
        </CardShell>
      </div>
    </div>
  )
}

function renderSlide(slide: Slide): React.ReactNode {
  switch (slide.type) {
    case 'image-only':
      return null
    case 'default':
      return <DefaultSlideContent slide={slide} />
    case 'image-text-card-bottom':
      return <CenteredSlideContent slide={slide} position="bottom" />
    case 'image-text-link':
    case 'image-text-card':
    case 'image-text-card-button':
      return <CenteredSlideContent slide={slide} />
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

const DECORATIVE_DOTS: [number, number, number][] = [
  [60, 20, 3],
  [40, 40, 4],
  [70, 60, 2],
  [50, 80, 3],
  [30, 30, 2],
]

const FADE_IN_STYLES = `
  @keyframes fadeIn { from { opacity: 0.2; } to { opacity: 1; } }
  .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
  .animate-fadeIn > div { opacity: 1 !important; }
`

const HeroCarousel = ({ location, day, time, slideList, bgImage}: CarouselProp) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [autoScrollKey, setAutoScrollKey] = useState(0)

  const dateTime = `${day ?? ''} ${time ?? ''}`.trim()

  const slides: Slide[] = [
    {
      type: 'default',
      title: ['JAPANESE', 'ANIMATION', 'CLUB'],
      subtitle: '@ UCLA',
      details: [
        { icon: 'clock', text: dateTime },
        { icon: 'location', text: location },
      ],
      bgImage: bgImage,
    },
    ...slideList.map((s): Slide => {
      const base = {
        bgImage: typeof s.bgImage === 'string' ? s.bgImage : (s.bgImage as { url?: string })?.url ?? '',
        width: (s.width ?? DEFAULT_WIDTH) as SlideWidth,
      }
      const slideType = (s.type ?? 'image-only') as Slide['type']

      if (slideType === 'image-only') {
        return { ...base, type: 'image-only' }
      }
      if (slideType === 'default') {
        return {
          ...base,
          type: 'default',
          title: (s.title as unknown as { line: string }[] | undefined)?.map((t) => t.line) ?? [],
          subtitle: s.subtitle ?? undefined,
          details: (s.details as unknown as SlideDetail[] | undefined) ?? undefined,
        }
      }
      if (slideType === 'image-text-link' || slideType === 'image-text-card-button') {
        return {
          ...base,
          type: slideType,
          text: s.text ?? '',
          description: s.description ?? undefined,
          description2: s.description2 ?? undefined,
          link: s.link ?? '',
          buttonText: s.buttonText ?? '',
        }
      }
      return {
        ...base,
        type: slideType as 'image-text-card' | 'image-text-card-bottom',
        text: s.text ?? '',
        description: s.description ?? undefined,
        description2: s.description2 ?? undefined,
      }
    }),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [autoScrollKey, slides.length])

  const advance = (dir: 1 | -1) => {
    setCurrentSlide((prev) => (prev + dir + slides.length) % slides.length)
    setAutoScrollKey((k) => k + 1)
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const dist = touchStart - touchEnd
    if (Math.abs(dist) > 50) advance(dist > 0 ? 1 : -1)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden border-pink-200 border-b-2"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style dangerouslySetInnerHTML={{ __html: FADE_IN_STYLES }} />

      {/* Background images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={slide.bgImage}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.bgImage}
              alt="Background"
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Decorative dots */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300">
          {DECORATIVE_DOTS.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="currentColor" />
          ))}
        </svg>
      </div>

      {/* Slide content */}
      <div
        key={currentSlide}
        className="max-w-full mx-auto px-4 sm:px-8 py-12 flex items-center justify-center min-h-screen font-['Comfortaa'] relative z-20"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center w-full h-full absolute top-0 left-0">
          {renderSlide(slides[currentSlide])}
        </div>
      </div>

    {/* Prev / Next */}
    {slides.length > 1 && (
    <>
    <button
      onClick={() => advance(-1)}
      aria-label="Previous slide"
      className="absolute left-5 md:left-24 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg transition-all z-30 backdrop-blur-sm border-2 border-pink-400"
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
    <button
      onClick={() => advance(1)}
      aria-label="Next slide"
      className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 sm:p-3 rounded-full shadow-lg transition-all z-30 backdrop-blur-sm border-2 border-pink-400"
    >
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
    </>
    )}

      {/* Dot indicators */}
      {slides.length > 1 && (
      <>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentSlide(i); setAutoScrollKey((k) => k + 1) }}
            className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === i ? 'bg-pink-600' : 'bg-pink-300 hover:bg-pink-400'
            }`}
          />
        ))}
      </div>
      </>
      )}
    </div>
  )
}

export default HeroCarousel