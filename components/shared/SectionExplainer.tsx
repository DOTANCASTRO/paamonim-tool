interface SectionExplainerProps {
  children: React.ReactNode;
}

export default function SectionExplainer({ children }: SectionExplainerProps) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
      {children}
    </div>
  );
}
