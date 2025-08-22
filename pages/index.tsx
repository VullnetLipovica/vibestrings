"use client";
import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_BRANDS);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-28">
        {/* Left Side */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight">
            Find Your Perfect <br />
            <span className="text-orange-600">Guitar</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Discover world-class guitar brands and models. Compare specs,
            explore musicians who play them, and find the instrument that matches
            your vibe.
          </p>
        </div>

        {/* Right Side Guitar with Curve */}
        <div className="relative mt-10 md:mt-0 w-full md:w-[400px] h-[350px] overflow-hidden rounded-bl-[150px] bg-orange-500 flex items-center justify-center">
          <Image
            src="/hero-guitar.jpg"
            alt="Hero Guitar"
            width={280}
            height={280}
            className="object-contain drop-shadow-lg"
          />
          {/* Small logo divider */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
            <Image src="/logo.png" alt="VibeStrings Logo" width={28} height={28} />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Brands</h2>

        {loading && <p className="text-center text-gray-500">Loading brands...</p>}
        {error && <p className="text-center text-red-500">Error fetching brands</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center justify-items-center">
          {data?.findAllBrands?.map((brand: any) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="grayscale hover:grayscale-0 transition"
            >
              <Image
                src={brand.image || "/placeholder.png"}
                alt={brand.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Why Try Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <Image
              src="/browse.png"
              alt="browse"
              width={50}
              height={50}
              className="mx-auto mb-4 bg-gray"
            />
            <h3 className="font-bold text-lg mb-2">Smooth Browsing</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <Image
              src="/delivery.png"
              alt="Delivery"
              width={50}
              height={50}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2">Easy Delivery</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <Image
              src="/payment.png"
              alt="Payments"
              width={50}
              height={50}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2">Swift Payments</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div>
          <h2 className="text-3xl font-bold">
            Browse and buy your{" "}
            <span className="text-orange-600">favorite guitars</span> with
            VibeStrings.
          </h2>
          <div className="mt-6 flex gap-4">
            <Image
              src="/google-play.png"
              alt="Get it on Google Play"
              width={160}
              height={48}
            />
            <Image
              src="/app-store.png"
              alt="Download on the App Store"
              width={160}
              height={48}
            />
          </div>
        </div>

        {/* Right side (App Preview) */}
        <div className="flex justify-center gap-8">
          
          <Image src="/app1.png" alt="App 1" width={220} height={450} />
          <Image src="/app2.png" alt="App 2" width={220} height={450} />
        </div>
      </section>
    </main>
  );
}
