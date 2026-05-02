"use client";

import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Loader2 } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { Doctor, getDoctors } from "@/lib/supabase";

// Fallback colors for doctors without images
const GRADIENT_COLORS = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
  "from-pink-400 to-pink-600",
  "from-cyan-400 to-cyan-600",
  "from-orange-400 to-orange-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
];

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const data = await getDoctors();
    setDoctors(data);
    setLoading(false);
  };

  // Helper to get gradient color for doctor
  const getGradientColor = (index: number) => {
    return GRADIENT_COLORS[index % GRADIENT_COLORS.length];
  };

  // Helper to get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return parts[parts.length - 1].charAt(0);
    }
    return name.charAt(0);
  };

  return (
    <section id="doctors" className="premium-section bg-gradient-to-b from-sand-50 to-white">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-sand-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-sand-200">
              Həkim Heyəti
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Peşəkar Həkimlərimiz
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-gray-600 text-lg">
              Təcrübəli və sertifikatlı həkimlərimiz sizin sağlamlığınız üçün
              çalışır
            </p>
          </div>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-navy" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Hələ heç bir həkim əlavə edilməyib
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <FadeInWhenVisible key={doctor.id} delay={index * 0.1}>
                <div className="group glass-card rounded-3xl overflow-hidden border border-sand-200 hover:border-primary-300 hover:shadow-premium hover:scale-[1.02] transition-all duration-300">
                  {/* Doctor Image */}
                  {doctor.image_url ? (
                    <div className="h-64 overflow-hidden p-4 pb-0">
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-64 p-4 pb-0">
                      <div className={`h-full w-full rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center`}>
                      <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {getInitials(doctor.name)}
                        </span>
                      </div>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {doctor.specialty}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {doctor.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="w-9 h-9 bg-sand-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white hover:shadow-md transition-all duration-200"
                      >
                        <Facebook className="w-4 h-4 stroke-[1.7]" />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-sand-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white hover:shadow-md transition-all duration-200"
                      >
                        <Instagram className="w-4 h-4 stroke-[1.7]" />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-sand-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white hover:shadow-md transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4 stroke-[1.7]" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
