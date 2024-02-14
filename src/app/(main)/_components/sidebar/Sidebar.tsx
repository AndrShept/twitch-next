import React from 'react';

import { Recommended } from './Recommended';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';
import { getRecommended } from './actions/get-recommended';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0 ">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};
