"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">SERVICIOYA</CardTitle>
        <CardDescription className="text-lg">Iniciar Sesión</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>{" "}
          <div className="text-center text-sm text-muted-foreground">
            ¿Es tu primera vez?{" "}
            <a href="/signup" className="underline hover:text-foreground">
              Regístrate
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
