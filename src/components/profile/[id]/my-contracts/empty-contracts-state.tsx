'use client';

import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyContractsStateProps {
  activeFilter: string;
  onShowAll: () => void;
}

export function EmptyContractsState({ activeFilter, onShowAll }: EmptyContractsStateProps) {
  if (activeFilter === 'all') {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No tienes contratos aún</h3>
          <p className="text-muted-foreground mb-6">Explora los servicios disponibles y contrata el que necesites.</p>
          <Link href="/services">
            <Button>Explorar servicios</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No hay contratos {activeFilter === 'pending' && 'pendientes'}
          {activeFilter === 'confirmed' && 'confirmados'}
          {activeFilter === 'completed' && 'completados'}
        </h3>
        <p className="text-muted-foreground mb-6">No tienes contratos en esta categoría actualmente.</p>
        <Button onClick={onShowAll} variant="outline">
          Ver todos los contratos
        </Button>
      </CardContent>
    </Card>
  );
}
