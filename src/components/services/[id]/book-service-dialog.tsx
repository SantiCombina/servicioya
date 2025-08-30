'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Card,
  CardContent,
} from '@/components/ui';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, DollarSign, MapPin, MessageSquare, ChevronDownIcon } from 'lucide-react';
import { bookingCreateSchema, BookingCreateValues } from '@/lib/schemas/booking-create-schema';
import { bookingCreate } from './actions';
import { toast } from 'sonner';
import { Service, User } from '@/payload-types';

interface Props {
  service: Service;
  currentUser: User | null;
  children: React.ReactNode;
}

export function BookServiceDialog({ service, currentUser, children }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);
  const provider = service.provider as User;

  const form = useForm<BookingCreateValues>({
    resolver: zodResolver(bookingCreateSchema),
    defaultValues: {
      serviceId: service.id,
      providerId: provider.id,
      clientId: currentUser?.id || 0,
      proposedPrice: service.priceFrom || 0,
      requestedDate: '',
      requestedTime: '10:00',
      location: '',
      contactPhone: '',
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

    // Crear un objeto Date válido con la fecha y hora seleccionadas
    const [year, month, day] = values.requestedDate.split('-').map(Number);
    const [hours, minutes] = values.requestedTime.split(':').map(Number);

    // Crear fecha en zona horaria local
    const localDate = new Date(year, month - 1, day, hours, minutes);

    // Convertir a ISO string que Payload CMS puede entender
    const isoString = localDate.toISOString();

    await createBookingAction({
      ...values,
      requestedDate: isoString,
    });
  };

  // No mostrar el dialog si no hay usuario autenticado
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

  // No permitir que un usuario contrate su propio servicio
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
        <DialogHeader className="pb-6 border-b border-border">
          <DialogTitle className="flex items-center text-xl">
            <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
            Contratar Servicio
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Completa los detalles para solicitar la contratación de &ldquo;{service.title}&rdquo; con {provider.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Información del servicio */}
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

            {/* Separador visual */}

            {/* Fecha y hora */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                Programación del Servicio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="requestedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha Solicitada</FormLabel>
                      <FormControl>
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between font-normal h-10">
                              {selectedDate ? selectedDate.toLocaleDateString('es-AR') : 'Seleccionar fecha'}
                              <ChevronDownIcon className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              captionLayout="dropdown"
                              onSelect={(date: Date | undefined) => {
                                setSelectedDate(date);
                                if (date) {
                                  field.onChange(date.toISOString().split('T')[0]);
                                }
                                setDateOpen(false);
                              }}
                              disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detalles del servicio */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Detalles del Servicio
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Precio propuesto */}
                <FormField
                  control={form.control}
                  name="proposedPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Propuesto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          step="0.01"
                          placeholder="Precio que estás dispuesto a pagar"
                          className="h-10"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teléfono de contacto */}
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de Contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu número de teléfono para coordinar" className="h-10" {...field} />
                      </FormControl>
                      <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
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
