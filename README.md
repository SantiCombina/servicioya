# ServicioYa - Marketplace de Servicios

Plataforma web que conecta a proveedores de servicios profesionales (plomeros, electricistas, modistas, etc.) con personas que necesitan contratar estos servicios. Construida con Next.js 15 y Payload CMS para ofrecer una experiencia moderna y completa.

## 🚀 Características Principales

- ✅ **Marketplace de servicios** - Conecta proveedores con clientes
- ✅ **Gestión de usuarios** - Registro como proveedor o cliente de servicios
- ✅ **Categorización por rubros** - Servicios organizados por especialidad
- ✅ **Filtrado por localidad** - Búsqueda geolocalizada de servicios
- ✅ **Sistema de calificaciones** - Reviews y comentarios de usuarios
- ✅ **Gestión de reservas** - Sistema de contratación de servicios
- ✅ **Carga de imágenes** - Fotos de perfil y portfolios de servicios
- ✅ **Autenticación segura** - Sistema de login integrado
- ✅ **Interfaz moderna** - Diseño responsive con shadcn/ui y Tailwind CSS
- ✅ **Panel de administración** - Gestión completa con Payload CMS

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS
- **Database**: PostgreSQL (Neon Tech)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **TypeScript**: Para desarrollo type-safe
- **Package Manager**: pnpm

## 📋 Prerrequisitos

- Node.js 18+ 
- pnpm
- Base de datos PostgreSQL (recomendado: Neon Tech)

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd servicioya
   ```

2. **Instala las dependencias**
   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno**
   
   ⚠️ **IMPORTANTE**: Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

   ```env
   # Configuración de Payload CMS
   PAYLOAD_SECRET=tu-secret-key-muy-segura-aqui
   
   # Base de datos PostgreSQL (Neon Tech)
   DATABASE_URL=postgresql://usuario:password@host.neon.tech/nombre_db?sslmode=require
   ```

   **Notas importantes sobre las variables de entorno:**
   - `PAYLOAD_SECRET`: Debe ser una cadena secreta y única para tu aplicación (mínimo 32 caracteres)
   - `DATABASE_URL`: URL de conexión a tu base de datos PostgreSQL en Neon Tech
   
   **Para obtener tu DATABASE_URL de Neon Tech:**
   1. Ve a tu dashboard de [Neon Tech](https://neon.tech)
   2. Selecciona tu proyecto
   3. Ve a la sección "Connection Details"
   4. Copia la "Connection string" completa

4. **Ejecuta el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

5. **Abre la aplicación**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (my-app)/           # Rutas de la aplicación
│   │   ├── login/          # Página de login
│   │   └── users/          # Gestión de usuarios (Sprint 0)
│   ├── (payload)/          # Rutas de Payload CMS
│   └── actions/            # Server Actions
├── collections/            # Colecciones de Payload
│   └── Users.ts            # Modelo de usuarios
├── components/             # Componentes UI
├── lib/                    # Utilidades y configuración
└── payload.config.ts       # Configuración de Payload (PostgreSQL)
```

### Panel de Administración

Accede al panel de administración de Payload en `/admin` para gestión avanzada.

## 🗃️ Base de Datos

Este proyecto utiliza **PostgreSQL** como base de datos, específicamente hospedada en **Neon Tech**, que ofrece:

- ✅ **PostgreSQL serverless** optimizado para aplicaciones modernas
- ✅ **Escalamiento automático** según demanda
- ✅ **Branching de base de datos** para desarrollo
- ✅ **Conexiones SSL** seguras por defecto

### Configuración de Neon Tech

1. Crea una cuenta en [Neon Tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la connection string desde el dashboard
4. Pégala en tu variable `DATABASE_URL`

## 🔒 Configuración de Acceso

### Panel de Administración
Accede al panel de administración de Payload en `/admin` para:
- Gestión de usuarios del sistema
- Configuración de categorías de servicios
- Moderación de contenido
- Análisis y reportes

### Roles de Usuario (Planificados)
- **Admin**: Acceso completo al sistema y panel de administración
- **Proveedor**: Puede publicar y gestionar servicios
- **Cliente**: Puede buscar y contratar servicios

## 🎨 Personalización

### Componentes UI
Los componentes están construidos con shadcn/ui y pueden personalizarse fácilmente editando los archivos en `src/components/ui/`.

### Modelos de Datos
Los modelos de Payload CMS están en `src/collections/` y pueden extenderse según las necesidades del marketplace.

### Schemas de Validación
Los schemas de Zod están en `src/lib/schemas/` y pueden modificarse según tus necesidades.

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente

### Otras Plataformas

Asegúrate de configurar las variables de entorno correctamente en tu plataforma de despliegue.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 💡 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
