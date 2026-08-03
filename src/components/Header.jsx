export default function Header() {
  return (
    <div className="text-center mb-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1 flex items-center justify-center gap-2">
        CalcFlow <span className="text-indigo-600 animate-pulse">⚡</span>
      </h1>
      <p className="text-xs text-slate-500 tracking-wide">
        Multi-Utility Professional Calculation Suite
      </p>
    </div>
  );
}
