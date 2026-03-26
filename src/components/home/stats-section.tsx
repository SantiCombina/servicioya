'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Users, Briefcase, Star, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-primary-foreground">
      <motion.span>{display}</motion.span>
      {suffix}
    </div>
  );
}

const stats = [
  { icon: Users, value: 1200, suffix: '+', label: 'Profesionales' },
  { icon: Briefcase, value: 15000, suffix: '+', label: 'Servicios Realizados' },
  { icon: Star, value: 4.8, suffix: '', label: 'Calificación Promedio', isStatic: true },
  { icon: MapPin, value: 50, suffix: '+', label: 'Ciudades' },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

export function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              {...cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center py-8 px-4 relative"
            >
              {index < stats.length - 1 && (
                <div className="absolute right-0 top-1/4 h-1/2 w-px bg-primary-foreground/20 hidden md:block" />
              )}
              <div className="p-3 rounded-xl bg-primary-foreground/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              {stat.isStatic ? (
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">{stat.value}</div>
              ) : (
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              )}
              <div className="text-primary-foreground/80 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
