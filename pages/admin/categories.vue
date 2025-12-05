<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold tracking-tight">Категорії</h1>
        <p class="text-xs text-slate-600">
          Керування переліком категорій та їх зображеннями.
        </p>
      </div>
      <NuxtLink to="/admin" class="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2">
        ← до панелі
      </NuxtLink>
    </header>

    <div class="grid md:grid-cols-[2fr,1.4fr] gap-6 items-start">
      <!-- Список категорій -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Список категорій</h2>
          <button class="text-xs rounded-full border px-3 py-1 hover:bg-slate-50" @click="startNewCategory">
            + Нова категорія
          </button>
        </div>

        <div class="rounded-2xl border bg-white overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left">ID</th>
                <th class="px-3 py-2 text-left">Назва</th>
                <th class="px-3 py-2 text-left">Slug</th>
                <th class="px-3 py-2 text-left">Sort</th>
                <th class="px-3 py-2 text-left">Активна</th>
                <th class="px-3 py-2 text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categories" :key="cat.id" class="border-t hover:bg-slate-50/60 cursor-pointer"
                @click="selectCategory(cat)">
                <td class="px-3 py-2 text-xs text-slate-500">#{{ cat.id }}</td>
                <td class="px-3 py-2">{{ cat.name }}</td>
                <td class="px-3 py-2 text-xs text-slate-500">{{ cat.slug }}</td>
                <td class="px-3 py-2 text-xs">{{ cat.sort }}</td>
                <td class="px-3 py-2 text-xs">
                  <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px]"
                    :class="cat.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'">
                    {{ cat.is_active ? 'Так' : 'Ні' }}
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

      <!-- Права панель: форма категорії -->
      <section class="space-y-4 rounded-2xl border bg-white p-4 shadow-sm text-sm">
        <h3 class="text-base font-semibold">
          {{ categoryForm.id ? 'Редагування категорії' : 'Нова категорія' }}
        </h3>

        <form class="space-y-3" @submit.prevent="saveCategory">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Назва</label>
            <input v-model="categoryForm.name" type="text" required
              class="w-full rounded-xl border px-3 py-2 text-sm" />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Slug (латиниця)</label>
            <input v-model="categoryForm.slug" type="text" class="w-full rounded-xl border px-3 py-2 text-sm" />
            <p class="text-[11px] text-slate-400 mt-1">
              Якщо залишити порожнім — згенеруємо автоматично з назви (uk → латиниця).
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Sort</label>
              <input v-model.number="categoryForm.sort" type="number"
                class="w-full rounded-xl border px-3 py-2 text-sm" />
            </div>
            <div class="flex items-end gap-2">
              <input id="cat-active" v-model="categoryForm.is_active" type="checkbox" class="h-4 w-4 rounded border" />
              <label for="cat-active" class="text-xs text-slate-700">Активна</label>
            </div>
          </div>

          <!-- Зображення -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-slate-600 mb-1">Зображення</label>

            <div v-if="categoryForm.image_url" class="flex items-center gap-3">
              <!-- як у products: зовнішнє / внутрішнє -->
              <img v-if="imageIsExternal" :src="categoryForm.image_url" alt=""
                class="h-16 w-16 rounded-lg object-cover border" />
              <img v-else :src="'/images/' + categoryForm.image_url" alt=""
                class="h-16 w-16 rounded-lg object-cover border" />

              <div class="text-[11px] text-slate-500 break-all space-y-0.5">
                <div>{{ categoryForm.image_url }}</div>
                <div class="text-[10px]">
                  Тип:
                  <span v-if="imageIsExternal" class="text-emerald-600">
                    зовнішнє (Supabase / CDN)
                  </span>
                  <span v-else class="text-slate-600">
                    внутрішнє (/images/…)
                  </span>
                </div>
              </div>
            </div>

            <p class="text-[11px] text-slate-400">
              Якщо не обирати файл, залишиться поточне зображення.
              Для стартових категорій можна використовувати /images/&lt;slug&gt;.jpg.
            </p>

            <!-- кастомний file input з укр. текстами -->
            <div class="space-y-1">
              <label class="text-xs text-slate-600 font-medium">Завантажити зображення</label>

              <div class="flex items-center gap-3">
                <input ref="categoryFileInputRef" :key="categoryImageInputKey" type="file" accept="image/*"
                  class="hidden" @change="onCategoryImageChange" />

                <button type="button" class="px-3 py-1.5 text-xs rounded-full bg-slate-200 hover:bg-slate-300"
                  @click="categoryFileInputRef?.click()">
                  Обрати файл
                </button>

                <span class="text-xs text-slate-500">
                  {{ categorySelectedFileName || 'Файл не вибрано' }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <button type="submit"
              class="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600">
              Зберегти категорію
            </button>
            <button v-if="categoryForm.id" type="button" class="text-xs text-red-600 hover:text-red-700"
              @click="deleteCategory">
              Видалити категорію
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
const { uploadImage, isExternalUrl, removeImageByPublicUrl } = useStorageImages()

// ---------- SLUG (укр → латиниця) ----------
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
    .map(ch => (map[ch] !== undefined ? map[ch] : ch))
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

const categories = ref<Category[]>([])

const categoryForm = reactive<Partial<Category>>({
  id: undefined,
  name: '',
  slug: '',
  image_url: '',
  sort: 0,
  is_active: true
})

const categoryImageFile = ref<File | null>(null)
const categoryImageInputKey = ref(0)
const categoryFileInputRef = ref<HTMLInputElement | null>(null)
const categorySelectedFileName = ref<string>('')

const imageIsExternal = computed(() =>
  isExternalUrl(categoryForm.image_url || '')
)

const resetCategoryImageInput = () => {
  categoryImageFile.value = null
  categoryImageInputKey.value++
  categorySelectedFileName.value = ''
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

const startNewCategory = () => {
  Object.assign(categoryForm, {
    id: undefined,
    name: '',
    slug: '',
    image_url: '',
    sort: (categories.value[categories.value.length - 1]?.sort || 0) + 10,
    is_active: true
  })
  resetCategoryImageInput()
}

const selectCategory = (cat: Category) => {
  Object.assign(categoryForm, cat)
  resetCategoryImageInput()
}

const onCategoryImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  categoryImageFile.value = file
  categorySelectedFileName.value = file ? file.name : 'Файл не вибрано'
}

const saveCategory = async () => {
  try {
    if ((!categoryForm.slug || !categoryForm.slug.trim()) && categoryForm.name) {
      categoryForm.slug = createSlug(categoryForm.name)
    }

    let imageUrl = categoryForm.image_url || null

    // Якщо обрано новий файл — заливаємо в Supabase (зовнішній URL)
    if (categoryImageFile.value && categoryForm.slug) {
      const uploadedUrl = await uploadImage('categories', categoryImageFile.value, categoryForm.slug)
      if (uploadedUrl) {
        imageUrl = uploadedUrl
      }
    } else if (!categoryForm.id && !imageUrl && categoryForm.slug) {
      // нова категорія без власного URL → вважаємо, що є локальне зображення
      // у /public/images/<slug>.jpg → в БД зберігаємо лише ім'я файлу
      imageUrl = `${categoryForm.slug}.jpg`
    }

    const payload = {
      name: categoryForm.name,
      slug: categoryForm.slug,
      image_url: imageUrl,
      sort: categoryForm.sort ?? 0,
      is_active: categoryForm.is_active ?? true
    }

    if (categoryForm.id) {
      const { error } = await supabase
        .from('categories')
        .update(payload)
        .eq('id', categoryForm.id)
      if (error) throw error
    } else {
      const { data, error } = await supabase
        .from('categories')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      Object.assign(categoryForm, data)
    }

    await loadCategories()
    resetCategoryImageInput()
  } catch (e) {
    console.error('saveCategory error', e)
  }
}

const deleteCategory = async () => {
  if (!categoryForm.id) return

  const confirmed = confirm('Видалити цю категорію?')
  if (!confirmed) return

  try {
    // якщо зображення зовнішнє — пробуємо видалити з Supabase Storage
    if (categoryForm.image_url && isExternalUrl(categoryForm.image_url)) {
      await removeImageByPublicUrl(categoryForm.image_url)
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryForm.id)

    if (error) {
      console.error('deleteCategory error', error)
      alert('Помилка при видаленні категорії: ' + error.message)
      return
    }

    startNewCategory()
    await loadCategories()
  } catch (e) {
    console.error('deleteCategory unexpected error', e)
  }
}

onMounted(async () => {
  await loadCategories()
})
</script>
