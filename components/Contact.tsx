"use client";

import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Instagram,
} from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const contactInfo = [
  {
    icon: MapPin,
    title: "Ünvan",
    content: "Xaçmaz şəhəri, Hacı Zeynalabdin Tağıyev küçəsi 88",
    subContent: "(8 N-li məktəbin yaxınlığı)",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "023 3256633",
    subContent: "077 7336633",
  },
  {
    icon: Mail,
    title: "E-poçt",
    content: "ermedicalmmc@gmail.com",
  },
  {
    icon: Clock,
    title: "İş Saatları",
    content: "Həftə içi: 09:00 - 18:00",
    subContent: "Şənbə: 09:00 - 15:00 | Bazar: İstirahət",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/ermed_klinik/",
    label: "Instagram",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="premium-section bg-gradient-to-b from-sand-50 to-white">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-sand-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-sand-200">
              Əlaqə
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Bizimlə Əlaqə Saxlayın
            </h2>
            <p className="text-gray-600 text-lg">
              Suallarınız və ya müraciətləriniz üçün bizimlə əlaqə saxlayın
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, index) => (
              <FadeInWhenVisible key={item.title} delay={index * 0.1}>
                <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/90 border border-sand-200 shadow-soft hover:shadow-premium transition-all duration-300">
                  <div className="w-10 h-10 bg-sand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-700 stroke-[1.7]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                    <p className="text-gray-700">{item.content}</p>
                    {item.subContent && (
                      <p className="text-gray-600 text-sm mt-1">
                        {item.subContent}
                      </p>
                    )}
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}

            {/* Social Links */}
            <FadeInWhenVisible delay={0.4}>
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-bold text-navy mb-4">Sosial Media</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-11 h-11 bg-white rounded-full border border-sand-200 flex items-center justify-center text-primary-700 hover:bg-primary-500 hover:text-white transition-all duration-200 shadow-soft"
                    >
                      <social.icon className="w-5 h-5 stroke-[1.7]" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Google Maps */}
          <FadeInWhenVisible delay={0.2} className="lg:col-span-3">
            <div className="h-full min-h-[320px] rounded-3xl overflow-hidden shadow-premium border border-white/80">
              <iframe
                src="https://www.google.com/maps?q=41.45999705001357,48.7884572817162&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ER Med Klinika - Xaçmaz"
                className="rounded-2xl"
              />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
