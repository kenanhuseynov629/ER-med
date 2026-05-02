"use client";

import { Building2, Users } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const stats = [
  {
    icon: Building2,
    number: "20+",
    label: "Şöbə",
    description: "Mütəxəssis tibbi şöbələr",
  },
  {
    icon: Users,
    number: "50+",
    label: "Həkim",
    description: "Peşəkar həkim heyəti",
  },
];

export default function Stats() {
  return (
    <section className="py-10 bg-white">
      <div className="section-shell">
        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <FadeInWhenVisible key={stat.label} delay={index * 0.1}>
              <div className="text-center glass-card rounded-3xl p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-navy stroke-[1.7]" />
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
