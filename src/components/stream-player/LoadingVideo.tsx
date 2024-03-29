import { Loader } from 'lucide-react';

import { Spinner } from '../Spinner';

interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Spinner className="h-10 w-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};
