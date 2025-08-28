'use server';

import { cookies } from 'next/headers';
import { actionClient } from '@/lib/safe-action-client';
import { redirect } from 'next/navigation';
import { userSignupSchema } from '@/lib/schemas/user-signup-schema';
import { createUser } from '@/app/services/user';

export const userSignUp = actionClient.schema(userSignupSchema).action(async ({ parsedInput }) => {
  try {
    const response = await createUser(parsedInput.email, parsedInput.password, parsedInput.name);

    if (!response.success || !response.token) {
      throw new Error(response.message || 'Error al crear usuario');
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', response.token);
  } catch (error: any) {
    throw new Error(error.message || 'Error al crear usuario');
  }

  redirect('/services');
});
