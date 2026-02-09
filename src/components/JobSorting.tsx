"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function JobSorting() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <select
      className="border rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-primary-500 transition"
      value={currentSort}
      onChange={handleSortChange}
    >
      <option value="newest">Terbaru</option>
      <option value="salary_high">Gaji Tertinggi</option>
      <option value="salary_low">Gaji Terendah</option>
      <option value="most_viewed">Paling Dilihat</option>
      <option value="most_applied">Paling Banyak Dilamar</option>
    </select>
  );
}
