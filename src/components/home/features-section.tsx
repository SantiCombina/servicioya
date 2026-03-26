'use client';

import { motion } from 'framer-motion';
import { Shield, Star, Search, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const iconFloat = {
  whileInView: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div className="text-center space-y-4 mb-14" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">¿Por qué elegir ServicioYa?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una plataforma segura y confiable para encontrar los mejores profesionales
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="p-8 h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <motion.div className="p-4 rounded-2xl bg-primary/10 w-fit" {...iconFloat}>
                    <Shield className="w-7 h-7 text-primary" />
                  </motion.div>
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verificado
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Profesionales verificados</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Todos nuestros profesionales pasan por un riguroso proceso de verificación de identidad y
                    antecedentes.
                  </p>
                </div>
                <p className="text-sm font-medium text-primary">+1.200 profesionales activos</p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-8 h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <motion.div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/30 w-fit" {...iconFloat}>
                    <Star className="w-7 h-7 text-amber-500" />
                  </motion.div>
                  <Badge variant="secondary" className="text-xs">
                    Transparente
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Reseñas reales</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sistema de calificaciones y reseñas transparente de clientes reales. Sin reseñas falsas.
                  </p>
                </div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">4.8 ★ de calificación promedio</p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-8 h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <motion.div className="p-4 rounded-2xl bg-sky-100 dark:bg-sky-950/30 w-fit" {...iconFloat}>
                    <Search className="w-7 h-7 text-sky-600 dark:text-sky-400" />
                  </motion.div>
                  <Badge variant="secondary" className="text-xs">
                    Inteligente
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Búsqueda inteligente</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Encuentra profesionales cerca de ti con nuestra búsqueda por ubicación, categoría y precio.
                  </p>
                </div>
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">Disponible en 50+ ciudades</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
