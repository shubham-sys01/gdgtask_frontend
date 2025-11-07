# Todo App - Frontend

A modern React application built with Vite for managing todos with authentication, featuring a crisp black and white design theme.

## Features

- User registration and login
- JWT-based authentication with token storage
- Protected routes with automatic redirect
- Todo dashboard with CRUD operations
- Smooth animations and transitions (CSS-based)
- Responsive design with TailwindCSS
- Modern UI with black and white theme
- Roboto font family

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

`



## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.js              # Axios instance with auth interceptor
│   ├── components/
│   │   ├── AuthCard.jsx           # Reusable authentication card component
│   │   └── ProtectedRoute.jsx    # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context provider
│   ├── hooks/
│   │   └── useAuth.js             # Custom hook for authentication
│   ├── pages/
│   │   ├── Dashboard.jsx          # Main todo dashboard
│   │   ├── Login.jsx             # Login page
│   │   └── Register.jsx          # Registration page
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles and Tailwind imports
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # TailwindCSS configuration
├── postcss.config.js              # PostCSS configuration
├── package.json
└── README.md
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework
- **Heroicons** - Icon library
- **Roboto** - Google Font

## Pages

### Login (`/login`)
- Email and password authentication
- Redirects to dashboard on success
- Link to registration page

### Register (`/register`)
- User registration form (name, email, password)
- Redirects to login on success
- Link to login page

### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Add new todos
- View all todos
- Toggle todo completion status
- Delete todos
- Logout functionality

## Authentication Flow

1. User registers/logs in through the respective pages
2. JWT token and user data are stored in localStorage
3. Token is automatically attached to API requests via axios interceptor
4. Protected routes check authentication status
5. Unauthenticated users are redirected to login
6. Logout clears token and user data from localStorage

## API Integration

The frontend communicates with the backend API through the axios client configured in `src/api/client.js`. The client automatically:
- Adds the base URL
- Attaches the JWT token to requests via the `Authorization` header
- Handles errors consistently

## Styling

- **Theme**: Black and white with high contrast
- **Font**: Roboto (Google Fonts)
- **Framework**: TailwindCSS
- **Animations**: CSS transitions and transforms (no external animation libraries)

## Environment Variables

- `VITE_API_URL` - Backend API URL 

## Browser Support

Modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API






