"use client";

import { useState } from "react";
import PercentageCalculator from "./PercentageCalculator";
import StandardCalculator from "./StandardCalculator";
import DateCalculator from "./DateCalculator";
import Header from "./Header";
import TabSwitcher from "./TabSwitcher";

export default function CalcFlowContainer() {
  const [activeTab, setActiveTab] = useState("percentage");

  return (
    <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50">
      {/* Header UI */}
      <Header />

      {/* Tab Switcher Buttons */}
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Active Tab Component Render */}
      {activeTab === "percentage" && <PercentageCalculator />}
      {activeTab === "standard" && <StandardCalculator />}
      {activeTab === "age" && <DateCalculator />}
    </div>
  );
}
