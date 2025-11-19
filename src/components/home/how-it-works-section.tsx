'use client';

import { motion } from 'framer-motion';
import { Search, Users, Shield } from 'lucide-react';

import { Card } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
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

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.h3 className="text-3xl font-bold text-center mb-12 text-foreground" {...fadeInUp}>
          ¿Cómo Funciona?
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <motion.div
                className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4"
                {...iconFloat}
              >
                <Search className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">1. Busca</h4>
              <p className="text-muted-foreground">Encuentra el servicio que necesitas por categoría o ubicación</p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <motion.div
                className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
                {...iconFloat}
              >
                <Users className="w-8 h-8 text-green-600" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">2. Conecta</h4>
              <p className="text-muted-foreground">Revisa perfiles, calificaciones y contacta al profesional ideal</p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <motion.div
                className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4"
                {...iconFloat}
              >
                <Shield className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">3. Contrata</h4>
              <p className="text-muted-foreground">Agenda el servicio y califica tu experiencia al finalizar</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
