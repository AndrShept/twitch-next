import { Container } from '@/components/Container';
import React, { ReactNode } from 'react';

import { Navbar } from './_components/navbar/Navbar';
import { Sidebar } from './_components/sidebar/Sidebar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="h-full pt-20 flex">
        <Sidebar />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default layout;
