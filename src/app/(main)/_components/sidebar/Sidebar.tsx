import { ScrollAreaWrapper } from '@/components/ScrollAreaWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getFollowedUsers } from '@/lib/services/follow-service';
import React from 'react';

import { Following } from './Following';
import { Recommended } from './Recommended';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';
import { getRecommended } from './actions/get-recommended';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />

       
          <Following data={following} />
          <Separator className="lg:mb-4" />
          <Recommended data={recommended} />
     
     
    </Wrapper>
  );
};
