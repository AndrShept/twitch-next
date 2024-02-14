import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { ChevronLeftIcon, ClapperboardIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Actions = async () => {
  const user = await currentUser();

  return (
    <section className="flex items-center justify-end gap-x-4 ">
      <Button
        asChild
        variant={'ghost'}
        size={'sm'}
        className="text-muted-foreground"
      >
        <Link href={'/'}>
          <ChevronLeftIcon />
          Back
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </section>
  );
};
