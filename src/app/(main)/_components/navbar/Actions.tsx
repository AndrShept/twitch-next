import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { ClapperboardIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Actions = async () => {
  const user = await currentUser();


  return (
    <section className="flex items-center justify-end gap-x-2 ">
      {!user && (
        <SignInButton>
          <Button variant={'gradient'}>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className="text-muted-foreground "
          >
            <Link href={`/u/${user.username}`}>
              <ClapperboardIcon className="size-5" />
              <span className="ml-2 lg:block hidden">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </section>
  );
};
