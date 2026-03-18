'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Right: Paamonim logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/paamonim-logo.png"
            alt="פעמונים"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Center: nav links */}
        <nav className="flex gap-2">
          <Link
            href="/compound-interest"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              pathname === '/compound-interest'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ריבית דריבית
          </Link>
          <Link
            href="/event-planner"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              pathname === '/event-planner'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            תכנון אירוע
          </Link>
        </nav>

        {/* Left: Castro Lab small label */}
        <span className="text-xs font-medium text-slate-400 tracking-wide">
          Castro Lab
        </span>

      </div>
    </header>
  );
}
