# AccredCert - FDA Compliance Platform

## Overview

AccredCert is a full-stack web application that provides FDA compliance services and regulatory solutions for global manufacturers, distributors, and exporters. The platform features a professional business website with service listings, certificate verification functionality, and a comprehensive admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express session with connect-pg-simple for PostgreSQL storage
- **Authentication**: bcrypt for password hashing with session-based auth
- **File Uploads**: Multer middleware for handling multipart/form-data

### Database Design
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Location**: `shared/schema.ts` for type-safe sharing between client and server
- **Migration Tool**: Drizzle Kit for schema management
- **Connection**: Neon serverless with WebSocket support for development

## Key Components

### Core Entities
1. **Users**: Admin authentication system with username/email login
2. **Services**: FDA compliance services organized by country and category
3. **Certificates**: Digital certificates with verification system using unique certificate numbers
4. **Contact Submissions**: Customer inquiries with read/unread status tracking
5. **File Uploads**: Document management system with client association
6. **Blog Posts**: Content management system for knowledge sharing

### Frontend Pages
- **Home**: Hero section with company overview and call-to-action
- **Services**: Filterable service listings by country (USA, India, Global)
- **Verification**: Certificate verification tool using certificate number
- **About**: Company information with FAQ section
- **Contact**: Contact form with file upload capability
- **Blog**: Knowledge center for compliance insights
- **Admin**: Comprehensive dashboard for content management

### Admin Panel Features
- Service management (CRUD operations)
- Certificate management and verification
- Contact submission tracking
- File upload management
- Blog post authoring with draft/published states
- User session management

## Data Flow

### Authentication Flow
1. Admin login via email/username and password
2. bcrypt password verification
3. Session creation with PostgreSQL storage
4. Protected routes check session validity

### Service Management Flow
1. Admin creates/updates services via admin panel
2. Services stored with country, category, and status flags
3. Public service pages filter by country selection
4. Service cards display with professional styling

### Certificate Verification Flow
1. User inputs certificate number (optionally with client details)
2. Server queries certificates table for matching records
3. System validates certificate status (valid/expired/not_found)
4. Response includes certificate details or error message

### File Upload Flow
1. Multer processes multipart form data
2. Files stored in `/uploads` directory with metadata in database
3. Optional client email association for project tracking
4. Admin panel provides file management interface

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library for accessibility
- **Form Validation**: Zod for runtime type checking and validation
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography
- **Development**: Replit-specific plugins for development environment

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Session Storage**: connect-pg-simple for PostgreSQL session store
- **File Processing**: multer for file upload handling
- **Security**: bcrypt for password hashing

### Build and Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TSX**: TypeScript execution for development server

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- TSX for running TypeScript server directly
- Replit-specific development tooling integration
- Environment variable management for database connection

### Production Build Process
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command
4. **Static Assets**: Frontend bundle served by Express in production

### Configuration Management
- Environment-specific database URLs
- Session secret management
- File upload directory configuration
- CORS and security headers for production deployment

The application is designed as a monorepo with shared TypeScript types, enabling full-stack type safety and efficient development workflows. The architecture supports both development and production environments with appropriate tooling for each stage.