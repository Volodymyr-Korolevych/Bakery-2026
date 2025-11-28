-- Схема бази даних для проєкту Bakery-2026 (без статусів замовлень)

-- 0) profiles (зв’язок з auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text unique,
  created_at timestamptz default now()
);

-- 1) categories
create table if not exists public.categories (
  id bigserial primary key,
  name text not null,
  slug text not null unique,
  image_url text,
  sort int default 0,
  is_active boolean default true
);

-- 2) products
create table if not exists public.products (
  id bigserial primary key,
  category_id bigint not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  price numeric(10,2) not null,
  description text,
  image_url text,
  stock int default 0,
  weight_grams int,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 3) pickup_locations
create table if not exists public.pickup_locations (
  id bigserial primary key,
  name text not null,
  address text not null,
  work_hours text,
  is_active boolean default true
);

-- 4) orders (без статусу)
create table if not exists public.orders (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  total numeric(10,2) not null,
  pickup_location_id bigint references public.pickup_locations(id) on delete set null,
  phone text not null,
  notes text,
  created_at timestamptz default now()
);

-- 5) order_items
create table if not exists public.order_items (
  id bigserial primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete restrict,
  qty int not null check (qty > 0),
  price numeric(10,2) not null
);

-- Індекси
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_categories_sort on public.categories(sort);
create index if not exists idx_orders_user on public.orders(user_id);
