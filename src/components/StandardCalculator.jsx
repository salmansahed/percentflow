"use client";

import { useState, useEffect, useCallback } from "react";

export default function StandardCalculator() {
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcEquation, setCalcEquation] = useState("");
  const [calcHistory, setCalcHistory] = useState([]);

  const handleCalcBtn = useCallback(
    (val) => {
      // Clear all inputs
      if (val === "C" || val === "Escape") {
        setCalcDisplay("0");
        setCalcEquation("");
        return;
      }

      // Handle backspace action
      if (val === "Backspace") {
        setCalcDisplay((prev) => {
          if (prev.length <= 1 || prev === "Error") return "0";
          return prev.slice(0, -1);
        });
        return;
      }

      // Evaluate equation and record history
      if (val === "=" || val === "Enter") {
        try {
          const fullExpr = calcEquation + calcDisplay;
          const expression = fullExpr.replace(/×/g, "*").replace(/÷/g, "/");

          const evalResult = new Function(`return ${expression}`)();
          const resultStr = String(evalResult);

          // Save valid calculations to history array
          if (calcEquation) {
            setCalcHistory((prev) => [
              { equation: fullExpr, result: resultStr },
              ...prev,
            ]);
          }

          setCalcDisplay(resultStr);
          setCalcEquation("");
        } catch (err) {
          setCalcDisplay("Error");
        }
        return;
      }

      // Handle operators (+, -, *, /)
      if (["+", "-", "*", "/"].includes(val)) {
        setCalcEquation((prev) => prev + " " + calcDisplay + " " + val);
        setCalcDisplay("0");
      } else if (!isNaN(val) || val === ".") {
        // Handle numbers and decimal points
        setCalcDisplay((prev) => {
          if (prev === "0" && val !== ".") return String(val);
          if (val === "." && prev.includes(".")) return prev;
          return prev + val;
        });
      }
    },
    [calcEquation, calcDisplay],
  );

  // Clear recorded calculation history
  const clearHistory = () => {
    setCalcHistory([]);
  };

  // Listen for keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "=", "Enter", "Backspace", "Escape"].includes(
          key,
        )
      ) {
        e.preventDefault();
        handleCalcBtn(key);
      } else if (key.toLowerCase() === "c") {
        handleCalcBtn("C");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCalcBtn]);

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Calculator Main Body */}
      <div className="md:col-span-2">
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

      {/* History Sidebar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-full min-h-75">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h3 className="text-sm font-bold text-slate-700">History</h3>
            {calcHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-rose-500 hover:underline font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-55 overflow-y-auto pr-1">
            {calcHistory.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">
                No history yet
              </p>
            ) : (
              calcHistory.map((item, index) => (
                <div
                  key={index}
                  className="text-right p-2 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="text-xs text-slate-400">
                    {item.equation} =
                  </div>
                  <div className="text-sm font-bold text-slate-700">
                    {item.result}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
