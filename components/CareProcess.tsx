"use client";

import { CalendarCheck, ClipboardList, HeartHandshake, PhoneCall } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const steps = [
  {
    icon: PhoneCall,
    title: "Əlaqə və qeydiyyat",
    description: "Klinika ilə əlaqə saxlayın, uyğun həkim və qəbul vaxtı seçilsin.",
  },
  {
    icon: ClipboardList,
    title: "Müayinə",
    description: "Şikayətləriniz dinlənilir, ilkin baxış və lazımi analizlər təyin edilir.",
  },
  {
    icon: HeartHandshake,
    title: "Müalicə planı",
    description: "Həkim nəticələri izah edir və sizin üçün aydın müalicə planı hazırlayır.",
  },
  {
    icon: CalendarCheck,
    title: "Nəzarət",
    description: "Təkrar baxış və nəticələrin izlənməsi ilə proses diqqətdə saxlanılır.",
  },
];

export default function CareProcess() {
  return (
    <section className="premium-section bg-white">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="max-w-3xl mb-12">
            <span className="inline-block bg-primary-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-primary-100">
              Qəbul prosesi
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Klinikaya müraciət sadə və aydındır
            </h2>
            <p className="text-gray-600 text-lg">
              Pasiyentin vaxtına hörmət edən, izahlı və rahat tibbi xidmət modeli.
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
