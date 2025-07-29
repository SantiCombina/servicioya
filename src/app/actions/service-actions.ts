'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000/api';

// 1. Obtener detalle de servicio por ID
export async function getServiceById(id: string) {
  const res = await fetch(`${API_URL}/services/${id}`, {
    headers: { Cookie: cookies().toString() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudo obtener el servicio');
  return res.json();
}

// 2. Obtener reseñas de un servicio
export async function getServiceReviews(serviceId: string) {
  const res = await fetch(`${API_URL}/reviews?where[service][equals]=${serviceId}&depth=2`, {
    headers: { Cookie: cookies().toString() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudieron obtener las reseñas');
  return res.json();
}

// 3. Crear una consulta/contacto (enviar mensaje o solicitud de presupuesto)
export async function createServiceInquiry(data: { service: string; name: string; email: string; message: string }) {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('No se pudo enviar la consulta');
  return res.json();
}

// 4. Crear una nueva reseña para un servicio
export async function createServiceReview(data: {
  service: string;
  user: string;
  rating: number;
  comment: string;
  ratings: {
    service: number;
    punctuality: number;
    price: number;
    treatment: number;
  };
}) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('No se pudo crear la reseña');
  return res.json();
}

// 5. Obtener servicios relacionados (opcional)
export async function getRelatedServices(category: string, excludeId?: string) {
  const params = new URLSearchParams({
    'where[category][equals]': category,
    ...(excludeId ? { 'where[id][not_equals]': excludeId } : {}),
    limit: '4',
  });
  const res = await fetch(`${API_URL}/services?${params.toString()}`, {
    headers: { Cookie: cookies().toString() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudieron obtener servicios relacionados');
  return res.json();
}
