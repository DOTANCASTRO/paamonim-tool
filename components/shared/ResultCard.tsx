interface ResultCardProps {
  label: string;
  value: string;
  subtitle?: string;
  color?: 'teal' | 'amber' | 'slate';
}

export default function ResultCard({ label, value, subtitle, color = 'slate' }: ResultCardProps) {
  const accent = {
    teal: 'border-t-teal-600',
    amber: 'border-t-amber-500',
    slate: 'border-t-slate-400',
  }[color];

  const textColor = {
    teal: 'text-teal-700',
    amber: 'text-amber-600',
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
