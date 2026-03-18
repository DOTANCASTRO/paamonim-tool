'use client';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  suffix?: string;
  helper?: string;
  min?: number;
  max?: number;
  optional?: boolean;
}

export default function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  helper,
  min = 0,
  optional,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {optional && <span className="text-slate-400 font-normal mr-1">(אופציונלי)</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {suffix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  );
}
