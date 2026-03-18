import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">ברוכים הבאים לפעמונים</h1>
        <p className="text-slate-500">כלים פשוטים לתכנון פיננסי חכם</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/compound-interest" className="group bg-white rounded-2xl border border-slate-200 p-7 hover:border-teal-400 hover:shadow-md transition-all flex flex-col gap-3">
          <div className="text-4xl">📈</div>
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
            מחשבון ריבית דריבית
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            גלה כמה הכסף שלך יגדל לאורך הזמן. הכנס סכום התחלתי, הפקדה חודשית ותקופת ההשקעה — וראה את הקסם של ריבית דריבית.
          </p>
          <span className="text-teal-600 text-sm font-medium mt-1">התחל →</span>
        </Link>

        <Link href="/event-planner" className="group bg-white rounded-2xl border border-slate-200 p-7 hover:border-teal-400 hover:shadow-md transition-all flex flex-col gap-3">
          <div className="text-4xl">🎯</div>
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
            תכנון פיננסי לאירועים
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            חתונה, רכב, טיול, שיפוץ? תכנן כמה לחסוך כל חודש כדי שתגיע לאירוע מוכן/ה — בלי הפתעות.
          </p>
          <span className="text-teal-600 text-sm font-medium mt-1">התחל →</span>
        </Link>
      </div>
    </div>
  );
}
