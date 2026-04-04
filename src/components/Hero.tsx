import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Heart, Crown, Palette, Book, Music, TrendingUp } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
import { useLanguage } from '../context/LanguageContext';

const floatingIcons = [
  { Icon: Star, color: '#F59E0B', x: '10%', y: '20%', size: 28, delay: 0 },
  { Icon: Heart, color: '#FECDD3', x: '80%', y: '15%', size: 24, delay: 1.2 },
  { Icon: Crown, color: '#1E3A8A', x: '70%', y: '75%', size: 30, delay: 0.6 },
  { Icon: Palette, color: '#A7F3D0', x: '15%', y: '70%', size: 26, delay: 1.8 },
  { Icon: Sparkles, color: '#DDD6FE', x: '90%', y: '50%', size: 22, delay: 2.4 },
];

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream via-cream-dark to-sky-light pt-24 pb-16"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-royal/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/15 blur-3xl" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, color, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
          animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon size={size} color={color} strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 lg:flex-row lg:gap-16 lg:px-8">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-royal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-royal"
          >
            <Crown size={14} className="text-gold" />
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl font-extrabold leading-tight text-royal sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('hero.title_1')}{' '}
            <span className="relative inline-block">
              <span className="text-gradient">{t('hero.title_2')}</span>
              <motion.span
                className="absolute -right-6 -top-4"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={24} className="text-gold" />
              </motion.span>
            </span>{' '}
            {t('hero.title_3')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.a
              id="hero-enroll-cta"
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-royal to-royal-light px-8 py-4 text-sm font-bold text-white shadow-xl shadow-royal/25 transition hover:shadow-2xl hover:shadow-royal/35"
            >
              {t('hero.enroll_btn')}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              id="hero-explore-cta"
              href="#programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border-2 border-gold/40 bg-white/60 px-8 py-4 text-sm font-bold text-royal backdrop-blur transition hover:border-gold hover:bg-gold/10"
            >
              {t('hero.explore_btn')}
              <Sparkles size={16} className="text-gold" />
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex items-center justify-center gap-8 lg:justify-start"
          >
            {[
              { num: '7+', label: t('hero.stat_1') },
              { num: '5x', label: t('hero.stat_2') },
              { num: '50+', label: t('hero.stat_3') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-extrabold text-royal sm:text-3xl">
                  {stat.num}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Illustration side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden flex-1 lg:flex items-center justify-center"
        >
          {/* Main circle */}
          <div className="relative h-[420px] w-[420px] xl:h-[480px] xl:w-[480px]">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30"
            />

            {/* Main blob */}
            <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-royal/10 via-gold/10 to-mint/20">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-32 w-32 overflow-hidden rounded-full shadow-2xl shadow-gold/30 ring-4 ring-gold/30"
                >
                  <img src={logo} alt="Imperial Kids" className="h-full w-full object-cover" />
                </motion.div>
                <p className="font-heading text-xl font-bold text-royal">{t('hero.circle_title')}</p>
              </div>
            </div>

            {/* Orbiting elements */}
            {[
              { Icon: Book, angle: 0, dist: 190, color: '#3B82F6' },
              { Icon: Palette, angle: 72, dist: 200, color: '#EC4899' },
              { Icon: Star, angle: 144, dist: 185, color: '#EAB308' },
              { Icon: TrendingUp, angle: 216, dist: 195, color: '#10B981' },
              { Icon: Music, angle: 288, dist: 190, color: '#8B5CF6' },
            ].map(({ Icon, angle, dist, color }, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * dist;
              const y = Math.sin(rad) * dist;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"
                  style={{ x: x - 28, y: y - 28, color: color }}
                  animate={{ y: [y - 28, y - 38, y - 28], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  <Icon size={24} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
