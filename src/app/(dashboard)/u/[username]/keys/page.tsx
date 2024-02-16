import { Button } from '@/components/ui/button';
import { getSelfUser } from '@/lib/services/auth-service';
import { getStreamByUserId } from '@/lib/services/stream-service';
import { RefreshCcwIcon } from 'lucide-react';
import React from 'react';

import { KeyCard } from './_components/KeyCard';
import { UrlCard } from './_components/UrlCard';
import { ConnectModal } from './_components/ConnectModal';

const KeysPage = async () => {
  const self = await getSelfUser();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>

        <ConnectModal/>
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl || 'default URL'} />
        <KeyCard value={stream.streamKey || 'default KEY'} />
      </div>
    </section>
  );
};

export default KeysPage;
