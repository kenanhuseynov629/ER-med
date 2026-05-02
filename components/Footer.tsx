"use client";

import { Heart } from "lucide-react";

const footerLinks = {
  "Haqqımızda": ["Klinika", "Həkimlər", "Karyera", "Xəbərlər"],
  "Xidmətlər": [
    "Kardiologiya",
    "Nevrologiya",
    "Pediatriya",
    "Laboratoriya",
  ],
  "Dəstək": [
    "Əlaqə",
    "FAQ",
    "Gizlilik Siyasəti",
    "İstifadə Şərtləri",
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              Sizin və ailənizin sağlamlığını qoruyuruq. Müasir tibbi
              avadanlıqlar və peşəkar həkim heyəti ilə xidmətinizdəyik.
            </p>
            <p className="text-white/50 text-sm">
              © {currentYear} ER Med Clinic. Bütün hüquqlar qorunur.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-4">{title}</h3>
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
            Hazırladı:{" "}
            <span className="text-white font-medium">Kənan Hüseynov</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
