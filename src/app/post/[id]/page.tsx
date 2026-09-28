import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface PostCategoria {
  id: string;
  nombre: string;
  slug: string;
}

interface Post {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  resumen: string | null;
  imagen_url: string | null;
  categoria_id: string | null;
  published_at: string;
  categorias?: PostCategoria | PostCategoria[] | null;
}

// Fallback post data
const fallbackPosts: Record<string, Post> = {
  'post-1': {
    id: 'post-1',
    titulo: 'Introducción a los Large Language Models',
    slug: 'introduccion-large-language-models',
    contenido: `# Introducción a los Large Language Models

Los **Large Language Models (LLMs)** han revolucionado el campo del procesamiento de lenguaje natural. En este artículo exploramos sus fundamentos, arquitectura y aplicaciones prácticas.

## ¿Qué son los LLMs?

Los LLMs son modelos de inteligencia artificial entrenados con cantidades masivas de texto para entender y generar lenguaje humano. Utilizan arquitecturas basadas en **Transformers**, introducidas en el paper "Attention Is All You Need" (2017).

## Arquitectura Transformer

La arquitectura Transformer se basa en el mecanismo de **auto-atención (self-attention)**, que permite al modelo ponderar la importancia de diferentes palabras en una secuencia.

\`\`\`python
# Ejemplo simplificado de atención
def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V)
\`\`\`

## Aplicaciones Principales

1. **Generación de texto**: Chatbots, asistentes de escritura
2. **Traducción automática**: Traducción entre múltiples idiomas
3. **Resumen de textos**: Extracción de información clave
4. **Análisis de sentimientos**: Clasificación de opiniones
5. **Generación de código**: GitHub Copilot, CodeWhisperer

## Desafíos Actuales

- **Alucinaciones**: Generación de información falsa pero plausible
- **Sesgos**: Reproducción de prejuicios presentes en datos de entrenamiento
- **Coste computacional**: Entrenamiento e inferencia requieren GPUs masivas
- **Privacidad**: Riesgo de memorizar datos sensibles

## Conclusión

Los LLMs representan un avance fundamental en IA. Su evolución continua promete transformar industrias enteras, desde la educación hasta el desarrollo de software.`,
    resumen: 'Exploramos los fundamentos de los LLMs, su arquitectura Transformer y aplicaciones prácticas en el mundo real.',
    imagen_url: null,
    categoria_id: '1',
    published_at: new Date('2024-01-15').toISOString(),
    categorias: { id: '1', nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial' }
  },
  'post-2': {
    id: 'post-2',
    titulo: 'Next.js 15: Novedades del App Router',
    slug: 'nextjs-15-novedades-app-router',
    contenido: `# Next.js 15: Novedades del App Router

Next.js 15 trae mejoras significativas al **App Router**, consolidándolo como la forma recomendada de construir aplicaciones React.

## Nuevas Características

### 1. React 19 Support
Next.js 15 incluye soporte completo para React 19, aprovechando las nuevas APIs como \`useActionState\`, \`useFormStatus\` y \`useOptimistic\`.

### 2. Turbopack Estable
Turbopack ya no es experimental. Ofrece:
- **Compilación 10x más rápida** que Webpack
- **HMR instantáneo** en desarrollo
- **Soporte completo** para TypeScript, CSS, y más

### 3. Partial Prerendering (PPR)
Combina rendering estático y dinámico en la misma ruta:

\`\`\`tsx
// app/page.tsx
export const experimental_ppr = true;

export default function Page() {
  return (
    <main>
      <StaticShell />
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </main>
  );
}
\`\`\`

### 4. Mejores Errores de Hidratación
Los errores de hidratación ahora muestran el diff exacto entre servidor y cliente.

### 5. Cache Control Mejorado
Nuevas opciones \`expire\`, \`revalidate\` y \`tags\` para control granular.

## Migración desde Pages Router

\`\`\`bash
npx @next/codemod@latest app-router .
\`\`\`

## Conclusión

Next.js 15 consolida el App Router como estándar. La estabilidad de Turbopack y el soporte React 19 lo hacen ideal para proyectos nuevos.`,
    resumen: 'Repasamos las novedades de Next.js 15: React 19, Turbopack estable, Partial Prerendering y mejoras en hidratación.',
    imagen_url: null,
    categoria_id: '2',
    published_at: new Date('2024-01-20').toISOString(),
    categorias: { id: '2', nombre: 'Desarrollo Web', slug: 'desarrollo-web' }
  },
  'post-3': {
    id: 'post-3',
    titulo: 'Arquitectura Serverless en AWS Lambda',
    slug: 'arquitectura-serverless-aws-lambda',
    contenido: `# Arquitectura Serverless en AWS Lambda

La arquitectura **serverless** permite ejecutar código sin gestionar servidores. AWS Lambda es el pionero y referente del mercado.

## Conceptos Fundamentales

### Función Lambda
Unidad de despliegue que ejecuta código en respuesta a eventos.

\`\`\`yaml
# serverless.yml ejemplo
service: mi-api

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get
\`\`\`

### Event Sources
Lambda se integra con 200+ servicios AWS:
- **API Gateway**: APIs REST/HTTP/WebSocket
- **S3**: Procesamiento de archivos
- **DynamoDB Streams**: Cambios en base de datos
- **EventBridge**: Event-driven architecture
- **SQS/SNS**: Colas y notificaciones

## Patrones de Diseño

### 1. API Backend
\`\`\`typescript
// handler.ts
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Serverless!" })
  };
};
\`\`\`

### 2. Procesamiento Asíncrono
Colas SQS → Lambda → Procesamiento → DynamoDB/S3

### 3. Event Sourcing
EventBridge → Lambda → Proyecciones → Read Models

## Ventajas y Desventajas

| Ventajas | Desventajas |
|----------|-------------|
| Sin gestión de servidores | Cold starts |
| Escalado automático | Límite 15 min ejecución |
| Pago por uso | Vendor lock-in |
| Alta disponibilidad nativa | Debugging complejo |

## Mejores Prácticas

1. **Mantén funciones pequeñas** y enfocadas
2. **Usa capas (Layers)** para dependencias compartidas
3. **Configura concurrencia reservada** para funciones críticas
4. **Implementa observabilidad** con X-Ray + CloudWatch
5. **Optimiza paquetes** con esbuild/webpack

## Conclusión

Serverless en AWS Lambda reduce la carga operativa y costes para cargas de trabajo variables. Ideal para microservicios, APIs y procesamiento event-driven.`,
    resumen: 'Guía completa de arquitectura serverless con AWS Lambda: conceptos, patrones, ventajas y mejores prácticas.',
    imagen_url: null,
    categoria_id: '3',
    published_at: new Date('2024-01-25').toISOString(),
    categorias: { id: '3', nombre: 'Cloud Computing', slug: 'cloud-computing' }
  },
  'post-4': {
    id: 'post-4',
    titulo: 'OWASP Top 10 2023: Vulnerabilidades Críticas',
    slug: 'owasp-top-10-2023-vulnerabilidades-criticas',
    contenido: `# OWASP Top 10 2023: Vulnerabilidades Críticas

El **OWASP Top 10** es el estándar de facto para las vulnerabilidades más críticas en aplicaciones web. La versión 2023 refleja la evolución del panorama de amenazas.

## Las 10 Vulnerabilidades

### A01:2023 - Broken Access Control
Fallos en la autorización que permiten acceder a recursos no permitidos.

**Prevención:**
- Denegar por defecto
- Validar permisos en cada request
- Tests de autorización automatizados

### A02:2023 - Cryptographic Failures
Protección inadecuada de datos sensibles (contraseñas, tarjetas, PII).

**Prevención:**
- TLS 1.2+ en todas partes
- AES-256 para datos en reposo
- Argon2/bcrypt/scrypt para passwords
- No inventar crypto propia

### A03:2023 - Injection
SQLi, NoSQLi, Command Injection, LDAP Injection.

**Prevención:**
- Prepared statements / Parameterized queries
- ORM con query builders seguros
- Validación de entrada estricta
- Principio de menor privilegio en BD

\`\`\`sql
-- VULNERABLE
SELECT * FROM users WHERE id = " + userId;

// SEGURO
SELECT * FROM users WHERE id = ?;
\`\`\`

### A04:2023 - Insecure Design
Fallos de arquitectura, no de implementación. Falta de threat modeling.

**Prevención:**
- Threat modeling en diseño
- Secure design patterns
- Security requirements desde inicio

### A05:2023 - Security Misconfiguration
Configuraciones inseguras por defecto, headers faltantes, features innecesarias.

**Prevención:**
- Hardening automatizado
- Headers de seguridad (CSP, HSTS, X-Frame-Options)
- Escaneo de configuración continuo

### A06:2023 - Vulnerable and Outdated Components
Uso de librerías con CVEs conocidas.

**Prevención:**
- SCA (Software Composition Analysis)
- Dependabot / Renovate
- SBOM (Software Bill of Materials)

### A07:2023 - Identification and Authentication Failures
Fallos en login, MFA, recuperación de contraseña, session management.

**Prevención:**
- MFA obligatorio
- Rate limiting en auth
- Session tokens seguros (HttpOnly, Secure, SameSite)
- Passwordless / Passkeys

### A08:2023 - Software and Data Integrity Failures
CI/CD inseguro, actualizaciones sin verificación, deserialización insegura.

**Prevención:**
- Firma de artifacts
- Verificación de integridad en pipeline
- Reproducible builds

### A09:2023 - Security Logging and Monitoring Failures
Falta de logs de seguridad, alertas, respuesta a incidentes.

**Prevención:**
- Structured logging
- SIEM integration
- Alerting en tiempo real
- Incident response plan

### A10:2023 - Server-Side Request Forgery (SSRF)
Aplicación hace requests a recursos internos controlados por atacante.

**Prevención:**
- Allowlist de URLs/dominios
- Bloquear rangos IP privados (10.x, 192.168.x, 169.254.x, 127.x)
- Network segmentation

## Conclusión

El OWASP Top 10 2023 enfatiza **diseño seguro** (A04) y **integridad de cadena de suministro** (A08). La seguridad debe integrarse en todo el SDLC, no como afterthought.`,
    resumen: 'Análisis detallado del OWASP Top 10 2023 con ejemplos de código y estrategias de mitigación para cada vulnerabilidad.',
    imagen_url: null,
    categoria_id: '4',
    published_at: new Date('2024-02-01').toISOString(),
    categorias: { id: '4', nombre: 'Ciberseguridad', slug: 'ciberseguridad' }
  },
  'post-5': {
    id: 'post-5',
    titulo: 'PostgreSQL vs MongoDB: Cuándo Usar Cada Uno',
    slug: 'postgresql-vs-mongodb-cuando-usar-cada-uno',
    contenido: `# PostgreSQL vs MongoDB: Cuándo Usar Cada Uno

La elección entre **base de datos relacional (PostgreSQL)** y **documental (MongoDB)** depende de los requisitos de tu aplicación.

## Comparativa Rápida

| Aspecto | PostgreSQL | MongoDB |
|---------|------------|---------|
| Modelo | Relacional (tablas) | Documental (JSON/BSON) |
| Esquema | Rígido (schema-on-write) | Flexible (schema-on-read) |
| Consultas | SQL estándar | MQL (MongoDB Query Language) |
| Transacciones | ACID completas | ACID (desde 4.0) |
| Escalado | Vertical + Read replicas | Horizontal (sharding nativo) |
| Joins | Nativos | \$lookup (limitado) |

## Cuándo Elegir PostgreSQL

### ✅ Casos Ideales
1. **Datos relacionales complejos**: Usuarios, pedidos, productos, facturas
2. **Integridad referencial crítica**: Finanzas, ERP, e-commerce
3. **Consultas analíticas complejas**: Reportes, BI, agregaciones
4. **Equipo con experiencia SQL**: Curva de aprendizaje menor
5. **ACID estricto requerido**: Transacciones distribuidas

### Ejemplo Esquema E-commerce
\`\`\`sql
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    total DECIMAL(10,2),
    estado VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE items_pedido (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES pedidos(id),
    producto_id UUID,
    cantidad INT,
    precio_unitario DECIMAL(10,2)
);
\`\`\`

## Cuándo Elegir MongoDB

### ✅ Casos Ideales
1. **Esquema variable/impredecible**: CMS, catálogos, logs
2. **Desarrollo rápido/prototipado**: Schema-less acelera iteración
3. **Datos jerárquicos/anidados**: Comentarios anidados, configuraciones
4. **Escritura masiva/alto throughput**: IoT, analytics, time-series
5. **Distribución geográfica**: Multi-region nativo

### Ejemplo Documento Blog
\`\`\`json
{
  "_id": ObjectId("..."),
  "titulo": "Mi Post",
  "contenido": "Contenido en markdown...",
  "autor": {
    "nombre": "Juan",
    "email": "juan@ejemplo.com"
  },
  "tags": ["tech", "database", "mongodb"],
  "comentarios": [
    {
      "autor": "Maria",
      "texto": "Genial!",
      "fecha": ISODate("2024-01-15")
    }
  ],
  "metadatos": {
    "vistas": 150,
    "tiempo_lectura": 5
  }
}
\`\`\`

## Híbrido: Lo Mejor de Ambos Mundos

Muchas aplicaciones modernas usan **poliglot persistence**:
- PostgreSQL: Datos transaccionales, usuarios, pagos
- MongoDB: Logs, analytics, contenido, caché
- Redis: Sesiones, colas, rate limiting

## Conclusión

**PostgreSQL** para datos estructurados, relaciones complejas y consistencia ACID.
**MongoDB** para flexibilidad de esquema, escalado horizontal nativo y datos semi-estructurados.

La decisión no es binaria: evalúa tus requisitos específicos y considera arquitectura poliglota.`,
    resumen: 'Comparativa técnica entre PostgreSQL y MongoDB: modelo de datos, escalado, transacciones y casos de uso ideales para cada uno.',
    imagen_url: null,
    categoria_id: '5',
    published_at: new Date('2024-02-10').toISOString(),
    categorias: { id: '5', nombre: 'Bases de Datos', slug: 'bases-de-datos' }
  },
};

// Helper to find post by ID with flexible matching (string, UUID, fallback keys)
function findPostById(id: string): Post {
  // Try direct key match first
  if (fallbackPosts[id]) {
    return fallbackPosts[id];
  }
  // Try with 'post-' prefix if numeric
  if (/^\d+$/.test(id) && fallbackPosts[`post-${id}`]) {
    return fallbackPosts[`post-${id}`];
  }
  // Try finding by slug
  const bySlug = Object.values(fallbackPosts).find(p => p.slug === id);
  if (bySlug) return bySlug;
  // Default to first post
  return Object.values(fallbackPosts)[0];
}

async function getPost(id: string): Promise<Post> {
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

  if (error || !data) {
    console.warn('Supabase error fetching post, using fallback:', error?.message);
    return findPostById(id);
  }
  return data;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  
  return {
    title: `${post?.titulo || 'Artículo'} | TechBlog`,
    description: post?.resumen || post?.titulo || 'Artículo técnico',
    openGraph: {
      title: post?.titulo || 'Artículo',
      description: post?.resumen || post?.titulo || 'Artículo técnico',
      type: 'article',
      publishedTime: post?.published_at,
      images: post?.imagen_url ? [post.imagen_url] : [],
    },
  };
}

function renderMarkdown(content: string): React.ReactNode {
  if (!content) return <p>Contenido no disponible</p>;
  
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

  // Always have a valid post (getPost now always returns one)
  const safePost = post || Object.values(fallbackPosts)[0];

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
          {safePost?.categorias && (
            <Link
              href={`/categoria/${Array.isArray(safePost.categorias) ? safePost.categorias[0]?.slug : safePost.categorias?.slug || ''}`}
              className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-6 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              {Array.isArray(safePost.categorias) ? safePost.categorias[0]?.nombre : safePost.categorias?.nombre || 'General'}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {safePost?.titulo || 'Artículo sin título'}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <time dateTime={safePost?.published_at}>
              {safePost?.published_at ? new Date(safePost.published_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'Fecha no disponible'}
            </time>
          </div>

          {/* Featured Image */}
          {safePost?.imagen_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={safePost.imagen_url}
                alt={safePost.titulo}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderMarkdown(safePost?.contenido || '')}
          </div>

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compartir</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(safePost?.titulo || '')}&url=${encodeURIComponent(window.location.href)}`}
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