import React, { ReactNode } from 'react';

import { Navbar } from './_components/Navbar';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full pt-20">{children}</div>
    </>
  );
};

export default layout;
