import CompoundInterestCalculator from '@/components/compound-interest/CompoundInterestCalculator';

export default function CompoundInterestPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">מחשבון ריבית דריבית</h1>
        <p className="text-slate-500 text-sm mt-1">גלה כמה הכסף שלך יגדל לאורך הזמן</p>
      </div>
      <CompoundInterestCalculator />
    </div>
  );
}
