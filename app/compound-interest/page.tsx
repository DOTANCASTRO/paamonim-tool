import CompoundInterestCalculator from '@/components/compound-interest/CompoundInterestCalculator';
import SectionExplainer from '@/components/shared/SectionExplainer';

export default function CompoundInterestPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">מחשבון ריבית דריבית</h1>
        <p className="text-slate-500 text-sm mt-1">גלה כמה הכסף שלך יגדל לאורך הזמן</p>
      </div>
      <SectionExplainer>
        <p className="font-semibold mb-2">איך משתמשים?</p>
        <ol className="flex flex-col gap-1 list-decimal list-inside marker:text-blue-400">
          <li>הזינו סכום התחלתי — כמה יש לכם היום להשקיע</li>
          <li>בחרו תקופה — כמה שנים מתכוונים לחסוך</li>
          <li>הוסיפו הפקדה חודשית (אופציונלי) — כמה תוסיפו כל חודש</li>
          <li>בחרו ריבית שנתית — 3.5% שמרני, 5% ממוצע, 8% אופטימי</li>
        </ol>
        <p className="mt-2 text-blue-700">תראו כמה כסף תצברו — ובפירוט כמה הגיע מהפקדות שלכם, וכמה נוצר מהריבית בלבד.</p>
      </SectionExplainer>
      <CompoundInterestCalculator />
    </div>
  );
}
