'use client';

import { motion } from 'framer-motion';
import { Wrench, Zap, Home, Users, Cpu, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const services = [
  {
    icon: Wrench,
    title: 'Plomería',
    description: 'Reparaciones y instalaciones de plomería profesional',
    category: 'plomeria',
    count: 48,
    popular: true,
  },
  {
    icon: Zap,
    title: 'Electricidad',
    description: 'Servicios eléctricos certificados para tu hogar',
    category: 'electricidad',
    count: 62,
    popular: true,
  },
  {
    icon: Home,
    title: 'Hogar',
    description: 'Limpieza, jardinería y mantenimiento del hogar',
    category: 'hogar',
    count: 35,
    popular: false,
  },
  {
    icon: Users,
    title: 'Belleza',
    description: 'Peluquería, estética y servicios de belleza a domicilio',
    category: 'belleza',
    count: 29,
    popular: false,
  },
  {
    icon: Cpu,
    title: 'Tecnología',
    description: 'Reparación de dispositivos y soporte técnico',
    category: 'tecnologia',
    count: 41,
    popular: false,
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Instalación de sistemas y cámaras de seguridad',
    category: 'seguridad',
    count: 22,
    popular: false,
  },
];

export function PopularServicesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <motion.div className="text-center space-y-4 mb-14" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Servicios populares</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el profesional que necesitas para tu proyecto en minutos
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link href={`/services?category=${service.category}`}>
                <Card className="p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer h-full group">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-primary/10 w-fit">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      {service.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-base">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">{service.count} servicios</span>
                      <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ver todos <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
