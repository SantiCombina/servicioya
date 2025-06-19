'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupCard() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">SERVICIOYA</CardTitle>
                <CardDescription className="text-lg">Crear Cuenta</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input 
                            type="text" 
                            id="name" 
                            placeholder="Ingresa tu nombre"
                            required 
                        />
                    </div>
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
                            placeholder="Crea una contraseña"
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="Confirma tu contraseña"
                            required 
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Crear Cuenta
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="underline hover:text-foreground">
                            Iniciar Sesión
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}