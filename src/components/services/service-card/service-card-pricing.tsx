import { Service } from '@/payload-types';

interface ServiceCardPricingProps {
  service: Service;
}

export function ServiceCardPricing({ service }: ServiceCardPricingProps) {
  return (
    <div className="flex justify-end items-center pt-2">
      <span className="font-semibold text-green-600">Desde ${service.priceFrom.toLocaleString()}</span>
    </div>
  );
}
