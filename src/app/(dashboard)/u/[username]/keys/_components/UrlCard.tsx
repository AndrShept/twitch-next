import { Input } from '@/components/ui/input';
import React from 'react';

import { CopyButton } from '../../../../../../components/CopyButton';

interface UrlCardProps {
  value: string;
}

export const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <article className="rounded-xl w-full p-6 bg-secondary/50 flex flex-col gap-2">
      <section className="flex items-center gap-x-10">
        <p className="font-semibold">Server URL</p>
      </section>
      <section className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Input value={value || ''} disabled placeholder="Server URL" />
          <CopyButton value={value} />
        </div>
      </section>

      
    </article>
  );
};
