<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold tracking-tight">Продукти</h1>
        <p class="text-xs text-slate-600">
          Керування продуктами: ціни, описи, вага, фото та належність до категорій.
        </p>
      </div>
      <NuxtLink
        to="/admin"
        class="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2"
      >
        ← до панелі
      </NuxtLink>
    </header>

    <div class="grid md:grid-cols-[2.2fr,1.4fr] gap-6 items-start">
      <!-- Список продуктів -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Список продуктів</h2>
          <button
            class="text-xs rounded-full border px-3 py-1 hover:bg-slate-50"
            @click="startNewProduct"
          >
            + Новий продукт
          </button>
        </div>

        <div class="rounded-2xl border bg-white overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left">ID</th>
                <th class="px-3 py-2 text-left">Назва</th>
                <th class="px-3 py-2 text-left">Категорія</th>
                <th class="px-3 py-2 text-left">Ціна</th>
                <th class="px-3 py-2 text-left">Вага (г)</th>
                <th class="px-3 py-2 text-left">Активний</th>
                <th class="px-3 py-2 text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="prod in products"
                :key="prod.id"
                class="border-t hover:bg-slate-50/60 cursor-pointer"
                @click="selectProduct(prod)"
              >
                <td class="px-3 py-2 text-xs text-slate-500">#{{ prod.id }}</td>
                <td class="px-3 py-2">{{ prod.name }}</td>
                <td class="px-3 py-2 text-xs text-slate-500">
                  {{ categoryNameById(prod.category_id) }}
                </td>
                <td class="px-3 py-2 text-xs">₴{{ Number(prod.price).toFixed(2) }}</td>
                <td class="px-3 py-2 text-xs">{{ prod.weight_grams || '—' }}</td>
                <td class="px-3 py-2 text-xs">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px]"
                    :class="prod.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ prod.is_active ? 'Так' : 'Ні' }}
                  </span>
                </td>
                <td class="px-3 py-2 text-right text-xs text-slate-500">
                  Редагувати
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Права панель: форма продукту -->
      <section class="space-y-4 rounded-2xl border bg-white p-4 shadow-sm text-sm">
        <h3 class="text-base font-semibold">
          {{ productForm.id ? 'Редагування продукту' : 'Новий продукт' }}
        </h3>

        <form class="space-y-3" @submit.prevent="saveProduct">
          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Назва</label>
              <input
                v-model="productForm.name"
                type="text"
                required
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Slug (латиниця)</label>
              <input
                v-model="productForm.slug"
                type="text"
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
              <p class="text-[11px] text-slate-400 mt-1">
                Якщо залишити порожнім — згенеруємо з назви (uk → латиниця).
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Категорія</label>
              <select
                v-model.number="productForm.category_id"
                required
                class="w-full rounded-xl border px-3 py-2 text-sm"
              >
                <option disabled value="">Оберіть категорію</option>
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">Ціна, ₴</label>
                <input
                  v-model.number="productForm.price"
                  type="number"
                  step="0.01"
                  required
                  class="w-full rounded-xl border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1">Вага, г</label>
                <input
                  v-model.number="productForm.weight_grams"
                  type="number"
                  class="w-full rounded-xl border px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Stock</label>
              <input
                v-model.number="productForm.stock"
                type="number"
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div class="flex items-end gap-2">
              <input
                id="prod-active"
                v-model="productForm.is_active"
                type="checkbox"
                class="h-4 w-4 rounded border"
              />
              <label for="prod-active" class="text-xs text-slate-700">Активний</label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Опис</label>
            <textarea
              v-model="productForm.description"
              rows="4"
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>

          <!-- Зображення продукту -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-slate-600 mb-1">Зображення</label>
            <div v-if="productForm.image_url" class="flex items-center gap-3">
              <img
                :src="productForm.image_url"
                alt=""
                class="h-16 w-16 rounded-lg object-cover border"
              />
              <span class="text-[11px] text-slate-500 break-all">
                {{ productForm.image_url }}
              </span>
            </div>
            <p class="text-[11px] text-slate-400">
              Якщо не обирати файл, залишиться поточне зображення.
              Для стартових товарів використовується /images/&lt;slug&gt;.jpg.
            </p>
            <input
              :key="productImageInputKey"
              type="file"
              accept="image/*"
              @change="onProductImageChange"
            />
          </div>

          <div class="flex items-center justify-between pt-2">
            <button
              type="submit"
              class="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600"
            >
              Зберегти продукт
            </button>
            <button
              v-if="productForm.id"
              type="button"
              class="text-xs text-red-600 hover:text-red-700"
              @click="deleteProduct"
            >
              Видалити продукт
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

