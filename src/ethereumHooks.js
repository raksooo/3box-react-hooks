import { useState, useEffect, useMemo } from 'react';
import { useAsyncEffect } from './helperHooks';

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

const getAddressFromProvider = async (provider) => {
  if (provider == null) {
    return null;
  }

  if (typeof provider.enable == 'function') {
    const addresses = await provider.enable()
    return addresses[0];
  } else {
    return provider.address;
  }
}

export const useProvider = () => useMemo(getProvider);

export const useAddress = () => {
  const provider = useProvider();
  const [address, setAddress] = useState(null);

  useAsyncEffect(async () => {
    const address = await getAddressFromProvider(provider);
    if (address != null) {
      setAddress(address);
    }
  }, [provider]);

  return address;
};

