# AlgoPulse Quick Start Guide

Get up and running with AlgoPulse in minutes!

## Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Steps

### 1. Explore the Landing Page
The landing page showcases AlgoPulse's key features:
- Real-time Analytics
- AI Recommendations
- LeetCode Integration

### 2. Create an Account
Click **Sign Up** and fill in your details:
- Full name
- Email address
- Password (8+ characters)

### 3. Connect LeetCode (Optional)
After registration, you'll see the LeetCode connection page:
- Enter your LeetCode username
- Or skip to explore the dashboard

### 4. Access Your Dashboard
Once logged in, you'll see:
- **Welcome section** with your name
- **Stats cards** showing problems solved, success rate, and streak
- **AI Recommendations** tailored to your progress

### 5. Explore Analytics
Navigate to **Analytics** for detailed insights:
- Problems by difficulty (pie chart)
- Problems by category (bar chart)
- Weekly progress (line chart)
- Success rate breakdown (horizontal bar chart)

## Test Credentials

For quick testing without creating an account:
- **Email**: `test@example.com`
- **Password**: `password123`

## Key Features

### Dashboard
- **At a Glance Stats**: Total problems, solved problems, success rate, current streak
- **AI Recommendations**: Personalized tips based on your performance
- **Quick Navigation**: Easy access to analytics and settings

### Analytics
- **Difficulty Distribution**: See where you excel
- **Category Breakdown**: Identify weak areas
- **Weekly Progress**: Track your momentum
- **Success Rates**: Performance by category

### Settings
- **Account Info**: View your profile
- **LeetCode Connection**: Update your LeetCode username
- **Logout**: Sign out securely

## Navigation

### Desktop
- **Sidebar** (left): Main navigation menu
- **Top Bar**: User menu and settings
- **Mobile Menu** (hamburger): Appears on smaller screens

### Mobile
- **Mobile Menu** (hamburger icon): Navigation drawer
- **Top Bar**: User controls and logout
- **Full-width layout**: Optimized for touch

## Data & Mock APIs

AlgoPulse uses mock data and APIs for demonstration:
- User authentication is simulated
- Problem data is hardcoded
- Analytics are calculated from mock problems
- All data is lost on page refresh

## Customization

### Change the Theme
Edit `/app/globals.css`:
```css
.dark {
  --primary: oklch(0.55 0.24 254);  /* Change primary color */
  --accent: oklch(0.58 0.22 203);   /* Change accent color */
  /* ... other variables ... */
}
```

### Add New Pages
Create new routes in `/app/`:
```typescript
// /app/new-page/page.tsx
export default function NewPage() {
  return <div>Your content here</div>;
}
```

### Modify Charts
Edit `/app/dashboard/analytics/page.tsx`:
- Change data arrays
- Add/remove chart types
- Customize colors

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

### Environment Variables
Add to Vercel dashboard if needed:
```
NEXT_PUBLIC_API_URL=your-api-url
```

## API Integration

### Replace Mock APIs
Update these files to connect to your backend:
- `/app/api/auth/login/route.ts`
- `/app/api/auth/register/route.ts`
- `/app/api/auth/connect-leetcode/route.ts`

### Example Real API Call
```typescript
// In login/page.tsx
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
pnpm dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try again
pnpm dev
```

### Login Issues
- Use test credentials: `test@example.com` / `password123`
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

## Project Structure Quick Reference

```
AlgoPulse/
├── app/
│   ├── dashboard/        ← Main dashboard pages
│   ├── api/             ← Backend API routes
│   ├── login/           ← Login page
│   ├── register/        ← Registration page
│   ├── settings/        ← Settings page
│   ├── globals.css      ← Theme configuration
│   └── layout.tsx       ← Root layout
├── components/
│   ├── dashboard/       ← Dashboard components
│   └── ui/             ← shadcn/ui components
├── contexts/
│   └── auth-context.tsx ← Auth logic
├── lib/
│   ├── api-client.ts   ← API utilities
│   └── utils.ts        ← Helper functions
└── types/
    └── analytics.ts    ← TypeScript interfaces
```

## Next Steps

1. **Integrate Real Data**: Connect to your backend
2. **Add LeetCode API**: Fetch real problem data
3. **Implement Database**: Store user data persistently
4. **Customize Styling**: Match your brand
5. **Add More Features**: Discussions, leaderboards, etc.

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review component examples in `/components/ui/`
- Explore Next.js docs: [nextjs.org](https://nextjs.org)
- React Recharts: [recharts.org](https://recharts.org)

---

Happy coding! Track harder, learn smarter with AlgoPulse.
