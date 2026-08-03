"use client";

import { useState } from "react";

export default function DateCalculator() {
  const today = new Date();

  // Start Date States
  const [startMonth, setStartMonth] = useState("01");
  const [startDay, setStartDay] = useState("1");
  const [startYear, setStartYear] = useState("2000");

  // End Date States (Default: Today)
  const [endMonth, setEndMonth] = useState(
    String(today.getMonth() + 1).padStart(2, "0"),
  );
  const [endDay, setEndDay] = useState(String(today.getDate()));
  const [endYear, setEndYear] = useState(String(today.getFullYear()));

  // Extra Settings & Results
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [ageResult, setAgeResult] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Dynamic Days Calculation Helper
  const getDaysInMonth = (year, month) => {
    return new Date(Number(year), Number(month), 0).getDate();
  };

  const currentYearNum = today.getFullYear();
  const years = Array.from(
    { length: currentYearNum - 1900 + 51 },
    (_, i) => currentYearNum + 50 - i,
  );

  const months = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const startDaysCount = getDaysInMonth(startYear, startMonth);
  const startDays = Array.from({ length: startDaysCount }, (_, i) =>
    String(i + 1),
  );

  const endDaysCount = getDaysInMonth(endYear, endMonth);
  const endDays = Array.from({ length: endDaysCount }, (_, i) => String(i + 1));

  // Handlers for Date Changes
  const handleStartMonthChange = (newMonth) => {
    setStartMonth(newMonth);
    const maxDays = getDaysInMonth(startYear, newMonth);
    if (Number(startDay) > maxDays) setStartDay(String(maxDays));
  };

  const handleStartYearChange = (newYear) => {
    setStartYear(newYear);
    const maxDays = getDaysInMonth(newYear, startMonth);
    if (Number(startDay) > maxDays) setStartDay(String(maxDays));
  };

  const handleEndMonthChange = (newMonth) => {
    setEndMonth(newMonth);
    const maxDays = getDaysInMonth(endYear, newMonth);
    if (Number(endDay) > maxDays) setEndDay(String(maxDays));
  };

  const handleEndYearChange = (newYear) => {
    setEndYear(newYear);
    const maxDays = getDaysInMonth(newYear, endMonth);
    if (Number(endDay) > maxDays) setEndDay(String(maxDays));
  };

  const handleCalculateDate = () => {
    let startDate = new Date(
      Number(startYear),
      Number(startMonth) - 1,
      Number(startDay),
    );
    let endDate = new Date(
      Number(endYear),
      Number(endMonth) - 1,
      Number(endDay),
    );

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return;

    if (includeEndDay) {
      endDate.setDate(endDate.getDate() + 1);
    }

    if (startDate > endDate) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    let y = endDate.getFullYear() - startDate.getFullYear();
    let m = endDate.getMonth() - startDate.getMonth();
    let d = endDate.getDate() - startDate.getDate();

    if (d < 0) {
      m--;
      const prevMonthLastDay = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0,
      ).getDate();
      d += prevMonthLastDay;
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    setAgeResult({ years: y, months: m, days: d, totalDays: totalDays });
  };

  const handleStartDatePicker = (e) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split("-");
    const maxDays = getDaysInMonth(y, m);
    setStartYear(y);
    setStartMonth(m);
    setStartDay(String(Math.min(Number(d), maxDays)));
  };

  const handleEndDatePicker = (e) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split("-");
    const maxDays = getDaysInMonth(y, m);
    setEndYear(y);
    setEndMonth(m);
    setEndDay(String(Math.min(Number(d), maxDays)));
  };

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
    <div className="space-y-4">
      {/* START DATE */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Start Date
        </label>
        <div className="flex items-center gap-2">
          <select
            value={startMonth}
            onChange={(e) => handleStartMonthChange(e.target.value)}
            className="w-1/3 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
            className="w-1/4 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {startDays.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={startYear}
            onChange={(e) => handleStartYearChange(e.target.value)}
            className="w-1/3 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="relative flex items-center justify-center p-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 shadow-sm transition-all">
            <span className="text-sm">📅</span>
            <input
              type="date"
              onChange={handleStartDatePicker}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* END DATE */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          End Date
        </label>
        <div className="flex items-center gap-2">
          <select
            value={endMonth}
            onChange={(e) => handleEndMonthChange(e.target.value)}
            className="w-1/3 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={endDay}
            onChange={(e) => setEndDay(e.target.value)}
            className="w-1/4 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {endDays.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={endYear}
            onChange={(e) => handleEndYearChange(e.target.value)}
            className="w-1/3 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="relative flex items-center justify-center p-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 shadow-sm transition-all">
            <span className="text-sm">📅</span>
            <input
              type="date"
              onChange={handleEndDatePicker}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeEndDay}
            onChange={(e) => setIncludeEndDay(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-indigo-600"
          />
          include end day (add 1 day)
        </label>

        <button
          onClick={handleCalculateDate}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
        >
          Calculate ➔
        </button>
      </div>

      {/* RESULT */}
      {ageResult && (
        <div className="mt-6 pt-4 border-t border-slate-200 animate-in fade-in duration-300">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-indigo-50/60 border border-indigo-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-indigo-900 block">
                {ageResult.years}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Years
              </span>
            </div>

            <div className="bg-indigo-50/60 border border-indigo-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-indigo-900 block">
                {ageResult.months}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Months
              </span>
            </div>

            <div className="bg-indigo-50/60 border border-indigo-200 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-indigo-900 block">
                {ageResult.days}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Days
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Total Date Duration Summary
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                {ageResult.years} Years, {ageResult.months} Months,{" "}
                {ageResult.days} Days
              </p>
              <span className="text-xs text-indigo-600 font-medium mt-1 block">
                (Total {formatNumber(ageResult.totalDays)} Days)
              </span>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `${ageResult.years} Years, ${ageResult.months} Months, ${ageResult.days} Days`,
                  "age",
                )
              }
              className="text-xs text-indigo-600 bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-xl hover:bg-indigo-200 transition-all font-semibold"
            >
              {copiedId === "age" ? "Copied! ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
