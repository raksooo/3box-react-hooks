import { useEffect } from 'react';
import Box from '3box';
import { useProfile, usePublicSpace } from './api';
import { useAsyncCallback, useAsync } from './helperHooks';

export { useProfile, usePublicSpace };

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
  return useAsyncCallback(() => openBox(...boxArgs), [...boxArgs]);
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

const openBox = (address, provider) => {
  return Box.openBox(address, provider);
};

