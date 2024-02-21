import { Check } from 'lucide-react';
import React from 'react';

export const VerifiedMark = () => {
  return (
    <div className="p-[3px] flex items-center justify-center size-5 text-primary  rounded-full bg-emerald-600">
      <Check className="stroke-[3px]" />
    </div>
  );
};
