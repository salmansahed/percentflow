import CalcFlowContainer from "@/components/CalcFlowContainer";

export const metadata = {
  title: "CalcFlow - Multi-Utility Calculator",
  description:
    "A professional percentage, standard, and date calculator suite built with Next.js",
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4 text-slate-800 selection:bg-indigo-500 selection:text-white">
      <CalcFlowContainer />
    </main>
  );
}
