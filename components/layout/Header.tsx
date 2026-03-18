'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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
        <div className="text-xl font-bold text-teal-700 tracking-tight">
          פעמונים
        </div>
      </div>
    </header>
  );
}
