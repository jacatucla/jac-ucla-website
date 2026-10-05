import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {BannerLinks} from './collections/BannerLinks'
import { PageLinks } from './collections/PageLinks'
import {BasicInfo} from './collections/BasicInfo'
import { BoardCarousel } from './collections/BoardCarousel'
import { HeroCarousel } from './collections/HeroCarousel'
import { Schedule } from './collections/Schedule'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Must match the logic in next.config.mjs, otherwise image URLs and
// next/image remotePatterns can disagree about which host is ours.
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

// The production domain redirects apex <-> www (whichever direction Vercel
// is configured for), so a request can legitimately arrive from either
// hostname even though `serverURL` above only names one of them. Trust both
// for CORS/CSRF so a future domain change (or a misconfigured
// NEXT_PUBLIC_SERVER_URL) degrades to a clear CSRF rejection instead of a
// silent "you do not have permission" on every admin write.
const withWwwVariant = (url: string): string[] => {
  try {
    const parsed = new URL(url)
    const variant = new URL(url)
    variant.hostname = parsed.hostname.startsWith('www.')
      ? parsed.hostname.slice(4)
      : `www.${parsed.hostname}`
    return [parsed.origin, variant.origin]
  } catch {
    return [url]
  }
}

const trustedOrigins = Array.from(
  new Set([...withWwwVariant(serverURL), 'http://localhost:3000']),
)

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [BasicInfo, Schedule, HeroCarousel, BannerLinks, PageLinks, BoardCarousel, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: {
          // Serve media straight from the blob CDN instead of proxying it
          // through /api/media/file/*, so image URLs never depend on serverURL.
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'noreply@jacatucla.org',
    defaultFromName: 'jacatucla',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  serverURL,
  cors: trustedOrigins,
  csrf: trustedOrigins,
})
