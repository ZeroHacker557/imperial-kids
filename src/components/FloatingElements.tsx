import { motion } from 'framer-motion';
import { Star, Cloud, Crown } from 'lucide-react';

interface FloatingItem {
  icon: 'star' | 'cloud' | 'crown';
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

const items: FloatingItem[] = [
  { icon: 'star', x: '8%', y: '15%', size: 24, delay: 0, duration: 6, color: '#F59E0B', opacity: 0.35 },
  { icon: 'crown', x: '85%', y: '10%', size: 28, delay: 1, duration: 7, color: '#1E3A8A', opacity: 0.25 },
  { icon: 'cloud', x: '75%', y: '70%', size: 32, delay: 2, duration: 8, color: '#BFDBFE', opacity: 0.3 },
  { icon: 'star', x: '20%', y: '80%', size: 18, delay: 0.5, duration: 5, color: '#FBBF24', opacity: 0.3 },
  { icon: 'crown', x: '50%', y: '5%', size: 20, delay: 3, duration: 9, color: '#F59E0B', opacity: 0.2 },
  { icon: 'cloud', x: '10%', y: '50%', size: 26, delay: 1.5, duration: 7, color: '#A7F3D0', opacity: 0.25 },
  { icon: 'star', x: '92%', y: '45%', size: 16, delay: 2.5, duration: 6, color: '#DDD6FE', opacity: 0.3 },
  { icon: 'crown', x: '40%', y: '90%', size: 22, delay: 0.8, duration: 8, color: '#1E3A8A', opacity: 0.2 },
  { icon: 'star', x: '65%', y: '25%', size: 14, delay: 1.2, duration: 5, color: '#FED7AA', opacity: 0.35 },
  { icon: 'cloud', x: '30%', y: '35%', size: 30, delay: 3.5, duration: 10, color: '#BFDBFE', opacity: 0.15 },
];

const iconMap = {
  star: Star,
  cloud: Cloud,
  crown: Crown,
};

export default function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item, i) => {
        const Icon = iconMap[item.icon];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: item.x, top: item.y, opacity: item.opacity }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, item.icon === 'crown' ? 10 : -8, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            <Icon size={item.size} color={item.color} strokeWidth={1.5} />
          </motion.div>
        );
      })}
    </div>
  );
}
