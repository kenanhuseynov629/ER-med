"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { useLanguage } from "@/app/context/LanguageContext";

const galleryImages = [
  {
    src: "/WhatsApp Image 2026-07-05 at 14.42.04.jpeg",
    alt: "Klinika 1",
  },
  {
    src: "/WhatsApp Image 2026-07-05 at 14.42.04 (1).jpeg",
    alt: "Klinika 2",
  },
  {
    src: "/WhatsApp Image 2026-07-05 at 14.42.04 (2).jpeg",
    alt: "Klinika 3",
  },
  {
    src: "/WhatsApp Image 2026-07-05 at 14.42.04 (3).jpeg",
    alt: "Klinika 4",
  },
  {
    src: "/WhatsApp Image 2026-07-05 at 14.42.27.jpeg",
    alt: "Klinika 5",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("gallery.title")}
            </h2>
            <p className="text-gray-600">
              {t("gallery.description")}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Simple Carousel */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-[16/9]">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-colors"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-colors"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3 mt-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-[16/9] w-20 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-blue-500"
                  : "border-gray-200 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
