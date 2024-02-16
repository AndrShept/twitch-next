'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { ActionTooltip } from './ActionTooltip';

interface CopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopy, setIsCopy] = useState(false);
  const onClick = () => {
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value);
    setIsCopy(true);
    toast.info(`Copy to clipboard ${value}`);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };
  return (
    <ActionTooltip label="Copy">
      <Button
        disabled={!value}
        onClick={onClick}
        variant={'ghost'}
        className="size-[30px] p-1.5 text-muted-foreground"
      >
        {!isCopy && <CopyIcon />}
        {isCopy && <CheckIcon className="text-green-500" />}
      </Button>
    </ActionTooltip>
  );
};
