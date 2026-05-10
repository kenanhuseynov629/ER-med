"use client";

import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Star } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-white to-[#E8F2FF] -z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#1A73E8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4E5FD]/30 rounded-full blur-3xl" />

      <div className="section-shell py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span
              className="premium-badge animate-pulse-slow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-[#1A73E8] rounded-full mr-2 animate-pulse"></span>
              {t("hero.badge")}
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              {t("hero.title")}{" "}
              <span className="text-primary-600">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#departments"
                className="inline-flex items-center justify-center space-x-2 gradient-btn px-7 py-3.5 font-semibold group"
              >
                <span>{t("hero.cta.services")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/90 text-navy border border-primary-200 px-7 py-3.5 rounded-2xl font-semibold hover:border-primary-500 transition-all duration-200 shadow-soft"
              >
                <span>{t("hero.cta.contact")}</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-5 pt-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden relative"
                  >
                    <Image
                      src={src}
                      alt={`${t("hero.trust.satisfied")} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[#1A3A5C] font-bold text-sm">{t("hero.trust.patients")}</p>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-xs text-gray-500">{t("hero.trust.satisfied")}</p>
                </div>
              </div>
            </div>
            <div className="section-divider !mx-0" />
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative animate-float-slow">
              {/* Main Image Placeholder */}
              <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-24px_rgba(26,115,232,0.25)] bg-gradient-to-br from-[#F1F5F9] via-white to-[#D4E5FD] flex items-center justify-center border border-[#E2E8F0]">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-white/50 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-navy" />
                  </div>
                  <p className="text-navy font-medium text-lg">
                    {t("hero.image.clinic")}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {t("hero.image.service")}
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass-card p-5"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A73E8] to-[#1557B0] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-navy">{t("hero.card.certified")}</p>
                    <p className="text-sm text-gray-500">{t("hero.card.doctors")}</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
