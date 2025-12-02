import type { SupabaseClient } from '@supabase/supabase-js'

const STORAGE_BUCKET = 'bakery-images' // створи bucket у Supabase з такою назвою

type Folder = 'products' | 'categories'

export const useStorageImages = () => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  /**
   * Завантажити файл у Supabase Storage і повернути publicUrl
   * - folder: 'products' | 'categories'
   * - slug: використаємо в шляху, щоб було читабельно
   */
  const uploadImage = async (folder: Folder, file: File, slug: string) => {
    if (!file) return null

    const ext = file.name.split('.').pop() || 'jpg'
    const sanitizedSlug = slug || file.name.split('.')[0]
    const path = `${folder}/${sanitizedSlug}-${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('uploadImage error', uploadError)
      throw uploadError
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  /**
   * Хелпер для визначення, локальне зображення чи зовнішнє.
   * - локальні: /images/...
   * - зовнішні: http(s)://...
   */
  const isExternalUrl = (url?: string | null) => {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
  }

  return {
    uploadImage,
    isExternalUrl
  }
}
