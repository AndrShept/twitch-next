'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ReceivedChatMessage } from '@livekit/components-react';

import { ScrollArea } from '../ui/scroll-area';
import { ChatMessage } from './ChatMessage ';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto   h-full">
      <ScrollArea className=''>
        {messages.map((message) => (
          <ChatMessage key={message.timestamp} data={message} />
        ))}
      </ScrollArea>
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
