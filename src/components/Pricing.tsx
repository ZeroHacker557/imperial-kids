import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Clock,
  CalendarDays,
  Check,
  Sparkles,
  ShieldCheck,
  Star,
  X,
  Send,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    const token = '8618409307:AAE6BgQub6at_MWHvuig1HFUwN578pnDaBQ';
    const chatIds = ['8182618985', '7203124812'];
    const text = `📝 <b>Yangi ariza (Narxlar bo'limidan)</b>\n\n👤 Bolaning ismi: ${name}\n📞 Telefon raqam: ${phone}`;

    try {
      await Promise.all(
        chatIds.map(chatId =>
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'HTML',
            }),
          })
        )
      );
      setSuccess(true);
      setName('');
      setPhone('');
      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { key: 'pricing.f1' },
    { key: 'pricing.f2' },
    { key: 'pricing.f3' },
    { key: 'pricing.f4' },
    { key: 'pricing.f5' },
    { key: 'pricing.f6' },
    { key: 'pricing.f7' },
    { key: 'pricing.f8' },
  ];

  return (
    <>
      <section
        id="pricing"
        className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-bordo-50/30 to-white"
      >
        {/* Background decorations */}
        <div className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-bordo-50/30 to-rose-100/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-amber-100/20 to-purple-100/10 blur-3xl pointer-events-none" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-bordo/8 pointer-events-none hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute right-[15%] top-[25%] h-4 w-4 rounded-sm bg-accent/15 rotate-45 pointer-events-none hidden lg:block"
        />

        <div className="mx-auto max-w-5xl relative z-10" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 sm:mb-20 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
              <Crown size={14} />
              {t('pricing.badge')}
            </span>
            <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
              {t('pricing.title_1')}{' '}
              <span className="text-gradient">{t('pricing.title_val')}</span>{' '}
              {t('pricing.title_2')}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
              {t('pricing.subtitle')}
            </p>

            {/* Decorative line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={inView ? { opacity: 1, width: '100%' } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 flex justify-center"
            >
              <div className="h-1.5 w-16 sm:w-20 rounded-full bg-gradient-to-r from-rose-400 via-bordo to-amber-400" />
            </motion.div>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.2 }}
            className="relative mx-auto max-w-2xl"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-bordo/20 via-rose-400/20 to-amber-400/20 blur-xl opacity-60" />

            <div className="relative overflow-hidden rounded-[2rem] bg-white border-2 border-bordo/10 shadow-2xl shadow-bordo/5">
              {/* Top ribbon */}
              <div className="relative bg-gradient-to-r from-bordo via-bordo-light to-bordo px-6 py-5 text-center overflow-hidden">
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                  }}
                />

                {/* Crown + Popular badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                  className="absolute -top-1 -right-1 flex items-center gap-1 rounded-bl-2xl bg-accent px-3 py-1.5 shadow-lg"
                >
                  <Star size={12} className="text-bordo-dark fill-bordo-dark" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-bordo-dark">
                    {t('pricing.popular')}
                  </span>
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block mb-2"
                >
                  <Crown size={28} className="text-accent" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-wide">
                  {t('pricing.plan_name')}
                </h3>
                <p className="text-white/70 text-sm mt-1">{t('pricing.plan_desc')}</p>
              </div>

              {/* Price */}
              <div className="px-6 sm:px-10 pt-8 pb-6 text-center border-b border-gray-100">
                <div className="flex items-baseline justify-center gap-1">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4, type: 'spring', bounce: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-bordo tracking-tight"
                  >
                    2 500 000
                  </motion.span>
                  <span className="text-lg sm:text-xl font-bold text-bordo/60 ml-1">{t('pricing.currency')}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2 font-medium">{t('pricing.per_month')}</p>
              </div>

              {/* Schedule info */}
              <div className="px-6 sm:px-10 py-5 bg-gradient-to-r from-bordo-50/40 via-white to-bordo-50/40">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bordo/10">
                    <Clock size={20} className="text-bordo" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-[15px] font-bold text-gray-800">{t('pricing.schedule_weekday')}</p>
                    <p className="text-sm sm:text-[15px] font-bold text-bordo mt-1">{t('pricing.schedule_weekend')}</p>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="px-6 sm:px-10 py-7">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">{t('pricing.includes')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm shadow-emerald-200 transition-transform duration-300 group-hover:scale-110">
                        <Check size={13} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-gray-600 font-medium leading-snug">{t(f.key)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-6 sm:px-10 pb-8 pt-2">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center py-4 px-6 rounded-2xl bg-gradient-to-r from-bordo via-bordo-light to-bordo text-white font-heading font-bold text-base sm:text-lg tracking-wide shadow-xl shadow-bordo/20 transition-all duration-300 hover:shadow-2xl hover:shadow-bordo/30 relative overflow-hidden cursor-pointer"
                >
                  {/* Button shimmer */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2.5s linear infinite',
                    }}
                  />
                  <span className="relative z-10">{t('pricing.cta')}</span>
                </motion.button>
              </div>

              {/* Bottom guarantee */}
              <div className="px-6 sm:px-10 pb-6">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <p className="text-xs sm:text-sm text-emerald-600 font-medium">{t('pricing.guarantee')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom note */}
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
                <Sparkles size={20} className="text-bordo" />
              </motion.div>
              <p className="text-sm sm:text-[15px] text-gray-600 font-medium">
                {t('pricing.bottom_note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Modal header */}
              <div className="relative bg-gradient-to-r from-bordo via-bordo-light to-bordo px-6 py-6 text-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                  }}
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-3 top-3 rounded-full p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
                >
                  <X size={20} />
                </button>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block mb-2"
                >
                  <Crown size={28} className="text-accent" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-wide">
                  {t('footer.enroll_title')}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {t('footer.enroll_desc')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleEnrollment} className="px-6 py-8 sm:px-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      {t('footer.input_name')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('footer.input_name')}
                      required
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-5 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-bordo focus:bg-white focus:ring-2 focus:ring-bordo/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      {t('footer.input_phone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 __ ___ __ __"
                      required
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-5 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-bordo focus:bg-white focus:ring-2 focus:ring-bordo/10"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bordo via-bordo-light to-bordo py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-bordo/25 transition hover:shadow-xl disabled:opacity-75 relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2.5s linear infinite',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> {t('footer.btn_sending')}</>
                    ) : success ? (
                      t('footer.btn_success')
                    ) : (
                      <>{t('footer.btn_submit')} <Send size={14} /></>
                    )}
                  </span>
                </motion.button>

                {/* Guarantee note */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <p className="text-xs text-emerald-600 font-medium">{t('pricing.guarantee')}</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
