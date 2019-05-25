import React from 'react';
import { mount } from 'enzyme';

export const testHook = (hook, ...args) => {
  return testHookN(hook, null, ...args);
};

export const testHookN = (hook, n, ...args) => {
  const Component = ({ resolve }) => {
    let result = hook(...args);
    result = n == null ? result : result[n];
    result != null && resolve(result);
    return null;
  }
  return asyncHookPromise(Component);
};

export const asyncHookPromise = Component => {
  return new Promise(resolve => {
    mount(<Component resolve={resolve} />);
  });
};

