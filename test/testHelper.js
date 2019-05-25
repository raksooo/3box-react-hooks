import React from 'react';
import { mount } from 'enzyme';

export const asyncHookPromise = Component => {
  return new Promise(resolve => {
    mount(<Component resolve={resolve} />);
  });
};

