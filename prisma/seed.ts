import { PrismaClient, JobType, JobLevel, LocationType, JobStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@lokermakassar.com" },
    update: {},
    create: {
      email: "admin@lokermakassar.com",
      passwordHash: adminPassword,
      fullName: "Admin Loker Makassar",
      role: UserRole.ADMIN,
      isVerified: true,
      isActive: true,
    },
  });
  console.log("✅ Admin user created");

  // Create Sample Companies with Users
  const companies = [
    {
      email: "hr@teknologi-indonesia.com",
      fullName: "PT Teknologi Indonesia",
      companyName: "PT Teknologi Indonesia",
      industry: "Teknologi Informasi",
      companySize: "50-100 karyawan",
      description:
        "Perusahaan teknologi yang fokus pada pengembangan aplikasi mobile dan web. Kami berkomitmen untuk memberikan solusi digital terbaik bagi klien kami.",
      city: "Makassar",
      category: "IT & Software Development",
    },
    {
      email: "recruitment@makmur-sejahtera.com",
      fullName: "CV Makmur Sejahtera",
      companyName: "CV Makmur Sejahtera",
      industry: "Retail & E-commerce",
      companySize: "20-50 karyawan",
      description:
        "Perusahaan retail modern yang menyediakan berbagai kebutuhan sehari-hari dengan harga terjangkau. Memiliki 10+ cabang di Makassar.",
      city: "Makassar",
      category: "Retail",
    },
    {
      email: "hrd@sultanberkah.co.id",
      fullName: "PT Sultan Berkah Indonesia",
      companyName: "PT Sultan Berkah Indonesia",
      industry: "Manufaktur",
      companySize: "100-500 karyawan",
      description:
        "Perusahaan manufaktur yang memproduksi berbagai produk consumer goods berkualitas tinggi untuk pasar lokal dan ekspor.",
      city: "Makassar",
      category: "Manufacturing",
    },
    {
      email: "career@hospitalcare.com",
      fullName: "RS Hospital Care Makassar",
      companyName: "RS Hospital Care Makassar",
      industry: "Kesehatan",
      companySize: "200+ karyawan",
      description:
        "Rumah sakit modern dengan fasilitas lengkap dan tenaga medis profesional. Melayani masyarakat dengan standar pelayanan internasional.",
      city: "Makassar",
      category: "Healthcare",
    },
    {
      email: "jobs@edutech.id",
      fullName: "PT Edutech Nusantara",
      companyName: "PT Edutech Nusantara",
      industry: "Pendidikan & Teknologi",
      companySize: "30-50 karyawan",
      description:
        "Startup edtech yang mengembangkan platform pembelajaran online untuk siswa di seluruh Indonesia dengan teknologi AI.",
      city: "Makassar",
      category: "Education & Technology",
    },
  ];

  const createdCompanies = [];
  for (const company of companies) {
    const password = await bcrypt.hash("company123", 10);
    const user = await prisma.user.create({
      data: {
        email: company.email,
        passwordHash: password,
        fullName: company.fullName,
        role: UserRole.EMPLOYER,
        isVerified: true,
        isActive: true,
      },
    });

    const companyRecord = await prisma.company.create({
      data: {
        userId: user.id,
        companyName: company.companyName,
        companySlug: company.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        industry: company.industry,
        companySize: company.companySize,
        description: company.description,
        city: company.city,
        province: "Sulawesi Selatan",
        isVerified: true,
        rating: 4.5,
        totalReviews: Math.floor(Math.random() * 50) + 10,
      },
    });

    createdCompanies.push(companyRecord);
  }
  console.log(`✅ Created ${createdCompanies.length} companies`);

  // Create Sample Jobs
  const jobTemplates = [
    {
      title: "Frontend Developer",
      description: `Kami mencari Frontend Developer yang berpengalaman untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk mengembangkan antarmuka pengguna yang menarik dan responsif.

**Tanggung Jawab:**
- Mengembangkan UI/UX yang responsif menggunakan React/Next.js
- Kolaborasi dengan tim backend untuk integrasi API
- Optimasi performa aplikasi web
- Code review dan mentoring junior developer

**Kualifikasi:**
- Minimal 2 tahun pengalaman sebagai Frontend Developer
- Menguasai React.js, Next.js, TypeScript
- Familiar dengan Tailwind CSS atau CSS frameworks lainnya
- Memahami konsep RESTful API
- Kemampuan problem solving yang baik`,
      requirements: "S1 Teknik Informatika/Sistem Informasi, 2+ tahun pengalaman, Menguasai React & TypeScript",
      responsibilities: "Develop & maintain web applications, Code review, Team collaboration",
      benefits: "BPJS, Tunjangan makan, WFH flexibility, Training & development",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.MID,
      educationMin: "S1",
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 5000000,
      salaryMax: 8000000,
      category: "IT & Software Development",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
    },
    {
      title: "Digital Marketing Specialist",
      description: `Bergabunglah dengan tim marketing kami untuk membantu mengembangkan strategi digital marketing yang efektif dan meningkatkan brand awareness perusahaan.

**Tanggung Jawab:**
- Merancang dan melaksanakan kampanye digital marketing
- Mengelola social media (Instagram, Facebook, TikTok)
- Menganalisis metrics dan membuat laporan performa
- SEO/SEM optimization
- Content creation dan copywriting

**Kualifikasi:**
- Minimal 1 tahun pengalaman di digital marketing
- Menguasai Google Analytics, Meta Ads, Google Ads
- Kreatif dan up-to-date dengan trend digital
- Kemampuan copywriting yang baik
- Portfolio atau case study yang bisa ditunjukkan`,
      requirements: "S1 Marketing/Komunikasi, 1+ tahun pengalaman, Menguasai digital marketing tools",
      responsibilities: "Campaign management, Social media management, Analytics & reporting",
      benefits: "BPJS, Bonus performance, Flexible working hours",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.ENTRY,
      educationMin: "S1",
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 4000000,
      salaryMax: 6000000,
      category: "Marketing & Communications",
      skills: ["Digital Marketing", "Social Media", "Google Ads", "SEO", "Content Creation"],
    },
    {
      title: "Staff Admin & Keuangan",
      description: `Dibutuhkan segera Staff Admin & Keuangan untuk mengelola administrasi dan keuangan perusahaan.

**Tanggung Jawab:**
- Mengelola administrasi umum perusahaan
- Input dan pencatatan transaksi keuangan
- Membuat laporan keuangan bulanan
- Koordinasi dengan tim lain untuk kebutuhan administratif
- Arsip dokumen perusahaan

**Kualifikasi:**
- Fresh graduate dipersilahkan melamar
- Pendidikan minimal D3 Akuntansi/Manajemen
- Menguasai Microsoft Excel
- Teliti, rapi, dan terorganisir
- Jujur dan dapat dipercaya`,
      requirements: "D3 Akuntansi/Manajemen, Fresh graduate welcome, Microsoft Excel",
      responsibilities: "Administrasi umum, Pencatatan keuangan, Laporan bulanan",
      benefits: "BPJS, Uang makan, Transport",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.ENTRY,
      educationMin: "D3",
      experienceMin: 0,
      experienceMax: 2,
      salaryMin: 3500000,
      salaryMax: 4500000,
      category: "Administrasi & Keuangan",
      skills: ["Microsoft Excel", "Administrasi", "Akuntansi Dasar", "Pembukuan"],
    },
    {
      title: "Customer Service Representative",
      description: `Kami mencari individu yang ramah dan komunikatif untuk posisi Customer Service Representative.

**Tanggung Jawab:**
- Melayani customer via telepon, email, dan chat
- Menangani keluhan dan pertanyaan customer
- Memberikan informasi produk/layanan
- Follow up kepuasan customer
- Membuat laporan daily/weekly

**Kualifikasi:**
- Minimal SMA/SMK sederajat
- Pengalaman min. 1 tahun di customer service (lebih disukai)
- Komunikasi yang baik dan ramah
- Sabar dalam menghadapi customer
- Bersedia bekerja shift`,
      requirements: "SMA/SMK, 1 tahun pengalaman, Komunikasi baik, Sabar",
      responsibilities: "Handle customer inquiries, Complaint resolution, Daily reporting",
      benefits: "BPJS, Uang makan, Bonus, Jenjang karir",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.ENTRY,
      educationMin: "SMA/SMK",
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 3000000,
      salaryMax: 4000000,
      category: "Customer Service",
      skills: ["Communication", "Problem Solving", "Customer Service", "Microsoft Office"],
    },
    {
      title: "Perawat (Nurse)",
      description: `Rumah sakit kami membutuhkan Perawat profesional untuk memberikan pelayanan kesehatan terbaik kepada pasien.

**Tanggung Jawab:**
- Memberikan asuhan keperawatan kepada pasien
- Melakukan tindakan keperawatan sesuai SOP
- Observasi kondisi pasien dan melaporkan kepada dokter
- Dokumentasi rekam medis
- Edukasi kesehatan kepada pasien dan keluarga

**Kualifikasi:**
- Pendidikan D3/S1 Keperawatan
- Memiliki STR aktif
- Pengalaman minimal 1 tahun (fresh graduate dipertimbangkan)
- Mampu bekerja shift (pagi, siang, malam)
- Komunikatif dan empati tinggi`,
      requirements: "D3/S1 Keperawatan, STR aktif, Pengalaman 1+ tahun",
      responsibilities: "Asuhan keperawatan, Tindakan medis, Dokumentasi, Patient education",
      benefits: "BPJS, Tunjangan shift, Makan, Training berkelanjutan",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.ENTRY,
      educationMin: "D3",
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 4500000,
      salaryMax: 6500000,
      category: "Healthcare",
      skills: ["Nursing", "Patient Care", "Medical Documentation", "Emergency Response"],
    },
    {
      title: "Backend Developer (Node.js)",
      description: `Join our tech team sebagai Backend Developer untuk membangun sistem backend yang scalable dan reliable.

**Tanggung Jawab:**
- Develop & maintain REST API menggunakan Node.js
- Database design & optimization (PostgreSQL/MongoDB)
- Implementasi security best practices
- Unit testing & integration testing
- Deploy & monitoring production servers

**Kualifikasi:**
- Minimal 2 tahun pengalaman Node.js development
- Menguasai Express.js/Nest.js, TypeScript
- Database PostgreSQL/MongoDB
- Familiar dengan Docker & CI/CD
- Experience dengan cloud platform (AWS/GCP)`,
      requirements: "S1 Teknik Informatika, 2+ tahun Node.js, Database, Cloud platform",
      responsibilities: "API development, Database optimization, Testing, Deployment",
      benefits: "BPJS, Remote work, Laptop, Training budget, Bonus performance",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.MID,
      educationMin: "S1",
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 6000000,
      salaryMax: 10000000,
      category: "IT & Software Development",
      skills: ["Node.js", "Express.js", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    },
    {
      title: "Desainer Grafis",
      description: `Perusahaan kami membutuhkan Desainer Grafis kreatif untuk membuat visual design yang menarik.

**Tanggung Jawab:**
- Membuat design untuk social media, website, & print materials
- Branding & identity design
- Ilustrasi & infografis
- Video editing (basic)
- Kolaborasi dengan tim marketing

**Kualifikasi:**
- Minimal 1 tahun pengalaman sebagai graphic designer
- Menguasai Adobe Creative Suite (Photoshop, Illustrator, InDesign)
- Portfolio design yang bisa ditunjukkan
- Kreatif, detail-oriented, dan up-to-date dengan design trends
- Bonus jika bisa video editing (Premiere Pro/After Effects)`,
      requirements: "D3/S1 DKV, 1+ tahun pengalaman, Adobe Creative Suite, Portfolio",
      responsibilities: "Graphic design, Branding, Social media visuals, Print materials",
      benefits: "BPJS, WFH flexibility, Creative environment, Training",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.ENTRY,
      educationMin: "D3",
      experienceMin: 1,
      experienceMax: 3,
      salaryMin: 3500000,
      salaryMax: 5500000,
      category: "Design & Creative",
      skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Branding", "UI Design"],
    },
    {
      title: "Sales Executive B2B",
      description: `Kami mencari Sales Executive yang berpengalaman dalam B2B sales untuk memperluas client base kami.

**Tanggung Jawab:**
- Mencari dan mengembangkan client baru (B2B)
- Presentasi produk/layanan kepada potential clients
- Negosiasi & closing deals
- Maintain relationship dengan existing clients
- Achieve sales target yang ditetapkan

**Kualifikasi:**
- Minimal 2 tahun pengalaman di B2B sales
- Proven track record dalam mencapai target
- Excellent communication & presentation skills
- Strong negotiation skills
- Memiliki kendaraan pribadi & SIM A`,
      requirements: "S1 semua jurusan, 2+ tahun B2B sales, Kendaraan pribadi, SIM A",
      responsibilities: "Client acquisition, Product presentation, Deal closing, Relationship management",
      benefits: "Gaji pokok + Komisi menarik, BPJS, Uang bensin, Bonus target, Jenjang karir",
      jobType: JobType.FULL_TIME,
      jobLevel: JobLevel.MID,
      educationMin: "S1",
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 4000000,
      salaryMax: 7000000,
      category: "Sales & Business Development",
      skills: ["B2B Sales", "Negotiation", "Presentation", "Client Management", "Target Oriented"],
    },
  ];

  const createdJobs = [];
  for (let i = 0; i < jobTemplates.length; i++) {
    const template = jobTemplates[i];
    const company = createdCompanies[i % createdCompanies.length];

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title: template.title,
        slug: `${template.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${company.companySlug}`,
        description: template.description,
        requirements: template.requirements,
        responsibilities: template.responsibilities,
        benefits: template.benefits,
        jobType: template.jobType,
        jobLevel: template.jobLevel,
        educationMin: template.educationMin,
        experienceMin: template.experienceMin,
        experienceMax: template.experienceMax,
        salaryMin: template.salaryMin,
        salaryMax: template.salaryMax,
        locationType: i % 3 === 0 ? LocationType.REMOTE : i % 3 === 1 ? LocationType.HYBRID : LocationType.ON_SITE,
        city: "Makassar",
        district: ["Panakkukang", "Tamalanrea", "Makassar", "Biringkanaya", "Rappocini"][i % 5],
        category: template.category,
        skills: template.skills,
        totalPositions: Math.floor(Math.random() * 3) + 1,
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        contactEmail: company.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "") + "@company.com",
        contactWhatsapp: "081234567890",
        applicationMethod: "INTERNAL",
        status: JobStatus.PUBLISHED,
        viewCount: Math.floor(Math.random() * 500) + 50,
        applicationCount: Math.floor(Math.random() * 30) + 5,
        isFeatured: i % 3 === 0,
        isUrgent: i % 4 === 0,
        publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random within last 7 days
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    createdJobs.push(job);
  }
  console.log(`✅ Created ${createdJobs.length} jobs`);

  // Create Sample Job Seekers
  const jobSeekers = [];
  for (let i = 1; i <= 10; i++) {
    const password = await bcrypt.hash("jobseeker123", 10);
    const jobSeeker = await prisma.user.create({
      data: {
        email: `jobseeker${i}@example.com`,
        passwordHash: password,
        fullName: `Job Seeker ${i}`,
        phone: `08123456${String(i).padStart(4, "0")}`,
        role: UserRole.JOB_SEEKER,
        dateOfBirth: new Date(1995 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: i % 2 === 0 ? "MALE" : "FEMALE",
        locationCity: "Makassar",
        locationDistrict: ["Panakkukang", "Tamalanrea", "Makassar", "Biringkanaya", "Rappocini"][i % 5],
        educationLevel: ["SMA/SMK", "D3", "S1", "S2"][Math.floor(Math.random() * 4)],
        bio: `Saya adalah fresh graduate/profesional yang berpengalaman di bidang ${["IT", "Marketing", "Finance", "Operations"][i % 4]}`,
        skills: [["JavaScript", "React"], ["Marketing", "SEO"], ["Excel", "Accounting"], ["Management", "Leadership"]][i % 4],
        isVerified: true,
        isActive: true,
      },
    });

    jobSeekers.push(jobSeeker);
  }
  console.log(`✅ Created ${jobSeekers.length} job seekers`);

  // Create some applications
  for (let i = 0; i < 20; i++) {
    const randomJob = createdJobs[Math.floor(Math.random() * createdJobs.length)];
    const randomSeeker = jobSeekers[Math.floor(Math.random() * jobSeekers.length)];

    try {
      await prisma.jobApplication.create({
        data: {
          jobId: randomJob.id,
          userId: randomSeeker.id,
          resumeUrl: "https://example.com/resume.pdf",
          coverLetter: "Saya sangat tertarik dengan posisi ini dan yakin dapat memberikan kontribusi positif untuk perusahaan.",
          status: ["PENDING", "REVIEWED", "SHORTLISTED"][Math.floor(Math.random() * 3)] as any,
        },
      });
    } catch (error) {
      // Skip duplicate applications
    }
  }
  console.log("✅ Created sample applications");

  console.log("🎉 Seeding completed!");
  console.log("\n📝 Login credentials:");
  console.log("Admin: admin@lokermakassar.com / admin123");
  console.log("Company: hr@teknologi-indonesia.com / company123");
  console.log("Job Seeker: jobseeker1@example.com / jobseeker123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
