import { useState, useEffect, useCallback } from 'react';
import Box from '3box';
import { useEffectIf, useCallbackIf } from './helperHooks';
import { useProvider, useAddress } from './ethereumHooks';

export const useProfile = () => {
  const address = useAddress();
  const [profile, setProfile] = useState(null);

  const condition = address != null;
  useEffectIf(() => {
    Box
      .getProfile(address)
      .then(setProfile);
  }, [address], condition);

  return profile;
};

export const useBox = () => {
  const [box, openBox] = useDelayedBox();
  useEffect(() => { openBox() });
  return box;
}

export const useDelayedBox = () => {
  const provider = useProvider();
  const address = useAddress();
  const [box, setBox] = useState(null);

  const condition = address != null && box == null;
  const openBox = useCallbackIf(() => {
    Box
      .openBox(address, provider)
      .then(setBox);
  }, [provider, address, box], condition);

  return [box, openBox];
};

export const useSpace = (spaceName) => {
  const [space, openSpace] = useDelayedSpace(spaceName);
  useEffect(() => { openSpace() });
  return space;
}

export const useDelayedSpace = (spaceName) => {
  const [box, openBox] = useDelayedBox();
  const [space, setSpace] = useState(null);

  const condition = box == null && space == null;
  const openSpace = useCallbackIf(openBox, [box, openBox, space], condition);

  const effectCondition = box != null && space == null;
  useEffectIf(() => {
    box
      .openSpace(spaceName)
      .then(setSpace);
  }, [box, space, spaceName], effectCondition);

  return [space, openSpace];
};

