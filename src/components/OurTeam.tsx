import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Award, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import ima1 from '../assets/images/ima-1.jpg';
import ima2 from '../assets/images/ima-2.jpg';
import ima3 from '../assets/images/ima-3.jpg';
import ima4 from '../assets/images/ima-4.jpg';
import ima5 from '../assets/images/ima-5.jpg';
import ima6 from '../assets/images/ima-6.jpg';
import ima7 from '../assets/images/ima-7.jpg';

import ima12 from '../assets/images/ima-12.jpg';
import ima14 from '../assets/images/ima-14.jpg';

interface TeamMember {
  src: string;
  nameKey: string;
  roleKey: string;
  emoji: string;
  accent: string;
  accentBg: string;
  borderColor: string;
  delay: number;
}

const teamMembers: TeamMember[] = [
  {
    src: ima1,
    nameKey: 'team.m1_name',
    roleKey: 'team.m1_role',
    emoji: '👩‍🏫',
    accent: 'from-rose-400 to-pink-500',
    accentBg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    delay: 0,
  },
  {
    src: ima2,
    nameKey: 'team.m2_name',
    roleKey: 'team.m2_role',
    emoji: '🗣️',
    accent: 'from-blue-400 to-indigo-500',
    accentBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    delay: 0.05,
  },
  {
    src: ima3,
    nameKey: 'team.m3_name',
    roleKey: 'team.m3_role',
    emoji: '🧠',
    accent: 'from-amber-400 to-orange-500',
    accentBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    delay: 0.1,
  },
  {
    src: ima4,
    nameKey: 'team.m4_name',
    roleKey: 'team.m4_role',
    emoji: '🇬🇧',
    accent: 'from-emerald-400 to-teal-500',
    accentBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    delay: 0.15,
  },
  {
    src: ima5,
    nameKey: 'team.m5_name',
    roleKey: 'team.m5_role',
    emoji: '📐',
    accent: 'from-purple-400 to-violet-500',
    accentBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    delay: 0.2,
  },
  {
    src: ima6,
    nameKey: 'team.m6_name',
    roleKey: 'team.m6_role',
    emoji: '🎨',
    accent: 'from-cyan-400 to-sky-500',
    accentBg: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    delay: 0.25,
  },
  {
    src: ima7,
    nameKey: 'team.m7_name',
    roleKey: 'team.m7_role',
    emoji: '🎵',
    accent: 'from-pink-400 to-rose-500',
    accentBg: 'bg-pink-50',
    borderColor: 'border-pink-200',
    delay: 0.3,
  },
  {
    src: ima12,
    nameKey: 'team.m12_name',
    roleKey: 'team.m12_role',
    emoji: '🌸',
    accent: 'from-lime-400 to-green-500',
    accentBg: 'bg-lime-50',
    borderColor: 'border-lime-200',
    delay: 0.35,
  },
  {
    src: ima14,
    nameKey: 'team.m14_name',
    roleKey: 'team.m14_role',
    emoji: '👑',
    accent: 'from-sky-400 to-cyan-500',
    accentBg: 'bg-sky-50',
    borderColor: 'border-sky-200',
    delay: 0.45,
  },
];

/* ───────── Lightbox Modal ───────── */
function Lightbox({
  members,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  members: TeamMember[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useLanguage();
  const member = members[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <X size={22} />
      </motion.button>

      {/* Previous arrow */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <ChevronLeft size={26} />
      </motion.button>

      {/* Next arrow */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <ChevronRight size={26} />
      </motion.button>

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center"
        >
          <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <img
              src={member.src}
              alt={t(member.roleKey)}
              className="w-full h-auto max-h-[75vh] object-contain bg-black/40 rounded-3xl"
            />

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
              <p className="text-white font-bold text-base sm:text-lg font-heading tracking-wide">{t(member.nameKey)}</p>
              <p className="text-white/70 text-sm mt-0.5">{t(member.roleKey)}</p>
            </div>
          </div>

          {/* Counter */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-white/70 text-sm font-medium">
              {currentIndex + 1} / {members.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ───────── Team Card ───────── */
function TeamCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (index: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: member.delay,
        type: 'spring',
        bounce: 0.25,
      }}
      className="group relative cursor-pointer"
      onClick={() => onOpen(index)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-white border-2 ${member.borderColor} shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-bordo/10 hover:-translate-y-2`}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.src}
            alt={t(member.roleKey)}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

          {/* Top accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ delay: member.delay + 0.3, duration: 0.5 }}
            className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${member.accent}`}
          />

          {/* Floating heart on hover */}
          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <Heart size={16} className="text-bordo fill-bordo/30" />
          </div>

          {/* Zoom icon indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Bottom info — always visible */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5">
            <p className="text-white font-bold text-xs sm:text-sm font-heading drop-shadow-lg tracking-wide">
              {t(member.nameKey)}
            </p>
            <p className="text-white/70 text-[10px] sm:text-xs drop-shadow-lg mt-0.5">
              {t(member.roleKey)}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative floating element */}
      {index % 4 === 0 && (
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut',
          }}
          className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-bordo/10 blur-[1px] pointer-events-none hidden lg:block"
        />
      )}
    </motion.div>
  );
}

/* ───────── Main Section ───────── */
export default function OurTeam() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + teamMembers.length) % teamMembers.length : null
      ),
    []
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % teamMembers.length : null
      ),
    []
  );

  return (
    <>
      <section
        id="team"
        className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-bordo-50/20 to-white"
      >
        {/* Background decorations */}
        <div className="absolute left-0 top-1/3 -ml-52 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-rose-100/20 to-amber-100/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 -mr-52 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-100/15 to-purple-100/10 blur-3xl pointer-events-none" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[12%] top-[8%] h-3 w-3 rounded-full bg-bordo/8 pointer-events-none hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute left-[8%] top-[20%] h-4 w-4 rounded-sm bg-amber-300/15 rotate-45 pointer-events-none hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -45, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute right-[20%] bottom-[10%] h-3 w-3 rounded-full bg-rose-300/15 pointer-events-none hidden lg:block"
        />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 sm:mb-20 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
              <Sparkles size={14} />
              {t('team.badge')}
            </span>
            <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
              {t('team.title_1')}{' '}
              <span className="text-gradient">{t('team.title_val')}</span>{' '}
              {t('team.title_2')}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
              {t('team.subtitle')}
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

          {/* Team Grid — responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={i} member={member} index={i} onOpen={openLightbox} />
            ))}
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 sm:mt-20 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-gray-100 px-6 py-4 shadow-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Award size={22} className="text-bordo" />
              </motion.div>
              <p className="text-sm sm:text-[15px] text-gray-600 font-medium">
                {t('team.bottom_note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            members={teamMembers}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
