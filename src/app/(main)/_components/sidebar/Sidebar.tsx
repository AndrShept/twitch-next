import { getFollowedUsers } from '@/lib/services/follow-service';
import React from 'react';

import { Recommended } from './Recommended';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';
import { getRecommended } from './actions/get-recommended';
import { Following } from './Following';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4  ">
        <Following data={following}/>
        <Recommended data={recommended}  />
      </div>
    </Wrapper>
  );
};
