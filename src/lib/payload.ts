import dotenv from 'dotenv';
import type { Payload } from 'payload';
import { getPayload } from 'payload';
import { cache } from 'react';

import config from '../payload.config';

dotenv.config();

declare global {
  var payload: Payload | null;
}

globalThis.payload = globalThis.payload || null;

export const getPayloadClient = cache(async (): Promise<Payload> => {
  if (globalThis.payload) {
    return globalThis.payload;
  }

  const payload = await getPayload({
    config,
  });

  globalThis.payload = payload;

  return payload;
});
