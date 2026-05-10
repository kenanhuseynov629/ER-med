"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "az" | "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  az: {
    // Navigation
    "nav.home": "Ana səhifə",
    "nav.departments": "Şöbələr",
    "nav.doctors": "Həkimlər",
    "nav.about": "Haqqımızda",
    "nav.contact": "Əlaqə",

    // Hero
    "hero.badge": "PREMIUM CARE EXPERIENCE",
    "hero.title": "Sağlamlığınız",
    "hero.titleHighlight": "Bizim Prioritetimizdir",
    "hero.description": "Peşəkar həkimlərimiz və müasir tibbi avadanlıqlarımızla sizin və ailənizin sağlamlığını qoruyuruq. Yüksək keyfiyyətli tibbi xidmət üçün bizə etibar edin.",
    "hero.cta.services": "Xidmətlərimizlə tanış olun",
    "hero.cta.contact": "Əlaqə",
    "hero.trust.patients": "Minlərlə",
    "hero.trust.satisfied": "Məmnun pasiyent",
    "hero.card.certified": "Sertifikatlı",
    "hero.card.doctors": "Həkimlər",
    "hero.image.clinic": "Müasir Klinika",
    "hero.image.service": "Yüksək keyfiyyətli tibbi xidmət",

    // Footer
    "footer.about": "Haqqımızda",
    "footer.about.clinic": "Klinika",
    "footer.about.doctors": "Həkimlər",
    "footer.about.career": "Karyera",
    "footer.about.news": "Xəbərlər",
    "footer.services": "Xidmətlər",
    "footer.support": "Dəstək",
    "footer.support.contact": "Əlaqə",
    "footer.support.faq": "FAQ",
    "footer.support.privacy": "Gizlilik Siyasəti",
    "footer.support.terms": "İstifadə Şərtləri",
    "footer.description": "Sizin və ailənizin sağlamlığını qoruyuruq. Müasir tibbi avadanlıqlar və peşəkar həkim heyəti ilə xidmətinizdəyik.",
    "footer.copyright": "© {year} ER Med Clinic. Bütün hüquqlar qorunur.",
    "footer.developed": "Hazırladı",

    // About Section
    "about.badge": "Haqqımızda",
    "about.title": "Niyə ER Med Clinic?",
    "about.description": "Pasiyentlərimizin sağlamlığını qoruyuruq. Müasir tibbi avadanlıqlar, peşəkar həkim heyəti və pasiyent mərkəzli yanaşmamızla fərqlilirik.",
    "about.features.hygiene": "Yüksək Gigiyena Standartları",
    "about.features.hygieneDesc": "Klinikamız beynəlxalq gigiyena və təhlükəsizlik standartlarına tam uyğun fəaliyyət göstərir.",
    "about.features.equipment": "Müasir Avadanlıqlar",
    "about.features.equipmentDesc": "Ən son texnologiyalarla təchiz edilmiş diaqnostika və müalicə avadanlıqlarımız mövcuddur.",
    "about.features.patient": "Pasiyent Mərkəzli Yanaşma",
    "about.features.patientDesc": "Hər bir pasiyentimizə fərdi yanaşma və xüsusi diqqət yetiririk.",
    "about.advantages.title": "Üstünlüklərimiz",
    "about.advantages.certified": "Sertifikatlı həkim heyəti",
    "about.advantages.booking": "Rahat qəbul sistemi",
    "about.advantages.lab": "Sürətli laboratoriya nəticələri",
    "about.advantages.price": "Münasib qiymət siyasəti",
    "about.clinicName": "ER Med Clinic",
    "about.clinicSlogan": "Peşəkar tibbi xidmət və minlərlə məmnun pasiyent",

    // Departments Section
    "departments.badge": "Tibbi Şöbələr",
    "departments.title": "Xidmət Göstərdiyimiz Şöbələr",
    "departments.description": "Hər bir şöbəmizdə peşəkar həkimlər və müasir avadanlıqlarla xidmətinizdəyik",
    "departments.loading": "Yüklənir...",
    "departments.empty": "Hələ heç bir şöbə əlavə edilməyib",

    // Doctors Section
    "doctors.badge": "Həkim Heyəti",
    "doctors.title": "Peşəkar Həkimlərimiz",
    "doctors.description": "Təcrübəli və sertifikatlı həkimlərimiz sizin sağlamlığınız üçün çalışır",
    "doctors.loading": "Yüklənir...",
    "doctors.empty": "Hələ heç bir həkim əlavə edilməyib",

    // Contact Section
    "contact.badge": "Əlaqə",
    "contact.title": "Bizimlə Əlaqə Saxlayın",
    "contact.description": "Suallarınız və ya müraciətləriniz üçün bizimlə əlaqə saxlayın",
    "contact.address": "Ünvan",
    "contact.addressDetail": "Xaçmaz şəhəri, Hacı Zeynalabdin Tağıyev küçəsi 88",
    "contact.addressNear": "(8 N-li məktəbin yaxınlığı)",
    "contact.phone": "Telefon",
    "contact.email": "E-poçt",
    "contact.hours": "İş Saatları",
    "contact.hoursWeekday": "Həftə içi: 09:00 - 18:00",
    "contact.hoursSaturday": "Şənbə: 09:00 - 15:00",
    "contact.hoursSunday": "Bazar: İstirahət",
    "contact.social": "Sosial Media",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.departments": "Departments",
    "nav.doctors": "Doctors",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "PREMIUM CARE EXPERIENCE",
    "hero.title": "Your Health is Our",
    "hero.titleHighlight": "Top Priority",
    "hero.description": "We protect the health of you and your family with our professional doctors and modern medical equipment. Trust us for high-quality medical service.",
    "hero.cta.services": "Explore Our Services",
    "hero.cta.contact": "Contact",
    "hero.trust.patients": "Thousands of",
    "hero.trust.satisfied": "Satisfied patients",
    "hero.card.certified": "Certified",
    "hero.card.doctors": "Doctors",
    "hero.image.clinic": "Modern Clinic",
    "hero.image.service": "High-quality medical service",

    // Footer
    "footer.about": "About",
    "footer.about.clinic": "Clinic",
    "footer.about.doctors": "Doctors",
    "footer.about.career": "Career",
    "footer.about.news": "News",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.support.contact": "Contact",
    "footer.support.faq": "FAQ",
    "footer.support.privacy": "Privacy Policy",
    "footer.support.terms": "Terms of Use",
    "footer.description": "We protect the health of you and your family. At your service with modern medical equipment and professional doctors.",
    "footer.copyright": "© {year} ER Med Clinic. All rights reserved.",
    "footer.developed": "Developed by",

    // About Section
    "about.badge": "About",
    "about.title": "Why ER Med Clinic?",
    "about.description": "We protect the health of our patients. We stand out with modern medical equipment, professional doctors and patient-centered approach.",
    "about.features.hygiene": "High Hygiene Standards",
    "about.features.hygieneDesc": "Our clinic operates in full compliance with international hygiene and safety standards.",
    "about.features.equipment": "Modern Equipment",
    "about.features.equipmentDesc": "We have diagnostic and treatment equipment equipped with the latest technologies.",
    "about.features.patient": "Patient-Centered Approach",
    "about.features.patientDesc": "We provide individual approach and special attention to each of our patients.",
    "about.advantages.title": "Our Advantages",
    "about.advantages.certified": "Certified doctors",
    "about.advantages.booking": "Easy booking system",
    "about.advantages.lab": "Fast laboratory results",
    "about.advantages.price": "Affordable pricing policy",
    "about.clinicName": "ER Med Clinic",
    "about.clinicSlogan": "Professional medical service and thousands of satisfied patients",

    // Departments Section
    "departments.badge": "Medical Departments",
    "departments.title": "Departments We Serve",
    "departments.description": "In each department, we are at your service with professional doctors and modern equipment",
    "departments.loading": "Loading...",
    "departments.empty": "No departments added yet",

    // Doctors Section
    "doctors.badge": "Medical Team",
    "doctors.title": "Our Professional Doctors",
    "doctors.description": "Our experienced and certified doctors work for your health",
    "doctors.loading": "Loading...",
    "doctors.empty": "No doctors added yet",

    // Contact Section
    "contact.badge": "Contact",
    "contact.title": "Contact Us",
    "contact.description": "Contact us for your questions or inquiries",
    "contact.address": "Address",
    "contact.addressDetail": "Khachmaz city, Haji Zeynalabdin Taghiyev street 88",
    "contact.addressNear": "(Near School No. 8)",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Working Hours",
    "contact.hoursWeekday": "Weekdays: 09:00 - 18:00",
    "contact.hoursSaturday": "Saturday: 09:00 - 15:00",
    "contact.hoursSunday": "Sunday: Closed",
    "contact.social": "Social Media",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.departments": "Отделения",
    "nav.doctors": "Врачи",
    "nav.about": "О нас",
    "nav.contact": "Контакты",

    // Hero
    "hero.badge": "ПРЕМИУМ УХОД",
    "hero.title": "Ваше здоровье — наш",
    "hero.titleHighlight": "главный приоритет",
    "hero.description": "Мы защищаем здоровье вас и вашей семьи с помощью наших профессиональных врачей и современного медицинского оборудования. Доверьте нам высококачественное медицинское обслуживание.",
    "hero.cta.services": "Наши услуги",
    "hero.cta.contact": "Контакты",
    "hero.trust.patients": "Тысячи",
    "hero.trust.satisfied": "Довольных пациентов",
    "hero.card.certified": "Сертифицированные",
    "hero.card.doctors": "Врачи",
    "hero.image.clinic": "Современная клиника",
    "hero.image.service": "Высококачественное медицинское обслуживание",

    // Footer
    "footer.about": "О нас",
    "footer.about.clinic": "Клиника",
    "footer.about.doctors": "Врачи",
    "footer.about.career": "Карьера",
    "footer.about.news": "Новости",
    "footer.services": "Услуги",
    "footer.support": "Поддержка",
    "footer.support.contact": "Контакты",
    "footer.support.faq": "FAQ",
    "footer.support.privacy": "Политика конфиденциальности",
    "footer.support.terms": "Условия использования",
    "footer.description": "Мы защищаем здоровье вас и вашей семьи. К вашим услугам современное медицинское оборудование и профессиональные врачи.",
    "footer.copyright": "© {year} ER Med Clinic. Все права защищены.",
    "footer.developed": "Разработал",

    // About Section
    "about.badge": "О нас",
    "about.title": "Почему ER Med Clinic?",
    "about.description": "Мы защищаем здоровье наших пациентов. Мы выделяемся современным медицинским оборудованием, профессиональными врачами и ориентацией на пациента.",
    "about.features.hygiene": "Высокие стандарты гигиены",
    "about.features.hygieneDesc": "Наша клиника работает в полном соответствии с международными стандартами гигиены и безопасности.",
    "about.features.equipment": "Современное оборудование",
    "about.features.equipmentDesc": "У нас есть диагностическое и лечебное оборудование, оснащенное новейшими технологиями.",
    "about.features.patient": "Ориентация на пациента",
    "about.features.patientDesc": "Мы обеспечиваем индивидуальный подход и особое внимание каждому нашему пациенту.",
    "about.advantages.title": "Наши преимущества",
    "about.advantages.certified": "Сертифицированные врачи",
    "about.advantages.booking": "Удобная система записи",
    "about.advantages.lab": "Быстрые лабораторные результаты",
    "about.advantages.price": "Доступная ценовая политика",
    "about.clinicName": "ER Med Clinic",
    "about.clinicSlogan": "Профессиональное медицинское обслуживание и тысячи довольных пациентов",

    // Departments Section
    "departments.badge": "Медицинские отделения",
    "departments.title": "Отделения, которые мы обслуживаем",
    "departments.description": "В каждом отделении мы к вашим услугам с профессиональными врачами и современным оборудованием",
    "departments.loading": "Загрузка...",
    "departments.empty": "Отделения еще не добавлены",

    // Doctors Section
    "doctors.badge": "Медицинская команда",
    "doctors.title": "Наши профессиональные врачи",
    "doctors.description": "Наши опытные и сертифицированные врачи работают для вашего здоровья",
    "doctors.loading": "Загрузка...",
    "doctors.empty": "Врачи еще не добавлены",

    // Contact Section
    "contact.badge": "Контакты",
    "contact.title": "Свяжитесь с нами",
    "contact.description": "Свяжитесь с нами по вашим вопросам или запросам",
    "contact.address": "Адрес",
    "contact.addressDetail": "г. Хачмаз, ул. Гаджи Зейналабдин Тагиева 88",
    "contact.addressNear": "(Рядом со школой № 8)",
    "contact.phone": "Телефон",
    "contact.email": "Email",
    "contact.hours": "Рабочие часы",
    "contact.hoursWeekday": "Будни: 09:00 - 18:00",
    "contact.hoursSaturday": "Суббота: 09:00 - 15:00",
    "contact.hoursSunday": "Воскресенье: Выходной",
    "contact.social": "Социальные сети",
  },
};

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
    return translations[language][key as keyof typeof translations["az"]] || key;
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
