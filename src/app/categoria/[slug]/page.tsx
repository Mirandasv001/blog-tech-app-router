import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
}

interface Post {
  id: string;
  titulo: string;
  slug: string;
  resumen: string | null;
  published_at: string;
}

async function getCategoria(slug: string): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from('categorias')
    .select('id, nombre, slug, descripcion')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

async function getPostsByCategoria(categoriaId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, titulo, slug, resumen, published_at')
    .eq('categoria_id', categoriaId)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data || [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoria(slug);
  
  if (!categoria) {
    return { title: 'Categoría no encontrada' };
  }
  
  return {
    title: `${categoria.nombre} | TechBlog`,
    description: categoria.descripcion || `Artículos sobre ${categoria.nombre}`,
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const categoria = await getCategoria(slug);

  if (!categoria) {
    notFound();
  }

  const posts = await getPostsByCategoria(categoria.id);

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
            </nav>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {categoria.nombre}
            </h1>
            {categoria.descripcion && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {categoria.descripcion}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Artículos ({posts.length})
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/post/${post.id}`} className="block p-6">
                    <time className="text-xs text-gray-500 dark:text-gray-400 mb-3 block">
                      {new Date(post.published_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {post.titulo}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.resumen || 'Sin resumen disponible'}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 00-2-2V7a2 2 0 00-2-2m-2 2h4M12 7v4m0 4h.01" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay artículos en esta categoría
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Próximamente se agregarán contenidos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          © {new Date().getFullYear()} TechBlog - Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}