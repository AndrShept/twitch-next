'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateAboutUser } from '@/hooks/useUpdateAboutUser';
import { EditIcon } from 'lucide-react';

import { ActionTooltip } from '../ActionTooltip';
import { EditButton } from '../EditButton';

interface BioModalProps {
  initialValue: string;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const { isPending, onSubmit, setValue, closeRef, value } =
    useUpdateAboutUser(initialValue);

  return (
    <Dialog>
      <DialogTrigger>
        <EditButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
