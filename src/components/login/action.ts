'use server';

import { cookies } from 'next/headers';
import { actionClient } from '@/lib/safe-action-client';
import { redirect } from 'next/navigation';
import { userSignInSchema } from '@/lib/schemas/user-signin-schema';
import { loginUser } from '@/app/services/user';

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
