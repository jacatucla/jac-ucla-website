import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * The frontend pages are statically rendered with `export const revalidate`.
 * These hooks purge the affected paths as soon as content changes in the admin,
 * so editors see their edits immediately instead of waiting out the window.
 *
 * `next/cache` is imported lazily because the Payload config is also loaded
 * outside a Next.js runtime (`payload migrate`, `generate:types`), where a
 * top-level import of it would throw.
 */
async function purge(paths: string[]): Promise<void> {
  try {
    const { revalidatePath } = await import('next/cache')
    for (const path of paths) revalidatePath(path)
  } catch {
    // Running outside the Next.js server (CLI, migrations) — nothing to purge.
  }
}

/** Build afterChange + afterDelete hooks that revalidate the given paths. */
export function revalidateHooks(paths: string[]): {
  afterChange: [CollectionAfterChangeHook]
  afterDelete: [CollectionAfterDeleteHook]
} {
  // Awaited rather than fire-and-forget: revalidatePath must run before the
  // request finishes or Next.js may drop it.
  const afterChange: CollectionAfterChangeHook = async ({ doc, context }) => {
    if (!context?.disableRevalidate) await purge(paths)
    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
    if (!context?.disableRevalidate) await purge(paths)
    return doc
  }

  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

export const HOME = '/'
export const ABOUT = '/about-us'
