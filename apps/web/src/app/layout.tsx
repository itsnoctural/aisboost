import { Background } from "@/components/background";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
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
        </ThemeProvider>
      </body>
    </html>
  );
}
