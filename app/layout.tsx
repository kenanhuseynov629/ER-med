import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ER Med Clinic - Sağlamlığınız Bizim Prioritetimizdir",
  description: "Peşəkar həkimlər, müasir avadanlıqlar və yüksək keyfiyyətli tibbi xidmət",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <meta name="google-site-verification" content="tQHbUPBMDaWVaESARky9H8vzWNeOO88HRgt6co2uzwY" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
