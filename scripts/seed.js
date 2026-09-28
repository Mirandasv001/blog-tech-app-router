import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno no configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categorias = [
  { nombre: 'Inteligencia Artificial', slug: 'inteligencia-artificial', descripcion: 'Artículos sobre IA, Machine Learning y Deep Learning' },
  { nombre: 'Desarrollo Web', slug: 'desarrollo-web', descripcion: 'Tutoriales y artículos sobre desarrollo frontend y backend' },
  { nombre: 'Cloud Computing', slug: 'cloud-computing', descripcion: 'Servicios en la nube, DevOps e infraestructura' },
  { nombre: 'Ciberseguridad', slug: 'ciberseguridad', descripcion: 'Seguridad informática, vulnerabilidades y mejores prácticas' },
  { nombre: 'Bases de Datos', slug: 'bases-de-datos', descripcion: 'SQL, NoSQL, optimización y administración de BD' },
];

const posts = [
  {
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
    categoria_slug: 'inteligencia-artificial'
  },
  {
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
    categoria_slug: 'desarrollo-web'
  },
  {
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
    categoria_slug: 'cloud-computing'
  },
  {
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
    categoria_slug: 'ciberseguridad'
  },
  {
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
    categoria_slug: 'bases-de-datos'
  }
];

async function seed() {
  console.log('🔄 Conectando a Supabase...');
  
  // Test connection
  const { data: testData, error: testError } = await supabase.from('categorias').select('id').limit(1);
  if (testError) {
    console.error('❌ Error de conexión:', testError.message);
    process.exit(1);
  }
  console.log('✅ Conexión exitosa');

  // Check if categories exist
  const { data: existingCats, error: catError } = await supabase.from('categorias').select('slug');
  if (catError) {
    console.error('❌ Error consultando categorías:', catError.message);
    process.exit(1);
  }

  const existingSlugs = new Set(existingCats?.map(c => c.slug) || []);
  const newCats = categorias.filter(c => !existingSlugs.has(c.slug));

  if (newCats.length > 0) {
    console.log(`📝 Insertando ${newCats.length} categorías nuevas...`);
    const { error: insertCatError } = await supabase.from('categorias').insert(newCats);
    if (insertCatError) {
      console.error('❌ Error insertando categorías:', insertCatError.message);
    } else {
      console.log('✅ Categorías insertadas');
    }
  } else {
    console.log('✅ Categorías ya existen');
  }

  // Get category IDs for posts
  const { data: allCats } = await supabase.from('categorias').select('id, slug');
  const catMap = new Map(allCats?.map(c => [c.slug, c.id]) || []);

  // Check existing posts
  const { data: existingPosts } = await supabase.from('posts').select('slug');
  const existingPostSlugs = new Set(existingPosts?.map(p => p.slug) || []);
  const newPosts = posts.filter(p => !existingPostSlugs.has(p.slug));

  if (newPosts.length > 0) {
    console.log(`📝 Insertando ${newPosts.length} posts nuevos...`);
    for (const post of newPosts) {
      const categoria_id = catMap.get(post.categoria_slug);
      if (!categoria_id) {
        console.warn(`⚠️ Categoría no encontrada para: ${post.categoria_slug}`);
        continue;
      }
      
      const { error: insertPostError } = await supabase.from('posts').insert({
        titulo: post.titulo,
        slug: post.slug,
        contenido: post.contenido,
        resumen: post.resumen,
        categoria_id
      });
      
      if (insertPostError) {
        console.error(`❌ Error insertando post "${post.titulo}":`, insertPostError.message);
      } else {
        console.log(`✅ Post insertado: ${post.titulo}`);
      }
    }
  } else {
    console.log('✅ Posts ya existen');
  }

  console.log('🎉 Seed completado');
}

seed().catch(console.error);