export type Category = {
  id: number
  name: string
  slug: string
  image_url: string | null
  sort: number
  is_active: boolean
}

export type Product = {
  id: number
  category_id: number
  name: string
  slug: string
  price: number
  description: string | null
  image_url: string | null
  stock: number
  weight_grams: number | null
  is_active: boolean
}

export const useCatalog = () => {
  const nuxtApp = useNuxtApp()

  const fetchCategories = async () => {
    const { data, error } = await nuxtApp.$supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort', { ascending: true })
    if (error) throw error
    return data as Category[]
  }

  const fetchProductsByCategorySlug = async (slug: string) => {
    const { data: category, error: catErr } = await nuxtApp.$supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (catErr) throw catErr
    if (!category) return { category: null, products: [] }

    const { data: products, error: prodErr } = await nuxtApp.$supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('name', { ascending: true })
    if (prodErr) throw prodErr

    return { category, products }
  }

  const fetchProductBySlug = async (slug: string) => {
    const { data, error } = await nuxtApp.$supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (error) throw error
    return data as Product | null
  }

  return {
    fetchCategories,
    fetchProductsByCategorySlug,
    fetchProductBySlug
  }
}
