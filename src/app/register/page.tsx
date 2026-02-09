import Link from "next/link";
import { Briefcase, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
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

      {/* Register Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Daftar Akun Baru
            </h1>
            <p className="text-gray-600 mb-8">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-primary-500 hover:text-primary-700 font-semibold"
              >
                Masuk di sini
              </Link>
            </p>

            {/* Account Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Daftar sebagai:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-primary-500 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition">
                  <div className="font-semibold text-primary-700">
                    Pencari Kerja
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Cari lowongan pekerjaan
                  </div>
                </button>
                <button className="p-4 border-2 border-gray-300 rounded-lg text-center hover:bg-gray-50 transition">
                  <div className="font-semibold text-gray-700">Perusahaan</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Pasang lowongan kerja
                  </div>
                </button>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor HP
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="08123456789"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

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

              <div className="grid md:grid-cols-2 gap-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
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
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Saya setuju dengan{" "}
                  <Link
                    href="/terms"
                    className="text-primary-500 hover:text-primary-700"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-500 hover:text-primary-700"
                  >
                    Kebijakan Privasi
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 font-semibold transition"
              >
                Daftar Sekarang
              </button>
            </form>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm text-gray-600 mb-2">
                🚧 <strong>Halaman ini dalam development</strong>
              </p>
              <p className="text-xs text-gray-500">
                Registration system akan diimplementasikan di Phase 2 dengan
                email verification & complete profile setup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
