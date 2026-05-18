# AlgoPulse - DSA Analytics Dashboard

AlgoPulse is a modern web application for tracking your Data Structure and Algorithm (DSA) progress, analyzing your LeetCode submissions, and receiving AI-powered recommendations for improvement.

## Features

- **Real-time Analytics**: Track your progress with beautiful, interactive dashboards
- **LeetCode Integration**: Connect your LeetCode account to automatically analyze submissions
- **Problem Categorization**: View problems organized by difficulty level and algorithm category
- **Weekly Progress Tracking**: Monitor your problem-solving activity over time
- **AI Recommendations**: Get personalized learning paths based on your performance
- **Success Rate Analysis**: Understand which categories you excel in and where to focus

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **Authentication**: Custom auth context with JWT
- **Data**: Mock data (ready for backend API integration)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── page.tsx        # Dashboard home
│   │   ├── analytics/      # Detailed analytics page
│   │   └── layout.tsx      # Dashboard layout wrapper
│   ├── api/               # API endpoints
│   │   └── auth/          # Authentication routes
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── connect-leetcode/  # LeetCode connection setup
│   ├── settings/          # User settings
│   ├── globals.css        # Global styles and design tokens
│   └── layout.tsx         # Root layout with AuthProvider
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── dashboard-nav.tsx      # Top navigation
│   │   ├── dashboard-sidebar.tsx  # Sidebar navigation
│   │   └── dashboard-card.tsx     # Reusable stat cards
│   ├── ui/               # shadcn/ui components
│   └── error-boundary.tsx # Error handling
├── contexts/
│   └── auth-context.tsx  # Authentication context
├── lib/
│   ├── api-client.ts     # API utility functions
│   └── utils.ts          # General utilities
└── types/
    └── analytics.ts      # TypeScript interfaces
```

## Usage

### Create an Account

1. Click "Sign Up" on the landing page
2. Enter your details (name, email, password)
3. You'll be prompted to connect your LeetCode account (optional)
4. Skip or connect your account to start tracking

### Login

1. Use `test@example.com` / `password123` for testing (mock credentials)
2. Or create your own account

### Track Progress

1. Navigate to the Dashboard to see your stats
2. Visit Analytics for detailed charts and insights
3. Check Settings to update your LeetCode connection

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/connect-leetcode` - Connect LeetCode account

## Dark Theme

The application uses a sophisticated dark theme optimized for extended viewing:

- **Background**: Deep slate (#0f172a)
- **Card**: Lighter slate (#1e293b)
- **Primary**: Bright blue (#3b82f6)
- **Accent**: Cyan (#06b6d4)
- **Text**: Off-white (#f8fafc)

## Customization

### Colors

Edit `/app/globals.css` to customize the color scheme. The design tokens use oklch color space for better color accuracy.

### Charts

Charts are built with Recharts and can be customized by editing the analytics page (`/app/dashboard/analytics/page.tsx`).

## Mock Data

The application currently uses mock data for analytics. To integrate real data:

1. **Backend Integration**: Replace API calls in `/app/api/*` with real endpoints
2. **LeetCode API**: Implement LeetCode data fetching in `/api/auth/connect-leetcode`
3. **Database**: Set up a database (PostgreSQL, MongoDB, etc.) for persistent storage

## Security Notes

⚠️ **This is a demo application**. For production:

- Implement proper JWT token handling with secure storage
- Use HTTPS for all API calls
- Hash passwords with bcrypt
- Implement rate limiting on auth endpoints
- Add CSRF protection
- Validate all inputs on both client and server
- Implement proper error handling without exposing sensitive info

## Performance Optimizations

- Server-side rendering with Next.js 16
- Code splitting with dynamic imports
- Image optimization
- CSS-in-JS with Tailwind purging
- Responsive design for all screen sizes

## Deployment

This app is ready to deploy on Vercel:

1. Push to GitHub
2. Connect your repository to Vercel
3. Environment variables will be automatically detected
4. Deploy with one click

## Future Enhancements

- Real-time notifications for achievements
- Community features (leaderboards, discussions)
- Advanced ML-based recommendations
- Mobile app with React Native
- Problem tagging and custom collections
- Interview preparation mode
- Social sharing features

## License

MIT - Feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on the repository.

---

Built with care for competitive programmers and DSA learners.
