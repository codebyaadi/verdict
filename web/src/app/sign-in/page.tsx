'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
        : await authClient.signUp.email({
            email,
            password,
            name: email.split('@')[0],
          });
    if (res.error) setError(res.error.message ?? 'Something went wrong');
    else router.push('/app');
  }

  return (
    <main className='mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6'>
      <h1 className='text-3xl font-bold'>{mode === 'in' ? 'Sign in' : 'Create account'}</h1>
      <Card className='backdrop-blur'>
        <CardContent>
          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
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
        </CardContent>
      </Card>
      <button
        type='button'
        onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
        className='text-muted-foreground w-fit text-sm underline'
      >
        {mode === 'in' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </main>
  );
}
