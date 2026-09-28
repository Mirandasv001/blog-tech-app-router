-- Configuración de la base de datos para el Blog Tecnológico
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de posts
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    contenido TEXT NOT NULL,
    resumen TEXT,
    imagen_url TEXT,
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insertar categorías de ejemplo
INSERT INTO categorias (nombre, slug, descripcion) VALUES
    ('Inteligencia Artificial', 'inteligencia-artificial', 'Artículos sobre IA, Machine Learning y Deep Learning'),
    ('Desarrollo Web', 'desarrollo-web', 'Tutoriales y artículos sobre desarrollo frontend y backend'),
    ('Cloud Computing', 'cloud-computing', 'Servicios en la nube, DevOps e infraestructura'),
    ('Ciberseguridad', 'ciberseguridad', 'Seguridad informática, vulnerabilidades y mejores prácticas'),
    ('Bases de Datos', 'bases-de-datos', 'SQL, NoSQL, optimización y administración de BD')
ON CONFLICT (slug) DO NOTHING;

-- 4. Insertar posts de ejemplo
INSERT INTO posts (titulo, slug, contenido, resumen, categoria_id) 
SELECT 
    'Introducción a los Large Language Models',
    'introduccion-large-language-models',
    '# Introducción a los Large Language Models

Los **Large Language Models (LLMs)** han revolucionado el campo del procesamiento de lenguaje natural. En este artículo exploramos sus fundamentos, arquitectura y aplicaciones prácticas.

## ¿Qué son los LLMs?

Los LLMs son modelos de inteligencia artificial entrenados con cantidades masivas de texto para entender y generar lenguaje humano. Utilizan arquitecturas basadas en **Transformers**, introducidas en el paper "Attention Is All You Need" (2017).

## Arquitectura Transformer

La arquitectura Transformer se basa en el mecanismo de **auto-atención (self-attention)**, que permite al modelo ponderar la importancia de diferentes palabras en una secuencia.

```python
# Ejemplo simplificado de atención
def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V)
```

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

Los LLMs representan un avance fundamental en IA. Su evolución continua promete transformar industrias enteras, desde la educación hasta el desarrollo de software.',
    'Exploramos los fundamentos de los LLMs, su arquitectura Transformer y aplicaciones prácticas en el mundo real.',
    (SELECT id FROM categorias WHERE slug = 'inteligencia-artificial')
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'introduccion-large-language-models');

INSERT INTO posts (titulo, slug, contenido, resumen, categoria_id) 
SELECT 
    'Next.js 15: Novedades del App Router',
    'nextjs-15-novedades-app-router',
    '# Next.js 15: Novedades del App Router

Next.js 15 trae mejoras significativas al **App Router**, consolidándolo como la forma recomendada de construir aplicaciones React.

## Nuevas Características

### 1. React 19 Support
Next.js 15 incluye soporte completo para React 19, aprovechando las nuevas APIs como `useActionState`, `useFormStatus` y `useOptimistic`.

### 2. Turbopack Estable
Turbopack ya no es experimental. Ofrece:
- **Compilación 10x más rápida** que Webpack
- **HMR instantáneo** en desarrollo
- **Soporte completo** para TypeScript, CSS, y más

### 3. Partial Prerendering (PPR)
Combina rendering estático y dinámico en la misma ruta:

```tsx
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
```

### 4. Mejores Errores de Hidratación
Los errores de hidratación ahora muestran el diff exacto entre servidor y cliente.

### 5. Cache Control Mejorado
Nuevas opciones `expire`, `revalidate` y `tags` para control granular.

## Migración desde Pages Router

```bash
npx @next/codemod@latest app-router .
```

## Conclusión

Next.js 15 consolida el App Router como estándar. La estabilidad de Turbopack y el soporte React 19 lo hacen ideal para proyectos nuevos.',
    'Repasamos las novedades de Next.js 15: React 19, Turbopack estable, Partial Prerendering y mejoras en hidratación.',
    (SELECT id FROM categorias WHERE slug = 'desarrollo-web')
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'nextjs-15-novedades-app-router');

INSERT INTO posts (titulo, slug, contenido, resumen, categoria_id) 
SELECT 
    'Arquitectura Serverless en AWS Lambda',
    'arquitectura-serverless-aws-lambda',
    '# Arquitectura Serverless en AWS Lambda

La arquitectura **serverless** permite ejecutar código sin gestionar servidores. AWS Lambda es el pionero y referente del mercado.

## Conceptos Fundamentales

### Función Lambda
Unidad de despliegue que ejecuta código en respuesta a eventos.

```yaml
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
```

### Event Sources
Lambda se integra con 200+ servicios AWS:
- **API Gateway**: APIs REST/HTTP/WebSocket
- **S3**: Procesamiento de archivos
- **DynamoDB Streams**: Cambios en base de datos
- **EventBridge**: Event-driven architecture
- **SQS/SNS**: Colas y notificaciones

