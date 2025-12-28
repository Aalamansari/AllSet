import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllSet - Developer Environment Setup",
  description: "Setup your development environment in minutes.",
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/allset_icon.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/icon.png?v=2',
  },
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
