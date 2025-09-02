'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { loginUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';
import { userSignInSchema } from '@/lib/schemas/user-signin-schema';

export const userSignIn = actionClient.schema(userSignInSchema).action(async ({ parsedInput }) => {
  try {
    const response = await loginUser(parsedInput.email, parsedInput.password);

    if (!response.token) {
      throw new Error('Not authorized');
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', response.token);
  } catch {
    throw new Error('Invalid email or password');
  }

  redirect('/services');
});
