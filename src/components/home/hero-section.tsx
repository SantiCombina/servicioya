'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users } from 'lucide-react';
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
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container space-y-8 text-center">
        <motion.div className="space-y-5" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div {...fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5 fill-primary" />
              El marketplace de servicios #1 de Argentina
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Conecta con <span className="text-primary">profesionales</span>
            <br className="hidden sm:block" /> de confianza
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
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
          <Button asChild size="lg" className="transition-all duration-300 group text-base px-8">
            <Link href="/signup">
              Comenzar ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8">
            <Link href="/services">Explorar servicios</Link>
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-primary" />
            1.200+ Profesionales verificados
          </span>
          <span className="hidden sm:block text-border">·</span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            4.8 de calificación promedio
          </span>
          <span className="hidden sm:block text-border">·</span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            15.000+ servicios realizados
          </span>
        </motion.div>
      </div>
    </section>
  );
}
