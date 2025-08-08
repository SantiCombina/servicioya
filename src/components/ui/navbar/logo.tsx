import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">SY</span>
      </div>
      <span className="font-bold text-xl text-foreground hidden sm:flex">ServicioYa</span>
    </Link>
  );
}
