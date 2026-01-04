import React from 'react'
import {Home, Calendar, Mail} from 'lucide-react'

export default function SideNavBar()
{
    const navLinks = [
        { name: 'Home', icon: Home, href: '#home' },
        { name: 'Events', icon: Calendar, href: '#events' },
        { name: 'Contact Us', icon: Mail, href: '#contact' },
      ];
    
    return (
        <div className="absolute h-screen top-0 left-0 z-10 group w-20 hover:w-64 bg-gradient-to-b from-pink-50 to-purple-50 border-r-4 border-pink-200 flex flex-col backdrop-blur-sm transition-all duration-300 ease-in-out">
        {/* Logo/Brand */}
        <div className="p-6 border-b-2 border-pink-200 overflow-hidden flex items-center justify-center min-h-40">
          <div className="relative flex items-center justify-center">
            {/* Vertical JAC (visible when collapsed) */}
            <div className="flex flex-col items-center opacity-100 group-hover:opacity-0 transition-opacity absolute left-1/2 -translate-x-1/2">
              <span className="text-2xl font-bold text-pink-600">J</span>
              <span className="text-2xl font-bold text-pink-600">A</span>
              <span className="text-2xl font-bold text-pink-600">C</span>
            </div>
            {/* Horizontal JAC @ UCLA (visible when expanded) */}
            <p className="text-xl font-bold text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              JAC @ UCLA
            </p>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex-1 p-4 text-pink-600">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-pink-600 rounded-xl hover:bg-pink-100/60 hover:shadow-md transition-all duration-300 font-medium overflow-hidden whitespace-nowrap"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 relative left-2 -translate-x-1/2 opacity-100" />
                    {/*<Icon className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100" />*/}

                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t-2 border-pink-200 min-h-35">
          <div className="flex flex-col group-hover:flex-row gap-4 items-center align-middle justify-center h-full">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-300 hover:shadow-md"
              aria-label="Discord"
            >
              <svg
                className="w-5 h-5 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-300 hover:shadow-md"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
}