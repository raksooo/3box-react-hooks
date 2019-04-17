import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import chai, { expect } from 'chai';
import {
  useProfile,
  useBox,
  useDelayedBox,
  useSpace,
  useDelayedSpace
} from '../src/3boxHooks.js';
import { asyncHookPromise, initProvider } from './testHelper';
import 'jsdom-global/register';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import ChaiAsPromised from 'chai-as-promised';
chai.use(ChaiAsPromised);

describe('Ethereum specific hooks', function() {
  before(function() {
    initProvider();
  });

  it('should retrieve a profile', function() {
    const Component = ({ resolve }) => {
      const profile = useProfile();
      if (profile != null) {
        resolve(profile);
      }
      return null;
    }

    const profilePromise = asyncHookPromise(Component);
    return expect(profilePromise).to.eventually.not.be.null;
  });
});

