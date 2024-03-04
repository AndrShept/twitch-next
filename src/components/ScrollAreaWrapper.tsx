'use client'
import React, { ReactNode } from 'react';

import { ScrollArea } from './ui/scroll-area';
import { useSidebar } from '@/store/use-sidebar';

export const ScrollAreaWrapper = ({ children }: { children: ReactNode }) => {
    const {collapsed} = useSidebar()
  return <ScrollArea className='p-2'>{children}</ScrollArea>;
};
