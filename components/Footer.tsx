"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const getFooterLinks = (t: (key: string) => string) => ({
  [t("footer.about")]: [
    t("footer.about.clinic"),
    t("footer.about.doctors"),
    t("footer.about.career"),
    t("footer.about.news"),
  ],
  [t("footer.services")]: [
    "Kardiologiya",
    "Nevrologiya",
    "Pediatriya",
    "Laboratoriya",
  ],
  [t("footer.support")]: [
    t("footer.support.contact"),
    t("footer.support.faq"),
    t("footer.support.privacy"),
    t("footer.support.terms"),
  ],
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const footerLinks = getFooterLinks(t);

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy-light to-primary-900 pointer-events-none" />
      <div className="section-shell relative">
        {/* Main Footer */}
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-sand-200 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-700" />
              </div>
              <span className="text-xl font-bold font-display">ER Med</span>
            </div>
            <p className="text-white/70 max-w-sm mb-6 leading-relaxed">
              {t("footer.description")}
            </p>
            <p className="text-white/50 text-sm">
              {t("footer.copyright").replace("{year}", String(currentYear))}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-4 text-white">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-sand-200 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center">
          <p className="text-white/50 text-sm">
            {t("footer.developed")}:{" "}
            <span className="text-white font-medium">Kənan Hüseynov</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
