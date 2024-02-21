import { EditIcon } from 'lucide-react';
import React from 'react';

import { ActionTooltip } from './ActionTooltip';
import { Button } from './ui/button';

export const EditButton = () => {
  return (
    <ActionTooltip asChild label="Edit">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="ml-auto rounded-full text-muted-foreground lg:p-1 p-0.5 border-2"
      >
        <EditIcon className="lg:size-[18px] size-4" />
      </Button>
    </ActionTooltip>
  );
};
