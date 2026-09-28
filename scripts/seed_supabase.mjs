import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno no configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🔄 Conectando a Supabase...');
  
  // Check connection
  const { error: testError } = await supabase.from('categorias').select('id').limit(1);
  if (testError) {
    console.error('❌ Error de conexión:', testError.message);
    process.exit(1);
  }
  console.log('✅ Conexión exitosa');

  // Check if categories exist
  const { data: existingCats, error: catError } = await supabase.from('categorias').select('id, slug');
  if (catError) {
    console.error('❌ Error consultando categorías:', catError.message);
    process.exit(1);
  }

  if (!existingCats || existingCats.length === 0) {
    console.log('📝 Insertando categorías...');
    
    const categorias = [
      { nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial', descripcion: 'Artículos sobre IA, Machine Learning y Deep Learning' },
      { nombre: 'Desarrollo Web', slug: 'desarrollo-web', descripcion: 'Tutoriales y artículos sobre desarrollo frontend y backend' },
      { nombre: 'Cloud Computing', slug: 'cloud-computing', descripcion: 'Servicios en la nube, DevOps e infraestructura' },
      { nombre: 'Ciberseguridad', slug: 'ciberseguridad', descripcion: 'Seguridad informática, vulnerabilidades y mejores prácticas' },
    ];

    const { error: insertCatError } = await supabase.from('categorias').insert(categorias);
    if (insertCatError) {
      console.error('❌ Error insertando categorías:', insertCatError.message);
      process.exit(1);
    }
    console.log('✅ Categorías insertadas');
  } else {
    console.log('✅ Categorías ya existen');
  }

  // Get category IDs
  const { data: allCats } = await supabase.from('categorias').select('id, slug');
  const catMap = new Map(allCats?.map(c => [c.slug, c.id]) || []);

  // Check existing posts
  const { data: existingPosts } = await supabase.from('posts').select('slug');
  const existingPostSlugs = new Set(existingPosts?.map(p => p.slug) || []);

  const posts = [
    {
      titulo: 'Introducción a los Large Language Models',
      slug: 'introduccion-large-language-models',
      contenido: `# Introducción a los Large Language Models\n\nLos **Large Language Models (LLMs)** han revolucionado el campo del procesamiento de lenguaje natural.\n\n## ¿Qué son los LLMs?\n\nLos LLMs son modelos de inteligencia artificial entrenados con cantidades masivas de texto para entender y generar lenguaje humano.`,
      resumen: 'Exploramos los fundamentos de los LLMs, su arquitectura Transformer y aplicaciones prácticas.',
      categoria_id: catMap.get('inteligencia-artificial')
    },
    {
      titulo: 'Next.js 15: Novedades del App Router',
      slug: 'nextjs-15-novedades-app-router',
      contenido: `# Next.js 15: Novedades del App Router\n\nNext.js 15 trae mejoras significativas al **App Router**.\n\n## React 19 Support\n\nSoporte completo para React 19 con nuevas APIs como \`useActionState\`, \`useFormStatus\` y \`useOptimistic\`.`,
      resumen: 'Repasamos las novedades de Next.js 15: React 19, Turbopack estable, Partial Prerendering.',
      categoria_id: catMap.get('desarrollo-web')
    },
    {
      titulo: 'Arquitectura Serverless en AWS Lambda',
      slug: 'arquitectura-serverless-aws-lambda',
      contenido: `# Arquitectura Serverless en AWS Lambda\n\nLa arquitectura **serverless** permite ejecutar código sin gestionar servidores.\n\n## Conceptos Fundamentales\n\n### Función Lambda\nUnidad de despliegue que ejecuta código en respuesta a eventos.`,
      resumen: 'Guía completa de arquitectura serverless con AWS Lambda.',
      categoria_id: catMap.get('cloud-computing')
    },
    {
      titulo: 'OWASP Top 10 2023: Vulnerabilidades Críticas',
      slug: 'owasp-top-10-2023-vulnerabilidades-criticas',
      contenido: `# OWASP Top 10 2023\n\nEl **OWASP Top 10** es el estándar para vulnerabilidades críticas en aplicaciones web.\n\n## A01:2023 - Broken Access Control\n\nFallos en la autorización que permiten acceder a recursos no permitidos.`,
      resumen: 'Análisis detallado del OWASP Top 10 2023 con ejemplos de código.',
      categoria_id: catMap.get('ciberseguridad')
    },
    {
      titulo: 'PostgreSQL vs MongoDB: Cuándo Usar Cada Uno',
      slug: 'postgresql-vs-mongodb-cuando-usar-cada-uno',
      contenido: `# PostgreSQL vs MongoDB\n\nLa elección entre **base de datos relacional (PostgreSQL)** y **documental (MongoDB)** depende de los requisitos.\n\n## Comparativa Rápida\n\n| Aspecto | PostgreSQL | MongoDB |\n|---------|------------|---------|\n| Modelo | Relacional | Documental |\n| Esquema | Rígido | Flexible |`,
      resumen: 'Comparativa técnica entre PostgreSQL y MongoDB.',
      categoria_id: catMap.get('bases-de-datos') || catMap.get('cloud-computing') // fallback
    }
  ];

  let inserted = 0;
  for (const post of posts) {
    if (post.categoria_id && !existingPostSlugs.has(post.slug)) {
      const { error: insertPostError } = await supabase.from('posts').insert(post);
      if (insertPostError) {
        console.error(`❌ Error insertando post "${post.titulo}":`, insertPostError.message);
      } else {
        console.log(`✅ Post insertado: ${post.titulo}`);
        inserted++;
      }
    }
  }

  console.log(`🎉 Datos insertados en Supabase correctamente (${inserted} posts nuevos)`);
}

seed().catch(err => {
  console.error('❌ Error fatal:', err);
  process.exit(1);
});