import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { en } from '@payloadcms/translations/languages/en';
import { es } from '@payloadcms/translations/languages/es';
import { buildConfig } from 'payload';

import { Users, Media, Categories, Locations, Services, Bookings, Reviews, ReviewReplies } from './collections';

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Locations, Services, Bookings, Reviews, ReviewReplies],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es, en },
  },
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
  admin: {
    user: 'users',
  },
  sharp,
});
