"use client";

import { CalendarDays, Clock3, MapPin } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const stats = [
  {
    icon: Clock3,
    number: "09:00",
    label: "Qəbul başlanır",
    description: "Həftə içi klinika qəbulu",
  },
  {
    icon: CalendarDays,
    number: "6 gün",
    label: "İş qrafiki",
    description: "Həftə içi və şənbə günü xidmət",
  },
  {
    icon: MapPin,
    number: "Xaçmaz",
    label: "Ünvan",
    description: "H. Z. Tağıyev küçəsi 88",
  },
];

export default function Stats() {
  return (
    <section className="py-10 bg-white">
      <div className="section-shell">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <FadeInWhenVisible key={stat.label} delay={index * 0.1}>
              <div className="text-center h-full rounded-3xl p-8 bg-slate-50 border border-slate-200 shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-3 shadow-soft">
                  <stat.icon className="w-6 h-6 text-primary-700 stroke-[1.7]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-navy mb-1">
                  {stat.number}
                </p>
                <p className="text-lg font-semibold text-navy/90 mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
