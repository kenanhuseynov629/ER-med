"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Ana səhifə", href: "#home" },
  { name: "Şöbələr", href: "#departments" },
  { name: "Həkimlər", href: "#doctors" },
  { name: "Haqqımızda", href: "#about" },
  { name: "Əlaqə", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <a href="#home" className="flex items-center gap-3 bg-transparent p-0 m-0">
            <Image
              src="/er-med-logo.png"
              alt="ER Med loqo"
              width={64}
              height={64}
              className={`object-contain bg-transparent border-none shadow-none p-0 m-0 transition-all duration-300 ${isScrolled ? "w-12 h-12" : "w-14 h-14"}`}
              priority
            />
            <div className="flex flex-col p-0 m-0 bg-transparent border-none shadow-none leading-none">
              <span className="text-lg md:text-xl font-extrabold text-navy tracking-wider font-display">
                ER MED
              </span>
              <span className="text-xs font-semibold text-primary-600 tracking-[0.24em] uppercase mt-1">
                KLINIK
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-gray-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="gradient-btn px-6 py-2.5 font-semibold"
            >
              Əlaqə
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy rounded-xl hover:bg-white/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/50 shadow-soft"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-navy font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block w-full text-center gradient-btn px-6 py-3 font-semibold mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Əlaqə
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
