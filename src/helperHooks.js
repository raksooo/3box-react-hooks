import { useState, useEffect, useCallback, useRef } from 'react';

export const useAsync = (fn, dependencies) => {
  const [result, callback] = useAsyncCallback(fn, dependencies);
  useEffect(() => { callback(); }, []);
  return result;
};

export const useAsyncOpenable = (callback, dependencies) => {
  const [result, asyncCallback] = useAsyncCallback(callback, dependencies);
  const openable = useOpenable(asyncCallback, dependencies);
  return [result, openable];
};

const useAsyncCallback = (callback, dependencies) => {
  const mounted = useMounted();
  const [result, setResult] = useState(null);

  const _callback = useCallback(async () => {
    const result = await callback();
    if (mounted.current) {
      setResult(result);
    }
  }, dependencies);

  return [result, _callback];
};

const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => mounted.current = false;
  }, []);

  return mounted;
};

const useOpenable = (callback, dependencies) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened && dependencies.every(dependency => dependency != null)) {
      callback();
    }
  }, dependencies.concat([opened]));

  return useCallback(() => setOpened(true));
};

