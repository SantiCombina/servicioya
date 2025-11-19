'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { Card } from '@/components/ui/card';

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
    <div ref={ref} className="text-4xl font-bold mb-2 text-primary">
      <motion.span>{display}</motion.span>
      {suffix}
    </div>
  );
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' },
};

export function StatsSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div {...cardVariants} transition={{ duration: 0.5, delay: 0 }}>
            <Card className="bg-card p-6">
              <AnimatedNumber value={1200} suffix="+" />
              <div className="text-muted-foreground">Profesionales</div>
            </Card>
          </motion.div>
          <motion.div {...cardVariants} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="bg-card p-6">
              <AnimatedNumber value={15000} suffix="+" />
              <div className="text-muted-foreground">Servicios Realizados</div>
            </Card>
          </motion.div>
          <motion.div {...cardVariants} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="bg-card p-6">
              <div className="text-4xl font-bold mb-2 text-primary">4.8</div>
              <div className="text-muted-foreground">Calificación Promedio</div>
            </Card>
          </motion.div>
          <motion.div {...cardVariants} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="bg-card p-6">
              <AnimatedNumber value={50} suffix="+" />
              <div className="text-muted-foreground">Ciudades</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
