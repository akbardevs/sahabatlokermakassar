# Loker Makassar

Platform lowongan kerja modern untuk wilayah Makassar dan Sulawesi Selatan. Dibangun dengan teknologi terkini untuk memberikan pengalaman terbaik bagi pencari kerja dan perusahaan.

## 🚀 Fitur Utama

### Untuk Pencari Kerja
- ✅ Cari lowongan kerja dengan filter advanced
- ✅ Lihat detail lowongan lengkap dengan informasi perusahaan
- ✅ Simpan lowongan favorit
- ✅ Lamar pekerjaan dengan mudah
- ✅ Tracking status aplikasi
- ✅ Job alerts & notifikasi
- ✅ Profile & resume builder

### Untuk Perusahaan
- ✅ Pasang lowongan kerja
- ✅ Applicant Tracking System (ATS)
- ✅ Dashboard analytics
- ✅ Verifikasi perusahaan
- ✅ Featured job listings
- ✅ Manage applications

### Fitur Lainnya
- ✅ Company reviews & ratings
- ✅ Blog & tips karir
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Progressive Web App (PWA) ready

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand, React Query

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Validation**: Zod

### DevOps
- **Hosting**: Vercel / Self-hosted
- **Database**: PostgreSQL (Cloud)
- **Version Control**: Git

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm atau yarn

### Setup Steps

1. **Clone repository**
```bash
git clone https://github.com/yourusername/lokermakassar.git
cd lokermakassar
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi Anda:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lokermakassar?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"
```

4. **Setup database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🗄️ Database Schema

Database menggunakan PostgreSQL dengan schema lengkap untuk:
- Users (Job Seekers & Employers)
- Companies
- Jobs
- Job Applications
- Saved Jobs
- Job Alerts
- Company Reviews
- Articles/Blog
- Notifications
- Analytics Events

Lihat `prisma/schema.prisma` untuk detail lengkap.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed sample data
```

## 🔑 Default Login Credentials

Setelah menjalankan seed:

**Admin:**
- Email: admin@lokermakassar.com
- Password: admin123

**Employer:**
- Email: hr@teknologi-indonesia.com
- Password: company123

**Job Seeker:**
- Email: jobseeker1@example.com
- Password: jobseeker123

## 🏗️ Project Structure

```
lokermakassar/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js app router
│   │   ├── jobs/          # Jobs pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   └── jobs/         # Job-specific components
│   ├── lib/              # Utilities & helpers
│   │   ├── prisma.ts     # Prisma client
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
├── public/               # Static files
├── .env                  # Environment variables
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#0066CC) - CTA, links
- **Secondary**: Orange (#FF6B35) - Accents
- **Success**: Green (#06D6A0)
- **Warning**: Yellow (#FFB800)
- **Error**: Red (#EF476F)

### Typography
- **Font**: Inter (Google Fonts)
- **Base Size**: 16px
- **Line Height**: 1.5

## 📱 Features Roadmap

### Phase 1 (MVP) ✅
- [x] Homepage
- [x] Job listing dengan filters
- [x] Job detail page
- [x] Database setup
- [x] Seed data

### Phase 2 (Q1 2026)
- [ ] Authentication (Login/Register)
- [ ] User profile management
- [ ] Job application system
- [ ] Company dashboard
- [ ] Job posting CRUD

### Phase 3 (Q2 2026)
- [ ] Applicant Tracking System (ATS)
- [ ] Saved jobs & job alerts
- [ ] Company reviews
- [ ] Advanced search & filters
- [ ] Payment integration

### Phase 4 (Q3 2026)
- [ ] AI job recommendations
- [ ] Resume parser
- [ ] Chat/messaging system
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

## 🔒 Security

- ✅ Password hashing dengan bcrypt
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting (planned)
- ✅ Input validation dengan Zod

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Import project ke Vercel
3. Set environment variables
4. Deploy

### Self-Hosted
1. Build production: `npm run build`
2. Start server: `npm start`
3. Setup reverse proxy (Nginx)
4. Configure SSL certificate

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact & Support

- **Email**: support@lokermakassar.com
- **Website**: https://lokermakassar.com
- **Documentation**: https://docs.lokermakassar.com

## 🙏 Acknowledgments

- Next.js team untuk framework yang luar biasa
- Prisma team untuk ORM yang powerful
- Vercel untuk hosting platform
- Komunitas open source

---

**Built with ❤️ for Makassar**

Dibuat dengan teknologi modern untuk membantu masyarakat Makassar menemukan Pekerjaan Terkbaik mereka.
