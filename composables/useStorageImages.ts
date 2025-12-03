import type { SupabaseClient } from '@supabase/supabase-js'

const STORAGE_BUCKET = 'bakery-images'

type Folder = 'products' | 'categories'

export const useStorageImages = () => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  // ---------------------------
  // Upload image to Supabase
  // ---------------------------
  const uploadImage = async (folder: Folder, file: File, slug: string) => {
    if (!file) return null

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${slug}-${Date.now()}.${ext}`
    const path = `${folder}/${filename}`

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true })

    if (error) {
      console.error('uploadImage error:', error)
      return null
    }

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path)

    return data.publicUrl
  }

  // ---------------------------
  // Detect external URL
  // ---------------------------
  const isExternalUrl = (url?: string | null) => {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
  }

  // ---------------------------
  // Extract internal path from public Supabase URL
  // ---------------------------
  const parsePathFromPublicUrl = (publicUrl: string): string | null => {
    try {
      const u = new URL(publicUrl)
      const segments = u.pathname.split('/') // /storage/v1/object/public/bucket/path/to/file.jpg

      const bucketIndex = segments.indexOf(STORAGE_BUCKET)
      if (bucketIndex === -1) return null

      return segments.slice(bucketIndex + 1).join('/') // path/to/file.jpg
    } catch (e) {
      console.error('parsePathFromPublicUrl error:', e)
      return null
    }
  }

  // ---------------------------
  // Remove image from Supabase Storage
  // ---------------------------
  const removeImageByPublicUrl = async (publicUrl?: string | null) => {
    if (!publicUrl) return
    if (!isExternalUrl(publicUrl)) return // локальні /images/... не чіпаємо

    const path = parsePathFromPublicUrl(publicUrl)
    if (!path) {
      console.warn('Cannot parse storage path from URL:', publicUrl)
      return
    }

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path])

    if (error) {
      console.error('removeImage error:', error)
    }
  }

  return {
    uploadImage,
    isExternalUrl,
    removeImageByPublicUrl
  }
}
