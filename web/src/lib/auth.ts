import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { Pool } from 'pg';

/**
 * Better Auth owns sign-up and sessions. The Python API never creates
 * sessions: it verifies the signed `better-auth.session_token` cookie with the
 * shared BETTER_AUTH_SECRET and looks the session up in the same Postgres.
 */
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  emailAndPassword: { enabled: true, minPasswordLength: 12 },
  plugins: [nextCookies()],
});
