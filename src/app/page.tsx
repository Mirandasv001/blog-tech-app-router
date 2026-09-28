import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
}

interface PostCategoria {
  id: string;
  nombre: string;
  slug: string;
}

interface Post {
  id: string;
  titulo: string;
  slug: string;
  resumen: string | null;
  categoria_id: string | null;
  published_at: string;
  categorias?: PostCategoria | PostCategoria[] | null;
}

// Fallback data for when Supabase is unavailable or empty
const fallbackCategorias: Categoria[] = [
  { id: '1', nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial', descripcion: 'Artículos sobre IA, Machine Learning y Deep Learning' },
  { id: '2', nombre: 'Desarrollo Web', slug: 'desarrollo-web', descripcion: 'Tutoriales y artículos sobre desarrollo frontend y backend' },
  { id: '3', nombre: 'Cloud Computing', slug: 'cloud-computing', descripcion: 'Servicios en la nube, DevOps e infraestructura' },
  { id: '4', nombre: 'Ciberseguridad', slug: 'ciberseguridad', descripcion: 'Seguridad informática, vulnerabilidades y mejores prácticas' },
  { id: '5', nombre: 'Bases de Datos', slug: 'bases-de-datos', descripcion: 'SQL, NoSQL, optimización y administración de BD' },
];

const fallbackPosts: Post[] = [
  {
    id: 'post-1',
    titulo: 'Introducción a los Large Language Models',
    slug: 'introduccion-large-language-models',
    resumen: 'Exploramos los fundamentos de los LLMs, su arquitectura Transformer y aplicaciones prácticas en el mundo real.',
    categoria_id: '1',
    published_at: new Date('2024-01-15').toISOString(),
    categorias: { id: '1', nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial' }
  },
  {
    id: 'post-2',
    titulo: 'Next.js 15: Novedades del App Router',
    slug: 'nextjs-15-novedades-app-router',
    resumen: 'Repasamos las novedades de Next.js 15: React 19, Turbopack estable, Partial Prerendering y mejoras en hidratación.',
    categoria_id: '2',
    published_at: new Date('2024-01-20').toISOString(),
    categorias: { id: '2', nombre: 'Desarrollo Web', slug: 'desarrollo-web' }
  },
  {
    id: 'post-3',
    titulo: 'Arquitectura Serverless en AWS Lambda',
    slug: 'arquitectura-serverless-aws-lambda',
    resumen: 'Guía completa de arquitectura serverless con AWS Lambda: conceptos, patrones, ventajas y mejores prácticas.',
    categoria_id: '3',
    published_at: new Date('2024-01-25').toISOString(),
    categorias: { id: '3', nombre: 'Cloud Computing', slug: 'cloud-computing' }
  },
  {
    id: 'post-4',
    titulo: 'OWASP Top 10 2023: Vulnerabilidades Críticas',
    slug: 'owasp-top-10-2023-vulnerabilidades-criticas',
    resumen: 'Análisis detallado del OWASP Top 10 2023 con ejemplos de código y estrategias de mitigación para cada vulnerabilidad.',
    categoria_id: '4',
    published_at: new Date('2024-02-01').toISOString(),
    categorias: { id: '4', nombre: 'Ciberseguridad', slug: 'ciberseguridad' }
  },
  {
    id: 'post-5',
    titulo: 'PostgreSQL vs MongoDB: Cuándo Usar Cada Uno',
    slug: 'postgresql-vs-mongodb-cuando-usar-cada-uno',
    resumen: 'Comparativa técnica entre PostgreSQL y MongoDB: modelo de datos, escalado, transacciones y casos de uso ideales para cada uno.',
    categoria_id: '5',
    published_at: new Date('2024-02-10').toISOString(),
    categorias: { id: '5', nombre: 'Bases de Datos', slug: 'bases-de-datos' }
  },
];

async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('id, nombre, slug, descripcion')
    .order('nombre', { ascending: true });

  if (error) {
    console.warn('Supabase error fetching categorias, using fallback:', error.message);
    return fallbackCategorias;
  }
  return data && data.length > 0 ? data : fallbackCategorias;
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      titulo,
      slug,
      resumen,
      categoria_id,
      published_at,
      categorias:categoria_id (id, nombre, slug)
    `)
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) {
    console.warn('Supabase error fetching posts, using fallback:', error.message);
    return fallbackPosts;
  }
  return data && data.length > 0 ? data : fallbackPosts;
}

export default async function HomePage() {
  const [categorias, posts] = await Promise.all([getCategorias(), getPosts()]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              TechBlog
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Inicio
              </Link>
              <Link href="#categorias" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Categorías
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
            Blog Tecnológico
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Artículos, tutoriales y análisis sobre desarrollo de software, IA, cloud, seguridad y bases de datos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#posts"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Ver últimos artículos
            </Link>
            <Link
              href="#categorias"
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorías
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explora artículos organizados por temáticas tecnológicas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.slug}`}
                className="group p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7c0-1.102.902-2 2-2h4M7 3l7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {categoria.nombre}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {categoria.descripcion || 'Sin descripción'}
                </p>
              </Link>
            ))}
            
          </div>
        </div>
      </section>

      {/* Últimos Posts */}
      <section id="posts" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Últimos Artículos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Lo más reciente en tecnología
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/post/${post.id}`} className="block p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {post.categorias && (
                      <Link
                        href={`/categoria/${Array.isArray(post.categorias) ? post.categorias[0]?.slug : post.categorias.slug}`}
                        className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                      >
                        {Array.isArray(post.categorias) ? post.categorias[0]?.nombre : post.categorias.nombre}
                      </Link>
                    )}
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.published_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.titulo}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.resumen || 'Sin resumen disponible'}
                  </p>
                </Link>
              </article>
            ))}
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">
            TechBlog - Construido con Next.js 16, Supabase y Tailwind CSS
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}