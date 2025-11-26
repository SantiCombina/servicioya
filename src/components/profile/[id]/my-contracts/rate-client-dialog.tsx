'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const rateClientDialogSchema = z.object({
  rating: z.number().min(1).max(5, 'La calificación debe estar entre 1 y 5'),
});

export type RateClientDialogValues = z.infer<typeof rateClientDialogSchema>;

interface RateClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RateClientDialogValues) => Promise<void>;
  isSubmitting: boolean;
  clientName?: string;
}

export function RateClientDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  clientName = 'cliente',
}: RateClientDialogProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const form = useForm<RateClientDialogValues>({
    resolver: zodResolver(rateClientDialogSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const handleSubmit = async (data: RateClientDialogValues) => {
    await onSubmit(data);
    form.reset();
  };

  const rating = form.watch('rating');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Calificar cliente</DialogTitle>
          <DialogDescription>
            Comparte tu experiencia trabajando con {clientName}. Tu calificación ayuda a mantener la comunidad de
            calidad.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calificación</FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoverValue(star)}
                          onMouseLeave={() => setHoverValue(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoverValue || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-none text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar calificación'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
