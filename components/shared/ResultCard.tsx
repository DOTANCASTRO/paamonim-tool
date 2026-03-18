interface ResultCardProps {
  label: string;
  value: string;
  subtitle?: string;
  color?: 'blue' | 'orange' | 'slate';
}

export default function ResultCard({ label, value, subtitle, color = 'slate' }: ResultCardProps) {
  const accent = {
    blue: 'border-t-blue-700',
    orange: 'border-t-orange-500',
    slate: 'border-t-slate-400',
  }[color];

  const textColor = {
    blue: 'text-blue-700',
    orange: 'text-orange-500',
    slate: 'text-slate-700',
  }[color];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${accent} p-5 flex flex-col gap-1`}>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
      {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
    </div>
  );
}
