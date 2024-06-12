import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import './sass/globals.sass';

export const metadata: Metadata = {
  title: "Mango",
  description: "Technical test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1 className="title">Mango Technical Test</h1>
        </header>
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
