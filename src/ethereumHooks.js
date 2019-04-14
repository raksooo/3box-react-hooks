import { useState, useEffect, useMemo } from 'react';

const getProvider = () => {
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    return window['ethereum'] || window.web3.currentProvider
  }

  return null;
};

export const useProvider = () => {
  const provider = useMemo(getProvider);
  return provider;
};

export const useAddress = () => {
  const provider = useProvider();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    provider
      .enable()
      .then(addresses => setAddress(addresses[0]));
  }, [provider]);

  return address;
};

