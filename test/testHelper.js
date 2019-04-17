import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Web3 from 'web3';

export const asyncHookPromise = Component => {
  return new Promise(resolve => {
    mount(<Component resolve={resolve} />);
  });
};

export const initProvider = () => {
  const instance = new Web3('http://mainnet.infura.io/');
  global.web3 = instance.eth.accounts.create();
};

