import { cn } from '@/lib/utils';

export function AppContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className={cn(
          'w-full max-w-4xl rounded-2xl border bg-card text-card-foreground glow',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
