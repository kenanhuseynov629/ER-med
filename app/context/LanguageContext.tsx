"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "az" | "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const az = {
  "nav.home": "Ana səhifə",
  "nav.departments": "Şöbələr",
  "nav.doctors": "Həkimlər",
  "nav.about": "Haqqımızda",
  "nav.contact": "Əlaqə",

  "hero.badge": "ER Med Clinic - Xaçmaz",
  "hero.title": "Sağlamlığınız üçün",
  "hero.titleHighlight": "etibarlı klinika",
  "hero.description":
    "Müasir diaqnostika, təcrübəli həkim heyəti və pasiyentə diqqətli yanaşma ilə ailənizin sağlamlığının yanında dayanırıq.",
  "hero.cta.services": "Xidmətlərə baxın",
  "hero.cta.contact": "Qəbula yazılın",
  "hero.trust.patients": "Minlərlə",
  "hero.trust.satisfied": "məmnun pasiyent",
  "hero.card.certified": "Sertifikatlı",
  "hero.card.doctors": "həkimlər",
  "hero.image.clinic": "Müasir klinika",
  "hero.image.service": "Peşəkar tibbi xidmət",

  "about.badge": "Haqqımızda",
  "about.title": "Niyə ER Med Clinic?",
  "about.description":
    "Klinikamız pasiyentlərin sağlamlığını diqqətlə qorumaq üçün müasir avadanlıq, təcrübəli həkimlər və rahat qəbul sistemi ilə xidmət göstərir.",
  "about.features.hygiene": "Yüksək gigiyena standartları",
  "about.features.hygieneDesc":
    "Klinikada təhlükəsizlik, təmizlik və pasiyent rahatlığı gündəlik iş prinsipidir.",
  "about.features.equipment": "Müasir avadanlıqlar",
  "about.features.equipmentDesc":
    "Diaqnostika və müalicə prosesində dəqiq nəticəyə yönəlmiş avadanlıqlardan istifadə olunur.",
  "about.features.patient": "Pasiyent mərkəzli yanaşma",
  "about.features.patientDesc":
    "Hər pasiyentin şikayəti dinlənilir, nəticələr aydın izah olunur və fərdi plan qurulur.",
  "about.advantages.title": "Üstünlüklərimiz",
  "about.advantages.certified": "Təcrübəli həkim heyəti",
  "about.advantages.booking": "Rahat qəbul sistemi",
  "about.advantages.lab": "Operativ laborator nəticələr",
  "about.advantages.price": "Münasib qiymət siyasəti",
  "about.clinicName": "ER Med Clinic",
  "about.clinicSlogan": "Peşəkar tibbi xidmət və pasiyentə diqqətli yanaşma",

  "departments.badge": "Tibbi şöbələr",
  "departments.title": "Xidmət göstərdiyimiz istiqamətlər",
  "departments.description":
    "Hər istiqamətdə diqqətli müayinə, izahlı konsultasiya və peşəkar yönləndirmə təqdim olunur.",
  "departments.loading": "Yüklənir...",
  "departments.empty": "Hələ heç bir şöbə əlavə edilməyib",

  "doctors.badge": "Həkim heyəti",
  "doctors.title": "Peşəkar həkimlərimiz",
  "doctors.description":
    "Təcrübəli həkimlərimiz dəqiq müayinə, düzgün diaqnoz və pasiyentə aydın izah prinsipi ilə çalışır.",
  "doctors.loading": "Yüklənir...",
  "doctors.empty": "Hələ heç bir həkim əlavə edilməyib",

  "contact.badge": "Əlaqə",
  "contact.title": "Bizimlə əlaqə saxlayın",
  "contact.description":
    "Qəbul, konsultasiya və ünvan məlumatları üçün klinika ilə birbaşa əlaqə saxlayın.",
  "contact.address": "Ünvan",
  "contact.addressDetail": "Xaçmaz şəhəri, Hacı Zeynalabdin Tağıyev küçəsi 88",
  "contact.addressNear": "(8 N-li məktəbin yaxınlığı)",
  "contact.phone": "Telefon",
  "contact.email": "E-poçt",
  "contact.hours": "İş saatları",
  "contact.hoursWeekday": "Həftə içi: 09:00 - 18:00",
  "contact.hoursSaturday": "Şənbə: 09:00 - 15:00",
  "contact.hoursSunday": "Bazar: istirahət",
  "contact.social": "Sosial media",

  "footer.about": "Haqqımızda",
  "footer.about.clinic": "Klinika",
  "footer.about.doctors": "Həkimlər",
  "footer.about.career": "Karyera",
  "footer.about.news": "Xəbərlər",
  "footer.services": "Xidmətlər",
  "footer.support": "Dəstək",
  "footer.support.contact": "Əlaqə",
  "footer.support.faq": "FAQ",
  "footer.support.privacy": "Gizlilik siyasəti",
  "footer.support.terms": "İstifadə şərtləri",
  "footer.description":
    "ER Med Clinic ailənizin sağlamlığı üçün müasir, səliqəli və peşəkar tibbi xidmət təqdim edir.",
  "footer.copyright": "© {year} ER Med Clinic. Bütün hüquqlar qorunur.",
  "footer.developed": "Hazırladı",
};

