import { useEffect, useCallback } from 'react';

export const useEffectIf = (effect, dependencies = [], condition) => {
  return useEffect(() => {
    if (condition === true) {
      effect();
    }
  }, dependencies.concat([condition]));
};

export const useCallbackIf = (callback, dependencies = [], condition) => {
  return useCallback(() => {
    if (condition === true) {
      callback();
    }
  }, dependencies.concat([condition]));
};

export const useAsyncEffect = (effect, dependencies) => {
  return useEffect(() => {
    effect();
  }, dependencies);
};

export const useAsyncEffectIf = (effect, dependencies = [], condition) => {
  return useAsyncEffect(async () => {
    if (condition === true) {
      effect();
    }
  }, dependencies.concat([condition]));
};

