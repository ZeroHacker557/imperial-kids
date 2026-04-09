import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, User, UserRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonialKeys = [
  {
    key: 't1',
    name: 'Nilufar Karimova',
    rating: 5,
    avatar: User,
  },
  {
    key: 't2',
    name: 'Sardor Rustamov',
    rating: 5,
    avatar: UserRound,
  },
  {
    key: 't3',
    name: 'Madina Azimova',
    rating: 5,
    avatar: User,
  },
  {
    key: 't4',
    name: 'Bobur Aliyev',
    rating: 5,
    avatar: UserRound,
  },
  {
    key: 't5',
    name: 'Shoira Toshmatova',
    rating: 5,
    avatar: User,
  },
  {
    key: 't6',
    name: 'Kamola Ahmedova',
    rating: 5,
    avatar: UserRound,
  },
  {
    key: 't7',
    name: 'Jasur Umarov',
    rating: 5,
    avatar: User,
  },
  {
    key: 't8',
    name: 'Nigora Saliyeva',
    rating: 5,
    avatar: UserRound,
  },
  {
    key: 't9',
    name: 'Alisher Zokirov',
    rating: 5,
    avatar: User,
  },
  {
    key: 't10',
    name: 'Feruza Ismoilova',
    rating: 5,
    avatar: UserRound,
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
      className="relative overflow-hidden bg-gray-50 section-padding"
    >
      {/* Decorative */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-bordo/5 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-bordo-50/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-bordo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-bordo">
            {t('testimonials.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
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
            className="mx-auto max-w-2xl rounded-3xl bg-white border border-gray-100 p-8 shadow-lg shadow-black/5 sm:p-10"
          >
            {/* Quote icon */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bordo-50">
                <Quote size={18} className="text-bordo" />
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: testm.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* Text */}
            <p className="mb-6 text-base leading-relaxed text-gray-600 italic sm:text-lg">
              "{t(`testimonials.${testm.key}_text`)}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bordo text-white shadow-sm">
                <testm.avatar size={24} />
              </div>
              <div>
                <p className="font-heading font-medium text-black">{t('testimonials.parent')}</p>
              </div>
            </div>
          </motion.div>

          {/* Nav arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-bordo hover:text-white hover:border-bordo"
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
                    i === current ? 'w-8 bg-bordo' : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-bordo hover:text-white hover:border-bordo"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
