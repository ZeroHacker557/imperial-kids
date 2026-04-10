import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import kid1 from '../assets/images/kid-1.jpg';
import kid2 from '../assets/images/kid-2.jpg';
import kid3 from '../assets/images/kid-3.jpg';
import kid4 from '../assets/images/kid-4.jpg';
import kid5 from '../assets/images/kid-5.jpg';

interface KidPhoto {
  src: string;
  rotation: number;
  color: string;
  bgGradient: string;
  shadowColor: string;
  emoji: string;
  delay: number;
}

const kids: KidPhoto[] = [
  {
    src: kid1,
    rotation: -3,
    color: 'border-rose-200',
    bgGradient: 'from-rose-100 to-pink-50',
    shadowColor: 'shadow-rose-200/50',
    emoji: '⭐',
    delay: 0,
  },
  {
    src: kid2,
    rotation: 2,
    color: 'border-blue-200',
    bgGradient: 'from-blue-100 to-indigo-50',
    shadowColor: 'shadow-blue-200/50',
    emoji: '🌟',
    delay: 0.1,
  },
  {
    src: kid3,
    rotation: -2,
    color: 'border-amber-200',
    bgGradient: 'from-amber-100 to-yellow-50',
    shadowColor: 'shadow-amber-200/50',
    emoji: '👑',
    delay: 0.2,
  },
  {
    src: kid4,
    rotation: 3,
    color: 'border-emerald-200',
    bgGradient: 'from-emerald-100 to-teal-50',
    shadowColor: 'shadow-emerald-200/50',
    emoji: '💫',
    delay: 0.3,
  },
  {
    src: kid5,
    rotation: -1,
    color: 'border-purple-200',
    bgGradient: 'from-purple-100 to-violet-50',
    shadowColor: 'shadow-purple-200/50',
    emoji: '🎀',
    delay: 0.4,
  },
];

function KidCard({ kid, index }: { kid: KidPhoto; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Layout: first 3 on top row, 2 on bottom centered
  const isTopRow = index < 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: kid.rotation * 2, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, rotate: kid.rotation, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: kid.delay, type: 'spring', bounce: 0.3 }}
      whileHover={{
        rotate: 0,
        scale: 1.08,
        y: -10,
        zIndex: 30,
        transition: { duration: 0.3 },
      }}
      className={`group relative cursor-pointer ${isTopRow ? '' : ''}`}
    >
      {/* Floating emoji */}
      <motion.span
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: 'easeInOut' }}
        className="absolute -top-3 -right-1 sm:-top-4 sm:-right-2 text-lg sm:text-xl z-20 drop-shadow-sm"
      >
        {kid.emoji}
      </motion.span>

      {/* Photo card with polaroid-style frame */}
      <div
        className={`relative overflow-hidden rounded-3xl border-4 ${kid.color} bg-gradient-to-br ${kid.bgGradient} p-2 sm:p-2.5 shadow-xl ${kid.shadowColor} transition-shadow duration-300 group-hover:shadow-2xl`}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src={kid.src}
            alt="Imperial Kids student"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-bordo/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Crown icon on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            whileHover={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Crown size={16} className="text-bordo" />
          </motion.div>
        </div>

        {/* Bottom accent bar */}
        <div className="mt-2 flex justify-center">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '60%' } : {}}
            transition={{ delay: kid.delay + 0.5, duration: 0.4 }}
            className="h-1 rounded-full bg-gradient-to-r from-bordo/30 via-bordo to-bordo/30"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function OurStudents() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="students" className="relative overflow-hidden section-padding bg-gradient-to-b from-bordo-50/30 via-white to-bordo-50/20">
      {/* Background blobs */}
      <div className="absolute left-0 top-1/4 -ml-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-rose-100/30 to-amber-100/20 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 -mr-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-blue-100/20 to-purple-100/20 blur-3xl pointer-events-none" />

      {/* Floating confetti-like decorations */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[15%] top-[10%] h-3 w-3 rounded-sm bg-bordo/10 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0], rotate: [0, -90, -180] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-[12%] top-[25%] h-4 w-4 rounded-full bg-amber-300/20 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-[8%] bottom-[20%] h-3 w-3 rounded-full bg-rose-300/20 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute left-[20%] bottom-[15%] h-2.5 w-2.5 rounded-sm bg-blue-300/20 rotate-45 pointer-events-none hidden lg:block"
      />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
            <Sparkles size={14} />
            {t('students.badge')}
          </span>
          <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
            {t('students.title_1')}{' '}
            <span className="text-gradient">{t('students.title_val')}</span>{' '}
            {t('students.title_2')}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            {t('students.subtitle')}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={headingInView ? { opacity: 1, width: '100%' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-gradient-to-r from-rose-400 via-bordo to-amber-400" />
          </motion.div>
        </motion.div>

        {/* Kids Grid — Creative scattered layout */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Top row — 3 kids */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-3xl">
            {kids.slice(0, 3).map((kid, i) => (
              <div key={i} className={`${i === 2 ? 'col-span-2 sm:col-span-1 flex justify-center' : ''}`}>
                <div className={`w-full ${i === 2 ? 'max-w-[200px] sm:max-w-none' : ''}`}>
                  <KidCard kid={kid} index={i} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row — 2 kids centered */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-xl">
            {kids.slice(3, 5).map((kid, i) => (
              <KidCard key={i + 3} kid={kid} index={i + 3} />
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-gray-100 px-6 py-4 shadow-sm">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Crown size={22} className="text-bordo" />
            </motion.div>
            <p className="text-sm sm:text-[15px] text-gray-600 font-medium">
              {t('students.bottom_note')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
