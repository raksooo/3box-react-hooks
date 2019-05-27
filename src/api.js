import { getProfile, getSpace } from '3box/lib/api';
import { useAsync } from './helperHooks';

export const useProfile = (...args) => {
  return useAsync(() => getProfile(...args), [...args]);
};

export const usePublicSpace = (...args) => {
  return useAsync(() => getSpace(...args), [...args]);
};

