import Link from "next/link";
import { Briefcase, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Briefcase className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 font-semibold transition"
          >
            <Home className="h-5 w-5 mr-2" />
            Kembali ke Homepage
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg hover:bg-primary-50 font-semibold transition"
          >
            <Search className="h-5 w-5 mr-2" />
            Cari Lowongan
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Atau hubungi kami jika Anda mengalami masalah:</p>
          <a
            href="mailto:support@lokermakassar.com"
            className="text-primary-500 hover:text-primary-700"
          >
            support@lokermakassar.com
          </a>
        </div>
      </div>
    </div>
  );
}
