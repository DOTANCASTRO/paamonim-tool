interface SectionExplainerProps {
  children: React.ReactNode;
}

export default function SectionExplainer({ children }: SectionExplainerProps) {
  return (
    <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm text-teal-800 leading-relaxed">
      {children}
    </div>
  );
}
