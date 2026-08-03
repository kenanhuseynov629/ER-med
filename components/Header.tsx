"use client";

import { useState, useEffect, useCallback } from "react";
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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/95 backdrop-blur-xl py-2 shadow-lg"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${isScrolled
            ? "h-16 px-5 rounded-2xl border border-sand-200"
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
            {navLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative text-gray-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                {t(link.key)}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:block w-fit">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-navy rounded-xl hover:bg-white/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/50 shadow-soft max-h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar"
          >
            <nav id="mobile-menu" className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="block text-gray-600 hover:text-navy font-medium py-2 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="pt-4 border-t border-gray-100"
              >
                <LanguageSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
