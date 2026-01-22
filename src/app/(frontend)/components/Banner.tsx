'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
export default function Banner() {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
  
    // Load banner state on mount
    React.useEffect(() => {
      const loadBannerState = () => {
        try {
          const savedData = localStorage.getItem('banner-closed');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            const minutesSinceClosed = (Date.now() - parsedData.timestamp) / (1000 * 60);
            
            // Show banner again if it's been more than 30 minutes since it was closed
            if (minutesSinceClosed > 10) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          }
        } catch (error) {
          // Banner state doesn't exist yet, show banner
          console.log('No saved banner state');
        } finally {
          setIsLoading(false);
        }
      };
      loadBannerState();
    }, []);
  
    if (isLoading || !isVisible) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 border-b-2 border-pink-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 flex items-center justify-between gap-4">
        {/* Advertisement Text */}
        <div className="flex-1 text-center m-0 p-0">
          <div className="text-pink-600 font-bold text-sm md:text-base m-2 p-0 leading-tight">
             Officer Applications are open! Click <a className="underline" href="https://docs.google.com/forms/d/e/1FAIpQLSdxeTrauNwfp4r_iglzEFjtEf8JGWcENVwJCWNdm3YuzJ6kmg/viewform">here</a>
          </div>
        </div>
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            try {
              localStorage.setItem('banner-closed', JSON.stringify({
                timestamp: Date.now()
              }));
            } catch (error) {
              console.error('Failed to save banner state:', error);
            }
          }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-pink-200 hover:bg-pink-300 transition-all duration-300 hover:shadow-md"
          aria-label="Close banner"
        >
          <X className="w-4 h-4 text-pink-600" />
        </button>
      </div>
    </div>
  );
}