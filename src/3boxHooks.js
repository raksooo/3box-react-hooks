import { useState, useEffect, useCallback } from 'react';
import Box from '3box';
import { useProvider, useAddress } from './ethereumHooks';

export const use3boxProfile = () => {
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

export const use3box = () => {
  const provider = useProvider();
  const address = useAddress();
  const [box, setBox] = useState(null);

	const authenticate = useCallback(() => {
		if (address != null) {
			return Box
				.openBox(address, provider)
				.then(box => {
					setBox(box);
					return box
				});
		}
	}, [address, provider]);

  return [box, authenticate];
};

export const use3boxSpace = (spaceName) => {
	const [box, authenticateBox] = use3box();
	const [space, setSpace] = useState(null);
	
	const authenticate = useCallback(() => {
		const authenticateSpace = box => {
			return box
				.openSpace(spaceName)
				.then(setSpace);
		};

		if (box != null) {
			authenticateSpace(box);
		} else {
			authenticateBox()
				.then(box => authenticateSpace(box));
		}
	}, [box, authenticateBox, spaceName]);

	return [space, authenticate];
};

