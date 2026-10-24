import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AppHome() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='text-3xl font-bold'>Cases</h1>
      <p className='text-muted-foreground mt-3'>
        Signed in as {session.user.email}. Cases arrive in milestone M1.
      </p>
    </main>
  );
}
