'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Shield,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';

// Mock data - en una app real vendría de una API
const serviceData = {
  id: 1,
  title: 'Plomería Residencial y Comercial',
  provider: {
    name: 'Juan Pérez',
    avatar: '/placeholder.svg?height=100&width=100',
    rating: 4.8,
    reviews: 127,
    completedJobs: 89,
    memberSince: '2020',
    verified: true,
    responseTime: '2 horas',
    phone: '+54 11 1234-5678',
    email: 'juan.perez@email.com',
  },
  description:
    'Ofrezco servicios completos de plomería para hogares y comercios. Cuento con más de 15 años de experiencia en el rubro y todas las herramientas necesarias para resolver cualquier problema de plomería.',
  services: [
    'Reparación de cañerías',
    'Instalación de grifos y llaves',
    'Destapado de cañerías',
    'Instalación de calefones',
    'Reparación de inodoros',
    'Instalación de sistemas de agua',
  ],
  priceFrom: 2500,
  location: 'CABA, Buenos Aires',
  category: 'Plomería',
  availability: 'Lun-Vie 8:00-18:00, Sab 8:00-14:00',
  coverageArea: 'CABA y Gran Buenos Aires',
  images: [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ],
  ratings: {
    overall: 4.8,
    service: 4.9,
    punctuality: 4.7,
    price: 4.6,
    treatment: 4.8,
  },
};

const reviews = [
  {
    id: 1,
    user: 'María González',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-15',
    comment:
      'Excelente servicio. Juan llegó puntual y resolvió el problema de la canilla en menos de una hora. Muy profesional y el precio fue justo.',
    ratings: { service: 5, punctuality: 5, price: 4, treatment: 5 },
    response: 'Muchas gracias María! Fue un placer ayudarte. Cualquier cosa que necesites, no dudes en contactarme.',
  },
  {
    id: 2,
    user: 'Carlos López',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    date: '2024-01-10',
    comment: 'Buen trabajo en la instalación del calefón. Llegó en horario y explicó todo el proceso. Recomendado.',
    ratings: { service: 4, punctuality: 5, price: 4, treatment: 4 },
  },
  {
    id: 3,
    user: 'Ana Rodríguez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-05',
    comment:
      'Súper recomendable! Solucionó un problema complejo de cañerías que otros plomeros no pudieron resolver. Muy profesional.',
    ratings: { service: 5, punctuality: 4, price: 5, treatment: 5 },
  },
];

export default function ServiceDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/servicios">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <Link href="/" className="text-2xl font-bold text-primary">
                ServiciosYa
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={serviceData.images[selectedImage] || '/placeholder.svg'}
                    alt={serviceData.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">{serviceData.category}</Badge>
                    {serviceData.provider.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  {serviceData.images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-muted'
                      }`}
                    >
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`Vista ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-primary font-bold">{serviceData.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      {serviceData.location} • Cobertura: {serviceData.coverageArea}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      Desde ${serviceData.priceFrom.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">por servicio</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="services">Servicios</TabsTrigger>
                    <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <p className="text-foreground leading-relaxed">{serviceData.description}</p>
                  </TabsContent>
                  <TabsContent value="services" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceData.services.map((service, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm text-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{serviceData.availability}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tiempo de respuesta promedio: {serviceData.provider.responseTime}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Calificaciones y Reseñas</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{serviceData.ratings.overall}</div>
                    <div className="text-sm text-gray-500">General</div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(serviceData.ratings.overall)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{serviceData.ratings.service}</div>
                    <div className="text-xs text-gray-500">Servicio</div>
                    <Progress value={serviceData.ratings.service * 20} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{serviceData.ratings.punctuality}</div>
                    <div className="text-xs text-gray-500">Puntualidad</div>
                    <Progress value={serviceData.ratings.punctuality * 20} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{serviceData.ratings.price}</div>
                    <div className="text-xs text-gray-500">Precio</div>
                    <Progress value={serviceData.ratings.price * 20} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{serviceData.ratings.treatment}</div>
                    <div className="text-xs text-gray-500">Trato</div>
                    <Progress value={serviceData.ratings.treatment * 20} className="h-1 mt-1" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || '/placeholder.svg'} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.user}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-foreground mb-3">{review.comment}</p>

                          {/* Detailed ratings */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground mb-3">
                            <div>Servicio: {review.ratings.service}/5</div>
                            <div>Puntualidad: {review.ratings.punctuality}/5</div>
                            <div>Precio: {review.ratings.price}/5</div>
                            <div>Trato: {review.ratings.treatment}/5</div>
                          </div>

                          {/* Provider response */}
                          {review.response && (
                            <div className="bg-blue-50 p-3 rounded-lg mt-3">
                              <div className="flex items-center mb-1">
                                <Avatar className="w-6 h-6 mr-2">
                                  <AvatarImage src={serviceData.provider.avatar || '/placeholder.svg'} />
                                  <AvatarFallback>{serviceData.provider.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-semibold">{serviceData.provider.name}</span>
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Proveedor
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground">{review.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Provider Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={serviceData.provider.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{serviceData.provider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{serviceData.provider.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{serviceData.provider.rating}</span>
                        <span className="text-gray-500 ml-1">({serviceData.provider.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{serviceData.provider.completedJobs}</div>
                      <div className="text-xs text-muted-foreground">Trabajos realizados</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{serviceData.provider.memberSince}</div>
                      <div className="text-xs text-muted-foreground">Miembro desde</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    {serviceData.provider.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      <Award className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Responde en {serviceData.provider.responseTime} promedio
                  </div>
                </CardContent>
              </Card>

              {/* Contact Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Contactar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Solicitar Presupuesto
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Consulta Rápida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceData.services.map((service, index) => (
                        <SelectItem key={index} value={service.toLowerCase()}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Describe tu necesidad..." className="min-h-[100px]" />
                  <Button className="w-full">Enviar Consulta</Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso • Respuesta en {serviceData.provider.responseTime}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
