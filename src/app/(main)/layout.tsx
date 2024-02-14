import { Container } from '@/components/Container';
import React, { ReactNode, Suspense } from 'react';

import { Navbar } from './_components/navbar/Navbar';
import { Sidebar } from './_components/sidebar/Sidebar';
import { SidebarSkeleton } from './_components/sidebar/Wrapper';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="h-full pt-20 flex">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>{children}</Container>
      </main>
    </>
  );
};

export default layout;
