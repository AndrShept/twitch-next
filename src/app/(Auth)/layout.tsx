import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-full flex items-center justify-center">{children}</section>
  );
};

export default AuthLayout;
