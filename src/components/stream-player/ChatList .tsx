'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useGetChat } from '@/hooks/useGetChat';
import { ReceivedChatMessage } from '@livekit/components-react';
import { ChevronDownIcon } from 'lucide-react';
import { forwardRef } from 'react';

import { Spinner } from '../Spinner';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { ChatMessage } from './ChatMessage ';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
  streamId: string;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  ({ messages, isHidden, streamId }, ref) => {
    const { mergeMessages, isPending } = useGetChat({ messages, streamId });
    const { scrollToBottom } = useChatScroll({
      msgLength: mergeMessages.length,
      ref,
    });

    if (isHidden || !mergeMessages.length) {
      return (
        <div className="flex flex-1 items-center justify-center bg-secondary/50">
          <p className="text-sm text-muted-foreground">
            {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
          </p>
        </div>
      );
    }

    return (
      <div className="flex  flex-col-reverse overflow-y-auto  bg-secondary/50 lg:rounded-none rounded-b-xl   ">
        <Button
          className="lg:rounded-none rounded-b-xl text-muted-foreground"
          variant={'ghost'}
          onClick={scrollToBottom}
        >
          <ChevronDownIcon />
        </Button>

        <div className=" overflow-y-auto">
          {/* <ScrollArea className='whitespace-nowrap ' > */}
          {mergeMessages.map((message) => (
            <ChatMessage key={message.id} data={message} />
          ))}
          <div ref={ref} />
          {/* </ScrollArea> */}
        </div>
      </div>
    );
  },
);
ChatList.displayName = 'ChatList';

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
