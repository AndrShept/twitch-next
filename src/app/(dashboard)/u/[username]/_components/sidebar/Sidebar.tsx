
import React from 'react';

import { Navigation } from './Navigation';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
