"use client";

import { useLanguage, Language } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

const languages: { code: Language; label: string }[] = [
  { code: "az", label: "AZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 border border-gray-200/60 shadow-lg shadow-gray-200/50">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${language === lang.code
              ? "text-white"
              : "text-gray-600 hover:text-navy"
            }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === lang.code && (
            <>
              <motion.div
                layoutId="activeLanguage"
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-xl"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              />
              <motion.div
                layoutId="activeLanguageGlow"
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-xl blur-lg opacity-50"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              />
            </>
          )}
          <span className="relative z-10">{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
