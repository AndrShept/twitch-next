'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Volume1, VolumeXIcon } from 'lucide-react';
import { useState } from 'react';

import { EmojiPicker } from '../EmojiPicker';
import { ChatInfo } from './ChatInfo ';

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isPending: boolean;
  isPlay: boolean;
  setIsPlay: (prev: boolean) => void;
}

export const ChatForm = ({
  isPending,
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  isPlay,
  setIsPlay,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 py-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            'border-white/10',
            (isFollowersOnly || isDelayed) && 'rounded-t-none border-t-0',
          )}
        />
      </div>
      <div className=" flex w-full  items-center justify-between      gap-2">
        <div>
          {isPlay && (
            <Button
            className='text-muted-foreground'
              type="button"
              onClick={() => setIsPlay(false)}
              variant={'ghost'}
              size={'icon'}
            >
              <Volume1 />
            </Button>
          )}
          {!isPlay && (
            <Button
            className='text-muted-foreground'
              type="button"
              onClick={() => setIsPlay(true)}
              variant={'ghost'}
              size={'icon'}
            >
              <VolumeXIcon />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            disabled={isPending}
            className="rounded-full h-[24px] w-[24px] p-1"
            size={'icon'}
          >
            <EmojiPicker
              onChange={(emoji: string) => onChange(`${value} ${emoji}`)}
            />
          </Button>
          <Button type="submit" size="sm" disabled={isDisabled}>
            Chat
          </Button>
        </div>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
