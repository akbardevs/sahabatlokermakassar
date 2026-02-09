import Link from "next/link";
import { Briefcase, BookOpen, TrendingUp, Users, FileText, Video } from "lucide-react";

export default function TipsPage() {
  const tipsCategories = [
    {
      icon: FileText,
      title: "Tips Membuat CV",
      description: "Pelajari cara membuat CV yang menarik perhatian recruiter",
      articles: 12,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Persiapan Interview",
      description: "Panduan lengkap menghadapi interview kerja dengan percaya diri",
      articles: 15,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Pengembangan Karir",
      description: "Strategi untuk mengembangkan karir dan meningkatkan skill",
      articles: 10,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Pelajari skill-skill yang dibutuhkan di dunia kerja",
      articles: 18,
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Video,
      title: "Video Tutorial",
      description: "Video panduan mencari kerja dan tips karir",
      articles: 8,
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Briefcase,
      title: "Workplace Tips",
      description: "Tips beradaptasi dan sukses di lingkungan kerja",
      articles: 14,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const featuredArticles = [
    {
      title: "10 Tips Membuat CV yang Menarik Perhatian HRD",
      excerpt:
        "Pelajari cara membuat CV yang menonjol dari ratusan pelamar lainnya dengan teknik yang terbukti efektif.",
      category: "CV & Resume",
      readTime: "5 min",
      image: "📄",
    },
    {
      title: "Cara Menjawab Pertanyaan Interview yang Sulit",
      excerpt:
        "Panduan lengkap menjawab pertanyaan interview yang tricky dengan jawaban yang impressive.",
      category: "Interview",
      readTime: "7 min",
      image: "💼",
    },
    {
      title: "Skill yang Paling Dicari Perusahaan di 2026",
      excerpt:
        "Daftar skill teknis dan soft skill yang paling dibutuhkan perusahaan tahun ini.",
      category: "Career",
      readTime: "6 min",
      image: "🎯",
    },
  ];

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
                className="text-gray-700 hover:text-primary-500 font-medium transition"
              >
                Perusahaan
              </Link>
              <Link
                href="/tips"
                className="text-primary-500 font-semibold border-b-2 border-primary-500 pb-1"
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
            Tips & Panduan Karir
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Tingkatkan peluang Anda mendapatkan Pekerjaan Terkbaik dengan tips
            dari para expert
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Kategori Tips</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 cursor-pointer"
            >
              <div
                className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.articles} artikel
                </span>
                <span className="text-primary-500 font-semibold text-sm">
                  Lihat Semua →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-8">Artikel Pilihan</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-6xl">
                {article.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-primary-500 bg-primary-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {article.readTime} baca
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-500 transition">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            🚧 Content Sedang Dalam Development
          </h2>
          <p className="text-lg mb-2">
            Blog system dan artikel karir akan tersedia di Phase 2
          </p>
          <p className="text-primary-100">
            Stay tuned untuk tips karir, panduan interview, template CV, dan
            masih banyak lagi!
          </p>
        </div>
      </section>
    </div>
  );
}
