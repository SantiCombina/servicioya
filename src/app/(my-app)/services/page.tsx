'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Plomería Residencial y Comercial',
    provider: 'Juan Pérez',
    rating: 4.8,
    reviews: 127,
    completedJobs: 89,
    priceFrom: 2500,
    location: 'CABA, Buenos Aires',
    category: 'Plomería',
    description: 'Reparaciones, instalaciones y mantenimiento de sistemas de plomería',
    availability: 'Lun-Vie 8:00-18:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: true,
  },
  {
    id: 2,
    title: 'Instalaciones Eléctricas Certificadas',
    provider: 'María González',
    rating: 4.9,
    reviews: 89,
    completedJobs: 156,
    priceFrom: 3000,
    location: 'Córdoba Capital',
    category: 'Electricidad',
    description: 'Instalaciones eléctricas residenciales y comerciales con certificación',
    availability: 'Lun-Sab 7:00-19:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: true,
  },
  {
    id: 3,
    title: 'Reparación y Confección de Ropa',
    provider: 'Ana Rodríguez',
    rating: 4.7,
    reviews: 156,
    completedJobs: 234,
    priceFrom: 800,
    location: 'Rosario, Santa Fe',
    category: 'Modista',
    description: 'Arreglos, confección y diseño de prendas a medida',
    availability: 'Mar-Sab 9:00-17:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: false,
  },
  {
    id: 4,
    title: 'Carpintería y Muebles a Medida',
    provider: 'Carlos López',
    rating: 4.6,
    reviews: 78,
    completedJobs: 45,
    priceFrom: 5000,
    location: 'La Plata, Buenos Aires',
    category: 'Carpintería',
    description: 'Fabricación de muebles, reparaciones y trabajos en madera',
    availability: 'Lun-Vie 8:00-16:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: true,
  },
  {
    id: 5,
    title: 'Pintura Interior y Exterior',
    provider: 'Roberto Silva',
    rating: 4.5,
    reviews: 92,
    completedJobs: 67,
    priceFrom: 1500,
    location: 'Mendoza Capital',
    category: 'Pintura',
    description: 'Pintura de casas, departamentos y locales comerciales',
    availability: 'Lun-Vie 7:00-17:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: true,
  },
  {
    id: 6,
    title: 'Jardinería y Paisajismo',
    provider: 'Laura Martín',
    rating: 4.8,
    reviews: 64,
    completedJobs: 123,
    priceFrom: 2000,
    location: 'CABA, Buenos Aires',
    category: 'Jardinería',
    description: 'Diseño, mantenimiento y cuidado de jardines y espacios verdes',
    availability: 'Lun-Sab 8:00-18:00',
    image: '/placeholder.svg?height=200&width=300',
    verified: true,
  },
];

const categories = [
  'Plomería',
  'Electricidad',
  'Modista',
  'Carpintería',
  'Pintura',
  'Jardinería',
  'Limpieza',
  'Tecnología',
];
const locations = ['CABA', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata'];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocation([...selectedLocation, location]);
    } else {
      setSelectedLocation(selectedLocation.filter((l) => l !== location));
    }
  };

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesSearch =
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(service.category);
        const matchesLocation =
          selectedLocation.length === 0 || selectedLocation.some((loc) => service.location.includes(loc));
        const matchesPrice = service.priceFrom >= priceRange[0] && service.priceFrom <= priceRange[1];
        const matchesVerified = !showVerifiedOnly || service.verified;

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesVerified;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'price-low':
            return a.priceFrom - b.priceFrom;
          case 'price-high':
            return b.priceFrom - a.priceFrom;
          case 'jobs':
            return b.completedJobs - a.completedJobs;
          case 'reviews':
            return b.reviews - a.reviews;
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedLocation, priceRange, sortBy, showVerifiedOnly]);

  return (
    <div className="min-h-main">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 h-fit">
              <Card className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Buscar</Label>
                    <Input
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Categories */}
                  <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                      <AccordionTrigger className="text-sm font-medium">Categorías</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={category}
                                checked={selectedCategory.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                              />
                              <Label htmlFor={category} className="text-sm">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Locations */}
                  <Accordion type="single" collapsible defaultValue="locations">
                    <AccordionItem value="locations">
                      <AccordionTrigger className="text-sm font-medium">Ubicación</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {locations.map((location) => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox
                                id={location}
                                checked={selectedLocation.includes(location)}
                                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                              />
                              <Label htmlFor={location} className="text-sm">
                                {location}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Precio (desde): ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10000}
                      min={0}
                      step={500}
                      className="w-full"
                    />
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) => setShowVerifiedOnly(Boolean(checked))}
                    />
                    <Label htmlFor="verified" className="text-sm">
                      Solo verificados
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            {/* Header with sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
                <p className="text-gray-600">{filteredServices.length} servicios encontrados</p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="jobs">Más trabajos realizados</SelectItem>
                  <SelectItem value="reviews">Más reseñas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Services Grid */}
            <div className="min-h-[800px]">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image
                          src={service.image || '/placeholder.svg'}
                          alt={service.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          <Badge className="bg-blue-600">{service.category}</Badge>
                          {service.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Verificado
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>por {service.provider}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{service.rating}</span>
                              <span className="text-gray-500">({service.reviews})</span>
                            </div>
                            <span className="text-sm text-gray-500">{service.completedJobs} trabajos</span>
                          </div>

                          <div className="flex items-center text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.location}</span>
                          </div>

                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.availability}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-bold text-green-600">
                              Desde ${service.priceFrom.toLocaleString()}
                            </span>
                            <Button size="sm" asChild>
                              <Link href={`/service/${service.id}`}>Ver Detalles</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No se encontraron servicios</h3>
                  <p className="text-gray-600">Intenta ajustar los filtros o buscar con otros términos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
