'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/shared/NumberInput';
import RateSelector from '@/components/shared/RateSelector';
import ResultCard from '@/components/shared/ResultCard';
import SectionExplainer from '@/components/shared/SectionExplainer';
import CompoundChart from './CompoundChart';
import { calcCompoundInterest, formatCurrency, formatPercent } from '@/lib/calculations';

const INVESTMENT_PRESETS = [
  { label: 'נמוכה', value: 3.5 },
  { label: 'בינונית', value: 6 },
  { label: 'גבוהה', value: 10 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [years, setYears] = useState('10');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('3.5');

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
          <NumberInput
            label="סכום התחלתי"
            value={principal}
            onChange={setPrincipal}
            placeholder="לדוגמה: 10,000"
            suffix="₪"
            helper="הסכום שאיתו אתה מתחיל את החיסכון"
          />
          <NumberInput
            label="מספר שנות ההשקעה"
            value={years}
            onChange={setYears}
            placeholder="לדוגמה: 10"
            suffix="שנים"
            helper="לכמה שנים אתה רוצה לחסוך?"
            min={1}
          />
          <NumberInput
            label="הפקדה חודשית"
            value={monthly}
            onChange={setMonthly}
            placeholder="0"
            suffix="₪"
            helper="כמה אתה מוסיף לחיסכון כל חודש"
            optional
          />
          <RateSelector
            value={rate}
            onChange={setRate}
            presets={INVESTMENT_PRESETS}
            tooltipText="האחוז השנתי שהכסף שלך מרוויח. לדוגמה, 6% על 1,000 ₪ = 60 ₪ ריבית בשנה — ואז גם ה-60 ₪ מרוויחים ריבית."
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
        ⚠️ <strong>שים לב:</strong> ככל שהריבית גבוהה יותר, כך הסיכון בדרך כלל גבוה יותר. הריבית במחשבון אינה מובטחת — היא מייצגת תשואה אפשרית בהשקעות מסוימות. כדאי להתאים את ההשקעה לפרופיל הסיכון האישי שלך, לאופק הזמן ולמטרות הספציפיות שלך. במידת הצורך — התייעץ עם יועץ פיננסי.
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
