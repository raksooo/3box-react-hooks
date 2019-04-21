import { useState, useEffect, useCallback } from 'react';
import Box from '3box';
import { useEffectIf, useCallbackIf, useAsyncEffectIf } from './helperHooks';
import { useProvider, useAddress } from './ethereumHooks';

export const useProfile = () => {
  const address = useAddress();
  const [profile, setProfile] = useState(null);

  const condition = address != null;
  useAsyncEffectIf(async () => {
    const profile = await Box.getProfile(address);
    setProfile(profile);
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
  const openBox = useCallbackIf(async () => {
    const box = await Box.openBox(address, provider);
    setBox(box);
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
  useAsyncEffectIf(async () => {
    const space = await box.openSpace(spaceName)
    setSpace(space);
  }, [box, space, spaceName], effectCondition);

  return [space, openSpace];
};

