import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Sun, Coffee, BookOpen, Palette, Apple, Moon, Utensils, Music, Dumbbell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ScheduleItem {
  key: string;
  icon: React.ElementType;
  time: string;
  gradient: string;
  iconBg: string;
  dotColor: string;
}

const scheduleItems: ScheduleItem[] = [
  { key: 's1', icon: Sun,      time: '7:30',  gradient: 'from-amber-400 to-orange-400', iconBg: 'bg-amber-50 text-amber-600', dotColor: 'bg-amber-400' },
  { key: 's2', icon: Coffee,   time: '8:30',  gradient: 'from-orange-400 to-rose-400',  iconBg: 'bg-orange-50 text-orange-600', dotColor: 'bg-orange-400' },
  { key: 's3', icon: BookOpen,  time: '9:00',  gradient: 'from-blue-400 to-indigo-400',  iconBg: 'bg-blue-50 text-blue-600', dotColor: 'bg-blue-400' },
  { key: 's4', icon: Apple,    time: '10:30', gradient: 'from-emerald-400 to-teal-400', iconBg: 'bg-emerald-50 text-emerald-600', dotColor: 'bg-emerald-400' },
  { key: 's5', icon: Dumbbell, time: '11:00', gradient: 'from-red-400 to-rose-500',     iconBg: 'bg-red-50 text-red-600', dotColor: 'bg-red-400' },
  { key: 's6', icon: Utensils, time: '12:30', gradient: 'from-yellow-400 to-amber-500', iconBg: 'bg-yellow-50 text-yellow-600', dotColor: 'bg-yellow-400' },
  { key: 's7', icon: Moon,     time: '13:00', gradient: 'from-indigo-400 to-purple-400', iconBg: 'bg-indigo-50 text-indigo-600', dotColor: 'bg-indigo-400' },
  { key: 's8', icon: Music,    time: '15:00', gradient: 'from-pink-400 to-fuchsia-400', iconBg: 'bg-pink-50 text-pink-600', dotColor: 'bg-pink-400' },
  { key: 's9', icon: Palette,  time: '15:30', gradient: 'from-purple-400 to-violet-400', iconBg: 'bg-purple-50 text-purple-600', dotColor: 'bg-purple-400' },
  { key: 's10', icon: Coffee,  time: '16:30', gradient: 'from-teal-400 to-cyan-400',   iconBg: 'bg-teal-50 text-teal-600', dotColor: 'bg-teal-400' },
  { key: 's11', icon: Sun,     time: '17:00', gradient: 'from-rose-400 to-pink-400',   iconBg: 'bg-rose-50 text-rose-600', dotColor: 'bg-rose-400' },
];

function TimelineItem({ item, index, isLast }: { item: ScheduleItem; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const { t } = useLanguage();
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative flex items-start gap-4 sm:gap-5"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        {/* Animated dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.06 + 0.2, type: 'spring', bounce: 0.5 }}
          className="relative z-10"
        >
          <div className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full ${item.dotColor} shadow-lg ring-4 ring-white`} />
          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className={`absolute inset-0 rounded-full ${item.dotColor} opacity-30`}
          />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 0.6, delay: index * 0.06 + 0.3 }}
            className="w-0.5 flex-1 bg-gradient-to-b from-gray-200 to-gray-100 min-h-[60px]"
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="group relative flex-1 mb-4 sm:mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-200"
      >
        {/* Gradient accent top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg} shadow-sm transition-transform duration-300`}
          >
            <Icon size={20} />
          </motion.div>

          {/* Text content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${item.gradient} px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white shadow-sm`}>
                <Clock size={10} />
                {item.time}
              </span>
            </div>
            <h4 className="font-heading text-sm sm:text-base font-bold text-gray-900 leading-snug">
              {t(`schedule.${item.key}_title`)}
            </h4>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
              {t(`schedule.${item.key}_desc`)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DailySchedule() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="schedule" className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-bordo-50/20 to-white">
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 -mr-40 -mt-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-100/30 to-rose-100/20 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 -ml-40 -mb-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-100/20 to-purple-100/20 blur-3xl pointer-events-none" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] top-[8%] text-3xl pointer-events-none hidden lg:block opacity-20"
      >
        ☀️
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute left-[8%] bottom-[15%] text-3xl pointer-events-none hidden lg:block opacity-20"
      >
        🌙
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[20%] bottom-[30%] text-2xl pointer-events-none hidden lg:block opacity-15"
      >
        ⭐
      </motion.div>

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
            <Clock size={14} />
            {t('schedule.badge')}
          </span>
          <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
            {t('schedule.title_1')}{' '}
            <span className="text-gradient">{t('schedule.title_val')}</span>{' '}
            {t('schedule.title_2')}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            {t('schedule.subtitle')}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={headingInView ? { opacity: 1, width: '100%' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-gradient-to-r from-amber-400 via-bordo to-indigo-400" />
          </motion.div>
        </motion.div>

        {/* Schedule info badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 sm:mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white border border-gray-100 px-5 py-3 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bordo-50 text-bordo">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">{t('schedule.working_hours')}</p>
              <p className="text-[11px] text-gray-500">{t('schedule.working_days')}</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-2 sm:pl-4">
          {scheduleItems.map((item, i) => (
            <TimelineItem
              key={item.key}
              item={item}
              index={i}
              isLast={i === scheduleItems.length - 1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-14"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-bordo to-bordo-dark p-6 sm:p-8 text-center text-white shadow-lg shadow-bordo/15">
            {/* Decorations */}
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 blur-lg pointer-events-none" />
            <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/5 blur-lg pointer-events-none" />

            <div className="relative z-10">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block text-2xl sm:text-3xl mb-3"
              >
                🍽️
              </motion.span>
              <p className="text-sm sm:text-base font-semibold text-white/90 max-w-md mx-auto leading-relaxed">
                {t('schedule.bottom_note')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
