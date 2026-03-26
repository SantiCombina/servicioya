'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

import { BookServiceDialog } from '@/components/services/[id]/book-service-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Service, User } from '@/payload-types';

interface ContactActionsProps {
  service: Service;
  currentUser: User | null;
}

export function ContactActions({ service, currentUser }: ContactActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="shadow-md">
        <CardContent className="pt-5 space-y-3">
          <div className="text-center pb-1">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${service.priceFrom.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Precio desde</p>
          </div>
          <BookServiceDialog service={service} currentUser={currentUser}>
            <Button className="w-full" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Contratar servicio
            </Button>
          </BookServiceDialog>
        </CardContent>
      </Card>
    </motion.div>
  );
}
