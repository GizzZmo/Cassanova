'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              🎰 Cassanova
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/games" className="hover:text-yellow-400 transition-colors font-medium">
              Games
            </Link>
            <Link href="/live-casino" className="hover:text-yellow-400 transition-colors font-medium">
              Live Casino
            </Link>
            <Link href="/promotions" className="hover:text-yellow-400 transition-colors font-medium">
              Promotions
            </Link>
            <Link href="/vip" className="hover:text-yellow-400 transition-colors font-medium">
              VIP
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link href="/games" className="hover:text-yellow-400 transition-colors">
                Games
              </Link>
              <Link href="/live-casino" className="hover:text-yellow-400 transition-colors">
                Live Casino
              </Link>
              <Link href="/promotions" className="hover:text-yellow-400 transition-colors">
                Promotions
              </Link>
              <Link href="/vip" className="hover:text-yellow-400 transition-colors">
                VIP
              </Link>
              <Link href="/login" className="hover:text-yellow-400 transition-colors">
                Log In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-center"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
