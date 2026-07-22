"use client";

import { useState } from "react";

export default function Home() {
  // 1. State Declarations
  const [amount, setAmount] = useState(500);
  const [percent, setPercent] = useState(10);
  const [copied, setCopied] = useState(false);

  // 2. Data Conversions
  const numAmount = Number(amount) || 0;
  const numPercent = Number(percent) || 0;

  // 3. Mathematical Calculations
  const calculatedValue = (numAmount * numPercent) / 100;
  const remainingValue = numAmount - calculatedValue;

  // 4. Number Formatting
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(num);
  };

  // 5. Copy Result to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(calculatedValue.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 text-zinc-100">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            PercentFlow ⚡
          </h1>
          <p className="text-xs text-zinc-400">
            Real-time Interactive Percentage Engine
          </p>
        </div>

        {/* 1. Base Amount Input */}
        <div className="mb-8">
          <label
            htmlFor="amountInput"
            className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
          >
            Base Amount
          </label>
          <div className="relative flex items-center">
            <input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-semibold text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* 2. Interactive Percentage Slider Section */}
        <div className="mb-8 bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="percentRange"
              className="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Select Percentage
            </label>
            <span className="text-lg font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-0.5 rounded-lg">
              {percent}%
            </span>
          </div>

          {/* Smooth Native Range Input */}
          <input
            id="percentRange"
            type="range"
            min="0"
            max="100"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[10, 25, 50, 75].map((val) => (
              <button
                key={val}
                onClick={() => setPercent(val)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  percent === val
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {val}%
              </button>
            ))}
          </div>
        </div>

        {/* 3. Output Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Percentage Result Card */}
          <div className="bg-indigo-950/30 border border-indigo-500/30 p-5 rounded-2xl relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-indigo-300">
                Calculated Value
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-indigo-400 hover:text-indigo-200 bg-indigo-500/20 px-2 py-1 rounded-md transition-colors"
                title="Copy Value"
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>
            <p className="text-2xl font-bold text-indigo-200">
              {formatNumber(calculatedValue)}
            </p>
            <span className="text-[10px] text-indigo-400/80 mt-1 block">
              {percent}% of {formatNumber(numAmount)}
            </span>
          </div>

          {/* Remaining Value Card */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl">
            <span className="text-xs font-medium text-zinc-400 mb-2 block">
              Remaining Amount
            </span>
            <p className="text-2xl font-bold text-zinc-200">
              {formatNumber(remainingValue)}
            </p>
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Base minus percentage
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
