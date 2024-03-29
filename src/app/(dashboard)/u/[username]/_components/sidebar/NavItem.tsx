'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  const isMobile = useMediaQuery(`(max-width: 1024px)`);
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12 hover:bg-secondary/60',
        { 'justify-start': !collapsed && !isMobile },
        isActive && 'bg-secondary hover:bg-secondary',
      )}
    >
      <Link href={href}>
        <div className="flex items-center  gap-x-4">
          <Icon className={cn('h-4 w-4')} />
          {!collapsed && !isMobile && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2 lg:mt-0 mt-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block ">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