const en: typeof az = {
  ...az,
  "nav.home": "Home",
  "nav.departments": "Departments",
  "nav.doctors": "Doctors",
  "nav.about": "About",
  "nav.contact": "Contact",
  "hero.badge": "ER Med Clinic - Khachmaz",
  "hero.title": "Reliable care for",
  "hero.titleHighlight": "your health",
  "hero.description":
    "Modern diagnostics, experienced doctors, and attentive patient care for your family.",
  "hero.cta.services": "View services",
  "hero.cta.contact": "Book a visit",
  "departments.badge": "Medical departments",
  "departments.title": "Our medical directions",
  "departments.description":
    "Careful examination, clear consultation, and professional guidance in every direction.",
  "doctors.badge": "Medical team",
  "doctors.title": "Our professional doctors",
  "doctors.description":
    "Experienced doctors focused on accurate examination, clear diagnosis, and understandable guidance.",
  "about.badge": "About",
  "about.title": "Why ER Med Clinic?",
  "contact.badge": "Contact",
  "contact.title": "Contact us",
  "contact.description": "Call the clinic directly for appointments, consultations, and location details.",
  "footer.about": "About",
  "footer.services": "Services",
  "footer.support": "Support",
  "footer.support.contact": "Contact",
  "footer.description":
    "ER Med Clinic provides modern, organized, and professional medical care for your family.",
  "footer.copyright": "© {year} ER Med Clinic. All rights reserved.",
  "footer.developed": "Developed by",
};

const ru: typeof az = {
  ...az,
  "nav.home": "Главная",
  "nav.departments": "Отделения",
  "nav.doctors": "Врачи",
  "nav.about": "О нас",
  "nav.contact": "Контакты",
  "hero.badge": "ER Med Clinic - Хачмаз",
  "hero.title": "Надежная клиника",
  "hero.titleHighlight": "для вашего здоровья",
  "hero.description":
    "Современная диагностика, опытные врачи и внимательный подход к пациенту для всей семьи.",
  "hero.cta.services": "Посмотреть услуги",
  "hero.cta.contact": "Записаться",
  "departments.badge": "Медицинские отделения",
  "departments.title": "Наши направления",
  "departments.description":
    "В каждом направлении доступны внимательный осмотр, понятная консультация и профессиональная помощь.",
  "doctors.badge": "Команда врачей",
  "doctors.title": "Наши профессиональные врачи",
  "doctors.description":
    "Опытные врачи работают с фокусом на точный осмотр, диагноз и понятные рекомендации.",
  "about.badge": "О нас",
  "about.title": "Почему ER Med Clinic?",
  "contact.badge": "Контакты",
  "contact.title": "Свяжитесь с нами",
  "contact.description": "Свяжитесь с клиникой для записи, консультаций и уточнения адреса.",
  "footer.about": "О нас",
  "footer.services": "Услуги",
  "footer.support": "Поддержка",
  "footer.support.contact": "Контакты",
  "footer.description":
    "ER Med Clinic предоставляет современную и профессиональную медицинскую помощь для вашей семьи.",
  "footer.copyright": "© {year} ER Med Clinic. Все права защищены.",
  "footer.developed": "Разработал",
};

const translations = { az, en, ru };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("az");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && ["az", "en", "ru"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof az] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export type { Language };
