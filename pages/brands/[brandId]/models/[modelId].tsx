import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MODEL } from "@/graphql/queries";

export default function ModelDetailsPage() {
  const router = useRouter();
  const { brandId, modelId } = router.query;
  const [activeTab, setActiveTab] = useState<"specs" | "musicians">("specs");

  const { data, loading, error } = useQuery(GET_MODEL, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId,
  });

  if (loading) return <p className="text-center mt-10">Loading guitar...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading guitar</p>;

  const model = data?.findUniqueModel;
  if (!model) return <p className="text-center mt-10">Model not found</p>;

  return (
    <main className="min-h-screen px-6 pt-24">
      {/* Back link */}
      <button onClick={() => router.back()} className="text-sm text-gray-600 mb-4">
        ← Back To List
      </button>

{/* Header */}
<div className="flex flex-col md:flex-row items-center md:items-center justify-between mt-10">
  {/* Title */}
  <div className="flex-1 text-center md:text-left">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      {model.name}
    </h1>
  </div>

  {/* Guitar image with orange background */}
  <div className="flex-1 flex justify-center md:justify-end">
    <div className="relative w-80 h-80 md:w-[520px] md:h-[420px] bg-orange-500 rounded-bl-[200px] flex items-center justify-center overflow-hidden">
      <img
        src={model.image}
        alt={model.name}
        className="w-72 h-72 object-contain drop-shadow-xl"
      />
    </div>
  </div>
</div>


      {/* Tabs */}
      <div className="flex mt-10 border-b">
        <button
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "specs"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500"
          }`}
        >
          Specification
        </button>
        <button
          onClick={() => setActiveTab("musicians")}
          className={`ml-6 px-4 py-2 font-semibold ${
            activeTab === "musicians"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500"
          }`}
        >
          Who plays it?
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "specs" && (
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-6">{model.description}</p>
            <ul className="list-disc ml-6 space-y-2">
              {Object.entries(model.specs).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium capitalize">{key}:</span>{" "}
                  {value ? String(value) : "N/A"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "musicians" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {model.musicians.map((m: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-gray-50 shadow"
              >
                <img
                  src={m.musicianImage}
                  alt={m.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.bands}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
