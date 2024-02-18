import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '../app/actions/stream';
import { FieldTypes } from '../app/(dashboard)/u/[username]/chat/_components/ToggleCard';

interface useUpdateStreamSettingsProps {
  field: FieldTypes;
  value: boolean;
}

export const useUpdateStreamSettings = ({
  field,
  value,
}: useUpdateStreamSettingsProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(async () => {
      const res = await updateStream({ [field]: value ? false : true });
      if (res) {
        toast.success('Chat settings updated!');
      } else {
        toast.error('Something went wrong');
      }
    });
  };
  return {
    isPending,
    onChange,
  };
};
