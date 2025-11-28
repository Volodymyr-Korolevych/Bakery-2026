# Bakery-2026 — дипломний проєкт пекарні (Nuxt 3 + Supabase + Tailwind)

Це стартовий репозиторій для дипломного проєкту **«Розроблення WEB-застосунку для замовлення продукції пекарні»**.

- Frontend: **Nuxt 3**
- Стилі: **Tailwind CSS**
- База даних, Auth, Storage: **Supabase (PostgreSQL)**
- Диплой: **Vercel**

Проєкт налаштований так, щоб після мінімальних кроків **одразу запуститися локально і на Vercel**.

---

## 1. Підготовка Supabase

1. Зайди на https://supabase.com і створи новий проєкт.
2. На вкладці **Settings → API** скопіюй:
   - `Project URL` → буде `NUXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → буде `NUXT_PUBLIC_SUPABASE_ANON_KEY`
3. Перейди у **SQL Editor**.
4. Створи новий SQL-запит і встав вміст файлу `supabase/schema.sql` з цього репозиторію.
5. Виконай запит (Run).  
   Це створить таблиці:
   - `profiles`
   - `categories`
   - `products`
   - `pickup_locations`
   - `orders`
   - `order_items`

> На цьому етапі RLS можна залишити **вимкненим**, щоб швидко запустити проєкт. Для дипломної записки політики доступу можна додати окремо.

### Storage

1. У Supabase перейди до вкладки **Storage → Buckets**.
2. Створи bucket, наприклад `products`, тип **Public**.
3. Надалі зображення товарів будуть завантажуватися саме сюди (логіка завантаження буде реалізована у коді адмін-панелі).

---

## 2. Налаштування змінних середовища (.env.local)

У корені проєкту створи файл **`.env.local`** з таким вмістом:

```bash
NUXT_PUBLIC_SUPABASE_URL="https://....supabase.co"
NUXT_PUBLIC_SUPABASE_ANON_KEY="..."
NUXT_ADMIN_EMAILS="admin@example.com"
NUXT_PUBLIC_SITE_NAME="Пекарня Bakery-2026"
```

- `NUXT_ADMIN_EMAILS` — список email’ів через кому, які будуть вважатися адміністраторами (мають доступ до `/admin`). Наприклад:
  ```bash
  NUXT_ADMIN_EMAILS="admin@example.com,another-admin@example.com"
  ```

---

## 3. Запуск проєкту локально

### Вимоги

- Node.js **20.x** (LTS)
- npm або yarn/pnpm (в інструкції далі — npm)

### Кроки

1. Встанови залежності:

```bash
npm install
```

2. Переконайся, що файл `.env.local` створений і заповнений.
3. Запусти dev-сервер:

```bash
npm run dev
```

4. Відкрий у браузері: **http://localhost:3000**

Ти побачиш головну сторінку пекарні.  
Адмін-панель доступна за адресою `/admin`, але тільки для користувачів, чиї email-адреси вказані в `NUXT_ADMIN_EMAILS`.

---

## 4. Початкове наповнення даними

Щоб інтерфейс не був порожнім:

1. Створи адміністратора:
   - Зайди на `/account`
   - Зареєструйся з email’ом, який вказаний у `NUXT_ADMIN_EMAILS`
2. Зайди під цим email’ом як адмін і відкрий `/admin`.
3. Через адмін-панель (пізніше) будуть реалізовані екрани:
   - **Категорії** (`/admin/categories`)
   - **Товари** (`/admin/products`)
   - **Точки самовивозу** (`/admin/pickups`)
   - **Замовлення** (`/admin/orders` — тільки перегляд)

Поки у файлах сторінок адмінки стоять текстові заглушки — це нормальний стан стартового проєкту; логіку CRUD можна додати поетапно.

---

## 5. Вивантаження проєкту в GitHub

### Якщо ти завантажила ZIP з цього репозиторію

1. Розпакуй архів у папку, наприклад `Bakery-2026`.
2. Відкрий термінал у цій папці:

```bash
cd Bakery-2026
```

3. Ініціалізуй git:

```bash
git init
```

4. Додай усі файли:

```bash
git add .
```

5. Зроби перший коміт:

```bash
git commit -m "Initial Bakery-2026 project"
```

6. Створи порожній репозиторій на GitHub з назвою **Bakery-2026**.
7. Прив’яжи локальний проєкт до GitHub (підстав свій логін):

```bash
git remote add origin https://github.com/<your-username>/Bakery-2026.git
git branch -M main
git push -u origin main
```

---

## 6. Деплой на Vercel

1. Зайди на https://vercel.com і увійди.
2. Натисни **Add New → Project**.
3. Обери репозиторій **Bakery-2026** з GitHub.
4. Vercel сам розпізнає Nuxt-проєкт. Перевір налаштування:
   - Framework Preset: **Nuxt.js**
   - Build Command: `npm run build`
   - Output Directory: (за замовчуванням для Nuxt 3 — autodetect, залиш як є)
5. Перейди на вкладку **Environment Variables** у Vercel-проєкті й додай ті самі змінні, що в `.env.local`:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NUXT_ADMIN_EMAILS`
   - `NUXT_PUBLIC_SITE_NAME`
6. Запусти деплой (Vercel зробить його автоматично після додавання змінних).

Після успішного деплою ти отримаєш URL виду:  
`https://bakery-2026-yourname.vercel.app`

---

## 7. Що вже працює «з коробки»

- Головна сторінка (`/`).
- Сторінка категорій (`/categories`) — підтягує дані з таблиці `categories`.
- Сторінка товарів категорії (`/categories/[slug]`).
- Картка товару (`/product/[slug]`) з кнопкою «Додати в кошик».
- Кошик (`/cart`) з можливістю змінити кількість і суму.
- Оформлення замовлення (`/checkout`) — створює запис у `orders` та `order_items`.
- Обліковий запис (`/account`):
  - реєстрація / вхід через Supabase Auth,
  - редагування профілю,
  - перегляд власних замовлень.
- Адмін-панель (`/admin`) — базовий каркас розділів, доступний лише адміністраторам.

Подальша розробка може включати:
- повноцінний CRUD для товарів, категорій та точок самовивозу у правій панелі,
- завантаження зображень у Storage з використанням slug,
- RLS-політики в Supabase.

---

## 8. Коротко: що робити після завантаження цього репозиторію

1. Створити проєкт у Supabase і виконати `supabase/schema.sql`.
2. Створити bucket для зображень (наприклад, `products`).
3. Створити `.env.local` з URL, ключем, email-ами адмінів.
4. `npm install`
5. `npm run dev` — перевірити локально.
6. Ініціалізувати git, запушити в GitHub.
7. Підключити репозиторій у Vercel, додати ті ж env-змінні.
8. Дочекатися деплою й зайти на production-URL.

Після цього проєкт уже можна показувати як робочий прототип на захисті.
