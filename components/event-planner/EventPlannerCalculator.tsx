'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/shared/NumberInput';
import RateSelector from '@/components/shared/RateSelector';
import ResultCard from '@/components/shared/ResultCard';
import SectionExplainer from '@/components/shared/SectionExplainer';
import {
  calcMonthlySavingsNeeded,
  calcMonthsToTarget,
  formatCurrency,
  formatDate,
} from '@/lib/calculations';

const SAVINGS_PRESETS = [
  { value: 1.5 },
  { value: 3 },
  { value: 4.5 },
];

const EVENT_TYPES = [
  { id: 'wedding', label: 'חתונה / אירוע משפחתי', icon: '💍' },
  { id: 'car', label: 'רכב', icon: '🚗' },
  { id: 'trip', label: 'חופשה / טיול', icon: '✈️' },
  { id: 'education', label: 'לימודים / קורס', icon: '🎓' },
  { id: 'renovation', label: 'שיפוץ', icon: '🏠' },
  { id: 'tech', label: 'מוצר יקר', icon: '💻' },
  { id: 'emergency', label: 'כרית ביטחון', icon: '🛡️' },
  { id: 'other', label: 'אחר', icon: '✨' },
];

type Mode = 'A' | 'B';

export default function EventPlannerCalculator() {
  const [mode, setMode] = useState<Mode>('A');
  const [selectedEvent, setSelectedEvent] = useState('wedding');
  const [customEvent, setCustomEvent] = useState('');
  const [targetAmount, setTargetAmount] = useState('50000');
  const [months, setMonths] = useState('18');
  const [monthlySavings, setMonthlySavings] = useState('2000');
  const [rate, setRate] = useState('3');

  const eventName = selectedEvent === 'other'
    ? (customEvent || 'האירוע')
    : EVENT_TYPES.find(e => e.id === selectedEvent)?.label || 'האירוע';

  const resultA = useMemo(() => {
    if (mode !== 'A') return null;
    const t = parseFloat(targetAmount) || 0;
    const m = parseInt(months) || 0;
    const r = parseFloat(rate) || 0;
    if (t <= 0 || m <= 0) return null;
    return calcMonthlySavingsNeeded(t, m, r);
  }, [mode, targetAmount, months, rate]);

  const resultB = useMemo(() => {
    if (mode !== 'B') return null;
    const t = parseFloat(targetAmount) || 0;
    const s = parseFloat(monthlySavings) || 0;
    const r = parseFloat(rate) || 0;
    if (t <= 0 || s <= 0) return null;
    return calcMonthsToTarget(t, s, r);
  }, [mode, targetAmount, monthlySavings, rate]);

  return (
    <div className="flex flex-col gap-6">
      <SectionExplainer>
        <strong>תכנון פיננסי לאירועים</strong>
        <br />
        אירועים גדולים בחיים — חתונה, טיול, לימודים, שיפוץ — דורשים תכנון פיננסי מראש. המחשבון הזה עוזר לך להבין כמה לחסוך כל חודש כדי שתגיע לאירוע מוכן/ה — בלי לרוץ להלוואות ברגע האחרון.
      </SectionExplainer>

      {/* Event Type Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-700 mb-4">לאיזה אירוע אתה חוסך?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EVENT_TYPES.map((evt) => (
            <button
              key={evt.id}
              onClick={() => setSelectedEvent(evt.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors text-sm font-medium ${
                selectedEvent === evt.id
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-teal-300 text-slate-600'
              }`}
            >
              <span className="text-2xl">{evt.icon}</span>
              <span className="text-center leading-tight">{evt.label}</span>
            </button>
          ))}
        </div>
        {selectedEvent === 'other' && (
          <input
            type="text"
            value={customEvent}
            onChange={(e) => setCustomEvent(e.target.value)}
            placeholder="שם האירוע"
            className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        )}
      </div>

      {/* Mode Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5">
        <div className="flex rounded-xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setMode('A')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              mode === 'A' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            אני יודע/ת כמה זה עולה — תגיד לי כמה לחסוך בחודש
          </button>
          <button
            onClick={() => setMode('B')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-r border-slate-200 ${
              mode === 'B' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            אני יודע/ת כמה אני יכול/ה לחסוך — תגיד לי מתי אגיע ליעד
          </button>
        </div>

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
            <NumberInput
              label="בעוד כמה חודשים האירוע?"
              value={months}
              onChange={setMonths}
              placeholder="לדוגמה: 18"
              suffix="חודשים"
              helper="כמה זמן יש לך לחסוך?"
            />
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

          <div className="sm:col-span-2">
            <RateSelector
              value={rate}
              onChange={setRate}
              presets={SAVINGS_PRESETS}
              tooltipText="אם תשים את הכסף בחשבון חיסכון, הוא יגדל בזמן שאתה חוסך. גם סכומים קטנים מוסיפים עם הזמן."
            />
          </div>
        </div>
      </div>

      {/* Mode A Results */}
      {resultA && mode === 'A' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="חיסכון חודשי נדרש"
              value={formatCurrency(resultA.monthlySavings)}
              color="teal"
            />
            <ResultCard
              label="סך ההפקדות שלך"
              value={formatCurrency(resultA.totalSaved)}
              color="slate"
            />
            <ResultCard
              label="תרומת הריבית"
              value={formatCurrency(Math.max(0, resultA.interestEarned))}
              subtitle="כסף שנוצר מחיסכון חכם"
              color="amber"
            />
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
            💡 אם תחסוך <strong>{formatCurrency(resultA.monthlySavings)}</strong> בחודש, תגיע ל{eventName} שלך בעוד {months} חודשים.
            {resultA.interestEarned > 0 && ` מתוך זה, ${formatCurrency(resultA.interestEarned)} יגיעו מריבית — לא ממך.`}
          </div>
        </>
      )}

      {/* Mode B Results */}
      {resultB && mode === 'B' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="תגיע ליעד בעוד"
              value={`${resultB.months} חודשים`}
              subtitle={`בערך ב-${formatDate(resultB.projectedDate)}`}
              color="teal"
            />
            <ResultCard
              label="סך ההפקדות שלך"
              value={formatCurrency(resultB.totalSaved)}
              color="slate"
            />
            <ResultCard
              label="תרומת הריבית"
              value={formatCurrency(resultB.interestEarned)}
              subtitle="כסף שנוצר מחיסכון חכם"
              color="amber"
            />
          </div>
          {resultB.months >= 360 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
              ⚠️ בקצב הזה ייקח יותר מ-30 שנה להגיע ליעד. שווה לשקול להגדיל את הסכום החודשי.
            </div>
          )}
          {resultB.months < 360 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
              💡 אם תחסוך <strong>{formatCurrency(parseFloat(monthlySavings))}</strong> בחודש, תגיע ל{eventName} שלך בעוד{' '}
              <strong>{resultB.months} חודשים</strong> (בערך {formatDate(resultB.projectedDate)}).
              {resultB.interestEarned > 0 && ` מתוך זה, ${formatCurrency(resultB.interestEarned)} יגיעו מריבית על החיסכון.`}
            </div>
          )}
        </>
      )}
    </div>
  );
}
