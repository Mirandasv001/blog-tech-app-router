import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  resumen: string | null;
  imagen_url: string | null;
  categoria_id: string | null;
  published_at: string;
  categorias?: {
    id: string;
    nombre: string;
    slug: string;
  } | null;
}

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      titulo,
      slug,
      contenido,
      resumen,
      imagen_url,
      categoria_id,
      published_at,
      categorias:categoria_id (id, nombre, slug)
    `)
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  
  if (!post) {
    return { title: 'Artículo no encontrado' };
  }
  
  return {
    title: `${post.titulo} | TechBlog`,
    description: post.resumen || post.titulo,
    openGraph: {
      title: post.titulo,
      description: post.resumen || post.titulo,
      type: 'article',
      publishedTime: post.published_at,
      images: post.imagen_url ? [post.imagen_url] : [],
    },
  };
}

function renderMarkdown(content: string): React.ReactNode {
  // Simple markdown renderer for basic elements
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeContent = '';
      } else {
        inCodeBlock = false;
        elements.push(
          <pre key={`code-${i}`} className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-4">
            <code className={`language-${codeLanguage} text-gray-100 font-mono text-sm`}>
              {codeContent}
            </code>
          </pre>
        );
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }
    
    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${i}`} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.slice(4)}</h3>);
    }
    // Lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(<li key={`li-${i}`} className="ml-6 mb-2 text-gray-700 dark:text-gray-300">{line.slice(2)}</li>);
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line)) {
      elements.push(<li key={`li-${i}`} className="ml-6 mb-2 text-gray-700 dark:text-gray-300">{line.replace(/^\d+\.\s/, '')}</li>);
    }
    // Tables (simplified)
    else if (line.includes('|') && line.includes('---')) {
      continue; // Skip table separator
    } else if (line.includes('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length > 0) {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <tbody>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  {cells.map((cell, idx) => (
                    <td key={idx} className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">{cell}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }
    // Bold/Italic inline (simplified - just paragraphs)
    else if (line.trim() === '') {
      elements.push(<br key={`br-${i}`} />);
    }
    // Paragraphs
    else {
      // Process inline markdown
      let processedLine = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600 dark:text-primary-400">$1</code>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      elements.push(
        <p key={`p-${i}`} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    }
  }
  
  return <div className="prose prose-gray dark:prose-invert max-w-none">{elements}</div>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

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

      {/* Article */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          {/* Category badge */}
          {post.categorias && (
            <Link
              href={`/categoria/${post.categorias.slug}`}
              className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-6 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              {post.categorias.nombre}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.titulo}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {/* Featured Image */}
          {post.imagen_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.imagen_url}
                alt={post.titulo}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderMarkdown(post.contenido)}
          </div>

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compartir</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.titulo)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Compartir en Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-700 transition-colors"
                aria-label="Compartir en LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Compartir en Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          © {new Date().getFullYear()} TechBlog - Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}