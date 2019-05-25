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
import ChaiAsPromised from 'chai-as-promised';

configure({ adapter: new Adapter() });
chai.use(ChaiAsPromised);

describe('Ethereum specific hooks', function() {
  this.timeout(5000);

  const TEST_PROFILE = {
    address: '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1',
    name: 'Oskar',
  };

  const provider = new FakeProvider();
  const result = "0x565dbf28ff166f3118182044c3f9cf8558d170bee98e7887d21d40027be6ee457debd818805e0ca33665bbc375e0f06d48ada99308fcde24f320aac2e82b5dbc1c";
  provider.injectResult(result);

  it('should retrieve a profile', function() {
    const Component = ({ resolve }) => {
      const profile = useProfile(TEST_PROFILE.address);
      profile != null && resolve(profile);
      return null;
    }
    const promise = asyncHookPromise(Component);

    return Promise.all([
      expect(promise).to.eventually.be.fulfilled,
      expect(promise).to.eventually.not.be.null,
      expect(promise).to.eventually.have.property('name', TEST_PROFILE.name),
    ]);
  });

  it('should retrieve a box', function() {
    const Component = ({ resolve }) => {
      const box = useBox(TEST_PROFILE.address, provider);
      box != null && resolve(box);
      return null;
    }
    const promise = asyncHookPromise(Component);

    return Promise.all([
      expect(promise).to.eventually.be.fulfilled,
      expect(promise).to.eventually.not.be.null,
      expect(promise).to.eventually.have.property('private'),
      expect(promise).to.eventually.have.property('public'),
      expect(promise).to.eventually.have.property('spaces'),
    ]);
  });
});

