import { cn } from '@/lib/utils';

/** A case-file tab with a magnifier dot: heavy strokes, same weight as the wordmark. */
export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      aria-hidden
      className={className}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path
        d='M5 9.5V24a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H15l-2.6-3.6A2 2 0 0 0 10.8 5.6H7A2 2 0 0 0 5 7.6'
        stroke='currentColor'
        strokeWidth='3.2'
      />
      <circle cx='16' cy='18' r='3.4' fill='currentColor' />
    </svg>
  );
}

export function Logo({ className, markOnly }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className='bg-primary text-primary-foreground grid size-9 shrink-0 place-items-center rounded-xl shadow-sm'>
        <LogoGlyph className='size-6' />
      </span>
      {!markOnly && (
        <span className='text-[1.4rem] leading-none font-extrabold tracking-tighter'>
          Casebook<span className='text-brand'>.</span>
        </span>
      )}
    </span>
  );
}
