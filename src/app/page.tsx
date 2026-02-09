import Link from "next/link";
import { Search, MapPin, Briefcase, Users, TrendingUp, CheckCircle, Building2, Zap, Shield, Clock, Award, ArrowRight, Star, Target, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatSalary } from "@/lib/utils";
import { JobStatus } from "@prisma/client";

async function getFeaturedJobs() {
  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.PUBLISHED,
    },
    include: {
      company: true,
    },
    orderBy: [
      { isFeatured: "desc" },
      { publishedAt: "desc" },
    ],
    take: 6,
  });
  return jobs;
}

async function getStats() {
  const [
    totalJobs,
    totalCompanies,
    totalUsers,
    totalApplications,
  ] = await Promise.all([
    prisma.job.count({ where: { status: JobStatus.PUBLISHED } }),
    prisma.company.count({ where: { isVerified: true } }),
    prisma.user.count({ where: { role: "JOB_SEEKER", isActive: true } }),
    prisma.jobApplication.count(),
  ]);

  return {
    totalJobs,
    totalCompanies,
    totalUsers,
    totalApplications,
  };
}

async function getTopCategories() {
  const categories = await prisma.job.groupBy({
    by: ["category"],
    where: {
      status: JobStatus.PUBLISHED,
      category: { not: null },
    },
    _count: true,
    orderBy: {
      _count: {
        category: "desc"
      }
    },
    take: 6,
  });

  return categories.map((cat) => ({
    name: cat.category,
    count: cat._count,
  }));
}

