import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from './ui/button';

interface AccordionProps {
  label: string;
  content: string;
}

export const Accordion = ({ label, content }: AccordionProps) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="flex flex-col w-[200px]  h-fit border rounded-xl ">
      <div
        onClick={() => setCollapse((prev) => !prev)}
        className={cn(
          'flex  justify-between h-fit items-center cursor-pointer hover:bg-secondary/50 ',
          {
            'hover:rounded-t-xl ': collapse,
            'hover:rounded-xl ': !collapse,
          },
        )}
      >
        <p className="p-2 capitalize">{label}</p>
        <Button
          className="size-8 hover:bg-transparent "
          variant={'ghost'}
          size={'icon'}
        >
          <ChevronDownIcon
            className={cn('size-4', {
              'rotate-180 transition-all': collapse,
              ' transition-all': !collapse,
            })}
          />
        </Button>
      </div>
      {collapse && (
        <p
          className={cn('flex-1 break-all p-2 text-sm text-muted-foreground', {
            'transition-all animate-in fade-in-0 duration-500': collapse,
            'transition-all animate-out fade-out-100 duration-500': !collapse,
          })}
        >
          {content}
        </p>
      )}
    </div>
  );
};
