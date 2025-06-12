"use server";

import { getPayloadClient } from "@/lib/payload";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const payload = await getPayloadClient();
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    if (!token) {
      return null;
    }

    const headers = new Headers();
    headers.set("Authorization", `JWT ${token}`);

    const { user } = await payload.auth({
      headers,
    });

    return user;
  } catch (error) {
    console.error("Error obteniendo usuario actual:", error);
    return null;
  }
}
