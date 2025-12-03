import type { SupabaseClient } from '@supabase/supabase-js'

const STORAGE_BUCKET = 'bakery-images' // перевір назву bucket у Supabase

type Folder = 'products' | 'categories'

export const useStorageImages = () => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  /**
   * Завантажити файл у Supabase Storage і повернути publicUrl.
   * Якщо RLS забороняє вставку — повертаємо null (не кидаємо помилку),
   * щоб не ламати saveProduct/saveCategory.
   */
  const uploadImage = async (folder: Folder, file: File, slug: string) => {
    if (!file) return null

    const ext = file.name.split('.').pop() || 'jpg'
    const sanitizedSlug = slug || file.name.split('.')[0]
    const path = `${folder}/${sanitizedSlug}-${Date.now()}.${ext}`

    try {
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('uploadImage error', uploadError)
        if (typeof uploadError.message === 'string' &&
            uploadError.message.includes('row-level security')) {
          console.warn(
            'Supabase Storage RLS: дозволи на INSERT для цього bucket. ' +
            'Перевір політики в розділі Storage → Policies.'
          )
        }
        return null
      }

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      return data.publicUrl
    } catch (e) {
      console.error('uploadImage exception', e)
      return null
    }
  }

  /**
   * Хелпер: чи URL зовнішній (Supabase / інший CDN), чи локальний (/images/...).
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
