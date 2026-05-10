"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Briefcase, Phone, ChevronDown } from "lucide-react";
import { Doctor } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

interface DoctorModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

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

// Helper to get initials from name
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length > 1) {
    return parts[parts.length - 1].charAt(0);
  }
  return name.charAt(0);
};

export default function DoctorModal({ doctor, isOpen, onClose }: DoctorModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isBioExpanded, setIsBioExpanded] = useState(true);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!doctor) return null;

  // Get random gradient based on doctor id
  const gradientIndex = doctor.id.charCodeAt(0) % GRADIENT_COLORS.length;
  const gradientColor = GRADIENT_COLORS[gradientIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-black/40"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Doctor Image Section */}
            <div className="relative h-72 md:h-80">
              {doctor.image_url ? (
                <img
                  src={doctor.image_url}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">
                      {getInitials(doctor.name)}
                    </span>
                  </div>
                </div>
              )}
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Content */}
            <div className="px-8 pb-8 -mt-16 relative">
              {/* Name and Specialty */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2">
                  {doctor.name}
                </h2>
                <p className="text-xl text-primary-600 font-medium">
                  {doctor.specialty}
                </p>
              </div>

              {/* Bio with 3D Flip Animation - Auto opens when modal opens */}
              {doctor.bio && (
                <div className="mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-gray-900">Haqqında</h3>
                  </div>
                  <div className="relative mt-3" style={{ perspective: "1000px" }}>
                    <motion.div
                      initial={{
                        opacity: 0,
                        rotateX: -90,
                        transformOrigin: "top center"
                      }}
                      animate={{
                        opacity: 1,
                        rotateX: 0,
                        transformOrigin: "top center"
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="bg-gradient-to-br from-sand-50 to-white rounded-2xl p-5 border border-sand-100 shadow-sm"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {doctor.bio}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Education & Experience Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Education */}
                {doctor.education && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-sand-50 rounded-2xl p-5 border border-sand-100"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Təhsil</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {doctor.education}
                    </p>
                  </motion.div>
                )}

                {/* Experience */}
                {doctor.experience && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-sand-50 rounded-2xl p-5 border border-sand-100"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Təcrübə</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {doctor.experience}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* CTA Button */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sand-100 hover:bg-sand-200 text-navy font-semibold rounded-xl transition-all duration-200 hover:shadow-md">
                <Phone className="w-5 h-5" />
                Əlaqə
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
