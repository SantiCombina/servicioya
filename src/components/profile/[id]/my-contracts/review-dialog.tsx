'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { reviewCreateSchema, ReviewCreateValues } from '@/components/profile/[id]/my-contracts/review-create-schema';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

function RatingStars({ value, onChange, label }: RatingStarsProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverValue || value) ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  onSubmit: (data: ReviewCreateValues) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewDialog({ open, onOpenChange, bookingId, onSubmit, isSubmitting }: ReviewDialogProps) {
  const form = useForm<ReviewCreateValues>({
    resolver: zodResolver(reviewCreateSchema),
    defaultValues: {
      bookingId,
      scoreService: 0,
      scoreTrato: 0,
      scoreCosto: 0,
      comment: '',
    },
  });

  const handleSubmit = async (data: ReviewCreateValues) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Calificar Servicio</DialogTitle>
          <DialogDescription>
            Comparte tu experiencia calificando diferentes aspectos del servicio recibido
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="scoreService"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RatingStars label="Calidad del Servicio" value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scoreTrato"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RatingStars label="Trato y Atención" value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scoreCosto"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RatingStars label="Relación Costo-Beneficio" value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentario (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comparte tu experiencia con este servicio..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
