# Portfolio Admin Dashboard

A full-stack portfolio management system with a professional admin dashboard built with Next.js, Express, and MongoDB.

## Features

- 🔐 Secure JWT authentication
- 📊 Interactive dashboard with charts and statistics
- 📝 Manage skills, projects, experiences, and messages
- 🎨 Modern, responsive UI with Tailwind CSS
- 📈 Real-time activity tracking
- 🔄 RESTful API architecture

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

4. Create an admin user:
```bash
node createAdmin.js
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `frontend/app/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Admin Dashboard
- `GET /api/admin/summary` - Get dashboard statistics
- `GET /api/admin/activities` - Get recent activities

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Experiences
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience (protected)
- `PUT /api/experiences/:id` - Update experience (protected)
- `DELETE /api/experiences/:id` - Delete experience (protected)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (protected)

## Admin Dashboard Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with statistics
- `/admin/skills` - Manage skills
- `/admin/projects` - Manage projects
- `/admin/experience` - Manage experiences
- `/admin/messages` - View contact messages

## Project Structure

```
portfolio/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and environment config
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── admin/          # Admin pages
    │   ├── components/     # React components
    │   ├── lib/            # API and auth utilities
    │   ├── hooks/          # Custom React hooks
    │   └── types/          # TypeScript types
    ├── .env.local          # Frontend environment variables
    └── package.json
```

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with auth middleware
- CORS configuration
- Environment variable management

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js dev server with hot reload
```

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify all environment variables are set

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

### Login fails
- Create admin user using `node createAdmin.js`
- Check JWT_SECRET is set in backend `.env`
- Clear browser localStorage and try again

## License

MIT
