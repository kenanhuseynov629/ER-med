"use client";

import { motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { useMemo, useEffect, useRef } from "react";

const getQuickStats = (t: (key: string) => string) => [
  { value: "09:00", label: t("hero.quickStats.start") },
  { value: "6 gün", label: t("hero.quickStats.schedule") },
  { value: "Xaçmaz", label: t("hero.quickStats.location") },
];

const getCarePoints = (t: (key: string) => string) => [
  t("hero.carePoints.modern"),
  t("hero.carePoints.family"),
  t("hero.carePoints.booking"),
];

export default function Hero() {
  const { t } = useLanguage();
  const quickStats = useMemo(() => getQuickStats(t), [t]);
  const carePoints = useMemo(() => getCarePoints(t), [t]);
  const { scrollY } = useScroll();
  const particlesRef = useRef<HTMLDivElement>(null);

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      size: `${3 + Math.random() * 4}px`,
    }));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#e8f2ff_100%)] -z-10" />
      
      {/* ECG Heart Rate Animation */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <motion.path
          d="M0,200 L100,200 L120,200 L140,150 L160,250 L180,100 L200,300 L220,200 L300,200 L400,200 L420,200 L440,150 L460,250 L480,100 L500,300 L520,200 L600,200 L700,200 L720,200 L740,150 L760,250 L780,100 L800,300 L820,200 L900,200 L1000,200 L1020,200 L1040,150 L1060,250 L1080,100 L1100,300 L1120,200 L1200,200"
          fill="none"
          stroke="#1A73E8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-animated"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Particle Animation */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, -10, -40, 0],
              x: [0, 10, -5, 15, 0],
              opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: parseFloat(particle.delay),
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {particles.slice(0, 15).map((particle, i) => (
            <motion.line
              key={`line-${i}`}
              x1={parseFloat(particle.left)}
              y1={parseFloat(particle.top)}
              x2={parseFloat(particles[(i + 1) % particles.length].left)}
              y2={parseFloat(particles[(i + 1) % particles.length].top)}
              stroke="#1A73E8"
              strokeWidth="1"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Background Shapes - Optimized with will-change */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl will-change-transform"
          style={{ animationPlayState: scrollY.get() > 100 ? 'paused' : 'running' }}
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl will-change-transform"
          style={{ animationPlayState: scrollY.get() > 100 ? 'paused' : 'running' }}
        />
      </div>

      {/* Grid Pattern Overlay - Static */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(#1A3A5C 1px, transparent 1px),
            linear-gradient(90deg, #1A3A5C 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="section-shell py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
                className="pulse-button inline-flex items-center justify-center space-x-2 gradient-btn px-7 py-3.5 font-semibold group"
              >
                <span>{t("hero.cta.services")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:0777336633"
                className="inline-flex items-center justify-center gap-2 bg-white/90 text-navy border border-primary-200 px-7 py-3.5 rounded-2xl font-semibold hover:border-primary-500 transition-all duration-200 shadow-soft"
              >
                <PhoneCall className="w-5 h-5 text-primary-600" />
                <span>{t("hero.cta.contact")}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl bg-white/80 border border-slate-200 p-4 shadow-soft hover:shadow-premium transition-all duration-300 cursor-default"
                >
                  <p className="text-2xl font-extrabold text-navy">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {carePoints.map((point, index) => (
                <motion.span
                  key={point}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.95)" }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-slate-200 px-4 py-2 text-sm font-semibold text-gray-700 cursor-default"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </motion.div>
                  {point}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] bg-white border border-slate-200 shadow-[0_32px_80px_-32px_rgba(15,35,56,0.35)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary-600 to-navy" />
              <div className="relative p-5 sm:p-7">
                <div className="flex items-center justify-between text-white mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                      <Image
                        src="/er-med-logo.png"
                        alt="ER Med Clinic"
                        width={44}
                        height={44}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold">ER Med Clinic</p>
                      <p className="text-white/75 text-sm">{t("hero.card.professionalService")}</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-white/80" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                      <Stethoscope className="w-6 h-6 text-primary-700" />
                    </div>
                    <p className="font-bold text-navy">{t("hero.card.consultation")}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {t("hero.card.consultationDesc")}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                      <HeartPulse className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-navy">{t("hero.card.diagnosis")}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {t("hero.card.diagnosisDesc")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-navy text-white p-5">
                  <div className="flex items-start gap-4">
                    <CalendarCheck className="w-7 h-7 text-primary-200 shrink-0" />
                    <div>
                      <p className="font-bold">{t("hero.card.todayContact")}</p>
                      <p className="text-white/75 text-sm mt-1">
                        {t("hero.card.todayContactDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    <a
                      href="tel:0233256633"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-navy px-4 py-3 font-bold"
                    >
                      <PhoneCall className="w-4 h-4" />
                      023 3256633
                    </a>
                    <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-semibold">
                      <Clock3 className="w-4 h-4" />
                      09:00 - 18:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