export default async function HomePage() {
  const [featuredJobs, stats, topCategories] = await Promise.all([
    getFeaturedJobs(),
    getStats(),
    getTopCategories(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation - Enhanced */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Sahabat<span className="text-primary-500">LokerMakassar</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/jobs" className="text-gray-700 hover:text-primary-500 font-medium transition">
                Cari Lowongan
              </Link>
              <Link href="/companies" className="text-gray-700 hover:text-primary-500 font-medium transition">
                Perusahaan
              </Link>
              <Link href="/tips" className="text-gray-700 hover:text-primary-500 font-medium transition">
                Tips Karir
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-primary-500 font-medium transition">
                Masuk
              </Link>
              <Link href="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl">
                Daftar Gratis
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Major Upgrade */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="max-w-6xl mx-auto">
            {/* Announcement */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-700 rounded-full font-bold shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">🎉 {stats.totalJobs} Lowongan Baru Minggu Ini!</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
                Cari Kerja di{" "}
                <span className="relative inline-block text-primary-500">
                  Makassar
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12">
                    <path d="M2 10C60 2 140 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
                <br className="hidden sm:block" /> Jadi Lebih Mudah
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Terhubung dengan{" "}
                <span className="font-bold text-primary-600">{stats.totalCompanies}+ perusahaan</span> dan{" "}
                <span className="font-bold text-primary-600">{stats.totalJobs}+ lowongan kerja</span> di Sulawesi Selatan
              </p>
            </div>

            {/* Enhanced Search Box */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-gray-100">
              <div className="grid md:grid-cols-12 gap-4 mb-6">
                <div className="md:col-span-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2.5">Kata Kunci</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Posisi, perusahaan, skill..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2.5">Lokasi</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                      <option>Semua Lokasi</option>
                      <option>Makassar</option>
                      <option>Gowa</option>
                      <option>Maros</option>
                      <option>Takalar</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-3 flex items-end">
                  <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2.5">
                    <Search className="h-5 w-5" />
                    <span>Cari</span>
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="pt-6 border-t-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-bold text-gray-700">Kategori Populer:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Admin", "Marketing", "IT & Developer", "Customer Service", "Driver", "Desain"].map((tag) => (
                    <Link key={tag} href="/jobs" className="px-5 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-primary-400 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-primary-700 rounded-xl font-semibold transition-all hover:shadow-md">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <span className="text-gray-600">
                  <span className="font-bold text-gray-900">{stats.totalApplications}</span> aplikasi terkirim hari ini
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">
                  <span className="font-bold text-gray-900">3 lowongan baru</span> dalam 1 jam terakhir
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories - NEW SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Jelajahi Berdasarkan Kategori</h2>
            <p className="text-gray-600 text-xl">Temukan lowongan sesuai keahlian Anda</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-7xl mx-auto">
            {topCategories.map((cat) => (
              <Link key={cat.name} href={`/jobs?categories=${cat.name}`} className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-primary-400 rounded-2xl p-6 text-center transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-md">
                  <Briefcase className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight min-h-[40px] flex items-center justify-center">{cat.name}</h3>
                <p className="text-primary-600 font-bold text-sm">{cat.count} Lowongan</p>
                <ArrowRight className="absolute top-3 right-3 h-4 w-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Dipercaya oleh Ribuan Pencari Kerja</h2>
            <p className="text-blue-100 text-xl">Platform job portal terbesar di Sulawesi Selatan</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Briefcase, count: stats.totalJobs, label: "Lowongan Aktif" },
              { icon: Building2, count: stats.totalCompanies, label: "Perusahaan" },
              { icon: Users, count: stats.totalUsers, label: "Pencari Kerja" },
              { icon: CheckCircle, count: stats.totalApplications, label: "Sukses Terkirim" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-5xl font-bold mb-2">{stat.count.toLocaleString('id-ID')}+</div>
                <div className="text-blue-100 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs - Major Upgrade */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border-2 border-yellow-200 text-yellow-700 rounded-full font-bold mb-5 shadow-sm">
              <Star className="h-4 w-4 fill-current" />
              <span>Featured Jobs</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5">Lowongan Kerja Pilihan</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Peluang karir terbaik dari perusahaan terpercaya</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {featuredJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.slug}`} className="group relative bg-white border-2 border-gray-200 hover:border-primary-400 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-6">
                  {job.isFeatured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  )}
                  
                  <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Briefcase className="h-8 w-8 text-primary-500" />
                  </div>
                  
                  <span className="inline-block px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    {job.jobType.replace("_", "-")}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition line-clamp-2 min-h-[56px]">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-6">
                    {job.company.isVerified && (
                      <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <span className="text-gray-600 font-semibold truncate">{job.company.companyName}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary-500" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{job.city}, {job.district}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Award className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{job.experienceMin || 0}-{job.experienceMax || 0} tahun exp</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 font-bold mb-1">Gaji</div>
                      <div className="text-primary-600 font-bold text-lg">
                        {job.showSalary ? formatSalary(job.salaryMin ? Number(job.salaryMin) : null, job.salaryMax ? Number(job.salaryMax) : null) : "Negosiasi"}
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/jobs" className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
              <span>Lihat Semua {stats.totalJobs}+ Lowongan</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - NEW SECTION */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5">Mengapa Memilih Kami?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Platform dengan fitur terlengkap untuk kesuksesan karir Anda</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: CheckCircle, gradient: "from-green-400 to-green-600", title: "100% Gratis", desc: "Akses penuh tanpa biaya tersembunyi" },
              { icon: Shield, gradient: "from-blue-400 to-blue-600", title: "Aman & Terpercaya", desc: "Data dijamin aman dengan enkripsi tinggi" },
              { icon: Zap, gradient: "from-purple-400 to-purple-600", title: "Proses Cepat", desc: "Lamar pekerjaan hanya dalam hitungan menit" },
              { icon: Target, gradient: "from-orange-400 to-orange-600", title: "Rekomendasi Akurat", desc: "Lowongan sesuai skill dan minat Anda" },
            ].map((item, i) => (
              <div key={i} className="group text-center p-8 rounded-2xl border-2 border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA - Enhanced */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Siap Memulai Karir Impian?</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">Bergabunglah dengan ribuan pencari kerja dan temukan Pekerjaan Terkbaik Anda</p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/register" className="group bg-white text-primary-600 px-10 py-5 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all flex items-center justify-center gap-3">
              <span>Daftar Sebagai Pencari Kerja</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/employer/register" className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-blue-400 hover:border-blue-300 transition-all flex items-center justify-center gap-3">
              <Building2 className="h-5 w-5" />
              <span>Untuk Perusahaan</span>
            </Link>
          </div>

          <p className="mt-8 text-blue-100">Sudah punya akun? <Link href="/login" className="text-white font-bold underline hover:no-underline">Masuk di sini</Link></p>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">SahabatLokerMakassar</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">Platform lowongan kerja #1 di Sulawesi Selatan. Menghubungkan talenta terbaik dengan perusahaan terbaik.</p>
            </div>

            {[
              { title: "Pencari Kerja", links: [["Cari Lowongan", "/jobs"], ["Daftar Perusahaan", "/companies"], ["Tips Karir", "/tips"]] },
              { title: "Perusahaan", links: [["Pasang Lowongan", "/employer/post-job"], ["Harga", "/employer/pricing"]] },
              { title: "Tentang", links: [["Tentang Kami", "/about"], ["Kontak", "/contact"], ["Privasi", "/privacy"]] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-white mb-4 text-lg">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-primary-400 transition flex items-center gap-2">
                        <ArrowRight className="h-3 w-3" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} SahabatLokerMakassar. All rights reserved.</p>
            <p className="text-xs text-gray-500">
              Developed with ❤️ by{" "}
              <a href="https://algenz.id" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold transition">
                algenz.id
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
