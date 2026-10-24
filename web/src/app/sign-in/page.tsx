'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email'));
    const password = String(f.get('password'));
    const res =
      mode === 'in'
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name: email.split('@')[0] });
    if (res.error) setError(res.error.message ?? 'Something went wrong');
    else router.push('/app');
  }

  return (
    <div className='ambient min-h-screen'>
      <main className='mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-4'>
        <Link href='/' aria-label='Casebook home'>
          <Logo />
        </Link>
        <h1 className='text-4xl font-extrabold tracking-tighter'>
          {mode === 'in' ? 'Sign in' : 'Create account'}
        </h1>
        <Card className='shadow-[var(--shadow-panel)]'>
          <form onSubmit={onSubmit} className='flex flex-col gap-4 px-6'>
            <div className='grid gap-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' type='email' required />
            </div>
            <div className='grid gap-1.5'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                minLength={12}
                placeholder='12+ characters'
              />
            </div>
            {error ? (
              <p role='alert' className='text-destructive text-sm'>
                {error}
              </p>
            ) : null}
            <Button type='submit'>{mode === 'in' ? 'Sign in' : 'Sign up'}</Button>
          </form>
        </Card>
        <button
          type='button'
          onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
          className='text-muted-foreground w-fit cursor-pointer text-sm underline underline-offset-4'
        >
          {mode === 'in' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </main>
    </div>
  );
}
