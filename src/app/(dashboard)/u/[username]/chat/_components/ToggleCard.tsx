'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useState } from 'react';

import { useUpdateStreamSettings } from '../../../../../../hooks/useUpdateStreamSettings';

export type FieldTypes =
  | 'isChatEnabled'
  | 'isChatDelayed'
  | 'isChatFollowersOnly';

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value?: boolean;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {
  const [isMount, setIsMount] = useState(false);
  const { isPending, onChange } = useUpdateStreamSettings({ field, value });

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return <Skeleton className="h-20 w-full rounded-xl" />;

  return (
    <section className="rounded-xl bg-secondary/50 p-6 ">
      <div className="flex items-center justify-between">
        <p className="font-semibold sm:text-base text-sm  text-muted-foreground ">
          {label}
        </p>
        <div className="space-y-2">
          <ActionTooltip
            asChild={false}
            sideOffset={11}
            label={value ? 'On' : 'Off'}
          >
            <Switch
              disabled={isPending}
              checked={value}
              onCheckedChange={onChange}
            />
          </ActionTooltip>
        </div>
      </div>
    </section>
  );
};
