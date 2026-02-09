import Link from "next/link";
import { Search, MapPin, Briefcase, Users, TrendingUp, CheckCircle } from "lucide-react";
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

export default async function HomePage() {
  const [featuredJobs, stats] = await Promise.all([
    getFeaturedJobs(),
    getStats(),
  ]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-gray-900">
                Sahabat<span className="text-primary-500">LokerMakassar</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Cari Lowongan
              </Link>
              <Link
                href="/companies"
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Perusahaan
              </Link>
              <Link
                href="/tips"
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Tips Karir
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 font-medium transition"
              >
                Daftar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              <TrendingUp className="h-4 w-4 mr-2" />
              {stats.totalJobs.toLocaleString('id-ID')}+ Lowongan Aktif
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Temukan Pekerjaan Terkbaik Anda di{" "}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Makassar
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Platform lowongan kerja terlengkap dan terpercaya untuk wilayah
              Makassar dan Sulawesi Selatan
            </p>

            {/* Search Box */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-primary-300 transition-all group">
                  <Search className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition" />
                  <input
                    type="text"
                    placeholder="Cari pekerjaan, posisi, atau skill..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder:text-gray-400"
                  />
                </div>

                <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-primary-300 transition-all group">
                  <MapPin className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition" />
                  <select className="bg-transparent outline-none w-full text-gray-700">
                    <option>Semua Lokasi</option>
                    <option>Makassar</option>
                    <option>Gowa</option>
                    <option>Maros</option>
                    <option>Takalar</option>
                  </select>
                </div>

                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <Search className="h-5 w-5" />
                  <span>Cari Sekarang</span>
                </button>
              </div>

              {/* Quick Filters */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center items-center">
                <span className="text-sm font-semibold text-gray-500">Populer:</span>
                {["Admin", "Marketing", "IT", "Customer Service", "Driver"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="px-5 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 border border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-700 rounded-full text-sm font-medium transition-all transform hover:scale-105"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <Briefcase className="h-10 w-10 mx-auto text-primary-500 mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalJobs.toLocaleString('id-ID')}+
            </div>
            <div className="text-gray-600 text-sm">Lowongan Aktif</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <Users className="h-10 w-10 mx-auto text-primary-500 mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalCompanies.toLocaleString('id-ID')}+
            </div>
            <div className="text-gray-600 text-sm">Perusahaan</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <TrendingUp className="h-10 w-10 mx-auto text-primary-500 mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalUsers.toLocaleString('id-ID')}+
            </div>
            <div className="text-gray-600 text-sm">Pencari Kerja</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <CheckCircle className="h-10 w-10 mx-auto text-primary-500 mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalApplications.toLocaleString('id-ID')}+
            </div>
            <div className="text-gray-600 text-sm">Berhasil Diterima</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            <Briefcase className="h-4 w-4 mr-2" />
            Featured Jobs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lowongan Kerja Terbaru
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Temukan peluang karir terbaik dari perusahaan terpercaya di Makassar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job, index) => (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header with Company Logo */}
              <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 p-6 pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="h-8 w-8 text-primary-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {job.isFeatured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                        ⭐ Featured
                      </span>
                    )}
                    <span className="bg-white border border-success-200 text-success-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {job.jobType.replace("_", "-")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-0">
                <div className="-mt-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 font-medium flex items-center">
                    {job.company.isVerified && (
                      <CheckCircle className="h-4 w-4 mr-1 text-primary-500" />
                    )}
                    {job.company.companyName}
                  </p>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-100 transition">
                      <MapPin className="h-4 w-4 text-gray-500 group-hover:text-primary-600 transition" />
                    </div>
                    <span className="font-medium">{job.city}, {job.district}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-100 transition">
                      <Users className="h-4 w-4 text-gray-500 group-hover:text-primary-600 transition" />
                    </div>
                    <span className="font-medium">{job.experienceMin || 0}-{job.experienceMax || 0} tahun pengalaman</span>
                  </div>
                </div>

                {/* Salary & CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Estimasi Gaji</div>
                    <span className="text-primary-600 font-bold text-lg">
                      {job.showSalary
                        ? formatSalary(
                            job.salaryMin ? Number(job.salaryMin) : null,
                            job.salaryMax ? Number(job.salaryMax) : null
                          )
                        : "Negosiasi"}
                    </span>
                  </div>
                  <div className="flex items-center text-primary-500 font-semibold text-sm group-hover:text-primary-700 transition">
                    Lihat Detail
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-10 py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Lihat Semua Lowongan</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Karir Anda?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Daftar sekarang dan dapatkan akses ke ribuan lowongan kerja terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition"
            >
              Daftar Sebagai Pencari Kerja
            </Link>
            <Link
              href="/employer/register"
              className="bg-secondary-500 text-white px-8 py-3 rounded-lg hover:bg-secondary-600 font-semibold transition"
            >
              Pasang Lowongan Kerja
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold text-white">
                  SahabatLokerMakassar
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Platform lowongan kerja terbaik untuk wilayah Makassar dan
                Sulawesi Selatan.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Pencari Kerja</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/jobs" className="hover:text-primary-400">
                    Cari Lowongan
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-primary-400">
                    Daftar Perusahaan
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="hover:text-primary-400">
                    Tips Karir
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/employer/post-job"
                    className="hover:text-primary-400"
                  >
                    Pasang Lowongan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/pricing"
                    className="hover:text-primary-400"
                  >
                    Harga
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Tentang Kami</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-primary-400">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-400">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary-400">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Loker Makassar. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
