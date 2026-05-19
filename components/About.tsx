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

export default function About() {
  const { t } = useLanguage();
  const features = getFeatures(t);
  const advantages = getAdvantages(t);

  return (
    <section id="about" className="premium-section bg-white scroll-mt-24">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Image */}
          <FadeInWhenVisible direction="left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-premium border border-slate-200">
                <div className="h-full p-6 flex flex-col justify-between bg-[linear-gradient(160deg,#ffffff_0%,#f8fafc_48%,#e8f2ff_100%)]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-4 py-2 text-sm font-bold text-primary-700">
                      <HeartPulse className="w-4 h-4" />
                      Klinik baxış
                    </div>
                    <h3 className="mt-6 text-3xl font-extrabold text-navy">
                      Dəqiq diaqnoz, aydın izah, düzgün yönləndirmə.
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: Stethoscope, text: "İlkin müayinə və həkim konsultasiyası" },
                      { icon: Microscope, text: "Laborator analiz və diaqnostik dəstək" },
                      { icon: ClipboardCheck, text: "Müalicə planı və təkrar nəzarət" },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-3 rounded-2xl bg-white/85 border border-slate-200 p-4 shadow-soft"
                      >
                        <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary-700" />
                        </div>
                        <p className="font-semibold text-navy text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </FadeInWhenVisible>

          {/* Right - Content */}
          <div>
            <FadeInWhenVisible>
              <span className="inline-block bg-slate-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-slate-100">
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
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <FadeInWhenVisible key={feature.title} delay={index * 0.1}>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors bg-slate-50/70">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                      <feature.icon className="w-6 h-6 text-navy stroke-[1.7]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-navy mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Advantages List */}
            <FadeInWhenVisible delay={0.4}>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-navy mb-4">{t("about.advantages.title")}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {advantages.map((advantage) => (
                    <div
                      key={advantage}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
