import React, { ReactNode } from 'react';

import { Logo } from '../(browse)/_components/navbar/Logo';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-full flex items-center justify-center">
      <div className='flex-col flex  items-center gap-8'>
        <Logo />

        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
