import { Loader2 } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <div className=" w-full h-full flex  justify-center">
      <Loader2 className="animate-spin mt-28 size-7 " />
    </div>
  );
};

export default loading;
