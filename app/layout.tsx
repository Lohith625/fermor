import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Fermor — A little clarity. A lot of possibility.",
  description:
    "Understand your money, explore your possibilities, and take your next step with Fermor. Simple financial tools for everyday decisions.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
