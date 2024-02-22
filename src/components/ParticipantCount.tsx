'use client';

import { cn } from '@/lib/utils';
import { useParticipants } from '@livekit/components-react';
import React from 'react';

export const ParticipantCount = ({ className }: { className?: string }) => {
  const participants = useParticipants();
  const participantsCount = participants.length - 1;
  return (
    <p className={cn('text-xs font-semibold', className)}>{participantsCount}</p>
  );
};
