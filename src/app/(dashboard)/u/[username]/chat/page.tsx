import { getSelfUser } from '@/lib/services/auth-service';
import { getStreamByUserId } from '@/lib/services/stream-service';
import React from 'react';

import { ToggleCard } from './_components/ToggleCard';

const ChatPage = async () => {
  const self = await getSelfUser();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('Stream not found');
  }
  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </section>
  );
};

export default ChatPage;
