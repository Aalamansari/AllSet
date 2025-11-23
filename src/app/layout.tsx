import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllSet - Developer Environment Setup",
  description: "Setup your development environment in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background text-foreground antialiased">
          {children}
        </main>
      </body>
    </html>
  );
}
