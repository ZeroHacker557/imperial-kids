import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

const faqIcons = [
  '🏫', '📚', '🍎', '🕐', '👶', '🎨', '🛡️', '💰'
];

function FAQItem({ qKey, index, icon }: { qKey: string; index: number; icon: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <motion.div
        layout
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isOpen
            ? 'border-bordo/20 bg-gradient-to-br from-white to-bordo-50/50 shadow-lg shadow-bordo/5'
            : 'border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-bordo/10'
        }`}
      >
        {/* Decorative accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-bordo to-bordo-light rounded-l-2xl"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originY: 0 }}
        />

        {/* Question button */}
        <button
          id={`faq-toggle-${qKey}`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors duration-200"
          aria-expanded={isOpen}
        >
          {/* Emoji icon */}
          <motion.span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bordo-50 text-lg transition-colors duration-300 group-hover:bg-bordo-100"
            animate={isOpen ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {icon}
          </motion.span>

          {/* Question text */}
          <span
            className={`flex-1 font-heading text-[15px] sm:text-base font-bold transition-colors duration-200 ${
              isOpen ? 'text-bordo' : 'text-gray-800 group-hover:text-bordo'
            }`}
          >
            {t(`faq.${qKey}_q`)}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
              isOpen
                ? 'bg-bordo text-white'
                : 'bg-gray-100 text-gray-400 group-hover:bg-bordo-50 group-hover:text-bordo'
            }`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pl-[4.75rem]">
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="text-sm sm:text-[15px] leading-relaxed text-gray-500"
                >
                  {t(`faq.${qKey}_a`)}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="faq" className="relative bg-white section-padding overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-0 -ml-40 -mt-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-bordo/5 to-yellow-100/30 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 -mr-32 -mb-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-bordo/5 to-yellow-100/20 blur-3xl pointer-events-none" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] top-[15%] h-16 w-16 rounded-2xl bg-bordo/5 blur-sm pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-[8%] bottom-[20%] h-20 w-20 rounded-full bg-yellow-400/10 blur-sm pointer-events-none hidden lg:block"
      />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
            <HelpCircle size={14} />
            {t('faq.badge')}
          </span>
          <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
            {t('faq.title_1')}{' '}
            <span className="text-gradient">{t('faq.title_val')}</span>{' '}
            {t('faq.title_2')}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            {t('faq.subtitle')}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={headingInView ? { opacity: 1, width: '100%' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <div className="h-1.5 w-16 sm:w-20 rounded-full bg-gradient-to-r from-bordo to-yellow-400" />
          </motion.div>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqKeys.map((qKey, i) => (
            <FAQItem key={qKey} qKey={qKey} index={i} icon={faqIcons[i]} />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bordo to-bordo-dark p-8 sm:p-10 text-center text-white shadow-xl shadow-bordo/20">
            {/* Card decorations */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-lg pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-white/5 blur-lg pointer-events-none" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute right-8 top-8 h-6 w-6 text-white/20 pointer-events-none"
            >
              ✦
            </motion.div>

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm"
              >
                <MessageCircleQuestion size={28} className="text-white" />
              </motion.div>
              <h3 className="mb-3 font-heading text-xl sm:text-2xl font-bold">
                {t('faq.cta_title')}
              </h3>
              <p className="mx-auto mb-6 max-w-md text-sm sm:text-base text-white/80">
                {t('faq.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.a
                  href="tel:+998951850900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-bordo shadow-lg transition hover:shadow-xl"
                >
                  📞 {t('faq.cta_call')}
                </motion.a>
                <motion.a
                  href="https://t.me/imperialkids_admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/50"
                >
                  ✈️ {t('faq.cta_telegram')}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
