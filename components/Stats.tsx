"use client";

import { CalendarDays, Clock3, MapPin } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

const getStats = (t: (key: string) => string) => [
  {
    icon: Clock3,
    number: "09:00",
    label: t("stats.start"),
    description: t("stats.startDesc"),
  },
  {
    icon: CalendarDays,
    number: "6 gün",
    label: t("stats.schedule"),
    description: t("stats.scheduleDesc"),
  },
  {
    icon: MapPin,
    number: "Xaçmaz",
    label: t("stats.location"),
    description: t("stats.locationDesc"),
  },
];

export default function Stats() {
  const { t } = useLanguage();
  const stats = getStats(t);
  return (
    <section className="py-10 bg-white">
      <div className="section-shell">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <FadeInWhenVisible key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="text-center h-full rounded-3xl p-8 bg-slate-50 border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 cursor-default"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-3 shadow-soft"
                >
                  <stat.icon className="w-6 h-6 text-primary-700 stroke-[1.7]" />
                </motion.div>
                <motion.p 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-navy mb-1"
                >
                  {stat.number}
                </motion.p>
                <p className="text-lg font-semibold text-navy/90 mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
