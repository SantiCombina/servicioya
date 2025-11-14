'use server';

import { cookies } from 'next/headers';

import { createUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';

import { userSignupSchema } from './user-signup-schema';

export const userSignUp = actionClient.schema(userSignupSchema).action(async ({ parsedInput }) => {
  try {
    const response = await createUser(parsedInput.email, parsedInput.password, parsedInput.name);

    if (!response.success || !response.token) {
      throw new Error(response.message || 'Error al crear usuario');
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', response.token);

    const redirectUrl = parsedInput.redirectTo || '/services';
    
    return {
      success: true,
      redirectUrl,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al crear usuario');
  }
});
