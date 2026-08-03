"use client";

import { useState } from "react";

export default function StandardCalculator() {
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcEquation, setCalcEquation] = useState("");

  const handleCalcBtn = (val) => {
    if (val === "C") {
      setCalcDisplay("0");
      setCalcEquation("");
      return;
    }
    if (val === "=") {
      try {
        const expression = (calcEquation + calcDisplay)
          .replace(/×/g, "*")
          .replace(/÷/g, "/");
        const evalResult = new Function(`return ${expression}`)();
        setCalcDisplay(String(evalResult));
        setCalcEquation("");
      } catch (err) {
        setCalcDisplay("Error");
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(val)) {
      setCalcEquation(calcEquation + " " + calcDisplay + " " + val);
      setCalcDisplay("0");
    } else {
      setCalcDisplay((prev) => (prev === "0" ? String(val) : prev + val));
    }
  };

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 text-right shadow-sm">
        <div className="text-xs text-slate-400 h-4 truncate">
          {calcEquation}
        </div>
        <div className="text-3xl font-extrabold text-slate-900 tracking-wider truncate">
          {calcDisplay}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => handleCalcBtn("C")}
          className="col-span-2 py-3 bg-rose-50 text-rose-600 border border-rose-200 font-bold rounded-xl hover:bg-rose-100 transition-all"
        >
          AC
        </button>
        <button
          onClick={() => handleCalcBtn("/")}
          className="py-3 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-100 transition-all"
        >
          ÷
        </button>
        <button
          onClick={() => handleCalcBtn("*")}
          className="py-3 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-100 transition-all"
        >
          ×
        </button>

        {["7", "8", "9"].map((item) => (
          <button
            key={item}
            onClick={() => handleCalcBtn(item)}
            className="py-3 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-all"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => handleCalcBtn("-")}
          className="py-3 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-100 transition-all"
        >
          -
        </button>

        {["4", "5", "6"].map((item) => (
          <button
            key={item}
            onClick={() => handleCalcBtn(item)}
            className="py-3 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-all"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => handleCalcBtn("+")}
          className="py-3 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-100 transition-all"
        >
          +
        </button>

        {["1", "2", "3"].map((item) => (
          <button
            key={item}
            onClick={() => handleCalcBtn(item)}
            className="py-3 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-all"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => handleCalcBtn("=")}
          className="row-span-2 py-3 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
        >
          =
        </button>

        <button
          onClick={() => handleCalcBtn("0")}
          className="col-span-2 py-3 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-all"
        >
          0
        </button>
        <button
          onClick={() => handleCalcBtn(".")}
          className="py-3 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-100 shadow-sm transition-all"
        >
          .
        </button>
      </div>
    </div>
  );
}
