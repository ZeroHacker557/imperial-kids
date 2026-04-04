import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, User, UserRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonialKeys = [
  {
    key: 't1',
    name: 'Nilufar Karimova',
    rating: 5,
    color: 'bg-bordo-800',
    avatar: User,
  },
  {
    key: 't2',
    name: 'Sardor Rustamov',
    rating: 5,
    color: 'bg-bordo-900',
    avatar: UserRound,
  },
  {
    key: 't3',
    name: 'Madina Azimova',
    rating: 5,
    color: 'bg-bordo-800',
    avatar: User,
  },
  {
    key: 't4',
    name: 'Bobur Aliyev',
    rating: 5,
    color: 'bg-bordo-900',
    avatar: UserRound,
  },
  {
    key: 't5',
    name: 'Shoira Toshmatova',
    rating: 5,
    color: 'bg-bordo-800',
    avatar: User,
  },
];

export default function Testimonials() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useLanguage();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonialKeys.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonialKeys.length) % testimonialKeys.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const testm = testimonialKeys[current];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-bordo-900 to-bordo-950 section-padding"
    >
      {/* Decorative */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-bordo-light/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-bordo-light/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            {t('testimonials.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {t('testimonials.title_1')}{' '}
            <span className="text-gradient">{t('testimonials.title_val')}</span>{' '}
            {t('testimonials.title_2')}
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`mx-auto max-w-2xl rounded-3xl ${testm.color} p-8 shadow-lg shadow-bordo-950/40 sm:p-10`}
          >
            {/* Quote icon */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bordo-700/50">
                <Quote size={18} className="text-white" />
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: testm.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
            </div>

            {/* Text */}
            <p className="mb-6 text-base leading-relaxed text-gray-300 italic sm:text-lg">
              "{t(`testimonials.${testm.key}_text`)}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bordo-700 text-white shadow-sm">
                <testm.avatar size={24} />
              </div>
              <div>
                <p className="font-heading font-bold text-white">{testm.name}</p>
                <p className="text-xs text-gray-400">{t(`testimonials.${testm.key}_role`)}</p>
              </div>
            </div>

            {/* Chat bubble tail */}
            <div className="absolute -bottom-3 left-12 h-6 w-6 rotate-45 rounded-sm"
              style={{ backgroundColor: 'inherit' }}
            />
          </motion.div>

          {/* Nav arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-bordo-800 text-white shadow-md transition hover:bg-bordo hover:text-white"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-bordo-light' : 'w-2.5 bg-bordo-800'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-bordo-800 text-white shadow-md transition hover:bg-bordo hover:text-white"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
