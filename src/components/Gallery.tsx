import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Camera } from 'lucide-react';
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

function InfiniteRow({
  images,
  duration,
  reverse = false,
}: {
  images: string[];
  duration: number;
  reverse?: boolean;
}) {
  // Duplicate images for seamless loop
  const allImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? 'scrollRight' : 'scrollLeft'} ${duration}s linear infinite`,
        }}
      >
        {allImages.map((src, i) => (
          <div
            key={i}
            className="group relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-bordo/10 sm:h-56 sm:w-80 md:h-64 md:w-96"
          >
            <img
              src={src}
              alt={`Imperial Kids - ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

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
        <InfiniteRow images={row1} duration={35} />
        <InfiniteRow images={row2} duration={40} reverse />
        <InfiniteRow images={row3} duration={30} />
      </motion.div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
