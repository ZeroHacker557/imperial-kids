import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Calculator, Languages, Mic, Palette, MessageCircle,
  Clock, Users, Star, ArrowRight, Dumbbell, ChefHat, Activity, Salad
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const programKeys = [
  {
    key: 'p1',
    badgeIcons: [Calculator, Languages],
    icon: Calculator,
    icon2: Languages,
    features: ['p1_f1', 'p1_f2', 'p1_f3', 'p1_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_teachers',
  },
  {
    key: 'p2',
    badgeIcons: [Dumbbell, Activity],
    icon: Dumbbell,
    features: ['p2_f1', 'p2_f2', 'p2_f3', 'p2_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_trainers',
  },
  {
    key: 'p3',
    badgeIcons: [Palette, Mic],
    icon: Palette,
    icon2: Mic,
    features: ['p3_f1', 'p3_f2', 'p3_f3', 'p3_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_artists',
  },
  {
    key: 'p4',
    badgeIcons: [MessageCircle],
    icon: MessageCircle,
    features: ['p4_f1', 'p4_f2', 'p4_f3', 'p4_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_logo',
  },
  {
    key: 'p5',
    badgeIcons: [ChefHat],
    icon: ChefHat,
    features: ['p5_f1', 'p5_f2', 'p5_f3', 'p5_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_chef',
  },
  {
    key: 'p6',
    badgeIcons: [Salad],
    icon: Star,
    features: ['p6_f1', 'p6_f2', 'p6_f3', 'p6_f4', 'p6_f5'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_dietary',
  },
];

function ProgramCard({
  program,
  index,
}: {
  program: typeof programKeys[0];
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
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-1 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-bordo/5"
    >
      <div className="rounded-[1.3rem] bg-white p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bordo text-white shadow-lg shadow-bordo/20"
          >
            <program.icon size={28} />
          </motion.div>
          <span className="flex items-center gap-1.5 rounded-full bg-bordo-50 px-3 py-1 text-xs font-bold text-bordo">
            {program.badgeIcons && program.badgeIcons.map((IconComp, idx) => (
              <IconComp key={idx} size={14} className="text-bordo" />
            ))}
          </span>
        </div>

        <h3 className="mb-2 font-heading text-2xl font-bold text-black">{t(`programs.${program.key}_title`)}</h3>
        <p className="mb-5 text-sm leading-relaxed text-gray-500">{t(`programs.${program.key}_desc`)}</p>

        {/* Features */}
        <div className="mb-5 flex flex-wrap gap-2">
          {program.features.map((fKey) => (
            <span
              key={fKey}
              className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100"
            >
              {t(`programs.${fKey}`)}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="mt-auto space-y-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={14} />
            <span>{t(`programs.${program.schedule}`)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users size={14} />
            <span>{t(`programs.${program.ratio}`)}</span>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-bordo py-3 text-sm font-bold text-white shadow-md transition hover:bg-bordo-dark hover:shadow-lg"
        >
          {t('programs.btn_more')} <ArrowRight size={14} />
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-gray-50 section-padding"
    >
      {/* Decorative */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-bordo/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-bordo-50/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-bordo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-bordo">
            {t('programs.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
            {t('programs.title_1')}{' '}
            <span className="text-gradient">{t('programs.title_val')}</span> {t('programs.title_2')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            {t('programs.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programKeys.map((program, i) => (
            <ProgramCard key={program.key} program={program} index={i} />
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <Star size={16} className="text-yellow-500" />
          <span>{t('programs.bottom_badge')}</span>
        </motion.div>
      </div>
    </section>
  );
}
