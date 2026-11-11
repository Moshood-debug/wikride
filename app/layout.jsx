import { Hanken_Grotesk, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

export const metadata = {
  title: "WikRide Admin",
  description: "WikRide Admin",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        hanken.variable,
        schibsted.variable,
        "font-hanken",
      )}
    >
      <body className="min-h-full flex flex-col font-hanken">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
