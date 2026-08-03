"use client";

import {
  CheckCircle2,
  Shield,
  Microscope,
  HeartHandshake,
  ClipboardCheck,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { useMemo } from "react";

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Shield,
    title: t("about.features.hygiene"),
    description: t("about.features.hygieneDesc"),
  },
  {
    icon: Microscope,
    title: t("about.features.equipment"),
    description: t("about.features.equipmentDesc"),
  },
  {
    icon: HeartHandshake,
    title: t("about.features.patient"),
    description: t("about.features.patientDesc"),
  },
];

const getAdvantages = (t: (key: string) => string) => [
  t("about.advantages.certified"),
  t("about.advantages.booking"),
  t("about.advantages.lab"),
  t("about.advantages.price"),
];

const getAboutItems = (t: (key: string) => string) => [
  { icon: Stethoscope, text: t("about.exam") },
  { icon: Microscope, text: t("about.lab") },
  { icon: ClipboardCheck, text: t("about.treatment") },
];

export default function About() {
  const { t } = useLanguage();
  const features = useMemo(() => getFeatures(t), [t]);
  const advantages = useMemo(() => getAdvantages(t), [t]);
  const aboutItems = useMemo(() => getAboutItems(t), [t]);

  return (
    <section id="about" className="premium-section bg-white scroll-mt-24">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Image */}
          <FadeInWhenVisible direction="left">
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-premium border border-slate-200"
              >
                <div className="h-full p-6 flex flex-col justify-between bg-[linear-gradient(160deg,#ffffff_0%,#f8fafc_48%,#e8f2ff_100%)]">
                  <div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-primary-700"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <HeartPulse className="w-4 h-4" />
                      </motion.div>
                      {t("about.clinicView")}
                    </motion.div>
                    <h3 className="mt-6 text-3xl font-extrabold text-navy">
                      {t("about.slogan")}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {aboutItems.map((item, index) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, x: 5 }}
                        className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/85 border border-slate-200 p-3 sm:p-4 shadow-soft hover:shadow-premium transition-all duration-300 cursor-default"
                      >
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-50 flex items-center justify-center">
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                        </div>
                        <p className="font-semibold text-navy text-xs sm:text-sm">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </FadeInWhenVisible>

          {/* Right - Content */}
          <div>
            <FadeInWhenVisible>
              <span className="inline-block bg-slate-50 text-navy px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-slate-100">
                {t("about.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                {t("about.title")}
              </h2>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                {t("about.description")}
              </p>
            </FadeInWhenVisible>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {features.map((feature, index) => (
                <FadeInWhenVisible key={feature.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors bg-slate-50/70 hover:shadow-premium cursor-default card-hover"
                  >
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft"
                    >
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-navy stroke-[1.7]" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-navy mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Advantages List */}
            <FadeInWhenVisible delay={0.4}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-5"
              >
                <h3 className="font-bold text-navy mb-4">{t("about.advantages.title")}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {advantages.map((advantage, index) => (
                    <motion.div
                      key={advantage}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2 cursor-default"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700 text-sm">{advantage}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
