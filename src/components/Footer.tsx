import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  ArrowUp,
  MessageCircle,
  Crown,
  Loader2,
  X,
} from 'lucide-react';
import logo from '../assets/images/logo.jpg';
import slogo from '../assets/images/slogo.png';
import { useLanguage } from '../context/LanguageContext';

/* Custom social SVG icons */
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
);
const TelegramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
);

const quickKeys = [
  { key: 'navbar.home', href: '#home' },
  { key: 'navbar.about', href: '#about' },
  { key: 'navbar.programs', href: '#programs' },
  { key: 'navbar.gallery', href: '#gallery' },
  { key: 'navbar.testimonials', href: '#testimonials' },
];

const programKeys = [
  { key: 'programs.p1_title', href: '#programs' },
  { key: 'programs.p2_title', href: '#programs' },
  { key: 'programs.p3_title', href: '#programs' },
  { key: 'programs.p3_f3', href: '#programs' },
  { key: 'programs.p4_title', href: '#programs' },
  { key: 'programs.p5_title', href: '#programs' },
];

const socials = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/imperialkids_uz', label: 'Instagram' },
  { icon: TelegramIcon, href: 'https://t.me/imperialkidsuz', label: 'Telegram' },
  { icon: MessageCircle, href: 'https://t.me/imperialkids_admin', label: 'Admin' },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgSubscribed, setMsgSubscribed] = useState(false);
  const { t } = useLanguage();

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    const token = '8618409307:AAE6BgQub6at_MWHvuig1HFUwN578pnDaBQ';
    const chatIds = ['8182618985', '7203124812'];
    const text = `📝 <b>Yangi ariza (Bog'chaga yozilish)</b>\n\n👤 Bolaning ismi: ${name}\n📞 Telefon raqam: ${phone}`;

    try {
      await Promise.all(
        chatIds.map(chatId =>
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'HTML',
            }),
          })
        )
      );
      setSubscribed(true);
      setName('');
      setPhone('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText) return;

    setMsgLoading(true);
    const token = '8618409307:AAE6BgQub6at_MWHvuig1HFUwN578pnDaBQ';
    const chatIds = ['8182618985', '7203124812'];
    const text = `✉️ <b>Yangi anonim xabar (Ma'muriyatga)</b>\n\n💬 Xabar: ${msgText}`;

    try {
      await Promise.all(
        chatIds.map(chatId =>
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'HTML',
            }),
          })
        )
      );
      setMsgSubscribed(true);
      setMsgText('');
      setTimeout(() => {
        setMsgSubscribed(false);
        setIsMsgModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setMsgLoading(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="relative overflow-hidden bg-black pt-20 pb-8 text-white/90">
      {/* Decorative top wave */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L60 35C120 30 240 20 360 18C480 16 600 22 720 30C840 38 960 48 1080 50C1200 52 1320 46 1380 43L1440 40V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V40Z"
            className="fill-gray-50"
          />
        </svg>
      </div>

      {/* Glow orbs */}
      <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-bordo/10 blur-3xl" />
      <div className="absolute right-0 bottom-1/3 h-64 w-64 rounded-full bg-bordo/5 blur-3xl" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl bg-white/10 p-8 text-center backdrop-blur sm:p-12"
        >
          <h3 className="mb-3 flex items-center justify-center gap-2 font-heading text-2xl font-bold text-white sm:text-3xl">
            {t('footer.enroll_title')} <Crown className="text-yellow-400" />
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-white/70">
            {t('footer.enroll_desc')}
          </p>
          <form
            onSubmit={handleEnrollment}
            className="mx-auto flex max-w-lg flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="enroll-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('footer.input_name')}
                required
                className="flex-1 rounded-full bg-white/15 px-6 py-3.5 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/20 transition focus:ring-bordo"
              />
              <input
                id="enroll-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('footer.input_phone')}
                required
                className="flex-1 rounded-full bg-white/15 px-6 py-3.5 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/20 transition focus:ring-bordo"
              />
            </div>
            <motion.button
              id="enroll-submit"
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 mx-auto flex sm:w-auto w-full items-center justify-center gap-2 rounded-full bg-bordo px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-bordo/25 transition hover:bg-bordo-dark hover:shadow-xl disabled:opacity-75"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> {t('footer.btn_sending')}</>
              ) : subscribed ? (
                t('footer.btn_success')
              ) : (
                <>{t('footer.btn_submit')} <Send size={14} /></>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-bordo/40 shadow-lg">
                <img src={logo} alt="Imperial Kids" className="h-full w-full object-cover" />
              </div>
              <img src={slogo} alt="Imperial Kids" className="h-5 sm:h-6 w-auto object-contain" />
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/60">
              {t('footer.brand_desc')}
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={label === 'Admin' ? '#' : href}
                  target={label === 'Admin' ? '_self' : '_blank'}
                  rel={label === 'Admin' ? '' : 'noopener noreferrer'}
                  onClick={label === 'Admin' ? (e) => { e.preventDefault(); setIsMsgModalOpen(true); } : undefined}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-bordo hover:text-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 font-heading text-lg font-bold text-white">{t('footer.quick_links')}</h4>
            <ul className="space-y-2.5">
              {quickKeys.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-bordo-light hover:translate-x-1 inline-block"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 font-heading text-lg font-bold text-white">{t('footer.programs')}</h4>
            <ul className="space-y-2.5">
              {programKeys.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-bordo-light hover:translate-x-1 inline-block"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="mb-4 font-heading text-lg font-bold text-white">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-bordo-light" />
                <span>{t('footer.address')}</span>
              </li>
              <li>
                <a href="tel:+998951850900" className="flex items-center gap-3 text-sm text-white/60 transition hover:text-bordo-light">
                  <Phone size={16} className="shrink-0 text-bordo-light" />
                  <span>+998 95 185 09 00</span>
                </a>
              </li>
              <li>
                <a href="tel:+998555180900" className="flex items-center gap-3 text-sm text-white/60 transition hover:text-bordo-light">
                  <Phone size={16} className="shrink-0 text-bordo-light" />
                  <span>+998 55 518 09 00</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/imperialkids_admin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/60 transition hover:text-bordo-light">
                  <MessageCircle size={16} className="shrink-0 text-bordo-light" />
                  <span>@imperialkids_admin</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Clock size={16} className="mt-0.5 shrink-0 text-bordo-light" />
                <span className="whitespace-pre-line">{t('footer.schedule')}</span>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-5 block overflow-hidden rounded-2xl bg-white/10 p-1 backdrop-blur">
              <div className="overflow-hidden rounded-xl h-48">
                <iframe
                  title="Imperial Kids Manzili"
                  src="https://maps.google.com/maps?q=41.275643,69.366246&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="tel:+998951850900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-bordo px-6 py-3 text-sm font-bold text-white shadow-lg shadow-bordo/25"
          >
            <Phone size={16} />
            {t('footer.btn_call')}
          </motion.a>
          <motion.a
            href="https://t.me/imperialkids_admin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
          >
            <Send size={16} />
            {t('footer.btn_tg')}
          </motion.a>
          <motion.a
            href="https://www.instagram.com/imperialkids_uz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
          >
            <InstagramIcon size={16} />
            Instagram
          </motion.a>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-bordo text-white shadow-lg transition hover:shadow-xl"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {isMsgModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMsgModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setIsMsgModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl font-heading">
                {t('footer.msg_title')}
              </h3>
              <p className="mb-6 text-sm text-white/70">
                {t('footer.msg_desc')}
              </p>

              <form onSubmit={handleMessageSubmit} className="flex flex-col gap-4">
                <textarea
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder={t('footer.input_msg')}
                  required
                  rows={4}
                  className="w-full rounded-2xl bg-white/5 px-5 py-3 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/20 transition focus:ring-bordo resize-none"
                />
                <motion.button
                  type="submit"
                  disabled={msgLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-bordo px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-bordo/25 transition hover:bg-bordo-dark hover:shadow-xl disabled:opacity-75"
                >
                  {msgLoading ? (
                    <><Loader2 size={16} className="animate-spin" /> {t('footer.btn_sending')}</>
                  ) : msgSubscribed ? (
                    t('footer.btn_success')
                  ) : (
                    <>{t('footer.btn_submit')} <Send size={16} /></>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
