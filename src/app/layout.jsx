import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Countro — Multi-Utility Calculator",
  description:
    "All-in-one suite for percentage, standard, and date calculations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefinSans.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
