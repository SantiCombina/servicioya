'use client';

import { motion } from 'framer-motion';
import { Wrench, Zap, Home, Users, Search, Shield } from 'lucide-react';

import { Card } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardHover = {
  scale: 1.03,
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

export function PopularServicesSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight">Servicios populares</h2>
          <p className="text-lg text-muted-foreground">Encuentra el profesional que necesitas para tu proyecto</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            {
              icon: Wrench,
              title: 'Plomería',
              description: 'Reparaciones y instalaciones de plomería',
            },
            {
              icon: Zap,
              title: 'Electricidad',
              description: 'Servicios eléctricos profesionales',
            },
            {
              icon: Home,
              title: 'Hogar',
              description: 'Limpieza, jardinería y mantenimiento',
            },
            {
              icon: Users,
              title: 'Belleza',
              description: 'Servicios de peluquería y estética',
            },
            {
              icon: Search,
              title: 'Tecnología',
              description: 'Reparación de dispositivos electrónicos',
            },
            {
              icon: Shield,
              title: 'Seguridad',
              description: 'Instalación de sistemas de seguridad',
            },
          ].map((service, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={cardHover}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="p-3 rounded-lg bg-primary/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
