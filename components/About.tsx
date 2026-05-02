"use client";

import {
  CheckCircle2,
  Shield,
  Microscope,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const features = [
  {
    icon: Shield,
    title: "Yüksək Gigiyena Standartları",
    description:
      "Klinikamız beynəlxalq gigiyena və təhlükəsizlik standartlarına tam uyğun fəaliyyət göstərir.",
  },
  {
    icon: Microscope,
    title: "Müasir Avadanlıqlar",
    description:
      "Ən son texnologiyalarla təchiz edilmiş diaqnostika və müalicə avadanlıqlarımız mövcuddur.",
  },
  {
    icon: HeartHandshake,
    title: "Pasiyent Mərkəzli Yanaşma",
    description:
      "Hər bir pasiyentimizə fərdi yanaşma və xüsusi diqqət yetiririk.",
  },
];

const advantages = [
  "Sertifikatlı həkim heyəti",
  "Rahat qəbul sistemi",
  "Sürətli laboratoriya nəticələri",
  "Münasib qiymət siyasəti",
];

export default function About() {
  return (
    <section id="about" className="premium-section bg-white">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Image */}
          <FadeInWhenVisible direction="left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-primary-200 shadow-premium border border-white/80 flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="w-24 h-24 text-navy mx-auto mb-6" />
                  <p className="text-2xl font-bold text-navy mb-4">
                    ER Med Clinic
                  </p>
                  <p className="text-gray-600">
                    Peşəkar tibbi xidmət və minlərlə məmnun pasiyent
                  </p>
                </div>
              </div>

            </div>
          </FadeInWhenVisible>

          {/* Right - Content */}
          <div>
            <FadeInWhenVisible>
              <span className="inline-block bg-slate-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-slate-100">
                Haqqımızda
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                Niyə ER Med Clinic?
              </h2>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                Pasiyentlərimizin sağlamlığını qoruyuruq. Müasir tibbi
                avadanlıqlar, peşəkar həkim heyəti və pasiyent mərkəzli
                yanaşmamızla fərqlilirik.
              </p>
            </FadeInWhenVisible>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <FadeInWhenVisible key={feature.title} delay={index * 0.1}>
                  <div className="flex items-start space-x-4 p-4 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors bg-slate-50/70">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                      <feature.icon className="w-6 h-6 text-navy stroke-[1.7]" />
                    </div>
                    <div>
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
                <h3 className="font-bold text-navy mb-4">Üstünlüklərimiz</h3>
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
