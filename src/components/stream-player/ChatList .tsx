'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetChat } from '@/hooks/useGetChat';
import { ReceivedChatMessage } from '@livekit/components-react';
import { forwardRef, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ScrollArea } from '../ui/scroll-area';
import { ChatMessage } from './ChatMessage ';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
  streamId: string;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  ({ messages, isHidden, streamId }, ref) => {
    const { data: oldMessages, isPending } = useGetChat(streamId);

    const collapseMessages = [
      ...oldMessages,
      ...messages.map((message: ReceivedChatMessage) => {
        return {
          id: uuidv4(),
          content: message.message,
          userId: message.from?.identity.replace('host-', '') || '',
          streamId,
          username: message.from?.name || '',
          createdAt: new Date(message.timestamp),
          updatedAt: new Date(message.timestamp),
        };
      }),
    ];

    if (isHidden || !collapseMessages.length) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
          </p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="flex flex-1 flex-col-reverse overflow-y-auto   h-full"
      >
        <ScrollArea>
          {collapseMessages.map((message) => (
            <ChatMessage key={message.id} data={message} />
          ))}
        </ScrollArea>
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
