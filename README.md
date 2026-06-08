# JobPilot Frontend 🎨

A modern, responsive web application for job seekers and employers to connect, built with React, TypeScript, Vite, and Tailwind CSS. JobPilot provides an intuitive platform for searching jobs, managing applications, and employer recruitment management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Components & Pages](#components--pages)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Real-time Features](#real-time-features)
- [Styling](#styling)
- [Build & Deployment](#build--deployment)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

JobPilot Frontend is a user-friendly web application that enables:
- **Job Seekers**: Search for jobs, apply to positions, track applications, and communicate with employers
- **Employers**: Post job openings, manage applications, and communicate with candidates
- **Admins**: Manage platform content and user administration

The application is built with performance and user experience in mind, featuring real-time messaging, secure authentication, and responsive design.

## ✨ Features

### For Job Seekers
- User registration and profile management
- Advanced job search and filtering
- One-click job applications
- Application tracking dashboard
- Real-time messaging with employers
- Profile recommendations based on job preferences
- Saved jobs for later review
- Interview scheduling

### For Employers
- Company profile creation and management
- Job posting with detailed descriptions
- Application management dashboard
- Candidate filtering and screening
- Real-time communication with candidates
- Analytics and hiring insights
- Team collaboration tools

### For Admins
- User management and moderation
- Platform analytics dashboard
- Content management
- Issue resolution and support

### General Features
- **Real-time Chat**: Socket.io powered messaging
- **Google OAuth**: Social login integration
- **Payment Integration**: Stripe for premium features
- **Responsive Design**: Mobile-friendly interface
- **Secure Authentication**: JWT-based auth with secure token handling
- **Dark/Light Mode**: (Optional, based on preference)
- **Performance Optimized**: Fast load times and smooth interactions

## 🛠️ Tech Stack

### Core Framework
- **React**: v18.2.0 - UI library
- **TypeScript**: v5.2.2 - Type-safe JavaScript
- **Vite**: v5.1.4 - Lightning-fast build tool
- **React DOM**: v18.2.0 - React rendering

### State Management & Data Fetching
- **Redux Toolkit**: v2.2.2 - Centralized state management
- **React-Redux**: v9.1.0 - React bindings for Redux
- **Redux-Persist**: v6.0.0 - Persist state to local storage
- **Axios**: v1.6.8 - HTTP client for API calls

### UI & Styling
- **Tailwind CSS**: v3.4.1 - Utility-first CSS framework
- **Ant Design (antd)**: v5.15.3 - Component library
- **PrimeReact**: v10.6.2 - Advanced UI components
- **React Icons**: v5.0.1 - Icon library

### Authentication & Security
- **JWT-Decode**: v4.0.0 - JWT token decoding
- **Google OAuth**: @react-oauth/google v0.12.1 - Social login
- **Firebase**: v10.9.0 - Additional auth & services

### Real-time & Communication
- **Socket.io Client**: v4.7.5 - Real-time messaging
- **React-Player**: v2.16.0 - Video/audio playback

### Payment
- **Stripe.js**: @stripe/stripe-js v3.0.10 - Payment processing

### Utilities
- **Date-fns**: v3.6.0 - Date manipulation
- **SweetAlert2**: v11.10.7 - Beautiful alerts
- **dotenv**: v16.4.5 - Environment variables

### Development Tools
- **Vite React SWC Plugin**: Fast Refresh with SWC compiler
- **ESLint**: Code quality and style checking
- **TypeScript**: Type checking
- **PostCSS**: CSS processing with Tailwind
- **Autoprefixer**: Browser vendor prefixes

## 📦 Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (or **yarn**, **pnpm**)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Backend Requirements
- JobPilot Backend services running (Auth, Chat, User, Employer, Job services)
- MongoDB and RabbitMQ for backend operations

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-pilot-frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Verify Installation

```bash
npm list
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_CHAT_API_URL=http://localhost:3001
VITE_USER_API_URL=http://localhost:3003
VITE_EMPLOYER_API_URL=http://localhost:3002
VITE_JOB_API_URL=http://localhost:3004

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here

# Socket.io
VITE_SOCKET_URL=http://localhost:3001

# Stripe
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key

# Firebase
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id

# Environment
VITE_ENVIRONMENT=development
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - `http://localhost:5174` (alternative dev)
   - Your production domain

### Stripe Setup

1. Sign up at [Stripe](https://stripe.com)
2. Get your public API key from dashboard
3. Add to `.env` file

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Copy config details to `.env` file

## 🏃 Running the Project

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Output files will be in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

Fix linting issues (where possible):

```bash
npm run lint -- --fix
```

## 📁 Project Structure

```
job-pilot-frontend/
├── src/
│   ├── @types/                    # TypeScript type definitions
│   │   └── custom types
│   │
│   ├── apis/                      # API integration layer
│   │   ├── auth-api.ts
│   │   ├── user-api.ts
│   │   ├── employer-api.ts
│   │   ├── job-api.ts
│   │   ├── chat-api.ts
│   │   └── index.ts
│   │
│   ├── app/                       # App-level components
│   │   └── App.tsx
│   │
│   ├── assets/                    # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── fonts/
│   │
│   ├── components/                # Reusable components
│   │   ├── userComponents/        # User-specific components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── JobCard/
│   │   │   ├── ApplicationCard/
│   │   │   └── ...
│   │   │
│   │   ├── EmploComponents/       # Employer-specific components
│   │   │   ├── EmployerHeader/
│   │   │   ├── JobPosting/
│   │   │   ├── ApplicationManager/
│   │   │   └── ...
│   │   │
│   │   └── adminComponents/       # Admin-specific components
│   │       ├── AdminDashboard/
│   │       ├── UserManagement/
│   │       ├── Analytics/
│   │       └── ...
│   │
│   ├── context/                   # React Context for global state
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ...
│   │
│   ├── pages/                     # Page components
│   │   ├── meeting/               # Video meeting page
│   │   ├── messenger/             # Chat/messenger page
│   │   ├── FoundNot.tsx          # 404 page
│   │   └── success.tsx            # Success page
│   │
│   ├── redux/                     # Redux store & slices
│   │   ├── store.ts              # Redux store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.ts      # Auth state
│   │   │   ├── userSlice.ts      # User state
│   │   │   ├── jobSlice.ts       # Job state
│   │   │   ├── chatSlice.ts      # Chat state
│   │   │   └── ...
│   │   └── hooks.ts              # Redux hooks
│   │
│   ├── routes/                    # Route configuration
│   │   ├── routes.tsx            # Route definitions
│   │   ├── ProtectedRoute.tsx    # Private route guard
│   │   └── PublicRoute.tsx
│   │
│   ├── services/                  # Business logic & utilities
│   │   ├── auth-service.ts       # Authentication logic
│   │   ├── user-service.ts       # User operations
│   │   ├── job-service.ts        # Job operations
│   │   ├── chat-service.ts       # Chat operations
│   │   ├── storage-service.ts    # Local storage
│   │   └── ...
│   │
│   ├── Global.css                # Global styles
│   ├── main.tsx                   # React entry point
│   ├── page.tsx                   # Root page component
│   └── vite-env.d.ts             # Vite environment types
│
├── public/                        # Static files
│   ├── logo-official.jpg
│   └── ...
│
├── .eslintrc.cjs                  # ESLint configuration
├── .gitignore                     # Git ignore patterns
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript Node config
├── vite.config.ts                 # Vite configuration
├── vercel.json                    # Vercel deployment config
└── README.md                      # This file
```

## 🧩 Components & Pages

### User Components (`userComponents/`)
- **Header**: Navigation bar with user profile
- **Sidebar**: Navigation menu for user pages
- **JobCard**: Displays job listings
- **ApplicationCard**: Shows applications and status
- **ProfileSection**: User profile management
- **SavedJobs**: Saved jobs collection
- **ApplicationTracker**: Application status tracking

### Employer Components (`EmploComponents/`)
- **EmployerHeader**: Employer-specific navigation
- **JobPostingForm**: Create and edit job postings
- **ApplicationManager**: Manage applications received
- **CandidateCard**: Display candidate profiles
- **HiringDashboard**: Overview of hiring metrics
- **AnalyticsPanel**: Recruitment analytics

### Admin Components (`adminComponents/`)
- **AdminDashboard**: Main admin dashboard
- **UserManagement**: Manage all users
- **ContentModeration**: Moderate job postings
- **Analytics**: Platform-wide analytics

### Pages
- **Messenger** (`messenger/`): Real-time chat interface
- **Meeting** (`meeting/`): Video meeting integration
- **NotFound** (`FoundNot.tsx`): 404 error page
- **Success** (`success.tsx`): Operation success page

## 🔄 State Management

### Redux Store Structure

```
store/
├── auth               # Authentication state
├── user              # User profile & data
├── jobs              # Jobs listings & details
├── applications      # Applications state
├── chat              # Chat/messaging state
└── notifications     # Notifications state
```

### Persisted State

Redux-persist is configured to save:
- Auth tokens
- User preferences
- Application cache
- Chat history

## 🔌 API Integration

All API calls are centralized in the `apis/` folder:

```typescript
// Example API calls
import { loginUser, registerUser } from './apis/auth-api';
import { getJobs, applyForJob } from './apis/job-api';
import { sendMessage, getMessages } from './apis/chat-api';
```

### Base URLs by Service

| Service | Base URL | Environment Variable |
|---------|----------|----------------------|
| Auth | http://localhost:3000 | VITE_API_BASE_URL |
| Chat | http://localhost:3001 | VITE_CHAT_API_URL |
| User | http://localhost:3003 | VITE_USER_API_URL |
| Employer | http://localhost:3002 | VITE_EMPLOYER_API_URL |
| Job | http://localhost:3004 | VITE_JOB_API_URL |

## 🔐 Authentication

### JWT Token Management

- Tokens are stored in Redux and local storage (via redux-persist)
- Automatically included in API request headers
- Intercepted and refreshed on 401 errors (if refresh token available)
- Cleared on logout

### Login Methods

1. **Email/Password**: Traditional login
2. **Google OAuth**: Quick social login
3. **Firebase**: Alternative authentication

### Protected Routes

Components use `ProtectedRoute` to restrict access:

```typescript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

## 💬 Real-time Features

### Socket.io Integration

- Configured in `services/socket-service.ts`
- Handles real-time messaging
- Manages connection/disconnection
- Integrates with Redux for state updates

### Messaging

- Real-time message sending/receiving
- Message history in chat view
- Typing indicators (if implemented)
- Read receipts (if implemented)

## 🎨 Styling

### Tailwind CSS

- Utility-first CSS framework
- Responsive design classes
- Custom theme in `tailwind.config.js`
- Dark mode support (configurable)

### Component Libraries

- **Ant Design**: Enterprise-grade components (buttons, forms, modals, tables)
- **PrimeReact**: Advanced UI components (data tables, charts, menus)
- **React Icons**: SVG icons for consistency

### Global Styles

Main styles in `Global.css`:
- Reset and normalizations
- Custom fonts
- CSS variables for themes
- Animation classes

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

Generates optimized files in `dist/` folder with:
- Code splitting
- Tree-shaking
- Minification
- Source maps

### Deployment Options

#### Vercel (Recommended)

Already configured with `vercel.json`:

```bash
npm i -g vercel
vercel deploy
```

#### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

#### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t jobpilot-frontend .
docker run -p 3000:3000 jobpilot-frontend
```

## 👨‍💻 Development

### Hot Module Replacement (HMR)

Changes automatically reflect in browser during development without full reload.

### TypeScript

- Type-safe development
- Run type checking: `tsc --noEmit`
- Use strict mode for better type safety

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type check
npx tsc --noEmit
```

### Performance Optimization

- Code splitting by route
- Lazy loading components
- Image optimization
- Bundle analysis: `npm run build -- --analyze`

### Development Workflow

1. Create feature branch
2. Make changes with HMR active
3. Test locally
4. Run linting and type checking
5. Commit and push
6. Create pull request

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make changes following coding standards
3. Test thoroughly
4. Commit with clear messages: `git commit -m 'Add: feature description'`
5. Push to branch: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Props should be properly typed
- Use meaningful variable names
- Add comments for complex logic
- Follow ESLint configuration

### Component Structure

```typescript
interface ComponentProps {
  // Define props here
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic

  return (
    // JSX
  );
};
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port in vite.config.ts or use --port flag
npm run dev -- --port 5174
```

**Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Fails**
```bash
# Clear Vite cache
rm -rf dist node_modules/.vite
npm run build
```

**API Connection Issues**
- Check `.env` file for correct URLs
- Ensure backend services are running
- Check CORS configuration on backend
- Verify network connectivity

**Redux State Issues**
- Clear local storage: `localStorage.clear()`
- Check Redux DevTools browser extension
- Verify redux-persist configuration

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Review API documentation in backend README
3. Create a new issue with:
   - Screenshots/videos
   - Steps to reproduce
   - Browser and OS information
   - Console errors

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🔗 Related Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Ant Design](https://ant.design)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)

## 🎯 Quick Links

- [Backend Repository](../job-pilot-backend)
- [API Documentation](../job-pilot-backend/README.md)
- [Issue Tracker](#)
- [Project Board](#)

---

**Last Updated**: June 2026

**Project Maintainers**: [Your Team Name]

**Deployed at**: Muhammed Bilal K

## 🌟 Acknowledgments

- React community
- Vite team
- Tailwind CSS
- All contributors and testers
