import { getSelfByUserName } from '@/lib/services/auth-service';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

import { Navbar } from './_components/navbar/Navbar';
import { Sidebar } from './_components/sidebar/Sidebar';

interface CreatorLayoutProps {
  params: { username: string };
  children: ReactNode;
}

const CreatorLayout = ({ params, children }: CreatorLayoutProps) => {
  const self = getSelfByUserName();
  if (!self) {
    redirect('/');
  }
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20 ">
        <Sidebar />
        <div className="flex-1 lg:ml-60 ml-[70px] ">{children}</div>
      </div>
    </>
  );
};

export default CreatorLayout;
