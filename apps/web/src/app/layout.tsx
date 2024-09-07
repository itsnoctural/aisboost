import { Background } from "@/components/background";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ThemeProvider attribute="class">
          <Background />
          {children}
          <Script
            defer
            data-domain="aisboost.com"
            src="https://plaus.aisboost.com/js/script.js"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
