import { Calendar, MessageCircle } from 'lucide-react';

import { BookServiceDialog } from '@/components/services/[id]/book-service-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Service, User } from '@/payload-types';

interface ContactActionsProps {
  service: Service;
  currentUser: User | null;
}

export function ContactActions({ service, currentUser }: ContactActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contactar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <BookServiceDialog service={service} currentUser={currentUser}>
          <Button className="w-full" size="lg">
            <Calendar className="w-4 h-4 mr-2" />
            Contratar servicio
          </Button>
        </BookServiceDialog>
        <Button variant="outline" className="w-full bg-transparent">
          <MessageCircle className="w-4 h-4 mr-2" />
          Enviar Mensaje
        </Button>
      </CardContent>
    </Card>
  );
}
