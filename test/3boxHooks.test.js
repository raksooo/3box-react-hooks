import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import chai, { expect } from 'chai';
import FakeProvider from 'web3-fake-provider';
import {
  useProfile,
  useBox,
  useDelayedBox,
  useSpace,
  useDelayedSpace
} from '../src/3boxHooks.js';
import { asyncHookPromise } from './testHelper';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Ethereum specific hooks', function() {
  this.timeout(5000);

  const TEST_PROFILE = {
    address: '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1',
    name: 'Oskar',
  };
  const TEST_SPACE = '3box-react-hooks-test-space';

  const provider = new FakeProvider();

  beforeEach(function() {
    provider.injectResult('0x0');
  });

  it('should retrieve a profile', function() {
    const Component = ({ resolve }) => {
      const profile = useProfile(TEST_PROFILE.address);
      profile != null && resolve(profile);
      return null;
    }
    const promise = asyncHookPromise(Component);

    return promise.then(profile => {
      expect(profile).to.not.be.null;
      expect(profile).to.have.property('name', TEST_PROFILE.name);
    });
  });

  it('should retrieve a box', function() {
    const Component = ({ resolve }) => {
      const box = useBox(TEST_PROFILE.address, provider);
      box != null && resolve(box);
      return null;
    }
    const promise = asyncHookPromise(Component);

    return promise.then(box => {
      expect(box).to.not.be.null;
      expect(box).to.have.property('private');
      expect(box).to.have.property('public');
      expect(box).to.have.property('spaces');
    });
  });

  it('should retrieve a space', function() {
    const Component = ({ resolve }) => {
      const [space] = useSpace(TEST_SPACE, TEST_PROFILE.address, provider);
      space != null && resolve(space);
      return null;
    }
    const promise = asyncHookPromise(Component);

    return promise.then(space => {
      expect(space).to.not.be.null;
      expect(space).to.have.property('private');
      expect(space).to.have.property('public');
    });
  });
});

