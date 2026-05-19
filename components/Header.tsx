"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.departments", href: "#departments" },
  { key: "nav.doctors", href: "#doctors" },
  { key: "nav.about", href: "#about" },
  { key: "nav.contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("resize", handleResize);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-transparent py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled
            ? "h-16 px-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-sand-200 shadow-soft"
            : "h-20 px-0"
            }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 bg-transparent p-0 m-0 min-w-0">
            <Image
              src="/er-med-logo.png"
              alt="ER Med loqo"
              width={64}
              height={64}
              className={`shrink-0 object-contain bg-transparent border-none shadow-none p-0 m-0 transition-all duration-300 ${isScrolled ? "w-10 h-10 sm:w-12 sm:h-12" : "w-11 h-11 sm:w-14 sm:h-14"}`}
              priority
            />
            <div className="flex flex-col p-0 m-0 bg-transparent border-none shadow-none leading-none min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-navy tracking-wider font-display whitespace-nowrap">
                ER MED
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-primary-600 tracking-[0.24em] uppercase mt-1 whitespace-nowrap">
                KLINIK
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="group relative text-gray-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:block w-fit">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy rounded-xl hover:bg-white/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/50 shadow-soft max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <nav id="mobile-menu" className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-gray-600 hover:text-navy font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
