"use client";

export default function TabSwitcher({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "percentage", label: "Percentage" },
    { id: "standard", label: "Calculator" },
    { id: "age", label: "Date Calc" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
