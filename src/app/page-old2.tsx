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
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                <TrendingUp className="h-4 w-4" />
                <span>{stats.totalJobs.toLocaleString('id-ID')}+ Lowongan Aktif</span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Temukan Pekerjaan Terkbaik Anda di{" "}
                <span className="text-primary-500">Makassar</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Platform lowongan kerja terlengkap dan terpercaya untuk wilayah Makassar dan Sulawesi Selatan
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-white transition-all">
                    <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Cari pekerjaan, posisi, atau skill..."
                      className="bg-transparent outline-none w-full text-gray-700"
                    />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-white transition-all">
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <select className="bg-transparent outline-none w-full text-gray-700">
                      <option>Semua Lokasi</option>
                      <option>Makassar</option>
                      <option>Gowa</option>
                      <option>Maros</option>
                      <option>Takalar</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Search className="h-5 w-5" />
                    <span>Cari</span>
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  <span className="text-sm font-medium text-gray-500 mr-1">Populer:</span>
                  {["Admin", "Marketing", "IT", "Customer Service", "Driver"].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-1.5 bg-white border border-gray-200 hover:border-primary-300 hover:bg-blue-50 text-gray-700 hover:text-primary-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalJobs.toLocaleString('id-ID')}+
            </div>
            <div className="text-sm text-gray-600 font-medium">Lowongan Aktif</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalCompanies.toLocaleString('id-ID')}+
            </div>
            <div className="text-sm text-gray-600 font-medium">Perusahaan</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalUsers.toLocaleString('id-ID')}+
            </div>
            <div className="text-sm text-gray-600 font-medium">Pencari Kerja</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalApplications.toLocaleString('id-ID')}+
            </div>
            <div className="text-sm text-gray-600 font-medium">Berhasil Diterima</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Briefcase className="h-4 w-4" />
              <span>Featured Jobs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Lowongan Kerja Terbaru
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan peluang karir terbaik dari perusahaan terpercaya di Makassar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                      <Briefcase className="h-7 w-7 text-primary-500" />
                    </div>
                    {job.isFeatured && (
                      <span className="bg-yellow-100 border border-yellow-200 text-yellow-700 px-3 py-1 rounded-lg text-xs font-bold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700">
                    {job.jobType.replace("_", "-")}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4 flex items-center gap-1">
                    {job.company.isVerified && (
                      <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0" />
                    )}
                    <span className="truncate">{job.company.companyName}</span>
                  </p>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>{job.city}, {job.district}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>{job.experienceMin || 0}-{job.experienceMax || 0} tahun pengalaman</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Gaji</div>
                      <div className="text-primary-600 font-bold text-base">
                        {job.showSalary
                          ? formatSalary(
                              job.salaryMin ? Number(job.salaryMin) : null,
                              job.salaryMax ? Number(job.salaryMax) : null
                            )
                          : "Negosiasi"}
                      </div>
                    </div>
                    <div className="text-primary-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>Detail</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua Lowongan</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Karir Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan akses ke ribuan lowongan kerja terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary-500 px-8 py-3.5 rounded-xl hover:bg-gray-100 font-semibold transition-all shadow-lg"
            >
              Daftar Sebagai Pencari Kerja
            </Link>
            <Link
              href="/employer/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all border-2 border-blue-400"
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
                  <Link href="/jobs" className="hover:text-primary-400 transition">
                    Cari Lowongan
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-primary-400 transition">
                    Daftar Perusahaan
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="hover:text-primary-400 transition">
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
                    className="hover:text-primary-400 transition"
                  >
                    Pasang Lowongan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer/pricing"
                    className="hover:text-primary-400 transition"
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
                  <Link href="/about" className="hover:text-primary-400 transition">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-400 transition">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary-400 transition">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Sahabat Loker Makassar. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
