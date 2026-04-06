import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, GraduationCap, BookOpen, Heart, Users, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import Character Mascot
import characterImg from '../assets/images/character.png';

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
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-bordo-50 transition-transform duration-500 group-hover:scale-150" />

      <motion.div
        whileHover={{ rotate: 10 }}
        className={`mb-5 relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 shadow-sm transition-colors duration-300 group-hover:bg-white ${feature.iconColor}`}
      >
        <feature.icon size={28} />
      </motion.div>
      <h3 className="mb-3 relative z-10 font-heading text-xl font-bold text-black">{t(`about.${feature.key}_title`)}</h3>
      <p className="text-sm relative z-10 leading-relaxed text-gray-500">{t(`about.${feature.key}_desc`)}</p>
    </motion.div>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white section-padding overflow-hidden">
      {/* Subtle background blob */}
      <div className="absolute right-0 top-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-yellow-100/40 to-bordo/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Intro Section with Character */}
        <div className="mb-16 md:mb-24 flex flex-col items-center justify-between gap-10 md:gap-14 lg:flex-row lg:gap-16">
          
          {/* Text Content */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, x: -40 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
          >
            <span className="mb-4 inline-block rounded-full bg-bordo-50 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-bordo">
              {t('about.badge')}
            </span>
            <h2 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl">
              {t('about.title_1')}{' '}
              <span className="text-gradient leading-tight">{t('about.title_val')}</span><br className="hidden md:block" />{' '}
              {t('about.title_2')}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg lg:mx-0">
              {t('about.subtitle')}
            </p>
            
            {/* Added a decorative element to point from text to grid/mascot */}
            <motion.div 
               initial={{ opacity: 0, width: 0 }}
               animate={headingInView ? { opacity: 1, width: "100%" } : {}}
               transition={{ delay: 0.8, duration: 1 }}
               className="mt-6 sm:mt-8 flex justify-center lg:justify-start w-full"
            >
               <div className="h-1.5 w-16 sm:w-20 md:w-24 rounded-full bg-gradient-to-r from-bordo to-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Character Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={headingInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative flex w-full justify-center lg:w-1/2 lg:justify-end cursor-grab active:cursor-grabbing pb-8 lg:pb-0"
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background shape behind character */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="h-56 w-56 sm:h-72 sm:w-72 lg:h-[350px] lg:w-[350px] rounded-[40%] bg-gradient-to-br from-yellow-300/25 to-bordo/15 blur-2xl md:blur-3xl"
              />
            </div>
            
            <motion.img 
              whileHover={{ scale: 1.05, rotate: 2 }}
              src={characterImg} 
              alt="Imperial Kids Mascot" 
              className="relative z-10 w-56 sm:w-72 md:w-80 lg:w-[450px] object-contain drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(179,0,27,0.3)] transition-all duration-300"
            />
            
            {/* Small floating decorative items */}
            <motion.div 
               animate={{ y: [0, -10, 0] }} 
               transition={{ duration: 3, repeat: Infinity, delay: 1 }} 
               className="absolute left-4 sm:left-10 top-10 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-yellow-400/30 blur-sm pointer-events-none" 
            />
            <motion.div 
               animate={{ y: [0, 15, 0] }} 
               transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} 
               className="absolute right-4 sm:right-10 bottom-12 sm:bottom-16 h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-bordo/20 blur-md pointer-events-none" 
            />
          </motion.div>

        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-20">
          {featureKeys.map((feature, i) => (
            <FeatureCard key={feature.key} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
