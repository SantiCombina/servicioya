'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';
import { userSignupSchema } from '@/lib/schemas/user-signup-schema';

export const userSignUp = actionClient.schema(userSignupSchema).action(async ({ parsedInput }) => {
  try {
    const response = await createUser(parsedInput.email, parsedInput.password, parsedInput.name);

    if (!response.success || !response.token) {
      throw new Error(response.message || 'Error al crear usuario');
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', response.token);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al crear usuario');
  }

  redirect('/services');
});
