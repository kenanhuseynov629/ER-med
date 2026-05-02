"use client";

import { motion } from "framer-motion";
import { ArrowRight, Stethoscope } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sand-50 to-sand-100 -z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary-200/35 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sand-200/50 rounded-full blur-3xl" />

      <div className="section-shell py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="premium-badge">
              PREMIUM CARE EXPERIENCE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              Sağlamlığınız{" "}
              <span className="text-primary-600">Bizim Prioritetimizdir</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Peşəkar həkimlərimiz və müasir tibbi avadanlıqlarımızla sizin və
              ailənizin sağlamlığını qoruyuruq. Yüksək keyfiyyətli tibbi xidmət
              üçün bizə etibar edin.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#departments"
                className="inline-flex items-center justify-center space-x-2 gradient-btn px-7 py-3.5 font-semibold group"
              >
                <span>Xidmətlərimizlə tanış olun</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/90 text-navy border border-primary-200 px-7 py-3.5 rounded-2xl font-semibold hover:border-primary-500 transition-all duration-200 shadow-soft"
              >
                <span>Əlaqə</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-white">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-navy font-bold text-sm">50,000+</p>
                <p className="text-xs text-gray-500">Məmnun pasiyent</p>
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
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-premium bg-gradient-to-br from-sand-100 via-white to-primary-200 flex items-center justify-center border border-sand-200">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-white/50 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-navy" />
                  </div>
                  <p className="text-navy font-medium text-lg">
                    Müasir Klinika
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Yüksək keyfiyyətli tibbi xidmət
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-sand-200 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy">Sertifikatlı</p>
                    <p className="text-sm text-gray-500">Həkimlər</p>
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
