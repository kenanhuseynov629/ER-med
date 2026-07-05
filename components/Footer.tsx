"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy-light to-primary-900 pointer-events-none" />
      <div className="section-shell relative">
        <div className="py-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/er-med-logo.png"
                alt="ER Med loqo"
                width={72}
                height={72}
                className="object-contain"
              />
              <span className="text-xl font-bold font-display">ER Med</span>
            </div>
            <p className="text-white/70 max-w-md mb-6 leading-relaxed">
              {t("footer.description")}
            </p>
            <p className="text-white/50 text-sm mb-4">
              {t("footer.copyright").replace("{year}", String(currentYear))}
            </p>
            <p className="text-white/50 text-sm">
              {t("footer.developed")}:{" "}
              <span className="text-white font-medium">Kənan Hüseynov</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
