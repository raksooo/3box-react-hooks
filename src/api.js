import { getProfile, getSpace } from '3box/lib/api';
import { useAsync } from './helperHooks';

export const useProfile = (address) => {
  return useAsync(() => getProfile(address), [address]);
};

export const usePublicSpace = (address, spaceName) => {
  return useAsync(() => getSpace(address, spaceName), [address, spaceName]);
};

