"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -10000) {
      handleNext();
    } else if (swipe > 10000) {
      handlePrevious();
    }
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFullscreen(false);
    } else if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === " ") {
      e.preventDefault();
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <section id="gallery" className="premium-section bg-gradient-to-b from-white to-slate-50">
      <div className="section-shell">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary-50 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-primary-100">
              {t("gallery.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              {t("gallery.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("gallery.description")}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            ref={carouselRef}
            className="relative aspect-[16/10] md:aspect-[21/10] rounded-3xl overflow-hidden shadow-2xl bg-slate-100"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ 
                  opacity: 0, 
                  scale: 1.15,
                  x: direction > 0 ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95,
                  x: direction > 0 ? -100 : 100 
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src={galleryImages[currentIndex].src}
                    alt={galleryImages[currentIndex].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Navigation buttons */}
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 z-10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-7 h-7 text-navy" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="w-7 h-7 text-navy" />
            </motion.button>

            {/* Play/Pause button */}
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 z-10"
              onClick={() => setIsPlaying((prev) => !prev)}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-navy" />
              ) : (
                <Play className="w-7 h-7 text-navy" />
              )}
            </motion.button>

            {/* Fullscreen button */}
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-6 right-24 w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 z-10"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="w-7 h-7 text-navy" />
            </motion.button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {galleryImages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                      ? "bg-white w-10"
                      : "bg-white/40 hover:bg-white/60 w-2"
                    }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-8 justify-center overflow-x-auto pb-2 px-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`relative aspect-[16/9] w-28 md:w-40 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                  ? "border-primary-500 shadow-2xl ring-4 ring-primary-500/20 scale-105"
                  : "border-transparent hover:border-gray-300 shadow-lg opacity-70 hover:opacity-100"
                  }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeThumbnail"
                    className="absolute inset-0 bg-primary-500/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-6 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </motion.button>

            {/* Image container with Ken Burns effect */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src={galleryImages[currentIndex].src}
                      alt={galleryImages[currentIndex].alt}
                      width={1920}
                      height={1080}
                      className="w-full h-full object-contain rounded-lg"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Image counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-wide z-20"
            >
              {currentIndex + 1} / {galleryImages.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
