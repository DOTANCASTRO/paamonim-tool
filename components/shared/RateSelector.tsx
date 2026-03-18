'use client';

interface Preset {
  label: string;
  value: number;
}

interface RateSelectorProps {
  value: string;
  onChange: (val: string) => void;
  presets: Preset[];
  helper?: string;
  tooltipText?: string;
}

export default function RateSelector({ value, onChange, presets, helper, tooltipText }: RateSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <label className="text-sm font-semibold text-slate-700">ריבית שנתית (%)</label>
        {tooltipText && (
          <Tooltip text={tooltipText} />
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d*\.?\d*$/.test(val)) onChange(val);
          }}
          placeholder="הכנס ריבית"
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => onChange(String(p.value))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              value === String(p.value)
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
            }`}
          >
            {p.label} {p.value}%
          </button>
        ))}
      </div>
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="relative group">
      <button className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-xs flex items-center justify-center hover:bg-teal-100 transition">
        ?
      </button>
      <div className="absolute bottom-6 right-0 w-56 bg-slate-800 text-white text-xs rounded-lg p-3 hidden group-hover:block z-10 leading-relaxed shadow-lg">
        {text}
      </div>
    </div>
  );
}
