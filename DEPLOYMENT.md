# 🚀 Deployment Guide - Loker Makassar

Panduan lengkap untuk deploy Loker Makassar ke production.

## 📋 Pre-Deployment Checklist

### Before You Deploy:
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Build successful locally (`npm run build`)
- [ ] Security audit done (`npm audit`)
- [ ] Performance tested
- [ ] SEO meta tags verified
- [ ] SSL certificate ready (for custom domain)

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Pros:**
- ✅ Built for Next.js
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Edge network (fast)
- ✅ Free tier available
- ✅ Easy rollbacks
- ✅ Preview deployments

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Loker Makassar MVP"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Sign up/Login
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Click "Deploy"

3. **Configure Environment Variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   DATABASE_URL=your_production_database_url
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_super_secret_production_key
   ```

4. **Deploy**
   - Vercel will auto-deploy on every push to main
   - Production URL: `your-project.vercel.app`

**Custom Domain:**
- Settings → Domains → Add Domain
- Point your DNS to Vercel
- Auto SSL certificate

**Cost:** Free for hobby, $20/month for Pro

---

### Option 2: AWS (Scalable)

**Pros:**
- ✅ Highly scalable
- ✅ Full control
- ✅ Many services available

**Services Needed:**
- EC2 or ECS (compute)
- RDS PostgreSQL (database)
- S3 (file storage)
- CloudFront (CDN)
- Route 53 (DNS)
- Certificate Manager (SSL)

**Steps:**

1. **Setup RDS PostgreSQL**
   ```bash
   # Create RDS instance
   # Note the connection URL
   ```

2. **Deploy to EC2**
   ```bash
   # SSH to EC2
   ssh -i key.pem ubuntu@ec2-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone repo
   git clone <your-repo>
   cd lokermakassar

   # Install dependencies
   npm install

   # Set environment variables
   nano .env

   # Build
   npm run build

   # Install PM2
   sudo npm install -g pm2

   # Start with PM2
   pm2 start npm --name "lokermakassar" -- start
   pm2 save
   pm2 startup
   ```

3. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Cost:** ~$30-50/month (t3.small EC2 + RDS)

---

### Option 3: DigitalOcean App Platform

**Pros:**
- ✅ Simple deployment
- ✅ Managed database
- ✅ Auto scaling
- ✅ Good price

**Steps:**

1. **Create Account**
   - Go to https://digitalocean.com
   - Sign up & add payment

2. **Create App**
   - Apps → Create App
   - Connect GitHub repo
   - Auto-detect Next.js

3. **Add Database**
   - Resources → Add Database
   - PostgreSQL
   - Note connection string

4. **Environment Variables**
   ```
   DATABASE_URL=<from_do_database>
   NEXTAUTH_URL=https://your-app.ondigitalocean.app
   NEXTAUTH_SECRET=your_secret
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build

**Cost:** ~$12-25/month

---

### Option 4: Railway

**Pros:**
- ✅ Very simple
- ✅ Free $5/month credit
- ✅ Integrated database

**Steps:**

1. **Deploy to Railway**
   - Go to https://railway.app
   - Click "New Project"
   - Deploy from GitHub
   - Add PostgreSQL database
   - Set environment variables
   - Deploy!

**Cost:** Pay as you go (~$5-15/month)

---

## 🗄️ Database Deployment

### Production Database Options:

#### 1. Supabase (Recommended for MVP)
```
Free tier:
- 500MB database
- Unlimited API requests
- Good for testing

Pricing: Free → $25/month (Pro)
URL: https://supabase.com
```

#### 2. Neon
```
Free tier:
- 3GB storage
- Serverless PostgreSQL

Pricing: Free → $19/month
URL: https://neon.tech
```

#### 3. Railway PostgreSQL
```
Integrated with Railway deployment
Pay as you go

Pricing: ~$5-10/month
```

#### 4. AWS RDS
```
Production-grade
Highly available
Auto backups

Pricing: ~$15-30/month (db.t3.micro)
```

### Database Migration:

```bash
# Generate migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy

# Seed production data (optional)
npm run db:seed
```

---

## 🔐 Security Checklist

### Before Going Live:

- [ ] Change all default passwords
- [ ] Use strong NEXTAUTH_SECRET (generate: `openssl rand -base64 32`)
- [ ] Enable HTTPS only
- [ ] Set secure headers
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Rate limiting on API routes
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)
- [ ] CSRF tokens (NextAuth handles this)
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] No sensitive data in logs
- [ ] Error messages don't leak info

### Add Security Headers:

Create `middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}
```

---

## 📊 Monitoring & Analytics

### Setup Monitoring:

#### 1. Vercel Analytics (if using Vercel)
```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### 2. Google Analytics
```bash
npm install @next/third-parties
```

#### 3. Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### 4. Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 🚀 Deployment Steps (Vercel - Recommended)

### Complete Walkthrough:

#### Step 1: Prepare Production Database

```bash
# Option A: Use existing cloud database (already configured)
DATABASE_URL="postgresql://usr_katalog:password@82.29.166.11:5432/lokermakassar?schema=public"

