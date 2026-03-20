'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
                  ? 'bg-blue-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ריבית דריבית
            </Link>
            <Link
              href="/event-planner"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === '/event-planner'
                  ? 'bg-blue-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              תכנון אירוע
            </Link>
          </nav>

          {/* Left: Castro Lab small label */}
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-medium text-slate-400 tracking-wide hover:text-slate-600 transition-colors cursor-pointer"
          >
            Castro Lab
          </button>

        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-sm w-full mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/castro-lab.jpg"
              alt="Castro Lab"
              className="w-full h-auto"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
