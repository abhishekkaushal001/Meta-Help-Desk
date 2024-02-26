import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meta Help Desk",
  description: "Handle all facebook business chats in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="container bg-blue-900 min-h-screen min-w-full">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
