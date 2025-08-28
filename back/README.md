# Matrizes Backend

Backend API for the Matrizes project - a content management system for educational materials organized in environments, sub-environments, articles, and blocks.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with admin/user roles
- **User Management**: Admin can manage users, block/unblock accounts
- **Content Management**: Hierarchical structure (Ambientes → Subambientes → Artigos → Blocos)
- **Favorites System**: Users can favorite articles
- **Reading Progress**: Track which blocks users have read
- **RESTful API**: Clean API endpoints following REST principles

## 🏗️ Architecture

The project follows a clean architecture pattern with:

- **Presentation Layer**: Controllers, routes, schemas, middlewares
- **Services Layer**: Business logic and domain rules
- **Data Layer**: Models, interfaces, repositories
- **Utils**: Authentication helpers and utilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

## 🛠️ Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment**:
Update the `.env` file with your database credentials:
```env
DATABASE_URL="mysql://username:password@localhost:3306/matrizes"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

3. **Setup database**:
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

4. **Start development server**:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/renew-token` - Refresh JWT token

### User Management (Admin only)
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `PATCH /users/:id/block` - Block user
- `PATCH /users/:id/unblock` - Unblock user

### Content Management

#### Ambientes (Admin only for CUD, Public for Read)
- `GET /ambientes` - List all environments
- `POST /ambientes` - Create environment
- `PUT /ambientes/:id` - Update environment
- `DELETE /ambientes/:id` - Delete environment

#### Subambientes (Admin only for CUD, Public for Read)
- `GET /ambientes/:ambienteId/subambientes` - List sub-environments
- `POST /ambientes/:ambienteId/subambientes` - Create sub-environment
- `PUT /subambientes/:id` - Update sub-environment
- `DELETE /subambientes/:id` - Delete sub-environment

#### Artigos (Admin only for CUD, Public for Read)
- `GET /subambientes/:subambienteId/artigos` - List articles
- `GET /artigos/:id` - Get article with blocks
- `POST /subambientes/:subambienteId/artigos` - Create article
- `PUT /artigos/:id` - Update article
- `DELETE /artigos/:id` - Delete article

#### Blocos (Admin only)
- `POST /artigos/:artigoId/blocos` - Create block
- `PUT /blocos/:id` - Update block
- `DELETE /blocos/:id` - Delete block
- `PATCH /artigos/:artigoId/blocos/reorder` - Reorder blocks

### User Features (Authenticated)
- `POST /favorites` - Add article to favorites
- `DELETE /favorites` - Remove from favorites
- `GET /favorites` - List user favorites
- `POST /readings` - Mark block as read
- `GET /artigos/:artigoId/readings` - Get read blocks for article

## 🗄️ Database Schema

The database includes the following main entities:

- **User**: Users with roles (ADMIN/USER)
- **Ambiente**: Top-level content categories
- **Subambiente**: Sub-categories within environments
- **Artigo**: Articles containing content blocks
- **Bloco**: Content blocks (TEXT/IMAGE/VIDEO)
- **Favorite**: User favorites
- **Reading**: Reading progress tracking

## 🔐 Default Credentials

After running the seed script, you can use these credentials:

- **Admin**: `admin@matrizes.com` / `admin123`
- **User**: `user@matrizes.com` / `user123`

## 🧪 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:reset` - Reset database (careful!)

## 📁 Project Structure

```
back/
├── src/
│   ├── data/
│   │   ├── interfaces/     # Data interfaces
│   │   ├── models/         # Domain models
│   │   └── repositories/   # Data access layer
│   ├── services/           # Business logic
│   ├── presentation/
│   │   ├── controllers/    # HTTP controllers
│   │   ├── routes/         # Route definitions
│   │   ├── schemas/        # Validation schemas
│   │   └── middlewares/    # Auth & other middlewares
│   ├── utils/              # Utilities
│   ├── start_db/           # Database seed scripts
│   └── index.ts            # Server entry point
├── prisma/
│   └── schema.prisma       # Database schema
├── package.json
└── README.md
```

## 🔧 Technologies Used

- **Fastify** - Fast web framework
- **Prisma** - Modern database toolkit
- **Zod** - Schema validation
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

## 🚦 Health Check

The API includes a health check endpoint:
- `GET /health` - Returns server status and timestamp
