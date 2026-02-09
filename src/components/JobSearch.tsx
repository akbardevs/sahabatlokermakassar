"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    if (location && location !== "Semua Lokasi") params.set("location", location);

    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2 flex items-center space-x-3 border rounded-lg px-4 py-3 bg-gray-50">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pekerjaan, posisi, atau skill..."
            className="bg-transparent outline-none w-full text-gray-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="flex items-center space-x-3 border rounded-lg px-4 py-3 bg-gray-50">
          <MapPin className="h-5 w-5 text-gray-400" />
          <select
            className="bg-transparent outline-none w-full text-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Semua Lokasi</option>
            <option>Makassar</option>
            <option>Panakkukang</option>
            <option>Tamalanrea</option>
            <option>Biringkanaya</option>
            <option>Rappocini</option>
            <option>Mamajang</option>
            <option>Mariso</option>
            <option>Tallo</option>
            <option>Ujung Pandang</option>
            <option>Wajo</option>
            <option>Bontoala</option>
            <option>Ujung Tanah</option>
            <option>Sangkarrang</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 font-semibold transition flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Cari</span>
        </button>
      </div>
    </div>
  );
}
