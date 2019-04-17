import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import chai, { expect } from 'chai';
import { useProvider, useAddress } from '../src/ethereumHooks.js';
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

  it('should provide a provider', function() {
    const Component = () => {
      const provider = useProvider();
      expect(provider).to.not.be.null;
      return null;
    };
    mount(<Component />);
  });

  it('shoudld provides an address', function() {
    const Component = ({ resolve }) => {
      const address = useAddress();
      if (address != null) {
        resolve(address);
      }
      return null;
    }

    const addressPromise = asyncHookPromise(Component);
    return expect(addressPromise).to.eventually.equal(global.web3.address);
  });
});

