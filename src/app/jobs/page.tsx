import { Suspense } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatSalary, timeAgo } from "@/lib/utils";
import { JobStatus, Prisma } from "@prisma/client";
import JobSearch from "@/components/JobSearch";
import JobFilters from "@/components/JobFilters";
import JobSorting from "@/components/JobSorting";

type SearchParams = {
  keyword?: string;
  location?: string;
  categories?: string;
  jobTypes?: string;
  locationTypes?: string;
  sort?: string;
};

async function getJobs(searchParams: SearchParams) {
  const {
    keyword,
    location,
    categories,
    jobTypes,
    locationTypes,
    sort = "newest",
  } = searchParams;

  // Build where clause
  const where: Prisma.JobWhereInput = {
    status: JobStatus.PUBLISHED,
  };

  // Keyword search
  if (keyword) {
    where.OR = [
      { title: { contains: keyword, mode: "insensitive" } },
      { description: { contains: keyword, mode: "insensitive" } },
      { company: { companyName: { contains: keyword, mode: "insensitive" } } },
    ];
  }

  // Location filter
  if (location) {
    where.OR = [
      { city: { contains: location, mode: "insensitive" } },
      { district: { contains: location, mode: "insensitive" } },
    ];
  }

  // Category filter
  if (categories) {
    where.category = { in: categories.split(",") };
  }

  // Job type filter
  if (jobTypes) {
    where.jobType = { in: jobTypes.split(",") as any };
  }

  // Location type filter
  if (locationTypes) {
    where.locationType = { in: locationTypes.split(",") as any };
  }

  // Build orderBy
  let orderBy: Prisma.JobOrderByWithRelationInput = { publishedAt: "desc" };

  switch (sort) {
    case "salary_high":
      orderBy = { salaryMax: "desc" };
      break;
    case "salary_low":
      orderBy = { salaryMin: "asc" };
      break;
    case "most_viewed":
      orderBy = { viewCount: "desc" };
      break;
    case "most_applied":
      orderBy = { applicationCount: "desc" };
      break;
    default:
      orderBy = { publishedAt: "desc" };
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      company: true,
    },
    orderBy,
    take: 100,
  });

  return jobs;
}

async function getJobCategories() {
  const categories = await prisma.job.groupBy({
    by: ["category"],
    where: {
      status: JobStatus.PUBLISHED,
      category: { not: null },
    },
    _count: true,
  });

  return categories.map((cat) => ({
    name: cat.category,
    count: cat._count,
  }));
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [jobs, categories] = await Promise.all([
    getJobs(params),
    getJobCategories(),
  ]);

  const stats = {
    total: jobs.length,
    fullTime: jobs.filter((j) => j.jobType === "FULL_TIME").length,
    partTime: jobs.filter((j) => j.jobType === "PART_TIME").length,
    remote: jobs.filter((j) => j.locationType === "REMOTE").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                className="text-primary-500 font-semibold border-b-2 border-primary-500 pb-1"
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

      {/* Search Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Cari Lowongan Kerja
          </h1>
          <p className="text-primary-100 mb-8">
            {stats.total} lowongan kerja tersedia di Makassar
          </p>

          {/* Search Box */}
          <Suspense fallback={<div>Loading...</div>}>
            <JobSearch />
          </Suspense>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary-500">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Lowongan</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary-500">
              {stats.fullTime}
            </div>
            <div className="text-sm text-gray-600">Full-time</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary-500">
              {stats.partTime}
            </div>
            <div className="text-sm text-gray-600">Part-time</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary-500">
              {stats.remote}
            </div>
            <div className="text-sm text-gray-600">Remote</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <JobFilters categories={categories} />
            </Suspense>
          </aside>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Menampilkan <strong>{jobs.length}</strong> lowongan kerja
              </p>
              <Suspense fallback={<div>Loading...</div>}>
                <JobSorting />
              </Suspense>
            </div>

            <div className="space-y-4">
              <Suspense
                fallback={
                  <div className="text-center py-12">Loading jobs...</div>
                }
              >
                {jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.slug}`}
                    className="block bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {job.isFeatured && (
                            <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs font-semibold">
                              Featured
                            </span>
                          )}
                          {job.isUrgent && (
                            <span className="bg-error-100 text-error-700 px-2 py-1 rounded text-xs font-semibold">
                              Urgent
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {timeAgo(job.publishedAt!)}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-500 transition">
                          {job.title}
                        </h3>

                        <div className="flex items-center text-gray-600 mb-3">
                          <Briefcase className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {job.company.companyName}
                          </span>
                          {job.company.isVerified && (
                            <svg
                              className="h-4 w-4 ml-1 text-primary-500"
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

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.city}, {job.district}
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">
                              {job.jobType.replace("_", "-")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              {job.locationType.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>{job.educationMin}+</span>
                          </div>
                        </div>

                        {job.skills && Array.isArray(job.skills) && (
                          <div className="flex flex-wrap gap-2">
                            {(job.skills as string[]).slice(0, 5).map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="ml-6 text-right">
                        {job.showSalary && (
                          <div className="text-lg font-bold text-primary-600 mb-2">
                            {formatSalary(
                              job.salaryMin ? Number(job.salaryMin) : null,
                              job.salaryMax ? Number(job.salaryMax) : null
                            )}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{job.viewCount} views</span>
                          <span className="mx-2">•</span>
                          <span>{job.applicationCount} aplikasi</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-500">
                        Batas lamaran:{" "}
                        {job.applicationDeadline
                          ? new Date(
                              job.applicationDeadline
                            ).toLocaleDateString("id-ID")
                          : "-"}
                      </span>
                      <span className="text-primary-500 font-semibold text-sm flex items-center">
                        Lihat Detail
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </Suspense>
            </div>

            {jobs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Tidak ada lowongan ditemukan
                </h3>
                <p className="text-gray-500 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <Link
                  href="/jobs"
                  className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 font-medium transition"
                >
                  Reset Pencarian
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
