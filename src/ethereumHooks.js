import { useState, useEffect, useMemo } from 'react';

const getProvider = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    return window.ethereum;
  } else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    return window.web3.currentProvider
  } else if (typeof global !== 'undefined' && typeof global.web3 !== 'undefined') {
    return global.web3;
  }

  return null;
};

const getAddressFromProvider = provider => {
  if (provider == null) {
    return Promise.resolve(null);
  }

  if (typeof provider.enable == 'function') {
    return provider
      .enable()
      .then(addresses => addresses[0]);
  } else {
    return Promise.resolve(provider.address);
  }
}

export const useProvider = () => useMemo(getProvider);

export const useAddress = () => {
  const provider = useProvider();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getAddressFromProvider(provider)
      .then(address => {
        if (address != null) {
          setAddress(address);
        }
      });
  }, [provider]);

  return address;
};

