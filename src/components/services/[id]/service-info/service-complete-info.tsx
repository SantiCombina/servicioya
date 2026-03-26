'use client';

import { motion } from 'framer-motion';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Location as LocationType, Service, Category } from '@/payload-types';

interface ServiceCompleteInfoProps {
  service: Service;
  location: LocationType;
  serviceCompletedJobs: number;
}

export function ServiceCompleteInfo({ service, location, serviceCompletedJobs }: ServiceCompleteInfoProps) {
  const category = service.category as Category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">
              Servicios
            </Link>
            <span>/</span>
            <Link
              href={`/services?category=${category?.name?.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {category?.name}
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{service.title}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl leading-snug mb-3">{service.title}</CardTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm">{location.name}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-muted-foreground mb-0.5">Desde</div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                ${service.priceFrom.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">por servicio</div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-5 pt-5">
          <div>
            <h3 className="font-semibold text-base mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {service.availability && (
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-sm">Disponibilidad</div>
                  <div className="text-sm text-muted-foreground">{service.availability}</div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Briefcase className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-sm">Trabajos realizados</div>
                <div className="text-sm text-muted-foreground">{serviceCompletedJobs} contrataciones</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
