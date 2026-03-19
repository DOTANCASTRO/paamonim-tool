'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NumberInput from '@/components/shared/NumberInput';
import RateSelector from '@/components/shared/RateSelector';
import ResultCard from '@/components/shared/ResultCard';
import SectionExplainer from '@/components/shared/SectionExplainer';
import CompoundChart from './CompoundChart';
import { calcCompoundInterest, formatCurrency, formatPercent } from '@/lib/calculations';

const INVESTMENT_PRESETS = [
  { value: 3.5 },
  { value: 5 },
  { value: 8 },
];

const PRINCIPAL_PRESETS = [1000, 3000, 5000];
const MONTHLY_PRESETS = [1000, 3000, 5000];
const YEARS_PRESETS = [5, 10, 20];

interface CompoundInterestFormProps {
  defaultPrincipal?: string;
  defaultYears?: string;
  defaultMonthly?: string;
  hidePresets?: boolean;
  syncMonthly?: string;
  syncYears?: string;
}

function CompoundInterestForm({ defaultPrincipal, defaultYears, defaultMonthly, hidePresets, syncMonthly, syncYears }: CompoundInterestFormProps = {}) {
  const searchParams = useSearchParams();
  const initialFromUrl = defaultPrincipal ?? searchParams.get('initial') ?? '500';
  const monthsFromUrl = searchParams.get('months');
  const yearsFromUrl = defaultYears ?? (monthsFromUrl ? String(Math.max(1, Math.round(parseInt(monthsFromUrl) / 12))) : '5');
  const monthlyFromUrl = defaultMonthly ?? searchParams.get('monthly') ?? '500';
  const [principal, setPrincipal] = useState(initialFromUrl);
  const [years, setYears] = useState(yearsFromUrl);
  const [monthly, setMonthly] = useState(monthlyFromUrl);
  const [rate, setRate] = useState('3.5');

  useEffect(() => {
    if (syncMonthly !== undefined) setMonthly(syncMonthly);
  }, [syncMonthly]);

  useEffect(() => {
    if (syncYears !== undefined) setYears(syncYears);
  }, [syncYears]);

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const y = Math.min(parseInt(years) || 0, 60);
    const m = parseFloat(monthly) || 0;
    const r = parseFloat(rate) || 0;
    if (p < 0 || y <= 0 || r < 0) return null;
    return calcCompoundInterest(p, r, y, m);
  }, [principal, years, monthly, rate]);

  const interestPercent = result
    ? (result.totalInterest / result.totalValue) * 100
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <SectionExplainer>
        <strong>מה זה ריבית דריבית?</strong>
        <br />
        ריבית דריבית היא כשהכסף שלך מרוויח ריבית — ואז גם הריבית עצמה מרוויחה ריבית. ככל שמתחילים מוקדם יותר, ככה הכסף גדל יותר. המחשבון הזה מראה לך כמה הכסף שלך יהיה שווה בעוד כמה שנים.
      </SectionExplainer>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-slate-800">הכנס את הנתונים שלך</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">סכום התחלתי</label>
            <div className="flex gap-2 items-stretch">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={principal}
                  onChange={(e) => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setPrincipal(e.target.value); }}
                  placeholder="לדוגמה: 500"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₪</span>
              </div>
              {PRINCIPAL_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrincipal(String(preset))}
                  className={`px-3 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    principal === String(preset)
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {preset.toLocaleString()} ₪
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">הסכום שאיתו אתה מתחיל את החיסכון</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">מספר שנות ההשקעה</label>
            <div className="flex gap-2 items-stretch">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={years}
                  onChange={(e) => { if (e.target.value === '' || /^\d*$/.test(e.target.value)) setYears(e.target.value); }}
                  placeholder="לדוגמה: 10"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">שנים</span>
              </div>
              {!hidePresets && YEARS_PRESETS.map((preset) => (
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
            <p className="text-xs text-slate-400">לכמה שנים אתה רוצה לחסוך?</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">הפקדה חודשית <span className="text-slate-400 font-normal mr-1">(אופציונלי)</span></label>
            <div className="flex gap-2 items-stretch">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={monthly}
                  onChange={(e) => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setMonthly(e.target.value); }}
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₪</span>
              </div>
              {!hidePresets && MONTHLY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMonthly(String(preset))}
                  className={`px-3 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    monthly === String(preset)
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {preset.toLocaleString()} ₪
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">כמה אתה מוסיף לחיסכון כל חודש</p>
          </div>
          <RateSelector
            value={rate}
            onChange={setRate}
            presets={INVESTMENT_PRESETS}
            tooltipText="האחוז השנתי שהכסף שלך מרוויח. לדוגמה, 6% על 1,000 ₪ = 60 ₪ ריבית בשנה — ואז גם ה-60 ₪ מרוויחים ריבית."
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
        ⚠️ <strong>שים לב:</strong> ככל שהריבית גבוהה יותר, כך הסיכון בדרך כלל גבוה יותר. הריבית במחשבון אינה מובטחת — היא מייצגת תשואה אפשרית בהשקעות מסוימות. כדאי להתאים את ההשקעה לפרופיל הסיכון האישי שלך, לאופק הזמן ולמטרות הספציפיות שלך. בנוסף, החישוב אינו כולל דמי ניהול — שעשויים להפחית את התשואה בפועל. במידת הצורך — התייעץ עם יועץ פיננסי.
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultCard
              label="סכום התחלתי"
              value={formatCurrency(parseFloat(principal) || 0)}
              color="slate"
            />
            <ResultCard
              label="סך הפקדות חודשיות"
              value={formatCurrency(result.totalContributions - (parseFloat(principal) || 0))}
              color="slate"
            />
            <ResultCard
              label="רווח מריבית"
              value={formatCurrency(result.totalInterest)}
              subtitle={`${formatPercent(interestPercent)} מסך החיסכון`}
              color="orange"
            />
            <ResultCard
              label="סך הכל בסוף התקופה"
              value={formatCurrency(result.totalValue)}
              color="blue"
            />
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-800 leading-relaxed">
            💡 מתוך סך החיסכון שלך, <strong>{formatPercent(interestPercent)}</strong> הגיע מריבית —
            {interestPercent > 50
              ? ' כלומר יותר ממחצית הכסף שלך נוצר בלי שהפקדת כלום. זה הכוח של זמן + ריבית.'
              : ' כלומר הזמן עבד בשבילך בלי שעשית כלום. ככל שתתחיל מוקדם יותר, ה-% הזה יגדל.'}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-700 mb-4">גידול ההשקעה לאורך השנים</h3>
            <CompoundChart data={result.yearlyBreakdown} />
          </div>
        </>
      )}
    </div>
  );
}

export function EmbeddedCompoundCalculator(props: CompoundInterestFormProps) {
  return (
    <Suspense fallback={<div />}>
      <CompoundInterestForm {...props} />
    </Suspense>
  );
}

export default function CompoundInterestCalculator() {
  return (
    <Suspense fallback={<div />}>
      <CompoundInterestForm />
    </Suspense>
  );
}