## Patrones de Diseño

### 1. API Backend
```typescript
// handler.ts
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Serverless!" })
  };
};
```

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

Serverless en AWS Lambda reduce la carga operativa y costes para cargas de trabajo variables. Ideal para microservicios, APIs y procesamiento event-driven.',
    'Guía completa de arquitectura serverless con AWS Lambda: conceptos, patrones, ventajas y mejores prácticas.',
    (SELECT id FROM categorias WHERE slug = 'cloud-computing')
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'arquitectura-serverless-aws-lambda');

INSERT INTO posts (titulo, slug, contenido, resumen, categoria_id) 
SELECT 
    'OWASP Top 10 2023: Vulnerabilidades Críticas',
    'owasp-top-10-2023-vulnerabilidades-criticas',
    '# OWASP Top 10 2023: Vulnerabilidades Críticas

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

```sql
-- VULNERABLE
SELECT * FROM users WHERE id = " + userId;

// SEGURO
SELECT * FROM users WHERE id = ?;
```

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

El OWASP Top 10 2023 enfatiza **diseño seguro** (A04) y **integridad de cadena de suministro** (A08). La seguridad debe integrarse en todo el SDLC, no como afterthought.',
    'Análisis detallado del OWASP Top 10 2023 con ejemplos de código y estrategias de mitigación para cada vulnerabilidad.',
    (SELECT id FROM categorias WHERE slug = 'ciberseguridad')
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'owasp-top-10-2023-vulnerabilidades-criticas');

INSERT INTO posts (titulo, slug, contenido, resumen, categoria_id) 
SELECT 
    'PostgreSQL vs MongoDB: Cuándo Usar Cada Uno',
    'postgresql-vs-mongodb-cuando-usar-cada-uno',
    '# PostgreSQL vs MongoDB: Cuándo Usar Cada Uno

La elección entre **base de datos relacional (PostgreSQL)** y **documental (MongoDB)** depende de los requisitos de tu aplicación.

## Comparativa Rápida

| Aspecto | PostgreSQL | MongoDB |
|---------|------------|---------|
| Modelo | Relacional (tablas) | Documental (JSON/BSON) |
| Esquema | Rígido (schema-on-write) | Flexible (schema-on-read) |
| Consultas | SQL estándar | MQL (MongoDB Query Language) |
| Transacciones | ACID completas | ACID (desde 4.0) |
| Escalado | Vertical + Read replicas | Horizontal (sharding nativo) |
| Joins | Nativos | $lookup (limitado) |

## Cuándo Elegir PostgreSQL

### ✅ Casos Ideales
1. **Datos relacionales complejos**: Usuarios, pedidos, productos, facturas
2. **Integridad referencial crítica**: Finanzas, ERP, e-commerce
3. **Consultas analíticas complejas**: Reportes, BI, agregaciones
4. **Equipo con experiencia SQL**: Curva de aprendizaje menor
5. **ACID estricto requerido**: Transacciones distribuidas

### Ejemplo Esquema E-commerce
```sql
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
```

## Cuándo Elegir MongoDB

### ✅ Casos Ideales
1. **Esquema variable/impredecible**: CMS, catálogos, logs
2. **Desarrollo rápido/prototipado**: Schema-less acelera iteración
3. **Datos jerárquicos/anidados**: Comentarios anidados, configuraciones
4. **Escritura masiva/alto throughput**: IoT, analytics, time-series
5. **Distribución geográfica**: Multi-region nativo

### Ejemplo Documento Blog
```json
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
```

## Híbrido: Lo Mejor de Ambos Mundos

Muchas aplicaciones modernas usan **poliglot persistence**:
- PostgreSQL: Datos transaccionales, usuarios, pagos
- MongoDB: Logs, analytics, contenido, caché
- Redis: Sesiones, colas, rate limiting

## Conclusión

**PostgreSQL** para datos estructurados, relaciones complejas y consistencia ACID.
**MongoDB** para flexibilidad de esquema, escalado horizontal nativo y datos semi-estructurados.

La decisión no es binaria: evalúa tus requisitos específicos y considera arquitectura poliglota.',
    'Comparativa técnica entre PostgreSQL y MongoDB: modelo de datos, escalado, transacciones y casos de uso ideales para cada uno.',
    (SELECT id FROM categorias WHERE slug = 'bases-de-datos')
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'postgresql-vs-mongodb-cuando-usar-cada-uno');

-- 5. Activar Row Level Security (RLS)
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de lectura pública para categorias
CREATE POLICY "Lectura pública de categorias" ON categorias
    FOR SELECT USING (true);

-- 7. Políticas de lectura pública para posts
CREATE POLICY "Lectura pública de posts" ON posts
    FOR SELECT USING (true);

-- 8. Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_posts_categoria_id ON posts(categoria_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias(slug);