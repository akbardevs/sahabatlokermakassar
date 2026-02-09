"use client";

import { useRouter, useSearchParams } from "next/navigation";

type FilterCategory = {
  name: string | null;
  count: number;
};

type JobFiltersProps = {
  categories: FilterCategory[];
};

export default function JobFilters({ categories }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const selectedJobTypes =
    searchParams.get("jobTypes")?.split(",").filter(Boolean) || [];
  const selectedLocationTypes =
    searchParams.get("locationTypes")?.split(",").filter(Boolean) || [];

  const handleFilterChange = (
    filterType: "categories" | "jobTypes" | "locationTypes",
    value: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams);

    let currentValues =
      params.get(filterType)?.split(",").filter(Boolean) || [];

    if (checked) {
      currentValues.push(value);
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    if (currentValues.length > 0) {
      params.set(filterType, currentValues.join(","));
    } else {
      params.delete(filterType);
    }

    router.push(`/jobs?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/jobs");
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedJobTypes.length > 0 ||
    selectedLocationTypes.length > 0;

  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Filter</h3>
        {hasFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-primary-500 hover:text-primary-700 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Kategori</h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            if (!cat.name) return null;
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <label
                key={cat.name}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 cursor-pointer"
                    checked={isChecked}
                    onChange={(e) =>
                      handleFilterChange("categories", cat.name!, e.target.checked)
                    }
                  />
                  <span className="text-sm">{cat.name}</span>
                </div>
                <span className="text-xs text-gray-500">{cat.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Tipe Pekerjaan</h4>
        <div className="space-y-2">
          {[
            { label: "Full-time", value: "FULL_TIME" },
            { label: "Part-time", value: "PART_TIME" },
            { label: "Freelance", value: "FREELANCE" },
            { label: "Contract", value: "CONTRACT" },
            { label: "Internship", value: "INTERNSHIP" },
          ].map((type) => {
            const isChecked = selectedJobTypes.includes(type.value);
            return (
              <label
                key={type.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 cursor-pointer"
                  checked={isChecked}
                  onChange={(e) =>
                    handleFilterChange("jobTypes", type.value, e.target.checked)
                  }
                />
                <span className="text-sm">{type.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Location Type */}
      <div>
        <h4 className="font-semibold mb-3">Tipe Lokasi</h4>
        <div className="space-y-2">
          {[
            { label: "On-site", value: "ON_SITE" },
            { label: "Remote", value: "REMOTE" },
            { label: "Hybrid", value: "HYBRID" },
          ].map((loc) => {
            const isChecked = selectedLocationTypes.includes(loc.value);
            return (
              <label
                key={loc.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 cursor-pointer"
                  checked={isChecked}
                  onChange={(e) =>
                    handleFilterChange(
                      "locationTypes",
                      loc.value,
                      e.target.checked
                    )
                  }
                />
                <span className="text-sm">{loc.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
