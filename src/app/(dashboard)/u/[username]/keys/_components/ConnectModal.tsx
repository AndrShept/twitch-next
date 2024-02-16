'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon, RefreshCcwIcon } from 'lucide-react';
import React from 'react';

import { useGenerateIngress } from '../../hooks/useGenerateIngress';

export const ConnectModal = () => {
  const { isPending, onSubmit, value, setValue, RTMP, WHIP, ref } =
    useGenerateIngress();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>Generate</Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary/70 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>

        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[180px] bg-secondary">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert className="bg-secondary">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle className="text-rose-600 font-semibold">
            Warning!
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={ref}>
            <Button disabled={isPending} variant={'ghost'}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} className="">
            <RefreshCcwIcon
              className={cn('size-4 mr-2', {
                'animate-spin': isPending,
              })}
            />
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
