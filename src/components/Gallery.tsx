import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import all images
import img1 from '../assets/images/photo_2026-03-23_18-06-08.jpg';
import img2 from '../assets/images/photo_2026-04-03_16-25-01 (2).jpg';
import img3 from '../assets/images/photo_2026-04-03_16-25-01 (3).jpg';
import img4 from '../assets/images/photo_2026-04-03_16-25-01.jpg';
import img5 from '../assets/images/photo_2026-04-03_16-25-02 (2).jpg';
import img6 from '../assets/images/photo_2026-04-03_16-25-02.jpg';
import img7 from '../assets/images/photo_2026-04-03_16-25-03 (2).jpg';
import img8 from '../assets/images/photo_2026-04-03_16-25-03 (3).jpg';
import img9 from '../assets/images/photo_2026-04-03_16-25-03.jpg';
import img10 from '../assets/images/photo_2026-04-03_16-25-04 (2).jpg';
import img11 from '../assets/images/photo_2026-04-03_16-25-04.jpg';
import img12 from '../assets/images/photo_2026-04-03_16-25-05 (2).jpg';
import img13 from '../assets/images/photo_2026-04-03_16-25-05 (3).jpg';
import img14 from '../assets/images/photo_2026-04-03_16-25-05.jpg';
import img15 from '../assets/images/photo_2026-04-03_16-25-06.jpg';
import img16 from '../assets/images/photo_2026-04-03_16-25-07.jpg';
import img17 from '../assets/images/photo_2026-04-04_09-05-07.jpg';
import img18 from '../assets/images/photo_2026-04-04_09-05-08.jpg';
import img19 from '../assets/images/photo_2026-04-04_09-05-11.jpg';
import img20 from '../assets/images/photo_2026-04-04_09-05-13.jpg';
import img21 from '../assets/images/photo_2026-04-04_09-05-16.jpg';
import img22 from '../assets/images/photo_2026-04-04_09-05-19.jpg';

// Split into 3 rows (approx 7-8 per row)
const row1 = [img1, img2, img3, img4, img5, img6, img17, img18];
const row2 = [img7, img8, img9, img10, img11, img19, img20];
const row3 = [img12, img13, img14, img15, img16, img21, img22];

const allGalleryImages = [...row1, ...row2, ...row3];

function InfiniteRow({
  images,
  speed = 1,
  reverse = false,
  startIndex,
  onImageClick,
  isPaused
}: {
  images: string[];
  speed?: number;
  reverse?: boolean;
  startIndex: number;
  onImageClick: (index: number) => void;
  isPaused: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const initialized = useRef(false);

  // 6 sets of images for seamless auto-scrolling AND safe manual swiping bounds
  const allImages = [...images, ...images, ...images, ...images, ...images, ...images];

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const el = scrollRef.current;
      if (el) {
        // One set corresponds to (el.scrollWidth / 6).
        const setWidth = el.scrollWidth / 6;

        // Initialize scroll position exactly in the middle buffer region to avoid hitting physical 0
        if (setWidth > 0 && !initialized.current) {
          el.scrollLeft = setWidth * 3;
          initialized.current = true;
        }

        if (initialized.current) {
          // Auto-scroll logic if not paused or interacting
          if (!isPaused && !isHovered && !isTouching) {
            const deltaTime = currentTime - lastTime;
            const dt = Math.min(deltaTime, 50); 
            const movePixels = (speed * dt) / 16;
            
            if (reverse) {
              el.scrollLeft -= movePixels;
            } else {
              el.scrollLeft += movePixels;
            }
          }

          // Bound checking. Kept away from 0. 
          // If less than 1 set width, push forward by 3 sets.
          // If more than 4 sets width, push backward by 3 sets.
          // Checked only when not actively dragging to avoid disrupting natural gestures
          if (!isTouching) {
            if (el.scrollLeft <= setWidth) {
              el.scrollLeft += setWidth * 3;
            } else if (el.scrollLeft >= setWidth * 4) {
              el.scrollLeft -= setWidth * 3;
            }
          }
        }
      }
      lastTime = currentTime;
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isHovered, isTouching, reverse, speed]);

  return (
    <div className="relative overflow-hidden py-1">
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        className="flex gap-4 overflow-x-auto no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allImages.map((src, i) => {
          const actualIndex = startIndex + (i % images.length);
          return (
            <div
              key={i}
              onClick={() => onImageClick(actualIndex)}
              className="group relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-bordo/20 sm:h-56 sm:w-80 md:h-64 md:w-96 cursor-pointer select-none"
            >
              <img
                src={src}
                alt={`Imperial Kids Gallery ${actualIndex + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bordo/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                 <div className="bg-white/90 p-3 rounded-full translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">
                    <Camera size={24} className="text-bordo pointer-events-none" />
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Gallery() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % allGalleryImages.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + allGalleryImages.length) % allGalleryImages.length);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="relative bg-white section-padding overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-bordo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-bordo">
            <Camera size={14} /> {t('gallery.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
            {t('gallery.title_1')}{' '}
            <span className="text-gradient">{t('gallery.title_val')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            {t('gallery.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* 3-Row Infinite Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        <InfiniteRow images={row1} speed={1} startIndex={0} onImageClick={setSelectedIndex} isPaused={selectedIndex !== null} />
        <InfiniteRow images={row2} speed={0.8} reverse startIndex={row1.length} onImageClick={setSelectedIndex} isPaused={selectedIndex !== null} />
        <InfiniteRow images={row3} speed={1.2} startIndex={row1.length + row2.length} onImageClick={setSelectedIndex} isPaused={selectedIndex !== null} />
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[110] bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white/80 font-medium px-4">
                 {selectedIndex + 1} / {allGalleryImages.length}
              </div>
              <button 
                className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-md transition-colors"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-md transition-all hover:scale-110 hidden sm:block"
              onClick={(e) => {
                 e.stopPropagation();
                 setSelectedIndex((prev) => (prev! - 1 + allGalleryImages.length) % allGalleryImages.length);
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-md transition-all hover:scale-110 hidden sm:block"
              onClick={(e) => {
                 e.stopPropagation();
                 setSelectedIndex((prev) => (prev! + 1) % allGalleryImages.length);
              }}
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container with Swipe */}
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                src={allGalleryImages[selectedIndex]}
                alt={`Gallery image ${selectedIndex + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="max-h-full max-w-full object-contain rounded-md select-none touch-none shadow-2xl"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  if (swipe < -50) {
                    setSelectedIndex((prev) => (prev! + 1) % allGalleryImages.length);
                  } else if (swipe > 50) {
                    setSelectedIndex((prev) => (prev! - 1 + allGalleryImages.length) % allGalleryImages.length);
                  }
                }}
              />
            </div>
            
            {/* Mobile Navigation Hint */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm sm:hidden z-[110] pointer-events-none">
               Surish uchun (Swipe)
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-components style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
