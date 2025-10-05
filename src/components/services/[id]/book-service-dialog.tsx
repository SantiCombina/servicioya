'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, MapPin, MessageSquare } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { bookingCreateSchema, BookingCreateValues } from '@/lib/schemas/booking-create-schema';
import { Service, User } from '@/payload-types';

import { bookingCreate } from './actions';

interface Props {
  service: Service;
  currentUser: User | null;
  children: React.ReactNode;
}

export function BookServiceDialog({ service, currentUser, children }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const provider = service.provider as User;

  const form = useForm<BookingCreateValues>({
    resolver: zodResolver(bookingCreateSchema),
    defaultValues: {
      serviceId: service.id,
      providerId: provider.id,
      clientId: currentUser?.id || 0,
      requestedDate: '',
      requestedTime: '10:00',
      location: '',
      message: '',
    },
  });

  const { executeAsync: createBookingAction, isExecuting } = useAction(bookingCreate, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        setOpen(false);
        form.reset();
      }
    },
    onError: (error) => {
      console.error('Error creating booking:', error);
      toast.error('Error al enviar la solicitud de contratación');
    },
  });

  const onSubmit = async (values: BookingCreateValues) => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para contratar un servicio');
      return;
    }

    const [year, month, day] = values.requestedDate.split('-').map(Number);
    const [hours, minutes] = values.requestedTime.split(':').map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes);

    const isoString = localDate.toISOString();

    await createBookingAction({
      ...values,
      requestedDate: isoString,
    });
  };

  if (!currentUser) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar Sesión Requerido</DialogTitle>
            <DialogDescription>Debes iniciar sesión para poder contratar servicios.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => (window.location.href = '/login')}>Iniciar Sesión</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (currentUser.id === provider.id) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>No Disponible</DialogTitle>
            <DialogDescription>No puedes contratar tu propio servicio.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
            Contratar Servicio
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Completa los detalles para solicitar la contratación de &ldquo;
            {service.title}&rdquo; con {provider.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-muted-foreground">Servicio</span>
                    <span className="font-semibold">{service.title}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-muted-foreground">Proveedor</span>
                    <span className="font-semibold">{provider.name}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-muted-foreground">Precio base</span>
                    <span className="font-semibold text-primary">
                      ${service.priceFrom?.toLocaleString() || 'Consultar'}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-muted-foreground">Disponibilidad</span>
                    <span className="font-semibold">{service.availability || 'A consultar'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fecha y hora */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="requestedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha Solicitada</FormLabel>
                      <DatePicker
                        value={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            field.onChange(date.toISOString().split('T')[0]);
                          } else {
                            field.onChange('');
                          }
                        }}
                        placeholder="Seleccionar fecha"
                      />
                      <div className="min-h-[1.25rem] -mt-2.5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestedTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora Solicitada</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          step="1"
                          className="h-10 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-[1.25rem] -mt-2.5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Ubicación */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ubicación del Servicio
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dirección específica donde se realizará el servicio"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <div className="min-h-[1.25rem] -mt-2.5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Mensaje opcional */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mensaje Adicional (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles adicionales sobre el servicio que necesitas..."
                        rows={3}
                        maxLength={500}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="min-h-[1.25rem] -mt-2.5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="min-w-[120px]">
                Cancelar
              </Button>
              <Button type="submit" disabled={isExecuting} className="min-w-[140px]">
                {isExecuting ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
