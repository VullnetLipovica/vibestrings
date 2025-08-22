"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="VibeStrings" width={40} height={40} />
          <span className="text-xl font-bold text-gray-900">VibeStrings</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <Link href="/brands" className="hover:text-orange-500">Brands</Link>
          <Link href="/models" className="hover:text-orange-500">Models</Link>
          <Link href="/about" className="hover:text-orange-500">About</Link>
          <Link href="/contact" className="hover:text-orange-500">Contact</Link>
        </div>

        {/* CTA */}
        <button className="ml-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
