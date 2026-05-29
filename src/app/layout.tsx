import type { Metadata } from "next";
import "./globals.css";
import { AuthRedirectHandler } from "@/components/auth-redirect-handler";

export const metadata: Metadata = {
  title: "Lakshya AI - AI awareness and adoption for education",
  description:
    "A SaaS prototype that helps institutions teach AI basics, turn awareness into classroom usage, and measure AI readiness.",
  openGraph: {
    title: "Lakshya AI",
    description: "AI awareness and adoption for educational institutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans">{children}</body>
      <body className="min-h-screen bg-background font-sans">
        <AuthRedirectHandler />
        {children}
      </body>
    </html>
  );
}
