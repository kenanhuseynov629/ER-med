"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Apple,
  Baby,
  Badge,
  Bone,
  Brain,
  Clipboard,
  Ear,
  Eye,
  FlaskConical,
  HeartPulse,
  Loader2,
  LucideIcon,
  Microscope,
  Pill,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
} from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { Department, getDepartments } from "@/lib/supabase";
import { useLanguage } from "@/app/context/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  HeartPulse,
  Brain,
  Baby,
  Eye,
  Bone,
  Microscope,
  Activity,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
  Badge,
  Ear,
  Smile,
  Scissors,
  FlaskConical,
  Apple,
  Clipboard,
  Sparkles,
};

const DEFAULT_ICON = Stethoscope;

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    const data = await getDepartments();
    setDepartments(data);
    setLoading(false);
  };

  const getIconComponent = (iconName: string): LucideIcon => {
    return ICON_MAP[iconName] || DEFAULT_ICON;
  };

  return (
    <section id="departments" className="premium-section bg-white scroll-mt-24">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-primary-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-primary-100">
              {t("departments.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              {t("departments.title")}
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-gray-600 text-lg">
              {t("departments.description")}
            </p>
          </div>
        </FadeInWhenVisible>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-navy" />
          </div>
        ) : departments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t("departments.empty")}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {departments.map((dept, index) => {
              const IconComponent = getIconComponent(dept.icon);
              return (
                <FadeInWhenVisible key={dept.id} delay={index * 0.1}>
                  <div className="group h-full rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 stroke-[1.7] text-primary-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {dept.description}
                    </p>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
