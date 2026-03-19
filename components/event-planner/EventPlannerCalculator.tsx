'use client';

import { useState, useMemo } from 'react';
import { EmbeddedCompoundCalculator } from '@/components/compound-interest/CompoundInterestCalculator';
import NumberInput from '@/components/shared/NumberInput';
import ResultCard from '@/components/shared/ResultCard';
import SectionExplainer from '@/components/shared/SectionExplainer';
import {
  calcMonthlySavingsNeeded,
  calcMonthsToTarget,
  formatCurrency,
  formatDate,
} from '@/lib/calculations';

type Mode = 'A' | 'B';

export default function EventPlannerCalculator() {
  const [mode, setMode] = useState<Mode>('A');
  const [eventName, setEventName] = useState('');
  const [targetAmount, setTargetAmount] = useState('5000');
  const [years, setYears] = useState('5');
  const [monthlySavings, setMonthlySavings] = useState('2000');
  const [showCompound, setShowCompound] = useState(false);

  const displayName = eventName.trim() || 'האירוע';

  const resultA = useMemo(() => {
    const t = parseFloat(targetAmount) || 0;
    const m = (parseInt(years) || 0) * 12;
    if (mode !== 'A' || t <= 0 || m <= 0) return null;
    return calcMonthlySavingsNeeded(t, m, 0);
  }, [mode, targetAmount, years]);

  const resultB = useMemo(() => {
    const t = parseFloat(targetAmount) || 0;
    const s = parseFloat(monthlySavings) || 0;
    if (mode !== 'B' || t <= 0 || s <= 0) return null;
    return calcMonthsToTarget(t, s, 0);
  }, [mode, targetAmount, monthlySavings]);

  return (
    <div className="flex flex-col gap-6">
      <SectionExplainer>
        <strong>תכנון פיננסי לאירועים</strong>
        <br />
        אירועים גדולים בחיים — חתונה, טיול, לימודים, שיפוץ — דורשים תכנון פיננסי מראש. המחשבון הזה עוזר לך להבין כמה לחסוך כל חודש כדי שתגיע לאירוע מוכן/ה — בלי לרוץ להלוואות ברגע האחרון.
      </SectionExplainer>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5">

        {/* Free text event name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">שם האירוע</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="לדוגמה: חתונה, רכב, טיול..."
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setMode('A')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              mode === 'A' ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            אני יודע/ת כמה זה עולה — תגיד לי כמה לחסוך בחודש
          </button>
          <button
            onClick={() => setMode('B')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-r border-slate-200 ${
              mode === 'B' ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            אני יודע/ת כמה אני יכול/ה לחסוך — תגיד לי מתי אגיע ליעד
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            label="עלות האירוע"
            value={targetAmount}
            onChange={setTargetAmount}
            placeholder="לדוגמה: 50,000"
            suffix="₪"
            helper="כמה כסף תצטרך לאירוע?"
          />
          {mode === 'A' ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">בעוד כמה שנים האירוע?</label>
              <div className="flex gap-2 items-stretch">
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={years}
                    onChange={(e) => { if (e.target.value === '' || /^\d*$/.test(e.target.value)) setYears(e.target.value); }}
                    placeholder="לדוגמה: 5"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">שנים</span>
                </div>
                {[1, 3, 5].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setYears(String(preset))}
                    className={`px-3 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                      years === String(preset)
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {preset} שנים
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400">כמה זמן יש לך לחסוך?</p>
            </div>
          ) : (
            <NumberInput
              label="כמה אתה יכול/ה לחסוך בחודש?"
              value={monthlySavings}
              onChange={setMonthlySavings}
              placeholder="לדוגמה: 2,000"
              suffix="₪"
              helper="הסכום שאתה מוכן/ה להפריש כל חודש"
            />
          )}
        </div>
      </div>

      {/* Mode A Results */}
      {resultA && mode === 'A' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label="חיסכון חודשי נדרש"
              value={formatCurrency(resultA.monthlySavings)}
              color="blue"
            />
            <ResultCard
              label="סך החיסכון הנדרש"
              value={formatCurrency(parseFloat(targetAmount))}
              color="slate"
            />
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-800 leading-relaxed">
            💡 אם תחסוך <strong>{formatCurrency(resultA.monthlySavings)}</strong> בחודש, תגיע ל{displayName} שלך בעוד {years} שנים.
          </div>
        </>
      )}

      {/* Mode B Results */}
      {resultB && mode === 'B' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label="תגיע ליעד בעוד"
              value={`${(resultB.months / 12).toFixed(1)} שנים`}
              subtitle={`בערך ב-${formatDate(resultB.projectedDate)}`}
              color="blue"
            />
            <ResultCard
              label="סך החיסכון הנדרש"
              value={formatCurrency(parseFloat(targetAmount))}
              color="slate"
            />
          </div>
          {resultB.months >= 360 ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
              ⚠️ בקצב הזה ייקח יותר מ-30 שנה להגיע ליעד. שווה לשקול להגדיל את הסכום החודשי.
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-800 leading-relaxed">
              💡 אם תחסוך <strong>{formatCurrency(parseFloat(monthlySavings))}</strong> בחודש, תגיע ל{displayName} שלך בעוד{' '}
              <strong>{(resultB.months / 12).toFixed(1)} שנים</strong> (בערך {formatDate(resultB.projectedDate)}).
            </div>
          )}
        </>
      )}

      {/* Inline compound interest calculator */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-blue-800">רוצה להגיע ליעד מהר יותר?</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              אם תשקיע את הסכום החודשי בחשבון חיסכון או השקעה, הריבית תעזור לך להגיע ליעד מוקדם יותר — הכסף עובד בשבילך בזמן שאתה חוסך.
            </p>
          </div>
          <button
            onClick={() => setShowCompound((v) => !v)}
            className="shrink-0 bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-blue-800 transition-colors text-center"
          >
            {showCompound ? 'סגור ←' : 'מחשבון ריבית דריבית ←'}
          </button>
        </div>
        {showCompound && (
          <div className="border-t border-blue-200 pt-4">
            <EmbeddedCompoundCalculator
              defaultPrincipal="0"
              defaultYears={mode === 'A' ? years : resultB ? String(Math.round(resultB.months / 12)) : undefined}
              defaultMonthly={
                mode === 'A'
                  ? resultA ? String(Math.round(resultA.monthlySavings)) : undefined
                  : monthlySavings
              }
              syncMonthly={
                mode === 'A'
                  ? resultA ? String(Math.round(resultA.monthlySavings)) : undefined
                  : monthlySavings
              }
              syncYears={years}
              hidePresets
            />
          </div>
        )}
      </div>
    </div>
  );
}
