# TechBlog - Blog Tecnológico con Next.js 16 y Supabase

Un blog tecnológico moderno construido con **Next.js 16 (App Router)**, **Supabase** (PostgreSQL + Auth + Realtime), **TypeScript** y **Tailwind CSS**. Utiliza **Server Components** por defecto y **Row Level Security (RLS)** para control de acceso a datos.

## 🚀 Características

- **Next.js 16 App Router** - Routing basado en archivos con Server Components por defecto
- **Supabase** - Backend-as-a-Service con PostgreSQL, Auth y Realtime
- **Server Components** - Renderizado en servidor para mejor SEO y performance
- **Row Level Security (RLS)** - Políticas de seguridad a nivel de base de datos
- **TypeScript** - Tipado estático en todo el proyecto
- **Tailwind CSS** - Estilos utilitarios con modo oscuro nativo
- **Dynamic Routes** - Rutas dinámicas para categorías y posts
- **Loading & Error UI** - Estados de carga y error integrados con `loading.tsx` y `error.tsx`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx           # Layout raíz con metadata
│   ├── page.tsx             # Home - Server Component con datos de Supabase
│   ├── loading.tsx          # UI de carga global
│   ├── error.tsx            # UI de error global con botón reintentar
│   ├── categoria/
│   │   └── [slug]/
│   │       └── page.tsx     # Posts por categoría (Dynamic Route)
│   └── post/
│       └── [id]/
│           └── page.tsx     # Detalle de post (Dynamic Route)
├── lib/
│   └── supabase.ts          # Cliente Supabase configurado
setup_db.sql                 # Script SQL para crear tablas, datos y RLS
.env.local                   # Variables de entorno (no committear)
```

## 🛠️ Requisitos Previos

- Node.js 18.17 o superior
- Cuenta en [Supabase](https://supabase.com) (gratuita)
- npm / pnpm / yarn

## ⚙️ Instalación

### 1. Clonar e instalar dependencias

```bash
cd blog-tech
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **Settings > API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Crea el archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. Ejecutar migración de base de datos

1. En Supabase Dashboard, ve a **SQL Editor**
2. Copia y pega el contenido de `setup_db.sql`
3. Ejecuta el script (crea tablas, inserta datos de ejemplo, activa RLS y políticas)

### 4. Iniciar desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Base de Datos

### Esquema

```sql
-- Tabla categorias
categorias (
  id UUID PRIMARY KEY,
  nombre VARCHAR(100),
  slug VARCHAR(100) UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMPTZ
)

-- Tabla posts
posts (
  id UUID PRIMARY KEY,
  titulo VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  contenido TEXT,
  resumen TEXT,
  imagen_url TEXT,
  categoria_id UUID REFERENCES categorias(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Row Level Security (RLS)

Ambas tablas tienen RLS activado con políticas de **lectura pública**:

```sql
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON categorias FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON posts FOR SELECT USING (true);
```

> **Nota**: Para producción, añade políticas de escritura autenticadas usando `auth.role() = 'authenticated'`.

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.x | Framework React con App Router |
| React | 19.x | Librería UI |
| Supabase | 2.x | Cliente JS para PostgreSQL/Auth |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos utilitarios |
| ESLint | 9.x | Linting |

## 📝 Licencia

MIT License - Libre para uso personal y comercial.

---

**Desarrollado como demostración de Next.js 16 App Router + Supabase + Server Components + RLS**