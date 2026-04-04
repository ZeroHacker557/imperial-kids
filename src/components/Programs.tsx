import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Calculator, Languages, Mic, Palette, Theater, MessageCircle,
  Clock, Users, Star, ArrowRight, Dumbbell, ChefHat, Activity, Salad
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const programKeys = [
  {
    key: 'p1',
    badgeIcons: [Calculator, Languages],
    icon: Calculator,
    icon2: Languages,
    gradient: 'from-sky-light to-lavender-light',
    border: 'border-blue-200',
    iconBg: 'bg-blue-500',
    features: ['p1_f1', 'p1_f2', 'p1_f3', 'p1_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_teachers',
  },
  {
    key: 'p2',
    badgeIcons: [Dumbbell, Activity],
    icon: Dumbbell,
    gradient: 'from-mint-light to-cream-dark',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-500',
    features: ['p2_f1', 'p2_f2', 'p2_f3', 'p2_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_trainers',
  },
  {
    key: 'p3',
    badgeIcons: [Palette, Mic],
    icon: Palette,
    icon2: Mic,
    gradient: 'from-rose-light to-peach-light',
    border: 'border-rose-200',
    iconBg: 'bg-rose-400',
    features: ['p3_f1', 'p3_f2', 'p3_f3', 'p3_f4'],
    schedule: 'sch_weekdays',
    ratio: 'ratio_artists',
  },
  {
    key: 'p4',
    badgeIcons: [MessageCircle],
    icon: MessageCircle,
    gradient: 'from-lavender-light to-sky-light',
    border: 'border-purple-200',
    iconBg: 'bg-purple-500',
    features: ['p4_f1', 'p4_f2', 'p4_f3', 'p4_f4'],
    schedule: 'sch_weekly',
    ratio: 'ratio_logo',
  },
  {
    key: 'p5',
    badgeIcons: [ChefHat],
    icon: ChefHat,
    gradient: 'from-peach-light to-cream-dark',
    border: 'border-orange-200',
    iconBg: 'bg-orange-400',
    features: ['p5_f1', 'p5_f2', 'p5_f3', 'p5_f4'],
    schedule: 'sch_twice',
    ratio: 'ratio_chef',
  },
  {
    key: 'p6',
    badgeIcons: [Salad],
    icon: Star,
    gradient: 'from-cream-dark to-mint-light',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    features: ['p6_f1', 'p6_f2', 'p6_f3', 'p6_f4', 'p6_f5'],
    schedule: 'sch_daily',
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
      className={`group relative overflow-hidden rounded-3xl border ${program.border} bg-gradient-to-br ${program.gradient} p-1 shadow-sm transition-shadow duration-300 hover:shadow-2xl`}
    >
      <div className="rounded-[1.3rem] bg-white/70 backdrop-blur-sm p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            whileHover={{ rotate: 15 }}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${program.iconBg} text-white shadow-lg`}
          >
            <program.icon size={28} />
          </motion.div>
          <span className="flex items-center gap-1.5 rounded-full bg-royal/10 px-3 py-1 text-xs font-bold text-royal">
            {program.badgeIcons && program.badgeIcons.map((IconComp, idx) => (
              <IconComp key={idx} size={14} className="text-royal" />
            ))}
          </span>
        </div>

        <h3 className="mb-2 font-heading text-2xl font-bold text-royal">{t(`programs.${program.key}_title`)}</h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{t(`programs.${program.key}_desc`)}</p>

        {/* Features */}
        <div className="mb-5 flex flex-wrap gap-2">
          {program.features.map((fKey) => (
            <span
              key={fKey}
              className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-royal/70 shadow-sm"
            >
              {t(`programs.${fKey}`)}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="mt-auto space-y-2 border-t border-slate-200/60 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={14} />
            <span>{t(`programs.${program.schedule}`)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users size={14} />
            <span>{t(`programs.${program.ratio}`)}</span>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-royal py-3 text-sm font-bold text-white shadow-md transition hover:bg-royal-light hover:shadow-lg"
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
      className="relative overflow-hidden bg-gradient-to-b from-white to-cream section-padding"
    >
      {/* Decorative */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-gold/8 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-royal/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-royal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-royal">
            {t('programs.badge')}
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-royal sm:text-4xl md:text-5xl">
            {t('programs.title_1')}{' '}
            <span className="text-gradient">{t('programs.title_val')}</span> {t('programs.title_2')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
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
          className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500"
        >
          <Star size={16} className="text-gold" />
          <span>{t('programs.bottom_badge')}</span>
        </motion.div>
      </div>
    </section>
  );
}
