'use client'
import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronDown, Edit, Instagram, Gamepad2 } from 'lucide-react'
import { BannerLink } from '@/payload-types'
// Discord icon component
const DiscordIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 71 55"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
  </svg>
)
const LinkTreeIcon = () => (
  <svg
    className="text-pink-600"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="14"
    height="14"
  >
    <path d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24H10.038V16.16Z" />
  </svg>
)
export interface BannerProps {
  links: BannerLink[]
}
const Banner = ({ links }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  // Use a ref to track if the device is touch-based, set after mount to avoid SSR issues
  const isTouchDevice = useRef(false)
  const iconMap: Record<string, React.ReactNode> = {
    'form-icon': <Edit className="w-4 h-4" />,
    'game-icon': <Gamepad2 className="w-4 h-4" />,
  }

  const visibleLinks = links.filter(item => {
    return item.visible === true;
  });

  const primaryLinks = visibleLinks.map((item) => ({
    text: item.Text,
    href: item.Link,
    icon: iconMap[item['Icon Type'] ?? 'form-icon'],
  }))
  const secondaryLinks = [
    {
      text: 'Discord',
      href: 'https://discord.gg/dcvsZgX',
      icon: <DiscordIcon />,
    },
    {
      text: 'Instagram',
      href: 'https://www.instagram.com/jacatucla/',
      icon: <Instagram className="w-3.5 h-3.5" />,
    },
    {
      text: 'Linktree',
      href: 'https://linktr.ee/jacatucla?utm_source=linktree_profile_share&ltsid=af5f91b0-3be3-4c65-a757-f86259910272&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnAhIyiPfHbzZsrX8QoGNa5OBJnJNnw3fq7VRoAd02CofwUBe-97CjC33ZkL0_aem_T0jiHPLBpLIiXKPimgXkoQ',
      icon: <LinkTreeIcon />,
    },
  ]
  useEffect(() => {
    // Detect touch device after mount (safe from SSR)
    isTouchDevice.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches
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
    } finally {
      setIsLoading(false)
    }
  }, [])
  const handleMouseEnter = () => {
    if (!isTouchDevice.current) setIsExpanded(true)
  }
  const handleMouseLeave = () => {
    if (!isTouchDevice.current) setIsExpanded(false)
  }
  const handleBannerClick = () => {
    if (isTouchDevice.current) setIsExpanded((prev) => !prev)
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
  if (isLoading) return null
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
        isExpanded ? 'max-h-[215px] shadow-lg' : 'max-h-[81px] shadow-sm cursor-pointer'
      }`}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100 to-transparent opacity-85 pointer-events-none" />
      {/* Background decorations */}
      <div
        className="hidden md:block absolute left-[100px] top-0 bottom-0 w-[130px] bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-500"
        style={{ opacity: isExpanded ? 0.5 : 0.3 }}
      />
      <div
        className="absolute right-13 top-0 bottom-0 w-[160px] bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-500"
        style={{ opacity: isExpanded ? 0.5 : 0.3 }}
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
              isExpanded ? 'opacity-0 max-h-0' : 'opacity-100 max-h-4'
            }`}
          >
            <ChevronDown className="w-4 h-4 text-pink-600 animate-pulse" />
          </div>
          {/* Expanded content */}
          <div
            className={`overflow-visible transition-all ${
              isExpanded
                ? 'opacity-100 max-h-[150px] mt-4 duration-500 delay-75'
                : 'opacity-0 max-h-0 mt-0 duration-300'
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
                <hr className="my-3 border-pink-600/15 w-4/5 mx-auto" />
              </>
            )}
            <div>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {secondaryLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 no-underline font-semibold px-2 py-0.5 rounded-lg bg-white/50 border-[1.5px] border-pink-600/15 transition-all duration-200 hover:bg-white/85 hover:border-pink-600 hover:-translate-y-px hover:shadow-sm"
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