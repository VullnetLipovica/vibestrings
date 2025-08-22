import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_BRAND_MODELS } from "../../../graphql/queries";
import Link from "next/link";
import { useState } from "react";

// 🔹 Types for GraphQL data
interface GuitarModel {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  description?: string;
}

interface BrandModelsData {
  findBrandModels: GuitarModel[];
}

interface BrandModelsVars {
  id: string | string[] | undefined;
  sortBy: {
    field: string;
    order: string;
  };
}

export default function BrandModelsPage() {
  const router = useRouter();
  const { brandId } = router.query;

  // 🔹 State for filtering & pagination
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // 🔹 Apollo query with types
  const { data, loading, error } = useQuery<BrandModelsData, BrandModelsVars>(
    GET_BRAND_MODELS,
    {
      variables: {
        id: brandId,
        sortBy: { field: "name", order: "ASC" },
      },
      skip: !brandId,
    }
  );

  if (loading) return <p className="text-center p-4">Loading models...</p>;
  if (error) return <p className="text-center p-4">Error loading models</p>;

  const models: GuitarModel[] = data?.findBrandModels || [];

  // 🔹 Build unique type options
  const uniqueTypes: string[] = [
    "all",
    ...Array.from(new Set(models.map((m) => m.type))),
  ];

  // 🔹 Filtering
  const filteredModels = models.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // 🔹 Pagination
  const startIndex = (page - 1) * perPage;
  const paginatedModels = filteredModels.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(filteredModels.length / perPage);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Guitar Models</h1>

      {/* 🔹 Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded-lg w-1/2"
        />

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded-lg"
        >
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedModels.map((model) => (
          <Link
            key={model.id}
            href={`/brands/${brandId}/models/${model.id}`}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <p className="text-gray-600">{model.type}</p>
            <p className="font-bold">${model.price}</p>
          </Link>
        ))}
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
