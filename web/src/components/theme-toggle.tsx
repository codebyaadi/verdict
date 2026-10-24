'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Toggle theme'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <span aria-hidden>◐</span>
    </Button>
  );
}
