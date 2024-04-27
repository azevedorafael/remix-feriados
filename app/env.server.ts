import { z } from 'zod';

const envSchema = z.object({
  DB_CONNECTION_STRING: z.string().min(1),
  TIMEOUT: z.coerce.number().positive(),
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