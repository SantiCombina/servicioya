import Link from 'next/link';

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
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardContent className="flex flex-col items-center py-4 md:py-6">
          <div className={`${bgColor} rounded-full p-2`}>{icon}</div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{title}</h3>
          <p className="text-muted-foreground mb-2 md:mb-3 text-sm md:text-base text-center">{description}</p>
          <span className="bg-muted px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold text-foreground">
            {count} activos
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
