'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLineIcon, ArrowRightToLineIcon } from 'lucide-react';
import React, { useEffect, useLayoutEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Toggle = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? 'Expand' : 'Collapse';


  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [isMobile, onCollapse, onExpand]);


  return (
    <>
      {!collapsed && (
        <div className="p-3  mb-2 flex items-center justify-between w-full">
          <p className="text-primary font-semibold">for you</p>
          <ActionTooltip label={label} side="right">
            <Button
              onClick={onCollapse}
              variant={'ghost'}
              size={'icon'}
              className="size-8 text-muted-foreground"
            >
              <ArrowLeftFromLineIcon className="size-5" />
            </Button>
          </ActionTooltip>
        </div>
      )}
      {collapsed && (
        <ActionTooltip label={label} side="right">
          <Button
            onClick={onExpand}
            variant={'ghost'}
            size={'icon'}
            className="lg:flex hidden size-8 text-muted-foreground mx-auto mt-2"
          >
            <ArrowRightToLineIcon className="size-5" />
          </Button>
        </ActionTooltip>
      )}
    </>
  );
};
