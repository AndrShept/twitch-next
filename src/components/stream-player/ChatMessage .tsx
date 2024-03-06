'use client';

import { stringToColor } from '@/lib/utils';
import { Chat } from '@prisma/client';
import { format } from 'date-fns';
import { useRef } from 'react';

interface ChatMessageProps {
  data: Chat;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.username || '');
  const today = new Date().getDate();
  const other = new Date(data.createdAt).getDate();
  const isOldMessage = today > other;

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40 whitespace-nowrap">
        {' '}
        {isOldMessage
          ? format(data.createdAt, 'MM.dd HH:mm')
          : format(data.createdAt, 'HH:mm')}
      </p>

      <p className="text-sm font-semibold whitespace-nowrap">
        <span className="" style={{ color: color }}>
          {data.username}
        </span>
        :
      </p>
      <p className="text-sm break-all">{data.content}</p>
    </div>
  );
};
