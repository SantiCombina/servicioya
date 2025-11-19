'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-main">
      <div className="container space-y-8 text-center">
        <motion.div className="space-y-4" variants={staggerContainer} initial="initial" animate="animate">
          <motion.h1 className="text-6xl font-bold tracking-tight md:text-7xl" {...fadeInUp}>
            Conecta con <span className="text-primary">profesionales</span> de confianza
          </motion.h1>
          <motion.p
            className="text-2xl text-muted-foreground max-w-4xl mx-auto"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            El marketplace que conecta a quienes ofrecen servicios con quienes los necesitan. Encuentra profesionales
            cerca de ti de manera rápida y segura.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg" className="transition-all duration-300 group">
            <Link href="/signup">
              Comenzar ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explorar servicios</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
