import { useState, useEffect, useCallback } from 'react';
import Box from '3box';
import { useProvider, useAddress } from './ethereumHooks';

export const useProfile = () => {
	const address = useAddress();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		if (address != null) {
			Box
				.getProfile(address)
				.then(setProfile);
		}
	}, [address]);

	return profile;
};

export const useBox = () => {
  const [box, openBox] = useDelayedBox();
  useEffect(openBox);
  return box;
}

export const useDelayedBox = () => {
  const provider = useProvider();
  const address = useAddress();
  const [box, setBox] = useState(null);

	const openBox = useCallback(() => {
		if (address != null && box == null) {
			return Box
				.openBox(address, provider)
				.then(setBox);
		}
	}, [provider, address, box]);

  return [box, openBox];
};

export const useSpace = (spaceName) => {
  const [space, openSpace] = useDelayedSpace(spaceName);
  useEffect(openSpace);
  return space;
}

export const useDelayedSpace = (spaceName) => {
	const [box, openBox] = useDelayedBox();
	const [space, setSpace] = useState(null);
	
	const openSpace = useCallback(() => {
    if (box == null && space == null) {
      openBox();
    }
	}, [box, openBox, space]);

  useEffect(() => {
    if (box != null && space == null) {
      box
				.openSpace(spaceName)
				.then(setSpace);
    }
  }, [box, space, spaceName])

	return [space, openSpace];
};

