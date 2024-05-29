import { z } from 'zod';

const envSchema = z.object({
  DB_CONNECTION_STRING: z.string().min(1),
  TIMEOUT: z.coerce.number().positive(),
  SESSION_SECRET: z.string().min(1),
  URL: z.string().min(1),
  STRIPE_PUBLIC_KEY: z.string().min(1),
  STRIPE_PRIVATE_KEY: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

declare global {
  var ENV: Env;
  interface Window {
    ENV: Env;
  }
}

export function getEnv() {
  return envSchema.parse(process.env);
}