# Option B: Create new Supabase database (recommended for production)
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Get connection string
# 4. Update DATABASE_URL
```

#### Step 2: Update Environment Variables

Create `.env.production`:
```bash
# Production Database
DATABASE_URL="your_production_database_url"

# NextAuth (update for production domain)
NEXTAUTH_URL="https://lokermakassar.vercel.app"
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"

# Email (when implementing notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

#### Step 3: Database Migration

```bash
# Run migration to production database
npx prisma migrate deploy

# Optionally seed initial data
npm run db:seed
```

#### Step 4: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for production deployment"

# Add remote (create repo on GitHub first)
git remote add origin https://github.com/yourusername/lokermakassar.git

# Push
git push -u origin main
```

#### Step 5: Deploy to Vercel

```bash
# Option A: Via Vercel Dashboard (easier)
# 1. Go to https://vercel.com
# 2. Sign up with GitHub
# 3. Import repository
# 4. Add environment variables
# 5. Deploy

# Option B: Via CLI
npm install -g vercel
vercel login
vercel --prod
```

#### Step 6: Configure Custom Domain (Optional)

```
1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., lokermakassar.com)
3. Update DNS records:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
4. Wait for DNS propagation (up to 48 hours)
5. SSL certificate auto-configured
```

#### Step 7: Verify Deployment

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Test production URL
curl https://your-app.vercel.app
```

---

## 🔧 Post-Deployment

### Things to Do After Deploy:

1. **Test All Pages**
   - Homepage
   - Job listing
   - Job details
   - Companies
   - Login/Register
   - 404 page

2. **Test All Features**
   - Database connectivity
   - Search functionality
   - Filters
   - Links
   - Mobile responsive

3. **Setup Monitoring**
   - Error tracking (Sentry)
   - Uptime monitoring
   - Performance monitoring
   - Analytics

4. **Setup Backups**
   - Database backups (daily)
   - File backups (if any)
   - Code backups (GitHub)

5. **Documentation**
   - Update README with production URL
   - Document deployment process
   - Create runbook for emergencies

6. **Marketing**
   - Submit to Google Search Console
   - Create sitemap.xml
   - Social media announcement
   - Email stakeholders

---

## 📱 Progressive Web App (PWA)

### Make it Installable:

Install next-pwa:
```bash
npm install next-pwa
```

Update `next.config.ts`:
```typescript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // your next config
});
```

Create `public/manifest.json`:
```json
{
  "name": "Loker Makassar",
  "short_name": "Loker MKS",
  "description": "Platform lowongan kerja terbaik di Makassar",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0066CC",
  "theme_color": "#0066CC",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🔍 SEO Optimization

### After Deployment:

1. **Submit Sitemap**
   ```
   https://search.google.com/search-console
   ```

2. **robots.txt**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://lokermakassar.com/sitemap.xml
   ```

3. **Structured Data**
   Already implemented in pages (JSON-LD ready)

4. **Meta Tags**
   Already implemented per page

5. **Performance**
   - Optimize images (WebP format)
   - Enable caching
   - Use CDN (Vercel handles this)

---

## 💰 Cost Estimation

### Option 1: Vercel + Supabase (Recommended for MVP)
```
Vercel (Hobby):        $0/month
Supabase (Free):       $0/month
Domain (optional):     $10-15/year
Total:                 $0-1/month
```

### Option 2: Vercel Pro + Supabase Pro
```
Vercel Pro:            $20/month
Supabase Pro:          $25/month
Domain:                $10-15/year
Total:                 $45-46/month
```

### Option 3: DigitalOcean
```
App Platform:          $12/month
Managed PostgreSQL:    $15/month
Domain:                $10-15/year
Total:                 $27-28/month
```

### Option 4: AWS (Production Grade)
```
EC2 (t3.small):        $15/month
RDS (db.t3.micro):     $15/month
S3 + CloudFront:       $5/month
Route 53:              $1/month
Domain:                $10-15/year
Total:                 $36-37/month
```

**Recommendation for MVP**: Start with Vercel (Free) + Supabase (Free)

---

## 📞 Support & Rollback

### If Something Goes Wrong:

#### Vercel Rollback:
```bash
# Via dashboard
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

# Via CLI
vercel rollback
```

#### Database Rollback:
```bash
# Restore from backup
pg_restore -h host -U user -d dbname backup.dump
```

#### Emergency Contacts:
- Developer: [your-email]
- DevOps: [devops-email]
- Database: [db-admin-email]

---

## ✅ Final Deployment Checklist

### Before Going Live:
- [ ] Database migrated to production
- [ ] Environment variables set
- [ ] Build successful
- [ ] All tests passing
- [ ] Security headers configured
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)
- [ ] Analytics setup
- [ ] Error tracking setup
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team notified

### After Going Live:
- [ ] Test all pages
- [ ] Test mobile version
- [ ] Submit sitemap to Google
- [ ] Monitor for errors
- [ ] Check performance
- [ ] Announce launch
- [ ] Celebrate! 🎉

---

**Deployment Guide Version**: 1.0
**Last Updated**: 7 Februari 2026
**Status**: Ready for Production Deployment

**Good luck with your deployment! 🚀**
