import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "ER Med Clinic - Peşəkar Tibbi Xidmət",
  description:
    "Xaçmazda müasir klinika: təcrübəli həkimlər, tibbi şöbələr, laboratoriya və rahat qəbul sistemi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <meta
          name="google-site-verification"
          content="tQHbUPBMDaWVaESARky9H8vzWNeOO88HRgt6co2uzwY"
        />
        <link rel="icon" href="/logo-new.png.jpeg" type="image/jpeg" />
      </head>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
