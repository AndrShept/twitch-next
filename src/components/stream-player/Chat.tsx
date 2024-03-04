'use client';

import { addMessage } from '@/app/actions/chat';
import { useGetChat } from '@/hooks/useGetChat';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { useChatStore } from '@/store/useChatStore';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { Ref, useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { ChatCommunity } from './ChatCommunity ';
import { ChatForm, ChatFormSkeleton } from './ChatForm ';
import { ChatHeader, ChatHeaderSkeleton } from './ChatHeader ';
import { ChatList, ChatListSkeleton } from './ChatList ';

interface ChatProps {
  streamId: string;
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  viewerIdentity: string;
}

export const Chat = ({
  viewerIdentity,
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  streamId,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send, isSending } = useChat();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);
  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    addMessage({
      content: value,
      userId: viewerIdentity,
      streamId,
      username: viewerName,
    });

    setValue('');
    const scrollContainer = ref.current;
    if (scrollContainer) {
      // Опустити скрол вниз
      console.log(scrollContainer.scrollWidth);
      console.log(scrollContainer.scrollHeight);

    }
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b  h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList
            ref={ref}
            streamId={streamId}
            messages={reversedMessages}
            isHidden={isHidden}
          />
          <ChatForm
            isPending={isSending}
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
