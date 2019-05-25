import { useEffect } from 'react';
import Box from '3box';
import { useAsyncCallback, useAsync } from './helperHooks';

export const useProfile = (address) => {
  return useAsync(async () => await Box.getProfile(address), [address]);
};

export const usePublicSpace = (spaceName, address) => {
  return useAsync(async () => await Box.getSpace(spaceName, address));
};

export const useBox = (...args) => {
  const [box, open] = useDelayedBox(...args);
  useEffect(() => { open(); }, []);
  return box;
}

export const useSpace = (spaceName, ...boxArgs) => {
  const [space, box, open] = useDelayedSpace(spaceName, ...boxArgs);
  useEffect(() => { open(); }, []);
  return [space, box];
}

export const useDelayedBox = (...boxArgs) => {
  return useAsyncCallback(async () => {
    return await openBox(...boxArgs)
  }, [...boxArgs]);
};

export const useDelayedSpace = (spaceName, ...boxArgs) => {
  const [result, openSpace] = useAsyncCallback(async () => {
    const box = await openBox(...boxArgs);
    const space = await box.openSpace(spaceName);
    return [space, box];
  }, [spaceName, ...boxArgs]);

  const [space, box] = result != null ? result : [null, null];
  return [space, box, openSpace];
};

const openBox = async (address, provider) => {
  return await Box.openBox(address, provider);
};

