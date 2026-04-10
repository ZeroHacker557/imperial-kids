import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Brain, MessageSquareText, Lightbulb, ArrowRight, X, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type TipCategory = 'psychologist' | 'logoped';

interface Tip {
  key: string;
  category: TipCategory;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const tips: Tip[] = [
  { key: 't1', category: 'psychologist', emoji: '🧠', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100' },
  { key: 't2', category: 'psychologist', emoji: '💛', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
  { key: 't3', category: 'logoped', emoji: '🗣️', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
  { key: 't4', category: 'psychologist', emoji: '🌙', color: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-100' },
  { key: 't5', category: 'logoped', emoji: '📖', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
  { key: 't6', category: 'psychologist', emoji: '🎯', color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100' },
];

function TipCard({ tip, index }: { tip: Tip; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { t } = useLanguage();

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`group relative cursor-pointer overflow-hidden rounded-3xl border ${tip.borderColor} bg-white p-6 sm:p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-bordo/5`}
        onClick={() => setIsExpanded(true)}
      >
        {/* Decorative corner gradient */}
        <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${tip.bgColor} opacity-60 transition-transform duration-500 group-hover:scale-[2]`} />
        <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${tip.bgColor} opacity-40 blur-lg`} />

        {/* Category badge */}
        <div className="relative z-10 mb-4 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full ${tip.bgColor} px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${tip.color}`}>
            {tip.category === 'psychologist' ? <Brain size={12} /> : <MessageSquareText size={12} />}
            {t(`experts.${tip.category}_label`)}
          </span>
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          >
            {tip.emoji}
          </motion.span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 mb-3 font-heading text-lg sm:text-xl font-bold text-black leading-snug">
          {t(`experts.${tip.key}_title`)}
        </h3>

        {/* Preview text */}
        <p className="relative z-10 mb-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
          {t(`experts.${tip.key}_preview`)}
        </p>

        {/* Read more link */}
        <div className={`relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold ${tip.color} transition-all group-hover:gap-2.5`}>
          {t('experts.read_more')}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
            tip.category === 'psychologist'
              ? 'from-purple-400 via-bordo to-amber-400'
              : 'from-blue-400 via-bordo to-emerald-400'
          }`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
        />
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            >
              <div
                className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag indicator for mobile */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                  <div className="h-1 w-10 rounded-full bg-gray-300" />
                </div>

                {/* Modal header */}
                <div className={`relative overflow-hidden ${tip.bgColor} px-5 sm:px-8 pt-4 sm:pt-8 pb-5 sm:pb-8 shrink-0`}>
                  {/* Decorative circles */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-md" />
                  <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/15 blur-lg" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${tip.color} mb-2 sm:mb-3`}>
                        {tip.category === 'psychologist' ? <Brain size={13} /> : <MessageSquareText size={13} />}
                        {t(`experts.${tip.category}_label`)}
                      </span>
                      <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-black leading-snug break-words">
                        <span className="mr-1.5">{tip.emoji}</span>
                        {t(`experts.${tip.key}_title`)}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                      className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white/80 text-gray-600 transition hover:bg-white hover:text-black shadow-sm mt-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-5 sm:py-8">
                  <p className="text-gray-600 leading-relaxed text-[14px] sm:text-base whitespace-pre-line break-words">
                    {t(`experts.${tip.key}_full`)}
                  </p>

                  {/* Expert signature */}
                  <div className={`mt-5 sm:mt-8 flex items-center gap-3 rounded-2xl ${tip.bgColor} p-3.5 sm:p-4`}>
                    <div className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${tip.color}`}>
                      {tip.category === 'psychologist' ? <Brain size={16} /> : <MessageSquareText size={16} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-black truncate">
                        {t(`experts.${tip.key}_author`)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {t(`experts.${tip.category}_role`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ExpertTips() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<'all' | TipCategory>('all');
  const { t } = useLanguage();

  const filteredTips = activeFilter === 'all' ? tips : tips.filter(tip => tip.category === activeFilter);

  const filters: { key: 'all' | TipCategory; icon: React.ReactNode }[] = [
    { key: 'all', icon: <Sparkles size={14} /> },
    { key: 'psychologist', icon: <Brain size={14} /> },
    { key: 'logoped', icon: <MessageSquareText size={14} /> },
  ];

  return (
    <section id="experts" className="relative overflow-hidden section-padding" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 50%, #FEF2F3 100%)' }}>
      {/* Background decorative elements */}
      <div className="absolute right-0 top-1/4 -mr-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-100/30 to-blue-100/20 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 -ml-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-bordo/5 to-amber-100/30 blur-3xl pointer-events-none" />

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[15%] top-[10%] h-4 w-4 rounded-full bg-purple-300/30 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute left-[12%] top-[30%] h-6 w-6 rounded-lg bg-blue-300/20 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-[8%] bottom-[25%] h-5 w-5 rounded-full bg-amber-300/25 pointer-events-none hidden lg:block"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
            <BookOpen size={14} />
            {t('experts.badge')}
          </span>
          <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
            {t('experts.title_1')}{' '}
            <span className="text-gradient">{t('experts.title_val')}</span>{' '}
            {t('experts.title_2')}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            {t('experts.subtitle')}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={headingInView ? { opacity: 1, width: '100%' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-gradient-to-r from-purple-400 via-bordo to-blue-400" />
          </motion.div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 sm:mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white p-1.5 shadow-md shadow-gray-200/50 border border-gray-100">
            {filters.map((filter) => (
              <button
                key={filter.key}
                id={`expert-filter-${filter.key}`}
                onClick={() => setActiveFilter(filter.key)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-bordo text-white shadow-md shadow-bordo/20'
                    : 'text-gray-500 hover:text-bordo hover:bg-bordo-50'
                }`}
              >
                {filter.icon}
                {t(`experts.filter_${filter.key}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          layout
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredTips.map((tip, i) => (
              <TipCard key={tip.key} tip={tip} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom info badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-gray-100 px-6 py-4 shadow-sm">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Lightbulb size={22} className="text-amber-500" />
            </motion.div>
            <p className="text-sm sm:text-[15px] text-gray-600 font-medium">
              {t('experts.bottom_note')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
