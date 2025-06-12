import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Página no encontrada | Payload CRUD Demo",
  description: "La página que buscas no existe. Regresa al inicio para continuar navegando.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-bold text-muted-foreground/20">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Página no encontrada
          </h2>
        </div>

        <p className="text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ver usuarios
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}