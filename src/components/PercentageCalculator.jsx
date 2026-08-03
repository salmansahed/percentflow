"use client";

import { useState } from "react";

export default function PercentageCalculator() {
  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(15);
  const [copiedId, setCopiedId] = useState(null);

  const numAmount = Number(amount) || 0;
  const numPercent = Number(percent) || 0;
  const calculatedValue = (numAmount * numPercent) / 100;
  const remainingValue = numAmount - calculatedValue;

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
      num,
    );
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text.toString());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Base Amount
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 font-semibold">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Percentage
          </span>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-xl">
            {percent}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="grid grid-cols-5 gap-2 mt-3">
          {[5, 10, 25, 50, 75].map((val) => (
            <button
              key={val}
              onClick={() => setPercent(val)}
              className={`py-1 text-xs font-semibold rounded-xl border transition-all ${
                percent === val
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50/60 border border-indigo-200 p-4 rounded-2xl">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-indigo-700 uppercase">
              Calculated Value
            </span>
            <button
              onClick={() => handleCopy(calculatedValue, "calc")}
              className="text-xs text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-2 py-0.5 rounded-md font-medium transition-all"
            >
              {copiedId === "calc" ? "Copied! ✓" : "Copy"}
            </button>
          </div>
          <p className="text-2xl font-black text-indigo-900">
            {formatNumber(calculatedValue)}
          </p>
          <span className="text-[10px] text-indigo-600/80 mt-1 block">
            {percent}% of {formatNumber(numAmount)}
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Remaining Amount
            </span>
            <button
              onClick={() => handleCopy(remainingValue, "final")}
              className="text-xs text-slate-600 bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded-md font-medium transition-all"
            >
              {copiedId === "final" ? "Copied! ✓" : "Copy"}
            </button>
          </div>
          <p className="text-2xl font-black text-slate-800">
            {formatNumber(remainingValue)}
          </p>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Base minus percentage
          </span>
        </div>
      </div>
    </div>
  );
}
