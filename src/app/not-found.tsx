import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-6 min-h-dvh md:p-24">
      <div className="max-w-md mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="font-bold text-8xl md:text-9xl text-muted-foreground/20">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Página no encontrada
          </h2>
        </div>

        <p className="text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>        <div className="flex justify-center pt-6">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}