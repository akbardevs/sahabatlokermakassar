# 🚀 Quick Start Guide - Loker Makassar

Panduan cepat untuk menjalankan aplikasi Loker Makassar dalam 5 menit!

## ⚡ Prerequisites

Pastikan Anda sudah menginstall:
- ✅ Node.js v18 atau lebih baru
- ✅ PostgreSQL 14+
- ✅ Git

Cek versi dengan:
```bash
node --version  # harus v18+
npm --version   # harus v8+
psql --version  # harus 14+
```

## 📥 Installation (5 menit)

### Step 1: Clone & Install (2 menit)
```bash
# Clone repository (jika dari git)
git clone https://github.com/yourusername/lokermakassar.git
cd lokermakassar

# Install dependencies
npm install
```

### Step 2: Setup Database (2 menit)

**Opsi A: PostgreSQL Lokal**
```bash
# Buat database baru
createdb lokermakassar

# Atau via psql
psql -U postgres
CREATE DATABASE lokermakassar;
\q
```

**Opsi B: PostgreSQL Cloud (sudah ter-configure)**
Database sudah ada di: `82.29.166.11:5432`

### Step 3: Environment Variables (30 detik)
File `.env` sudah dikonfigurasi dengan database cloud:
```env
DATABASE_URL="postgresql://usr_katalog:password@82.29.166.11:5432/lokermakassar?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="lokermakassar-secret-key-development"
```

### Step 4: Setup Database Schema (1 menit)
```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed sample data (PENTING!)
npm run db:seed
```

Output yang diharapkan:
```
🌱 Starting seed...
✅ Admin user created
✅ Created 5 companies
✅ Created 8 jobs
✅ Created 10 job seekers
✅ Created sample applications
🎉 Seeding completed!
```

### Step 5: Run Development Server (30 detik)
```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

## 🎉 Selesai!

Aplikasi sudah running! Anda bisa:

### 🌐 Explore Pages
1. **Homepage**: http://localhost:3000
2. **Job Listing**: http://localhost:3000/jobs
3. **Job Detail**: http://localhost:3000/jobs/frontend-developer-pt-teknologi-indonesia

### 🔑 Login Credentials (untuk testing)

**Admin Dashboard** (coming in Phase 2):
```
Email: admin@lokermakassar.com
Password: admin123
```

**Employer Account**:
```
Email: hr@teknologi-indonesia.com
Password: company123
```

**Job Seeker Account**:
```
Email: jobseeker1@example.com
Password: jobseeker123
```

## 🎯 What You Can Do Now

### ✅ Currently Working
1. Browse all job listings
2. View job details
3. See company information
4. Filter by categories (UI ready)
5. Search jobs (UI ready)
6. View similar jobs
7. See application stats
8. Responsive on all devices

### 🚧 Coming Soon (Phase 2)
- Login/Register
- Apply for jobs
- Save favorites
- Company dashboard
- Post new jobs

## 🛠️ Development Tools

### Prisma Studio (Database GUI)
```bash
npm run db:studio
```
Access at: http://localhost:5555

### Database Commands
```bash
# Re-seed database
npm run db:seed

# View database
npm run db:studio

# Reset database (jika perlu)
npm run db:push -- --force-reset
npm run db:seed
```

## 📱 Test Responsive Design

Coba akses dari:
- Desktop browser (Chrome, Firefox, Safari)
- Mobile browser (responsive mode)
- Tablet (responsive mode)

Atau gunakan Chrome DevTools:
1. Tekan `F12`
2. Klik icon "Toggle device toolbar"
3. Pilih device (iPhone, iPad, dll)

## 🐛 Troubleshooting

### Port 3000 sudah digunakan?
```bash
# Ubah port di package.json atau kill process
lsof -ti:3000 | xargs kill -9
```

### Database connection error?
```bash
# Cek database running
psql -U postgres -c "SELECT version();"

# Cek DATABASE_URL di .env
cat .env | grep DATABASE_URL
```

### Prisma error?
```bash
# Re-generate Prisma client
npm run db:generate

# Clear node_modules
rm -rf node_modules
npm install
```

### Seed data tidak muncul?
```bash
# Re-seed database
npm run db:seed

# Atau reset dan seed ulang
npm run db:push -- --force-reset
npm run db:seed
```

## 📊 Database Overview

Setelah seed, database berisi:
- **11 Users** (1 admin, 5 companies, 10 job seekers)
- **5 Companies** (semua verified)
- **8 Jobs** (berbagai kategori, semua published)
- **~20 Applications** (sample data)

## 🎨 Features Demo

### Homepage Features
- Hero section dengan search
- Stats cards (auto-calculated)
- Featured jobs (template)
- Categories grid
- Responsive navbar

### Job Listing Features
- Real data dari database
- Filter sidebar (8+ categories)
- Sort options
- Search bar
- Stats summary
- Featured & urgent badges
- Salary display
- Skills tags
- View/application counts

### Job Detail Features
- Complete job information
- Company profile sidebar
- Contact information
- Similar jobs recommendation
- Other jobs from company
- Share & save buttons
- Responsive layout

## 📈 Performance

Expected metrics:
- **First Load**: < 2 seconds
- **Page Navigation**: < 500ms
- **Database Queries**: < 100ms

Monitor dengan:
- Chrome DevTools (Network, Performance)
- React DevTools (Profiler)
- Next.js build analyzer

## 🔗 Useful Links

- **Development Server**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (after `npm run db:studio`)
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## 📝 Quick Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open database GUI
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check (jika ada)
```

## 💡 Tips

1. **Hot Reload**: Code changes akan auto-reload browser
2. **TypeScript**: Hover over code untuk lihat types
3. **Tailwind**: Gunakan IntelliSense untuk autocomplete
4. **Prisma Studio**: Best untuk explore database
5. **Console Log**: Check browser console untuk errors

## 🎓 Learn More

- Read `BLUEPRINT-SISTEM-LOKERMAKASSAR.md` untuk system design lengkap
- Check `PROGRESS.md` untuk development progress
- See `README.md` untuk detailed documentation
- Explore `prisma/schema.prisma` untuk database schema

## ✨ Next Steps

Setelah aplikasi running:

1. **Explore UI**: Browse halaman-halaman yang ada
2. **Test Responsive**: Resize browser atau gunakan device mode
3. **Check Database**: Buka Prisma Studio (`npm run db:studio`)
4. **Read Code**: Explore struktur code di `src/`
5. **Plan Phase 2**: Review `PROGRESS.md` untuk next features

## 🆘 Need Help?

Jika ada masalah:

1. Check error message di terminal
2. Check browser console (F12)
3. Review troubleshooting section di atas
4. Check `.env` configuration
5. Pastikan database running
6. Try restart dev server

---

**Selamat! Anda sudah siap develop Loker Makassar! 🎉**

Questions? Check dokumentasi atau hubungi tim development.
