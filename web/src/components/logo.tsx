import { cn } from '@/lib/utils';

/** A shield with a check: proof plus authorization, the two things Verdict is about. */
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
        d='M16 3 5 7v8c0 7 5 11.5 11 13 6-1.5 11-6 11-13V7L16 3Z'
        stroke='currentColor'
        strokeWidth='2.6'
      />
      <path d='M11 16l3.5 3.5L22 12' stroke='currentColor' strokeWidth='2.6' />
    </svg>
  );
}

export function Logo({ className, markOnly }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className='bg-primary text-primary-foreground grid size-9 shrink-0 place-items-center rounded-xl shadow-sm'>
        <LogoGlyph className='size-5' />
      </span>
      {!markOnly && (
        <span className='text-[1.4rem] leading-none font-extrabold tracking-tighter'>
          Verdict<span className='text-brand'>.</span>
        </span>
      )}
    </span>
  );
}
