// app/layout.tsx
import "../globals.css"; // or your actual global stylesheet path
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acme",
  description: "Welcome to Acme App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
