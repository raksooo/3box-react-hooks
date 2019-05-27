import { useEffect } from 'react';
import Box from '3box';
import { useProfile, usePublicSpace } from './api';
import { useAsyncOpenable } from './helperHooks';

export { useProfile, usePublicSpace };

export const useBox = (...args) => {
  const [box, open] = useDelayedBox(...args);
  useEffect(() => { open(); }, []);
  return box;
}

export const useSpace = (spaceName, box) => {
  const [space, open] = useDelayedSpace(spaceName, box);
  useEffect(() => { open(); }, []);
  return space;
};

export const useDelayedBox = (...boxArgs) => {
  return useAsyncOpenable(() => Box.openBox(...boxArgs), [...boxArgs]);
};

export const useDelayedSpace = (spaceName, box) => {
  return useAsyncOpenable(() => box.openSpace(spaceName), [spaceName, box]);
};