const nuxtApp = useNuxtApp()
const supabase = nuxtApp.$supabase
const { uploadImage } = useStorageImages()

// ----------------- SLUG HELPER (укр → латиниця) -----------------
const createSlug = (value: string | null | undefined): string => {
  if (!value) return ''
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie',
    ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'i', к: 'k', л: 'l',
    м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ю: 'iu', я: 'ia',
    А: 'a', Б: 'b', В: 'v', Г: 'h', Ґ: 'g', Д: 'd', Е: 'e', Є: 'ie',
    Ж: 'zh', З: 'z', И: 'y', І: 'i', Ї: 'yi', Й: 'i', К: 'k', Л: 'l',
    М: 'm', Н: 'n', О: 'o', П: 'p', Р: 'r', С: 's', Т: 't', У: 'u',
    Ф: 'f', Х: 'kh', Ц: 'ts', Ч: 'ch', Ш: 'sh', Щ: 'shch', Ю: 'iu', Я: 'ia'
  }

  const transliterated = value
    .split('')
    .map((ch) => (map[ch] !== undefined ? map[ch] : ch))
    .join('')

  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type Category = {
  id: number
  name: string
  slug: string
  image_url: string | null
  sort: number | null
  is_active: boolean
}

type Product = {
  id: number
  category_id: number
  name: string
  slug: string
  price: number
  description: string | null
  image_url: string | null
  stock: number | null
  weight_grams: number | null
  is_active: boolean
}

const categories = ref<Category[]>([])
const products = ref<Product[]>([])

const productForm = reactive<Partial<Product>>({
  id: undefined,
  category_id: undefined,
  name: '',
  slug: '',
  price: 0,
  description: '',
  image_url: '',
  stock: 0,
  weight_grams: null,
  is_active: true
})
const productImageFile = ref<File | null>(null)
const productImageInputKey = ref(0)

const resetProductImageInput = () => {
  productImageFile.value = null
  productImageInputKey.value++
}

const loadCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort', { ascending: true })
  if (error) {
    console.error('loadCategories', error)
    return
  }
  categories.value = data as Category[]
}

const loadProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })
  if (error) {
    console.error('loadProducts', error)
    return
  }
  products.value = data as Product[]
}

const startNewProduct = () => {
  Object.assign(productForm, {
    id: undefined,
    category_id: undefined,
    name: '',
    slug: '',
    price: 0,
    description: '',
    image_url: '',
    stock: 0,
    weight_grams: null,
    is_active: true
  })
  resetProductImageInput()
}

const selectProduct = (prod: Product) => {
  Object.assign(productForm, prod)
  resetProductImageInput()
}

const onProductImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  productImageFile.value = file
}

const saveProduct = async () => {
  try {
    if (!productForm.category_id) {
      alert('Оберіть категорію')
      return
    }

    if ((!productForm.slug || !productForm.slug.trim()) && productForm.name) {
      productForm.slug = createSlug(productForm.name)
    }

    let imageUrl = productForm.image_url || null

    if (productImageFile.value && productForm.slug) {
      const uploadedUrl = await uploadImage('products', productImageFile.value, productForm.slug)
      if (uploadedUrl) {
        imageUrl = uploadedUrl
      }
    } else if (!productForm.id && !imageUrl && productForm.slug) {
      imageUrl = `/images/${productForm.slug}.jpg`
    }

    const payload = {
      category_id: productForm.category_id,
      name: productForm.name,
      slug: productForm.slug,
      price: productForm.price ?? 0,
      description: productForm.description ?? '',
      image_url: imageUrl,
      stock: productForm.stock ?? 0,
      weight_grams: productForm.weight_grams,
      is_active: productForm.is_active ?? true
    }

    if (productForm.id) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', productForm.id)
      if (error) throw error
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      Object.assign(productForm, data)
    }

    await loadProducts()
    resetProductImageInput()
  } catch (e) {
    console.error('saveProduct error', e)
  }
}

const deleteProduct = async () => {
  if (!productForm.id) return
  if (!confirm('Видалити цей продукт?')) return

  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productForm.id)
    if (error) throw error
    startNewProduct()
    await loadProducts()
  } catch (e) {
    console.error('deleteProduct error', e)
  }
}

const categoryNameById = (id: number | null | undefined) => {
  if (!id) return ''
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : ''
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadProducts()])
})
</script>
