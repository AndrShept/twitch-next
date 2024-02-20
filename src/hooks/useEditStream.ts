import { updateStream } from '@/app/actions/stream';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface useEditStreamProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const useEditStream = ({
  initialName,
  initialThumbnailUrl,
}: useEditStreamProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed');
          setThumbnailUrl('');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success('Stream updated');
          closeRef?.current?.click();
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return {
    isPending,
    onChange,
    onSubmit,
    onRemove,
    thumbnailUrl,
    setThumbnailUrl,
    name,
    closeRef,
  };
};
