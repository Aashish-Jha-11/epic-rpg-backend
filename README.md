# 🎮 Epic RPG Character Manager Backend

A full-featured CRUD backend API for managing RPG game characters built with TypeScript, Express, and Neon PostgreSQL. Features include character management, battle system, level progression, and JWT authentication.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Aashish-Jha-11/epic-rpg-backend)

## 🚀 Quick Access

- **Live Demo**: [Deployed on Vercel](https://your-app.vercel.app)
- **Frontend Demo**: `http://localhost:8080`
- **API Base URL**: `http://localhost:8080/api`

## ✨ Features

### Core CRUD Operations
- Create new characters with custom stats
- Read single or multiple characters
- Update character details
- Delete single or multiple characters

### Advanced Features
- **Interactive Frontend Demo** - Test API directly in browser
- **Search & Filter** - Search by name, filter by class, rarity, and level
- **Sorting** - Sort by multiple fields (level, date, stats)
- **Pagination** - Handle large datasets efficiently
- **Level Up System** - Character progression with stat boosts
- **Experience System** - Automatic level up when XP threshold reached
- **Battle System** - Character vs character battles with winner calculation
- **JWT Authentication** - Secure endpoints with token-based auth
- **Input Validation** - Comprehensive validation and error handling
- **Neon Database** - Free serverless PostgreSQL with Prisma ORM

### Architecture
Clean OOP structure following best practices:
```
Controllers → Services → Repositories → Models (Prisma)
```

## 🛠️ Tech Stack

- **TypeScript** - Type-safe development
- **Express.js** - Web framework
- **Neon PostgreSQL** - Serverless database
- **Prisma ORM** - Type-safe database client
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js v18 or higher
- Neon Database account (free tier available)

## ⚙️ Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Setup Neon Database

1. Visit [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string

### 3. Configure Environment

```bash
cp .env.example .env
```

Update `.env` with your Neon database URL:
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
PORT=8080
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### 5. Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:8080`

## 🎯 Using the Application

### Option 1: Interactive Demo (Easiest)

1. Start the server: `npm run dev`
2. Open browser: `http://localhost:8080`
3. Use the web interface to register, login, and manage characters

### Option 2: API Endpoints

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player@example.com",
  "password": "securepass123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "player@example.com",
  "password": "securepass123"
}
```

**Response includes JWT token for authentication**

### Character Endpoints

Protected endpoints require: `Authorization: Bearer <token>`

#### Create Character
```http
POST /api/characters
Authorization: Bearer <token>

{
  "name": "Shadow Ninja",
  "class": "assassin",
  "rarity": "legendary",
  "skills": ["stealth", "backstab"]
}
```

#### Get All Characters (with filters)
```http
GET /api/characters?page=1&limit=10&class=warrior&rarity=epic&minLevel=5&search=dragon
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Field to sort by (default: createdAt)
- `sortOrder` - asc or desc (default: desc)
- `class` - Filter by class
- `rarity` - Filter by rarity
- `minLevel` - Minimum level
- `maxLevel` - Maximum level
- `search` - Search in name and skills

#### Get Single Character
```http
GET /api/characters/:id
```

#### Update Character
```http
PUT /api/characters/:id
Authorization: Bearer <token>

{
  "name": "Updated Name",
  "level": 25
}
```

#### Delete Character
```http
DELETE /api/characters/:id
Authorization: Bearer <token>
```

#### Bulk Delete
```http
POST /api/characters/bulk-delete
Authorization: Bearer <token>

{
  "ids": ["id1", "id2", "id3"]
}
```

#### Level Up Character
```http
POST /api/characters/:id/level-up
Authorization: Bearer <token>
```

#### Add Experience
```http
POST /api/characters/:id/add-experience
Authorization: Bearer <token>

{
  "experience": 150
}
```
📁 Project Structure

```
src/
├── config/
│   └── database.ts           # Database connection setup
├── interfaces/
│   ├── character.interface.ts
│   ├── user.interface.ts
│   └── route.interface.ts
├── models/                    # Prisma schema models
├── repositories/              # Data access layer
│   ├── character.repository.ts
│   └── user.repository.ts
├── services/                  # Business logic layer
│   ├── character.service.ts
│   └── auth.service.ts
├── controllers/               # Request handlers
│   ├── character.controller.ts
│   └── auth.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── routes/
│   ├── character.routes.ts
│   └── auth.routes.ts
├── app.ts                    # Express app setup
└── server.ts                 # Entry point
public/
└── index.html                # Frontend demo interface
prisma/
└── schema.prisma             # Database schema
```

## 🧪 Testing the API

### Using the Web Interface
1. Start server: `npm run dev`
2. Open browser: `http://localhost:8080`
3. Register an account
4. Login to receive JWT token
5. Create and manage characters

### Using cURL
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"player1","email":"player@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"player@example.com","password":"pass123"}'

# Get all characters
curl http://localhost:8080/api/characters

# Create character (requires token)
curl -X POST http://localhost:8080/api/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Warrior One","class":"warrior","rarity":"epic","skills":[]}'
```

## 📊 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Run production build
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
```

## ✅ Features Checklist

- ✅ Complete CRUD operations
- ✅ Search, filter, sort, and pagination
- ✅ Input validation and error handling
- ✅ JWT-based authentication
- ✅ Clean OOP architecture
- ✅ Repository pattern for data access
- ✅ Service layer for business logic
- ✅ Additional features (battle system, level progression, experience)
- ✅ Free cloud database (Neon PostgreSQL)
- ✅ Interactive frontend demo
- ✅ Type-safe with TypeScript and Prisma
- ✅ Comprehensive API documentation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)

## 💡 OOP Concepts Demonstrated

- **Encapsulation** - Private methods and properties
- **Abstraction** - Interface-based design
- **Single Responsibility** - Each class has one clear purpose
- **Dependency Injection** - Services inject repositories
- **Repository Pattern** - Abstracted data access
- **Service Pattern** - Business logic separation

## � Deploy to Vercel

### Quick Deploy

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub repository
3. Add environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `JWT_SECRET` - Your secret key
   - `JWT_EXPIRE` - Token expiration (e.g., 7d)
4. Deploy!

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Important Notes for Vercel Deployment

- Vercel automatically runs `vercel-build` script which generates Prisma Client and applies migrations
- Make sure your Neon database URL includes `?sslmode=require`
- Environment variables must be set in Vercel dashboard
- CORS is enabled for all origins (adjust in production if needed)

## 📝 License

MIT License

---

**Built with TypeScript, Express, Prisma, and Neon PostgreSQL**

**🎮 Happy Coding! Battle karo aur level up karo! ⚔️**
