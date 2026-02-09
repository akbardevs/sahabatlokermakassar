import Link from "next/link";
import { Briefcase, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-900">
              Sahabat<span className="text-primary-500">LokerMakassar</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Masuk ke Akun
            </h1>
            <p className="text-gray-600 mb-8">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-primary-500 hover:text-primary-700 font-semibold"
              >
                Daftar sekarang
              </Link>
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Ingat saya
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary-500 hover:text-primary-700"
                >
                  Lupa password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 font-semibold transition"
              >
                Masuk
              </button>
            </form>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm text-gray-600 mb-4">
                🚧 <strong>Halaman ini dalam development</strong>
              </p>
              <p className="text-xs text-gray-500">
                Authentication system akan diimplementasikan di Phase 2. Untuk
                testing, gunakan kredensial di QUICKSTART.md
              </p>
            </div>
          </div>

          {/* Login Credentials Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              📝 Testing Credentials (Phase 2)
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Admin:</strong> admin@lokermakassar.com / admin123
              </p>
              <p>
                <strong>Employer:</strong> hr@teknologi-indonesia.com /
                company123
              </p>
              <p>
                <strong>Job Seeker:</strong> jobseeker1@example.com /
                jobseeker123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
