"use client";

import { motion } from "framer-motion";
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

const quickStats = [
  { value: "09:00", label: "qəbul başlanır" },
  { value: "6 gün", label: "iş qrafiki" },
  { value: "Xaçmaz", label: "ünvan" },
];

const carePoints = [
  "Müasir diaqnostika",
  "Ailə həkimi yanaşması",
  "Rahat qəbul sistemi",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#e8f2ff_100%)] -z-10" />
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
              ER Med Clinic - Xaçmaz
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              Sağlamlığınız üçün{" "}
              <span className="text-primary-600">etibarlı klinika</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              ER Med Clinic müasir diaqnostika, təcrübəli həkim heyəti və
              pasiyentə diqqətli yanaşma ilə ailənizin sağlamlığının yanında
              dayanır.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#departments"
                className="inline-flex items-center justify-center space-x-2 gradient-btn px-7 py-3.5 font-semibold group"
              >
                <span>Xidmətlərə baxın</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:0777336633"
                className="inline-flex items-center justify-center gap-2 bg-white/90 text-navy border border-primary-200 px-7 py-3.5 rounded-2xl font-semibold hover:border-primary-500 transition-all duration-200 shadow-soft"
              >
                <PhoneCall className="w-5 h-5 text-primary-600" />
                <span>Qəbula yazılın</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/80 border border-slate-200 p-4 shadow-soft"
                >
                  <p className="text-2xl font-extrabold text-navy">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {carePoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-slate-200 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {point}
                </span>
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
                      <p className="text-white/75 text-sm">Peşəkar tibbi xidmət</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-white/80" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                      <Stethoscope className="w-6 h-6 text-primary-700" />
                    </div>
                    <p className="font-bold text-navy">Həkim konsultasiyası</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Admin paneldə aktiv olan həkim və şöbələr üzrə qəbul.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                      <HeartPulse className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-navy">Diaqnostika</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Müayinə, laborator analiz və fərdi müalicə planı.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-navy text-white p-5">
                  <div className="flex items-start gap-4">
                    <CalendarCheck className="w-7 h-7 text-primary-200 shrink-0" />
                    <div>
                      <p className="font-bold">Bu gün qəbul üçün əlaqə</p>
                      <p className="text-white/75 text-sm mt-1">
                        Növbə və həkim seçimi üçün klinika ilə birbaşa danışın.
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
