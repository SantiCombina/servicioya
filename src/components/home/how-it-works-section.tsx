'use client';

import { motion } from 'framer-motion';
import { Search, Users, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Busca',
    description: 'Encuentra el servicio que necesitas por categoría o ubicación con nuestra búsqueda inteligente.',
    iconClass: 'bg-primary/10 text-primary',
  },
  {
    number: '02',
    icon: Users,
    title: 'Conecta',
    description: 'Revisa perfiles, calificaciones y contacta al profesional ideal para tu proyecto.',
    iconClass: 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Contrata',
    description: 'Agenda el servicio, recibe la atención y califica tu experiencia al finalizar.',
    iconClass: 'bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div className="text-center space-y-4 mb-14" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">¿Cómo funciona?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            En tres simples pasos conectas con el profesional perfecto
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px border-t-2 border-dashed border-border hidden md:block" />

          {steps.map((step, index) => (
            <motion.div key={index} variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Card className="text-center p-8 bg-card border-border/60 relative overflow-hidden hover:border-primary/20 hover:shadow-sm transition-all duration-300">
                <span className="absolute -top-2 -right-2 text-8xl font-black text-foreground/5 select-none leading-none">
                  {step.number}
                </span>
                <div
                  className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${step.iconClass}`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">¿Listo para empezar?</p>
          <Button asChild size="lg" className="group">
            <Link href="/services">
              Explorar servicios
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
