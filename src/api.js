import { getProfile, getSpace } from '3box/lib/api';
import { useAsync } from './helperHooks';

export const useProfile = (address) => {
  return useAsync(async () => await getProfile(address, undefined, {}), [address]);
};

export const usePublicSpace = (address, spaceName) => {
  return useAsync(async () => {
    return await getSpace(address, spaceName, undefined, {});
  }, [address, spaceName]);
};

