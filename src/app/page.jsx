export const metadata = {
  title: "Countro - Modern Multi-Utility Calculator",
  description:
    "A fast, modern, and precise percentage, standard, and date calculator suite.",
  keywords: [
    "Countro",
    "Calculator",
    "Percentage Calculator",
    "Date Calculator",
    "Age Calculator",
  ],
  openGraph: {
    title: "Countro — All-in-One Calculation Suite",
    description:
      "Effortlessly calculate percentages, perform math, and track date durations with Countro.",
    url: "https://countro.vercel.app",
    siteName: "Countro",
    type: "website",
  },
};

import CalcFlowContainer from "@/components/CalcFlowContainer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4 text-slate-800 selection:bg-indigo-500 selection:text-white">
      <CalcFlowContainer />
    </main>
  );
}
