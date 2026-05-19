"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import FadeInWhenVisible from "./FadeInWhenVisible";
import DoctorModal from "./DoctorModal";
import { Doctor, getDoctors } from "@/lib/supabase";
import { useLanguage } from "@/app/context/LanguageContext";

const GRADIENT_COLORS = [
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-cyan-400 to-cyan-600",
  "from-orange-400 to-orange-600",
  "from-teal-400 to-teal-600",
  "from-rose-400 to-rose-600",
];

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const data = await getDoctors();
    setDoctors(data);
    setLoading(false);
  };

  const getGradientColor = (index: number) => {
    return GRADIENT_COLORS[index % GRADIENT_COLORS.length];
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return parts[parts.length - 1].charAt(0);
    }
    return name.charAt(0);
  };

  return (
    <section
      id="doctors"
      className="premium-section bg-gradient-to-b from-sand-50 to-white scroll-mt-24"
    >
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-sand-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-sand-200">
              {t("doctors.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              {t("doctors.title")}
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-gray-600 text-lg">
              {t("doctors.description")}
            </p>
          </div>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-navy" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t("doctors.empty")}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor, index) => (
              <FadeInWhenVisible key={doctor.id} delay={index * 0.1}>
                <motion.div
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group glass-card rounded-3xl overflow-hidden border border-sand-200 hover:border-primary-300 hover:shadow-premium cursor-pointer bg-white/80 backdrop-blur-sm"
                >
                  {doctor.image_url ? (
                    <div className="h-56 sm:h-64 overflow-hidden p-4 pb-0">
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-56 sm:h-64 p-4 pb-0">
                      <div
                        className={`h-full w-full rounded-2xl bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center`}
                      >
                        <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {getInitials(doctor.name)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-primary-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {doctor.specialty}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {doctor.bio}
                    </p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        )}
      </div>

      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </section>
  );
}
