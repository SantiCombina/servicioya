import { Service } from '@/payload-types';

interface ServiceCardPricingProps {
  service: Service;
}

export function ServiceCardPricing({ service }: ServiceCardPricingProps) {
  return (
    <div className="flex justify-between items-center pt-2 border-t border-border/50">
      <span className="text-xs text-muted-foreground">Precio desde</span>
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        ${service.priceFrom.toLocaleString()}
      </span>
    </div>
  );
}
