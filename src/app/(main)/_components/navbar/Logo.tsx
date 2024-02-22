import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const Logo = () => {
  return (
    <Link href={'/'}>
      <section className="flex items-center gap-x-2 hover:opacity-75 transition">
        <div className="bg-secondary rounded-full p-1 shrink-0 lg:mr-0 mr-5">
          <Image alt="logo_image" src="/logo4.png" height={40} width={40} />
        </div>
        <div className={`${poppins.className} lg:block hidden`}>
          <p className="text-lg font-semibold">Stream Verse</p>
          <p className="text-muted-foreground">Lets Go</p>
        </div>
      </section>
    </Link>
  );
};
