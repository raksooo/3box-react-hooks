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

export const useSpace = (...args) => {
  const [space, open] = useDelayedSpace(...args);
  useEffect(() => { open(); }, []);
  return space;
};

export const useDelayedBox = (...args) => {
  return useAsyncOpenable(() => Box.openBox(...args), [...args]);
};

export const useDelayedSpace = (spaceName, box, ...args) => {
  return useAsyncOpenable(() => box.openSpace(spaceName, ...args), [spaceName, box]);
};


