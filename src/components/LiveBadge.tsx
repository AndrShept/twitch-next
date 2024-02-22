import { cn } from '@/lib/utils';
import React from 'react';

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        'bg-rose-500 text-center py-[1px] px-1 rounded-md uppercase text-[9px] border border-secondary font-semibold h-fit tracking-wide ',
        className,
      )}
    >
      Live
    </div>
  );
};
