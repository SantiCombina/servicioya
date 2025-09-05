import { getServices } from '@/app/services/service';
import { ServicesInteractive } from '@/components/services/services-interactive';

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesInteractive initialServices={services} />;
}
