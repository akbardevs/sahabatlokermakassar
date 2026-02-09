import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Building,
  Users,
  Globe,
  Mail,
  Phone,
  Star,
  ArrowLeft,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatSalary, timeAgo } from "@/lib/utils";
import { JobStatus } from "@prisma/client";

async function getCompany(slug: string) {
  const company = await prisma.company.findUnique({
    where: { companySlug: slug },
    include: {
      jobs: {
        where: {
          status: JobStatus.PUBLISHED,
        },
        orderBy: {
          publishedAt: "desc",
        },
      },
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });

  return company;
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) {
    notFound();
  }

  const jobTypeLabels: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    FREELANCE: "Freelance",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
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
          href="/companies"
          className="inline-flex items-center text-gray-600 hover:text-primary-500 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Perusahaan
        </Link>
      </div>

      {/* Company Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building className="h-12 w-12 text-primary-500" />
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {company.companyName}
                </h1>
                {company.isVerified && (
                  <svg
                    className="h-7 w-7 text-primary-500"
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
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {company.industry && (
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Industri</div>
                      <div className="font-medium">{company.industry}</div>
                    </div>
                  </div>
                )}

                {company.companySize && (
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Ukuran</div>
                      <div className="font-medium">{company.companySize}</div>
                    </div>
                  </div>
                )}

                {company.city && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Lokasi</div>
                      <div className="font-medium">{company.city}</div>
                    </div>
                  </div>
                )}

                {Number(company.rating) > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-2 text-warning-500 fill-warning-500" />
                    <div>
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-medium">
                        {Number(company.rating).toFixed(1)} ({company.totalReviews})
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {company.websiteUrl && (
                  <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-500 hover:text-primary-700 text-sm"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
                {company.email && (
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center text-primary-500 hover:text-primary-700 text-sm"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </a>
                )}
                {company.phone && (
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center text-primary-500 hover:text-primary-700 text-sm"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Telepon
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - About & Jobs */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Company */}
            {company.description && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Tentang Perusahaan</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {company.description}
                </p>
              </div>
            )}

            {/* Open Positions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">
                Lowongan Tersedia ({company.jobs.length})
              </h2>

              {company.jobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Belum ada lowongan tersedia saat ini
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {company.jobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.slug}`}
                      className="block p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {job.title}
                        </h3>
                        {job.isFeatured && (
                          <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.city}, {job.district}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {jobTypeLabels[job.jobType]}
                        </div>
                        {job.showSalary && (
                          <div className="font-semibold text-primary-600">
                            {formatSalary(
                              job.salaryMin ? Number(job.salaryMin) : null,
                              job.salaryMax ? Number(job.salaryMax) : null
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{timeAgo(job.publishedAt!)}</span>
                        <span>
                          {job.applicationCount} aplikasi • {job.viewCount} views
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Informasi Perusahaan</h3>

              <div className="space-y-4">
                {company.address && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Alamat</div>
                    <div className="text-gray-700">{company.address}</div>
                  </div>
                )}

                {company.city && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Kota</div>
                    <div className="text-gray-700">
                      {company.city}, {company.province || "Sulawesi Selatan"}
                    </div>
                  </div>
                )}

                {company.industry && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Industri</div>
                    <div className="text-gray-700">{company.industry}</div>
                  </div>
                )}

                {company.companySize && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Jumlah Karyawan
                    </div>
                    <div className="text-gray-700">{company.companySize}</div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500 mb-2">Status</div>
                  <div className="flex items-center">
                    {company.isVerified ? (
                      <>
                        <svg
                          className="h-5 w-5 text-success-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-success-700 font-medium">
                          Perusahaan Terverifikasi
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-500">Belum Terverifikasi</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
