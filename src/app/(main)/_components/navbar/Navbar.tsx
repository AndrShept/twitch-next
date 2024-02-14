import { UserAvatarSkeleton } from '@/components/UserAvatar';
import React, { Suspense } from 'react';

import { Actions } from './Actions';
import { Logo } from './Logo';
import { Search } from './Search';

export const Navbar = () => {
  return (
    <nav className=" fixed inset-x-0 top-0 z-50 px-2 flex items-center justify-between lg:gap-x-5 gap-x-3 shadow-sm lg:px-4 bg-secondary/60 h-20 border-b backdrop-blur-sm">
      <Logo />
      <Search />

        <Actions />
     
    </nav>
  );
};
