'use server';

import { cookies } from 'next/headers';

import { loginUser } from '@/app/services/user';
import { userSignInSchema } from '@/components/login/user-signin-schema';
import { actionClient } from '@/lib/safe-action-client';

export const userSignIn = actionClient.schema(userSignInSchema).action(async ({ parsedInput }) => {
  try {
    const response = await loginUser(parsedInput.email, parsedInput.password);

    if (!response.token) {
      throw new Error('Not authorized');
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', response.token);

    const redirectUrl = parsedInput.redirectTo || '/services';

    return {
      success: true,
      redirectUrl,
    };
  } catch {
    throw new Error('Invalid email or password');
  }
});
