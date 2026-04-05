import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Phone, Send } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
import slogo from '../assets/images/slogo.png';
import { useLanguage } from '../context/LanguageContext';

const navKeys = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'programs', href: '#programs' },
  { key: 'gallery', href: '#gallery' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    // Small delay to let menu close animation start, then scroll
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    });
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-9 w-9 lg:h-11 lg:w-11 shrink-0 overflow-hidden rounded-full shadow-lg ring-2 ring-bordo/20"
            >
              <img src={logo} alt="Imperial Kids" className="h-full w-full object-cover" fetchPriority="high" loading="eager" />
            </motion.div>
            <img src={slogo} alt="Imperial Kids" className="h-4 sm:h-5 lg:h-7 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navKeys.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    scrolled
                      ? 'text-gray-600 hover:text-bordo hover:bg-bordo-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(`navbar.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Lang toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
              className={`flex items-center justify-center rounded-full border-2 px-3 py-1 font-bold transition text-sm ${
                scrolled
                  ? 'border-bordo/30 text-bordo hover:bg-bordo-50'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              {lang === 'uz' ? 'RU' : 'UZ'}
            </button>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
            className="hidden items-center gap-1.5 rounded-full bg-bordo px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-bordo/20 transition hover:bg-bordo-dark hover:shadow-xl hover:shadow-bordo/30 lg:inline-flex"
          >
            {t('navbar.enroll')} <Sparkles size={16} />
          </motion.a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Lang Toggle */}
            <button
              onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
              className={`flex items-center justify-center rounded-full border px-3 py-1 font-bold transition text-xs ${
                scrolled
                  ? 'border-bordo/30 text-bordo'
                  : 'border-white/40 text-white'
              }`}
            >
              {lang === 'uz' ? 'RU' : 'UZ'}
            </button>
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                scrolled
                  ? 'bg-bordo-50 text-bordo hover:bg-bordo-100'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[55] w-[80%] max-w-sm bg-white shadow-2xl lg:hidden"
            >
              {/* Nav Links */}
              <nav className="px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {navKeys.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3.5 font-semibold text-gray-700 transition-colors hover:bg-bordo-50 hover:text-bordo active:bg-bordo-100"
                      >
                        <span className="text-lg">{t(`navbar.${link.key}`)}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + navKeys.length * 0.05 }}
                  className="mt-6 px-4"
                >
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                    className="flex justify-center items-center gap-1.5 rounded-2xl bg-bordo px-6 py-4 text-center font-bold text-white shadow-lg shadow-bordo/20 transition hover:bg-bordo-dark hover:shadow-xl"
                  >
                    {t('navbar.enroll')} <Sparkles size={16} />
                  </a>
                </motion.div>

                {/* Contact info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + navKeys.length * 0.05 }}
                  className="mt-8 border-t border-gray-100 px-4 pt-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{t('navbar.contact_title')}</p>
                  <a href="tel:+998951850900" className="flex items-center gap-2 text-sm text-gray-500 mb-2 hover:text-bordo transition">
                    <Phone size={14} /> +998 95 185 09 00
                  </a>
                  <a href="tel:+998555180900" className="flex items-center gap-2 text-sm text-gray-500 mb-2 hover:text-bordo transition">
                    <Phone size={14} /> +998 55 518 09 00
                  </a>
                  <a href="https://t.me/imperialkids_admin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-bordo transition">
                    <Send size={14} /> @imperialkids_admin
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
