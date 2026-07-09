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

  "hero.badge": "ER Med Klinik - Xaçmaz",
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
  "about.title": "Niyə ER Med Klinik?",
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
  "about.clinicName": "ER Med Klinik",
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
    "ER Med Klinik ailənizin sağlamlığı üçün müasir, səliqəli və peşəkar tibbi xidmət təqdim edir.",
  "footer.copyright": "© {year} ER Med Klinik. Bütün hüquqlar qorunur.",
  "footer.developed": "Hazırladı",

  // Hero section
  "hero.quickStats.start": "qəbul başlanır",
  "hero.quickStats.schedule": "iş qrafiki",
  "hero.quickStats.location": "ünvan",
  "hero.carePoints.modern": "Müasir diaqnostika",
  "hero.carePoints.family": "Ailə həkimi yanaşması",
  "hero.carePoints.booking": "Rahat qəbul sistemi",
  "hero.card.consultation": "Həkim konsultasiyası",
  "hero.card.consultationDesc": "Admin paneldə aktiv olan həkim və şöbələr üzrə qəbul.",
  "hero.card.diagnosis": "Diaqnostika",
  "hero.card.diagnosisDesc": "Müayinə, laborator analiz və fərdi müalicə planı.",
  "hero.card.todayContact": "Bu gün qəbul üçün əlaqə",
  "hero.card.todayContactDesc": "Növbə və həkim seçimi üçün klinika ilə birbaşa danışın.",
  "hero.card.professionalService": "Peşəkar tibbi xidmət",

  // About section
  "about.clinicView": "Klinik baxış",
  "about.slogan": "Dəqiq diaqnoz, aydın izah, düzgün yönləndirmə.",
  "about.exam": "İlkin müayinə və həkim konsultasiyası",
  "about.lab": "Laborator analiz və diaqnostik dəstək",
  "about.treatment": "Müalicə planı və təkrar nəzarət",

  // Stats section
  "stats.start": "Qəbul başlanır",
  "stats.startDesc": "Həftə içi klinika qəbulu",
  "stats.schedule": "İş qrafiki",
  "stats.scheduleDesc": "Həftə içi və şənbə günü xidmət",
  "stats.location": "Ünvan",
  "stats.locationDesc": "H. Z. Tağıyev küçəsi 88",

  // CareProcess section
  "careProcess.badge": "Qəbul prosesi",
  "careProcess.title": "Klinikaya müraciət sadə və aydındır",
  "careProcess.description": "Pasiyentin vaxtına hörmət edən, izahlı və rahat tibbi xidmət modeli.",
  "careProcess.step1.title": "Əlaqə və qeydiyyat",
  "careProcess.step1.desc": "Klinika ilə əlaqə saxlayın, uyğun həkim və qəbul vaxtı seçilsin.",
  "careProcess.step2.title": "Müayinə",
  "careProcess.step2.desc": "Şikayətləriniz dinlənilir, ilkin baxış və lazımi analizlər təyin edilir.",
  "careProcess.step3.title": "Müalicə planı",
  "careProcess.step3.desc": "Həkim nəticələri izah edir və sizin üçün aydın müalicə planı hazırlayır.",
  "careProcess.step4.title": "Nəzarət",
  "careProcess.step4.desc": "Təkrar baxış və nəticələrin izlənməsi ilə proses diqqətdə saxlanılır.",

  // Gallery section
  "gallery.badge": "Qalereya",
  "gallery.title": "Klinika şəkilləri",
  "gallery.description": "ER Med Klinik-in müasir infrastrukturu və şəraitindən şəkillər.",
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
  "hero.trust.patients": "Thousands of",
  "hero.trust.satisfied": "satisfied patients",
  "hero.card.certified": "Certified",
  "hero.card.doctors": "doctors",
  "hero.image.clinic": "Modern clinic",
  "hero.image.service": "Professional medical service",
  "departments.badge": "Medical departments",
  "departments.title": "Our medical directions",
  "departments.description":
    "Careful examination, clear consultation, and professional guidance in every direction.",
  "departments.loading": "Loading...",
  "departments.empty": "No departments added yet",
  "doctors.badge": "Medical team",
  "doctors.title": "Our professional doctors",
  "doctors.description":
    "Experienced doctors focused on accurate examination, clear diagnosis, and understandable guidance.",
  "doctors.loading": "Loading...",
  "doctors.empty": "No doctors added yet",
  "about.badge": "About",
  "about.title": "Why ER Med Clinic?",
  "about.description":
    "Our clinic serves patients with modern equipment, experienced doctors, and a convenient appointment system to carefully protect their health.",
  "about.features.hygiene": "High hygiene standards",
  "about.features.hygieneDesc":
    "Safety, cleanliness, and patient comfort are daily work principles at the clinic.",
  "about.features.equipment": "Modern equipment",
  "about.features.equipmentDesc":
    "Equipment focused on accurate results is used in diagnosis and treatment processes.",
  "about.features.patient": "Patient-centered approach",
  "about.features.patientDesc":
    "Every patient's complaint is listened to, results are clearly explained, and individual plans are established.",
  "about.advantages.title": "Our advantages",
  "about.advantages.certified": "Experienced medical team",
  "about.advantages.booking": "Convenient appointment system",
  "about.advantages.lab": "Fast laboratory results",
  "about.advantages.price": "Affordable pricing policy",
  "about.clinicName": "ER Med Clinic",
  "about.clinicSlogan": "Professional medical service and patient-centered approach",
  "contact.badge": "Contact",
  "contact.title": "Contact us",
  "contact.description": "Call the clinic directly for appointments, consultations, and location details.",
  "contact.address": "Address",
  "contact.addressDetail": "Khachmaz city, Haji Zeynalabdin Taghiyev Street 88",
  "contact.addressNear": "(Near School No. 8)",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.hours": "Working hours",
  "contact.hoursWeekday": "Weekdays: 09:00 - 18:00",
  "contact.hoursSaturday": "Saturday: 09:00 - 15:00",
  "contact.hoursSunday": "Sunday: closed",
  "contact.social": "Social media",
  "footer.about": "About",
  "footer.about.clinic": "Clinic",
  "footer.about.doctors": "Doctors",
  "footer.about.career": "Career",
  "footer.about.news": "News",
  "footer.services": "Services",
  "footer.support": "Support",
  "footer.support.contact": "Contact",
  "footer.support.faq": "FAQ",
  "footer.support.privacy": "Privacy policy",
  "footer.support.terms": "Terms of use",
  "footer.description":
    "ER Med Clinic provides modern, organized, and professional medical care for your family.",
  "footer.copyright": "© {year} ER Med Clinic. All rights reserved.",
  "footer.developed": "Developed by",

  // Hero section
  "hero.quickStats.start": "admission starts",
  "hero.quickStats.schedule": "work schedule",
  "hero.quickStats.location": "location",
  "hero.carePoints.modern": "Modern diagnostics",
  "hero.carePoints.family": "Family doctor approach",
  "hero.carePoints.booking": "Convenient booking system",
  "hero.card.consultation": "Doctor consultation",
  "hero.card.consultationDesc": "Appointments with active doctors and departments from admin panel.",
  "hero.card.diagnosis": "Diagnostics",
  "hero.card.diagnosisDesc": "Examination, lab analysis and personalized treatment plan.",
  "hero.card.todayContact": "Contact for today's appointment",
  "hero.card.todayContactDesc": "Speak directly with the clinic for queue and doctor selection.",
  "hero.card.professionalService": "Professional medical service",

  // About section
  "about.clinicView": "Clinic view",
  "about.slogan": "Accurate diagnosis, clear explanation, proper guidance.",
  "about.exam": "Initial examination and doctor consultation",
  "about.lab": "Laboratory analysis and diagnostic support",
  "about.treatment": "Treatment plan and follow-up monitoring",

  // Stats section
  "stats.start": "Admission starts",
  "stats.startDesc": "Weekday clinic admission",
  "stats.schedule": "Work schedule",
  "stats.scheduleDesc": "Weekday and Saturday service",
  "stats.location": "Location",
  "stats.locationDesc": "H. Z. Taghiyev Street 88",

  // CareProcess section
  "careProcess.badge": "Admission process",
  "careProcess.title": "Visiting the clinic is simple and clear",
  "careProcess.description": "A medical service model that respects patient time, provides clear explanations and comfort.",
  "careProcess.step1.title": "Contact and registration",
  "careProcess.step1.desc": "Contact the clinic, suitable doctor and appointment time will be selected.",
  "careProcess.step2.title": "Examination",
  "careProcess.step2.desc": "Your complaints are listened to, initial examination and necessary tests are assigned.",
  "careProcess.step3.title": "Treatment plan",
  "careProcess.step3.desc": "Doctor explains results and prepares a clear treatment plan for you.",
  "careProcess.step4.title": "Monitoring",
  "careProcess.step4.desc": "The process is maintained with follow-up visits and result tracking.",

  // Gallery section
  "gallery.badge": "Gallery",
  "gallery.title": "Clinic photos",
  "gallery.description": "Photos of ER Med Clinic's modern infrastructure and facilities.",
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
  "hero.trust.patients": "Тысячи",
  "hero.trust.satisfied": "довольных пациентов",
  "hero.card.certified": "Сертифицированные",
  "hero.card.doctors": "врачи",
  "hero.image.clinic": "Современная клиника",
  "hero.image.service": "Профессиональная медицинская услуга",
  "departments.badge": "Медицинские отделения",
  "departments.title": "Наши направления",
  "departments.description":
    "В каждом направлении доступны внимательный осмотр, понятная консультация и профессиональная помощь.",
  "departments.loading": "Загрузка...",
  "departments.empty": "Пока не добавлено ни одного отделения",
  "doctors.badge": "Команда врачей",
  "doctors.title": "Наши профессиональные врачи",
  "doctors.description":
    "Опытные врачи работают с фокусом на точный осмотр, диагноз и понятные рекомендации.",
  "doctors.loading": "Загрузка...",
  "doctors.empty": "Пока не добавлено ни одного врача",
  "about.badge": "О нас",
  "about.title": "Почему ER Med Clinic?",
  "about.description":
    "Наша клиника обслуживает пациентов с современным оборудованием, опытными врачами и удобной системой записи для тщательной защиты их здоровья.",
  "about.features.hygiene": "Высокие стандарты гигиены",
  "about.features.hygieneDesc":
    "Безопасность, чистота и комфорт пациентов - ежедневные рабочие принципы клиники.",
  "about.features.equipment": "Современное оборудование",
  "about.features.equipmentDesc":
    "В процессах диагностики и лечения используется оборудование, ориентированное на точные результаты.",
  "about.features.patient": "Пациентоориентированный подход",
  "about.features.patientDesc":
    "Жалоба каждого пациента выслушивается, результаты четко объясняются, устанавливаются индивидуальные планы.",
  "about.advantages.title": "Наши преимущества",
  "about.advantages.certified": "Опытный медицинский персонал",
  "about.advantages.booking": "Удобная система записи",
  "about.advantages.lab": "Оперативные лабораторные результаты",
  "about.advantages.price": "Доступная ценовая политика",
  "about.clinicName": "ER Med Clinic",
  "about.clinicSlogan": "Профессиональная медицинская услуга и внимательный подход к пациенту",
  "contact.badge": "Контакты",
  "contact.title": "Свяжитесь с нами",
  "contact.description": "Свяжитесь с клиникой для записи, консультаций и уточнения адреса.",
  "contact.address": "Адрес",
  "contact.addressDetail": "Город Хачмаз, улица Гаджи Зейналабдина Тагиева 88",
  "contact.addressNear": "(Рядом со школой № 8)",
  "contact.phone": "Телефон",
  "contact.email": "Электронная почта",
  "contact.hours": "Часы работы",
  "contact.hoursWeekday": "Будние дни: 09:00 - 18:00",
  "contact.hoursSaturday": "Суббота: 09:00 - 15:00",
  "contact.hoursSunday": "Воскресенье: выходной",
  "contact.social": "Социальные сети",
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
  "footer.description":
    "ER Med Clinic предоставляет современную и профессиональную медицинскую помощь для вашей семьи.",
  "footer.copyright": "© {year} ER Med Clinic. Все права защищены.",
  "footer.developed": "Разработал",

  // Hero section
  "hero.quickStats.start": "прием начинается",
  "hero.quickStats.schedule": "график работы",
  "hero.quickStats.location": "адрес",
  "hero.carePoints.modern": "Современная диагностика",
  "hero.carePoints.family": "Подход семейного врача",
  "hero.carePoints.booking": "Удобная система записи",
  "hero.card.consultation": "Консультация врача",
  "hero.card.consultationDesc": "Прием с активными врачами и отделениями из админ-панели.",
  "hero.card.diagnosis": "Диагностика",
  "hero.card.diagnosisDesc": "Осмотр, лабораторный анализ и индивидуальный план лечения.",
  "hero.card.todayContact": "Контакт для приема сегодня",
  "hero.card.todayContactDesc": "Свяжитесь напрямую с клиникой для выбора очереди и врача.",
  "hero.card.professionalService": "Профессиональная медицинская услуга",

  // About section
  "about.clinicView": "Вид клиники",
  "about.slogan": "Точный диагноз, ясное объяснение, правильное направление.",
  "about.exam": "Первичный осмотр и консультация врача",
  "about.lab": "Лабораторный анализ и диагностическая поддержка",
  "about.treatment": "План лечения и последующий мониторинг",

  // Stats section
  "stats.start": "Прием начинается",
  "stats.startDesc": "Будничный прием в клинике",
  "stats.schedule": "График работы",
  "stats.scheduleDesc": "Обслуживание в будние и субботу",
  "stats.location": "Адрес",
  "stats.locationDesc": "Улица Г. З. Тагиева 88",

  // CareProcess section
  "careProcess.badge": "Процесс приема",
  "careProcess.title": "Посещение клиники просто и понятно",
  "careProcess.description": "Модель медицинской услуги, уважающая время пациента, с ясными объяснениями и комфортом.",
  "careProcess.step1.title": "Контакт и регистрация",
  "careProcess.step1.desc": "Свяжитесь с клиникой, будет выбран подходящий врач и время приема.",
  "careProcess.step2.title": "Осмотр",
  "careProcess.step2.desc": "Ваши жалобы выслушиваются, назначается первичный осмотр и необходимые анализы.",
  "careProcess.step3.title": "План лечения",
  "careProcess.step3.desc": "Врач объясняет результаты и готовит для вас ясный план лечения.",
  "careProcess.step4.title": "Мониторинг",
  "careProcess.step4.desc": "Процесс поддерживается повторными визитами и отслеживанием результатов.",

  // Gallery section
  "gallery.badge": "Галерея",
  "gallery.title": "Фотографии клиники",
  "gallery.description": "Фотографии современной инфраструктуры и удобств ER Med Clinic.",
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
