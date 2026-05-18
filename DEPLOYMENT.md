# AlgoPulse Deployment Guide

This guide covers deploying AlgoPulse to production environments.

## Prerequisites

- Node.js 18+ installed locally
- Git repository (GitHub recommended)
- Vercel account (for Vercel deployment)

## Local Production Build

### 1. Build Locally
```bash
pnpm build
```

This creates an optimized production build in the `.next/` directory.

### 2. Test Production Build
```bash
pnpm start
```

The app will start on `http://localhost:3000` with production optimizations.

## Deploy to Vercel (Recommended)

### Quickest Method: Git Push

**1. Push to GitHub**
```bash
git add .
git commit -m "Initial AlgoPulse commit"
git push origin main
```

**2. Deploy with Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New..." → "Project"
- Select your GitHub repository
- Click "Import"
- Vercel auto-detects Next.js configuration
- Click "Deploy"

**Done!** Your app is live at `https://your-project.vercel.app`

### Manual Method: Vercel CLI

**1. Install Vercel CLI**
```bash
npm i -g vercel
```

**2. Deploy**
```bash
vercel
```

**3. Follow prompts**
- Link to GitHub (if not already linked)
- Select project settings
- Deploy

## Environment Variables

### Required Variables
Currently, AlgoPulse uses only client-side data (mocks). No environment variables are required.

### When Adding Backend APIs
Add these in Vercel dashboard (Settings → Environment Variables):

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
LEETCODE_API_KEY=your_leetcode_key
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Only use for public data.

## Custom Domain

### In Vercel Dashboard
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records (instructions provided)
5. Wait for SSL certificate (5-30 minutes)

### DNS Configuration
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

For root domain (@):
Type: A
Value: 76.76.19.132
```

## Performance Optimization

### Already Implemented
- ✅ Server-side rendering (SSR)
- ✅ Static generation where possible
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS minification

### Monitor Performance
1. Vercel Analytics (auto-enabled)
2. Web Vitals metrics
3. Lighthouse reports

## Monitoring & Logging

### Vercel Monitoring
- Built-in analytics dashboard
- Error tracking
- Performance metrics
- Deployment history

### Add Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

Update `next.config.mjs`:
```javascript
const withSentryConfig = require("@sentry/nextjs/withSentryConfig");

module.exports = withSentryConfig({
  // ... your config
});
```

### Add LogRocket (Session Replay)
```bash
npm install logrocket
```

## Database Setup

### Option 1: PostgreSQL (Recommended)

**Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Get connection string from settings
4. Add to environment variables

**Railway**
1. Sign up at [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string
4. Add to environment variables

### Option 2: MongoDB

**MongoDB Atlas**
1. Sign up at [mongodb.com](https://mongodb.com)
2. Create a cluster
3. Get connection string
4. Add to environment variables

## SSL/TLS Certificate

Vercel automatically provides free SSL certificates from Let's Encrypt.

### Force HTTPS
Add to `next.config.mjs`:
```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'header',
          key: 'x-forwarded-proto',
          value: 'http',
        },
      ],
      destination: 'https://:host/:path*',
      permanent: true,
    },
  ];
}
```

## Scaling

### Auto-Scaling (Vercel)
- Automatic handling of traffic spikes
- No configuration needed
- Pay only for consumed resources

### Edge Functions
Convert API routes to Edge Functions for lower latency:

```typescript
// api/auth/login/route.ts
export const config = {
  runtime: 'edge'
}

export async function POST(req: Request) {
  // Your code here
}
```

## Backup & Disaster Recovery

### Code Backup
- GitHub is your primary backup
- All commits are version controlled
- Can revert to any previous version

### Database Backup
- Enable automated backups (PostgreSQL/MongoDB)
- Set retention to 30 days
- Test restore procedures monthly

## CI/CD Pipeline

### Automatic Deployments (Vercel)
- Push to `main` → Production
- Push to other branches → Preview

### Preview Deployments
Every pull request gets a preview URL:
```
https://algo-pulse-git-your-branch-your-name.vercel.app
```

## Security Checklist

- [ ] Environment variables set correctly
- [ ] HTTPS enforced
- [ ] JWT secret is strong and random
- [ ] Database has backups enabled
- [ ] API rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Dependencies updated and audited

## Troubleshooting Deployments

### Build Fails
```bash
# Check build locally first
pnpm build

# View Vercel logs
vercel logs

# Check for environment variable issues
vercel env pull
```

### Slow Performance
1. Check Vercel Analytics
2. Review database query performance
3. Consider Edge Functions for APIs
4. Optimize images
5. Implement caching strategy

### Database Connection Issues
```bash
# Test database connection locally
psql $DATABASE_URL -c "SELECT 1"

# Check environment variables
vercel env list
```

### Environment Variables Not Loading
1. Verify variables in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names (case-sensitive)
4. Ensure `NEXT_PUBLIC_` prefix for client-side vars

## Rollback Procedure

### Using Vercel Dashboard
1. Go to Deployments
2. Find previous working version
3. Click the three dots
4. Select "Promote to Production"

### Using Git
```bash
git revert <commit-hash>
git push origin main
# Vercel auto-deploys
```

## Analytics & Monitoring

### Vercel Analytics (Free)
- Web Vitals (CLS, LCP, FID)
- Real user monitoring
- Error tracking

### Real-time Monitoring
```bash
vercel logs --follow
```

### Performance Budgets
Set in `next.config.mjs`:
```javascript
webpack: (config, { dev }) => {
  if (!dev) {
    // Add performance budgets for production
  }
  return config;
}
```

## Cost Estimation

### Vercel
- Hobby: Free (limited)
- Pro: $20/month
- Function invocations: Included
- Bandwidth: Generous free tier

### Database (if added)
- Supabase: Free tier or $25+/month
- MongoDB: Free tier or $57+/month
- Railway: Pay-as-you-go

### Domain
- Custom domain: $10-15/year
- Vercel managed: Free for vercel.app

## Final Checklist

- [ ] Build succeeds locally
- [ ] All environment variables set
- [ ] Database configured (if needed)
- [ ] HTTPS enabled
- [ ] Custom domain configured
- [ ] SSL certificate installed
- [ ] Analytics enabled
- [ ] Error tracking active
- [ ] Backups configured
- [ ] Monitoring set up

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Community**: https://github.com/vercel/next.js/discussions

---

Your AlgoPulse instance is now production-ready! 🚀
