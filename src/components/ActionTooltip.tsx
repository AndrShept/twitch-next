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
}

export const ActionTooltip = ({
  children,
  label,
  side = 'top',
}: ActionTooltipProps) => {
  return (
    <TooltipProvider delayDuration={200} >
      <Tooltip >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
