import Link from "next/link";
import { Briefcase, Building, MapPin, Users, Star } from "lucide-react";
import prisma from "@/lib/prisma";

async function getCompanies() {
  const companies = await prisma.company.findMany({
    where: {
      isVerified: true,
    },
    include: {
      _count: {
        select: {
          jobs: {
            where: {
              status: "PUBLISHED",
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return companies;
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

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
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Cari Lowongan
              </Link>
              <Link
                href="/companies"
                className="text-primary-500 font-semibold border-b-2 border-primary-500 pb-1"
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
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Perusahaan Terpercaya
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            {companies.length} perusahaan verified sedang mencari talenta terbaik
          </p>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building className="h-8 w-8 text-primary-500" />
                </div>
                {company.isVerified && (
                  <svg
                    className="h-6 w-6 text-primary-500"
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

              <Link
                href={`/companies/${company.companySlug}`}
                className="block"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-500 transition">
                  {company.companyName}
                </h3>
              </Link>

              <div className="space-y-2 mb-4">
                {company.industry && (
                  <p className="text-sm text-gray-600">{company.industry}</p>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {company.city || "Makassar"}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {company.companySize || "N/A"}
                </div>

                {Number(company.rating) > 0 && (
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 text-warning-500 fill-warning-500" />
                    <span className="font-semibold">{Number(company.rating).toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">
                      ({company.totalReviews} reviews)
                    </span>
                  </div>
                )}
              </div>

              {company.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {company.description}
                </p>
              )}

              <div className="pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  <strong>{company._count.jobs}</strong> lowongan aktif
                </span>
                <Link
                  href={`/companies/${company.companySlug}`}
                  className="text-primary-500 hover:text-primary-700 font-semibold text-sm"
                >
                  Lihat Profil →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-16">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Belum ada perusahaan
            </h3>
            <p className="text-gray-500">
              Perusahaan verified akan muncul di halaman ini
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
