import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, GraduationCap, BookOpen, Heart, Users, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const featureKeys = [
  {
    icon: ShieldCheck,
    key: 'f1',
    iconColor: 'text-emerald-500',
  },
  {
    icon: GraduationCap,
    key: 'f2',
    iconColor: 'text-blue-500',
  },
  {
    icon: BookOpen,
    key: 'f3',
    iconColor: 'text-purple-500',
  },
  {
    icon: Heart,
    key: 'f4',
    iconColor: 'text-rose-500',
  },
  {
    icon: Users,
    key: 'f5',
    iconColor: 'text-orange-500',
  },
  {
    icon: Utensils,
    key: 'f6',
    iconColor: 'text-amber-500',
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof featureKeys)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-bordo/5"
    >
      {/* Decorative circle */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-bordo-50" />

      <motion.div
        whileHover={{ rotate: 10 }}
        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 shadow-sm ${feature.iconColor}`}
      >
        <feature.icon size={28} />
      </motion.div>
      <h3 className="mb-3 font-heading text-xl font-bold text-black">{t(`about.${feature.key}_title`)}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{t(`about.${feature.key}_desc`)}</p>
    </motion.div>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white section-padding">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-bordo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-bordo">
            {t('about.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
            {t('about.title_1')}{' '}
            <span className="text-gradient">{t('about.title_val')}</span> {t('about.title_2')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((feature, i) => (
            <FeatureCard key={feature.key} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
