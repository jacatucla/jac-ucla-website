import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import SideNavBar from '../components/SideNavBar'
import { defaultLinks, linkIcons } from '../components/siteLinks'
import '../styles.css'

export const metadata = {
  title: 'Links | Japanese Animation Club @ UCLA',
  description: 'All the links for the Japanese Animation Club at UCLA in one place.',
}

// Statically render this page and refresh it at most once every 5 minutes.
// Payload collection hooks call revalidatePath('/links') on edit.
export const revalidate = 300

type LinkButtonProps = {
  text: string
  href: string
  Icon: React.ComponentType<{ className?: string }>
}

// Text colour goes on the children: the global `a { color: currentColor }` rule
// in styles.css overrides Tailwind colour utilities on the anchor itself.
const LinkButton = ({ text, href, Icon }: LinkButtonProps) => (
  <a
    href={href}
    className="flex items-center gap-3 w-full px-5 py-3 md:px-6 md:py-3.5 rounded-2xl no-underline bg-white/70 border-2 border-pink-400 shadow-md backdrop-blur-xs transition-all duration-200 hover:bg-white/95 hover:border-pink-600 hover:-translate-y-0.5 hover:shadow-lg"
  >
    <Icon className="w-5 h-5 flex-shrink-0 text-pink-600" />
    <span className="flex-1 text-center text-pink-600 font-semibold text-base md:text-lg">{text}</span>
    <span className="w-5 flex-shrink-0" aria-hidden="true"></span>
  </a>
)

export default async function LinksPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [{ docs: pageLinks }, { docs: bannerLinks }] = await Promise.all([
    payload.find({
      collection: 'pageLinks',
      where: { visible: { equals: true } },
      sort: 'order',
      limit: 50,
    }),
    payload.find({ collection: 'bannerLinks', limit: 15 }),
  ])

  // Links-page-only entries first, then whatever is currently enabled on the banner
  const cmsLinks = [
    ...pageLinks.map((item) => ({ ...item, fallbackIcon: 'link-icon' })),
    ...bannerLinks
      .filter((item) => item.visible === true)
      .map((item) => ({ ...item, fallbackIcon: 'form-icon' })),
  ].map((item) => ({
    text: item.Text,
    href: item.Link,
    Icon: linkIcons[item['Icon Type'] ?? item.fallbackIcon],
  }))

  return (
    <div className='scroll-smooth overflow-x-hidden bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen'>
      <SideNavBar />
      {/* Top padding on mobile clears the fixed menu button */}
      <div className="relative min-h-screen px-4 pt-24 md:pt-16 pb-16">
        <div className="absolute inset-0 bg-[url('/animebg.png')] bg-repeat bg-[size:400px_400px] opacity-80 pointer-events-none"></div>

        <div className="w-full md:w-2/3 mx-auto relative z-10 font-['Comfortaa']">
          <div className="border-4 border-pink-400 rounded-2xl px-5 py-5 md:px-8 md:py-6 bg-white/55 backdrop-blur-xs shadow-lg mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-light text-pink-600 text-center tracking-wider">
              LINKS
            </h2>
          </div>

          {cmsLinks.length > 0 && (
            <>
              <ul className="space-y-3">
                {cmsLinks.map((link, index) => (
                  <li key={index}>
                    <LinkButton {...link} />
                  </li>
                ))}
              </ul>
              <hr className="my-5 md:my-6 border-pink-600/30 w-4/5 mx-auto" />
            </>
          )}

          <ul className="space-y-3">
            {defaultLinks.map((link) => (
              <li key={link.text}>
                <LinkButton {...link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
