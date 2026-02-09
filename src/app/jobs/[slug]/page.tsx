import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building,
  Mail,
  Phone,
  MessageCircle,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatSalary, formatDate, timeAgo } from "@/lib/utils";
import { JobStatus } from "@prisma/client";

async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug, status: JobStatus.PUBLISHED },
    include: {
      company: {
        include: {
          jobs: {
            where: {
              status: JobStatus.PUBLISHED,
              slug: { not: slug },
            },
            take: 3,
          },
        },
      },
    },
  });

  if (!job) {
    return null;
  }

  // Increment view count
  await prisma.job.update({
    where: { id: job.id },
    data: { viewCount: { increment: 1 } },
  });

  return job;
}

async function getSimilarJobs(category: string | null, currentJobId: string) {
  if (!category) return [];

  return await prisma.job.findMany({
    where: {
      status: JobStatus.PUBLISHED,
      category,
      id: { not: currentJobId },
    },
    include: {
      company: true,
    },
    take: 4,
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  const similarJobs = await getSimilarJobs(job.category, job.id);

  const jobTypeLabels: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    FREELANCE: "Freelance",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
  };

  const locationTypeLabels: Record<string, string> = {
    ON_SITE: "On-site",
    REMOTE: "Remote",
    HYBRID: "Hybrid",
  };

  const levelLabels: Record<string, string> = {
    ENTRY: "Entry Level",
    MID: "Mid Level",
    SENIOR: "Senior",
    MANAGER: "Manager",
    DIRECTOR: "Director",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
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

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/jobs"
          className="inline-flex items-center text-gray-600 hover:text-primary-500 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Lowongan
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow p-8 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {job.isFeatured && (
                      <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                    {job.isUrgent && (
                      <span className="bg-error-100 text-error-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Urgent Hiring
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {timeAgo(job.publishedAt!)}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h1>

                  <Link
                    href={`/companies/${job.company.companySlug}`}
                    className="flex items-center text-lg text-gray-700 hover:text-primary-500 mb-4 transition"
                  >
                    <Building className="h-5 w-5 mr-2" />
                    <span className="font-semibold">
                      {job.company.companyName}
                    </span>
                    {job.company.isVerified && (
                      <svg
                        className="h-5 w-5 ml-2 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Link>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Lokasi</div>
                        <div className="font-medium">
                          {job.city}, {job.district}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Tipe</div>
                        <div className="font-medium">
                          {jobTypeLabels[job.jobType]}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Level</div>
                        <div className="font-medium">
                          {levelLabels[job.jobLevel]}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Gaji</div>
                        <div className="font-medium">
                          {job.showSalary
                            ? formatSalary(
                                job.salaryMin ? Number(job.salaryMin) : null,
                                job.salaryMax ? Number(job.salaryMax) : null
                              )
                            : "Negosiasi"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Pengalaman</div>
                        <div className="font-medium">
                          {job.experienceMin || 0}-{job.experienceMax || 0}{" "}
                          tahun
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Deadline</div>
                        <div className="font-medium">
                          {job.applicationDeadline
                            ? new Date(
                                job.applicationDeadline
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                              })
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {job.skills && Array.isArray(job.skills) && (
                    <div className="flex flex-wrap gap-2">
                      {(job.skills as string[]).map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Deskripsi Pekerjaan</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-xl shadow p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">Persyaratan</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white rounded-xl shadow p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">Tanggung Jawab</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.responsibilities}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-bold mb-4">Benefit & Fasilitas</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.benefits}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply CTA */}
            <div className="bg-white rounded-xl shadow p-6 mb-6 sticky top-4">
              <button className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition mb-3">
                Lamar Sekarang
              </button>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                  <Bookmark className="h-4 w-4 mr-1" />
                  <span className="text-sm">Simpan</span>
                </button>
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Bagikan</span>
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-3">
                  <strong>{job.applicationCount}</strong> orang telah melamar
                </div>
                <div className="text-sm text-gray-600">
                  <strong>{job.viewCount}</strong> kali dilihat
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {(job.contactEmail || job.contactPhone || job.contactWhatsapp) && (
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="font-bold mb-4">Kontak</h3>
                <div className="space-y-3">
                  {job.contactEmail && (
                    <a
                      href={`mailto:${job.contactEmail}`}
                      className="flex items-center text-gray-700 hover:text-primary-500"
                    >
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="text-sm">{job.contactEmail}</span>
                    </a>
                  )}
                  {job.contactPhone && (
                    <a
                      href={`tel:${job.contactPhone}`}
                      className="flex items-center text-gray-700 hover:text-primary-500"
                    >
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="text-sm">{job.contactPhone}</span>
                    </a>
                  )}
                  {job.contactWhatsapp && (
                    <a
                      href={`https://wa.me/${job.contactWhatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-primary-500"
                    >
                      <MessageCircle className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="text-sm">{job.contactWhatsapp}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="font-bold mb-4">Tentang Perusahaan</h3>
              <Link
                href={`/companies/${job.company.companySlug}`}
                className="block mb-4"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                  <Building className="h-8 w-8 text-primary-500" />
                </div>
                <h4 className="font-semibold text-lg hover:text-primary-500 transition">
                  {job.company.companyName}
                </h4>
              </Link>

              <div className="text-sm text-gray-600 space-y-2">
                {job.company.industry && (
                  <div>
                    <strong>Industri:</strong> {job.company.industry}
                  </div>
                )}
                {job.company.companySize && (
                  <div>
                    <strong>Ukuran:</strong> {job.company.companySize}
                  </div>
                )}
                {job.company.city && (
                  <div>
                    <strong>Lokasi:</strong> {job.company.city}
                  </div>
                )}
              </div>

              {job.company.description && (
                <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                  {job.company.description}
                </p>
              )}

              <Link
                href={`/companies/${job.company.companySlug}`}
                className="block mt-4 text-primary-500 hover:text-primary-700 font-semibold text-sm"
              >
                Lihat Profil Lengkap →
              </Link>
            </div>

            {/* Other Jobs from Company */}
            {job.company.jobs && job.company.jobs.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold mb-4">
                  Lowongan Lain dari {job.company.companyName}
                </h3>
                <div className="space-y-3">
                  {job.company.jobs.map((otherJob) => (
                    <Link
                      key={otherJob.id}
                      href={`/jobs/${otherJob.slug}`}
                      className="block p-3 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
                    >
                      <h4 className="font-semibold text-sm mb-1">
                        {otherJob.title}
                      </h4>
                      <div className="text-xs text-gray-600">
                        {otherJob.city} • {jobTypeLabels[otherJob.jobType]}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Lowongan Serupa</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarJobs.map((similarJob) => (
                <Link
                  key={similarJob.id}
                  href={`/jobs/${similarJob.slug}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                >
                  <h3 className="font-bold text-lg mb-2 hover:text-primary-500 transition">
                    {similarJob.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {similarJob.company.companyName}
                  </p>
                  <div className="text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {similarJob.city}
                  </div>
                  {similarJob.showSalary && (
                    <div className="font-semibold text-primary-600">
                      {formatSalary(
                        similarJob.salaryMin
                          ? Number(similarJob.salaryMin)
                          : null,
                        similarJob.salaryMax
                          ? Number(similarJob.salaryMax)
                          : null
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
