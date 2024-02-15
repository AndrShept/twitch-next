
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React, { ReactNode } from 'react';

interface ActionTooltipProps {
  children: ReactNode;
  label: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  asChild?: boolean;
  sideOffset?: number;
}

export const ActionTooltip = ({
  children,
  label,
  side = 'top',
  asChild = true,
  sideOffset,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
