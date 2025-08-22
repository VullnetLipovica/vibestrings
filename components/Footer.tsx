"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Column 1: Logo + About */}
        <div>
          <Image
            src="/logo.png"
            alt="VibeStrings Logo"
            width={40}
            height={40}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Your #1 destination to browse and buy premium guitars from the world’s top brands.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-orange-500">
                Brands
              </Link>
            </li>
            <li>
              <Link href="/models" className="hover:text-orange-500">
                By Models
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-orange-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-orange-500">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-orange-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Language + Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>

          {/* Social Icons */}
          <div className="flex gap-4 mb-6">
            <Link href="https://facebook.com" target="_blank">
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Image src="/twitter.png" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Image src="/youtube.png" alt="YouTube" width={24} height={24} />
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="bg-gray-800 rounded-lg px-3 py-2 w-fit text-sm">
            <select className="bg-transparent outline-none">
              <option value="en">English</option>
              <option value="de">Albanian</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} VullnetLipovica. All rights reserved.
      </div>
    </footer>
  );
}
