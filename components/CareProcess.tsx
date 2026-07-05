"use client";

import { CalendarCheck, ClipboardList, HeartHandshake, PhoneCall } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { useLanguage } from "@/app/context/LanguageContext";

const getSteps = (t: (key: string) => string) => [
  {
    icon: PhoneCall,
    title: t("careProcess.step1.title"),
    description: t("careProcess.step1.desc"),
  },
  {
    icon: ClipboardList,
    title: t("careProcess.step2.title"),
    description: t("careProcess.step2.desc"),
  },
  {
    icon: HeartHandshake,
    title: t("careProcess.step3.title"),
    description: t("careProcess.step3.desc"),
  },
  {
    icon: CalendarCheck,
    title: t("careProcess.step4.title"),
    description: t("careProcess.step4.desc"),
  },
];

export default function CareProcess() {
  const { t } = useLanguage();
  const steps = getSteps(t);
  return (
    <section className="premium-section bg-white">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="max-w-3xl mb-12">
            <span className="inline-block bg-primary-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-primary-100">
              {t("careProcess.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              {t("careProcess.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("careProcess.description")}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <FadeInWhenVisible key={step.title} delay={index * 0.08}>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-700 stroke-[1.7]" />
                  </div>
                  <span className="text-sm font-extrabold text-primary-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
