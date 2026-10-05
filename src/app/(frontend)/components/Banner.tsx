'use client'
import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { BannerLink } from '@/payload-types'
import { defaultLinks, linkIcons } from './siteLinks'
export interface BannerProps {
  links: BannerLink[]
}
const Banner = ({ links }: BannerProps) => {
  // Rendered server-side straight away. The localStorage check below can only
  // hide it, so there is no need to withhold the first paint waiting on JS.
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  // On mobile the banner is always open, so there is nothing to hover or tap
  const [isMobile, setIsMobile] = useState(false)
  // Use a ref to track if the device is touch-based, set after mount to avoid SSR issues
  const isTouchDevice = useRef(false)
  const visibleLinks = links.filter(item => {
    return item.visible === true;
  });

  const primaryLinks = visibleLinks.map((item) => {
    const Icon = linkIcons[item['Icon Type'] ?? 'form-icon']
    return {
      text: item.Text,
      href: item.Link,
      icon: <Icon className="w-4 h-4" />,
    }
  })
  const secondaryLinks = defaultLinks.map(({ text, href, Icon }) => ({
    text,
    href,
    icon: <Icon className="w-3.5 h-3.5" />,
  }))
  useEffect(() => {
    // Detect touch device after mount (safe from SSR)
    isTouchDevice.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const mobileQuery = window.matchMedia('(max-width: 767px), (hover: none) and (pointer: coarse)')
    const syncMobile = () => setIsMobile(mobileQuery.matches)
    syncMobile()
    mobileQuery.addEventListener('change', syncMobile)
    try {
      const savedData = localStorage.getItem('banner-closed')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const minutesSinceClosed = (Date.now() - parsedData.timestamp) / (1000 * 60)
        if (minutesSinceClosed <= 10) {
          setIsVisible(false)
        }
      }
    } catch {
      // ignore
    }
    return () => mobileQuery.removeEventListener('change', syncMobile)
  }, [])
  // On mobile the banner is permanently expanded; hover/tap toggling is desktop-only
  const isOpen = isMobile || isExpanded
  const handleMouseEnter = () => {
    if (!isMobile && !isTouchDevice.current) setIsExpanded(true)
  }
  const handleMouseLeave = () => {
    if (!isMobile && !isTouchDevice.current) setIsExpanded(false)
  }
  const handleBannerClick = () => {
    if (!isMobile && isTouchDevice.current) setIsExpanded((prev) => !prev)
  }
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setIsExpanded(false)
    try {
      localStorage.setItem('banner-closed', JSON.stringify({ timestamp: Date.now() }))
    } catch {
      // ignore
    }
  }
  const handleReopen = () => {
    setIsVisible(true)
    setIsExpanded(false)
    try {
      localStorage.removeItem('banner-closed')
    } catch {
      // ignore
    }
  }
  if (!isVisible) {
    return (
      <div className="fixed top-2 right-2 z-40">
        <button
          onClick={handleReopen}
          className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 rounded-full hover:bg-gradient-to-br hover:from-pink-200 hover:to-purple-200 hover:border-pink-600 hover:shadow-lg hover:scale-110 transition-all duration-300 shadow-sm"
          aria-label="Reopen banner"
        >
          <ChevronDown className="w-5 h-5 text-pink-600 mx-auto" />
        </button>
      </div>
    )
  }
  return (
    <div
      onClick={handleBannerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 right-0 z-40 border-b-2 border-pink-200 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
        isMobile
          ? 'max-h-none shadow-lg'
          : isOpen
            ? 'max-h-[215px] shadow-lg'
            : 'max-h-[81px] shadow-sm cursor-pointer'
      }`}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100 to-transparent opacity-85 pointer-events-none" />
      {/* Background decorations */}
      <div
        className="hidden md:block absolute left-[100px] top-0 bottom-0 w-[130px] bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-500"
        style={{ opacity: isOpen ? 0.5 : 0.3 }}
      />
      <div
        className="absolute right-13 top-0 bottom-0 w-[160px] bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-500"
        style={{ opacity: isOpen ? 0.5 : 0.3 }}
      />
      {/* Content */}
      <div className="relative max-w-full mx-auto px-2 pt-0.5 pb-1 flex items-center justify-center transition-all duration-500 z-10">
        <div className="text-center m-0 p-0">
          <hr className="mb-1 border-[1px] border-pink-600/50 w-4/5 mx-auto" />
          <div className="text-pink-600 font-bold text-xs md:text-sm m-0 p-0 leading-tight tracking-wide">
            Join the Japanese Animation Club!
          </div>
          <div className="text-gray-600 text-[0.65rem] md:text-xs leading-tight italic mt-1">
            Keep up to date with all our latest events (and become an officer!).
          </div>
          <hr className="mt-2 mb-0.5 w-11/10 -translate-x-1/20 border-[1px] border-pink-600/50 mx-auto" />
          {/* Chevron hint */}
          <div
            className={`flex justify-center items-center mt-0 overflow-visible transition-all duration-300 ${
              isMobile ? 'hidden' : isOpen ? 'opacity-0 max-h-0' : 'opacity-100 max-h-4'
            }`}
          >
            <ChevronDown className="w-4 h-4 text-pink-600 animate-pulse" />
          </div>
          {/* Expanded content */}
          <div
            aria-hidden={!isOpen}
            className={`transition-all ${
              isMobile
                ? 'opacity-100 max-h-none mt-3 overflow-visible duration-300'
                : isOpen
                  ? 'opacity-100 max-h-[150px] mt-4 overflow-visible duration-500 delay-75'
                  : 'pointer-events-none invisible opacity-0 max-h-0 mt-0 overflow-hidden duration-300'
            }`}
          >
            {primaryLinks.length > 0 && (
              <>
                <div className="mb-1">
                  <div className="flex justify-center gap-2 flex-wrap">
                    {primaryLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 no-underline font-semibold px-2.5 py-1 rounded-xl bg-white/60 border-[1.5px] border-pink-600/20 transition-all duration-200 hover:bg-white/90 hover:border-pink-600 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <span className="text-pink-600 text-xs md:text-sm">{link.icon}</span>
                        <span className="text-pink-600 text-xs md:text-sm">{link.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <hr className="my-2 md:my-3 border-pink-600/15 w-4/5 mx-auto" />
              </>
            )}
            <div>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {secondaryLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 no-underline font-semibold px-2.5 py-1 md:py-0.5 rounded-lg bg-white/50 border-[1.5px] border-pink-600/15 transition-all duration-200 hover:bg-white/85 hover:border-pink-600 hover:-translate-y-px hover:shadow-sm"
                  >
                    <span className="text-pink-600 text-[0.65rem] md:text-xs">{link.icon}</span>
                    <span className="text-pink-600 text-[0.65rem] md:text-xs">{link.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-1 w-6 h-6 bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 rounded-full transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-200 hover:to-purple-200 hover:border-pink-600 hover:shadow-lg hover:scale-110 hover:rotate-90 shadow-sm"
          aria-label="Close banner"
        >
          <X className="w-3.5 h-3.5 text-pink-600 mx-auto" />
        </button>
      </div>
    </div>
  )
}
export default Banner