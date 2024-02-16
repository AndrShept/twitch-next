'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

import { CopyButton } from '../../../../../../components/CopyButton';

interface KeyCardProps {
  value: string;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <article className="rounded-xl w-full p-6 bg-secondary/50 flex flex-col gap-2">
      <section className="flex items-center gap-x-10">
        <p className="font-semibold">Stream Key</p>
      </section>
      <section className="flex items-center  gap-x-2 w-full ">
        <div className=" gap-x-1 flex-1">
          <Input
            value={value || ''}
            type={isShow ? 'text' : 'password'}
            disabled
            placeholder="Server Key"
          />
        </div>
        <div >
          <ActionTooltip label={!isShow ? 'Show' : 'Hide'}>
            <Button
              className="size-[30px] p-1.5 text-muted-foreground"
              variant={'ghost'}
              onClick={() => setIsShow((prev) => !prev)}
            >
              {!isShow ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </ActionTooltip>

          <CopyButton value={value} />
        </div>
      </section>
    </article>
  );
};
