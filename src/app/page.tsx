import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "ServicioYa - Marketplace de Servicios",
  description: "Conectamos a quienes ofrecen servicios con quienes los necesitan. Encuentra plomeros, electricistas, modistas y más en tu zona.",
  keywords: ["servicios", "plomería", "electricista", "modista", "contratación", "marketplace"],
  openGraph: {
    title: "ServicioYa - Marketplace de Servicios",
    description: "Conectamos a quienes ofrecen servicios con quienes los necesitan",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24">      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Bienvenido a ServicioYa
        </h1>

        <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
          El marketplace que conecta a quienes ofrecen servicios con quienes los necesitan. 
          Encuentra plomeros, electricistas, modistas y más profesionales en tu zona de forma rápida y segura.
        </p>

        <div className="mt-8">
          <Button 
            asChild 
            size="lg" 
            className="group transition-all duration-300"
          >
            <Link href="/login">
              Comenzar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
