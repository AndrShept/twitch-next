import { updateUser } from '@/app/actions/user';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

export const useUpdateAboutUser = (initialValue: string) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || '');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success('User bio updated');
          closeRef.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };
  return {
    isPending,
    setValue,
    onSubmit,
    value,
    closeRef,
  };
};
