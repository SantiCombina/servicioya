import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  href: string;
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  description: string;
  count: number;
}

export function ProfileSectionCard({ href, icon, bgColor, title, description, count }: Props) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full">
        <CardContent className="flex flex-col items-center py-7 px-5 gap-3">
          <div className={`${bgColor} rounded-2xl p-4`}>{icon}</div>
          <div className="text-center space-y-1.5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm text-center leading-snug">{description}</p>
          </div>
          <Badge variant="secondary" className="text-sm font-semibold px-3">
            {count} activos
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
