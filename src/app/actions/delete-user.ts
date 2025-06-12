"use server";

import { getPayloadClient } from "@/lib/payload";

interface Props {
  id: string | number;
}

export async function deleteUser({ id }: Props) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.delete({
      collection: "users",
      where: {
        id: {
          equals: id,
        },
      },
    });

    return docs;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error al eliminar usuario");
  }
}
