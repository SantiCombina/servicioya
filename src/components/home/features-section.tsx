'use client';

import { motion } from 'framer-motion';
import { Shield, Star, Search } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.2,
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
    <section className="py-16">
      <div className="container">
        <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight">¿Por qué elegir ServicioYa?</h2>
          <p className="text-lg text-muted-foreground">
            Ofrecemos una plataforma segura y confiable para encontrar los mejores profesionales
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="text-center space-y-4" variants={fadeInUp}>
            <motion.div
              className="mx-auto w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center"
              {...iconFloat}
            >
              <Shield className="w-8 h-8 text-rose-600" />
            </motion.div>
            <h3 className="text-xl font-semibold">Profesionales verificados</h3>
            <p className="text-muted-foreground">
              Todos nuestros profesionales pasan por un riguroso proceso de verificación
            </p>
          </motion.div>

          <motion.div className="text-center space-y-4" variants={fadeInUp}>
            <motion.div
              className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center"
              {...iconFloat}
            >
              <Star className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h3 className="text-xl font-semibold">Reseñas reales</h3>
            <p className="text-muted-foreground">Sistema de calificaciones y reseñas transparente de clientes reales</p>
          </motion.div>

          <motion.div className="text-center space-y-4" variants={fadeInUp}>
            <motion.div
              className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
              {...iconFloat}
            >
              <Search className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold">Búsqueda inteligente</h3>
            <p className="text-muted-foreground">
              Encuentra profesionales cerca de ti con nuestra búsqueda por ubicación
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
