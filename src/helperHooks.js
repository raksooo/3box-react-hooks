import { useState, useEffect, useCallback, useRef } from 'react';

export const useAsync = (fn, dependencies, defaultValue = null) => {
  const mounted = useMounted();
  const [result, setResult] = useState(defaultValue);

  useEffect(() => {
    (async () => {
      const result = await fn();
      if (mounted.current) {
        setResult(result);
      }
    })();
  }, dependencies);

  return result;
};

export const useAsyncCallback = (callback, dependencies, defaultValue = null) => {
  const mounted = useMounted();
  const [result, setResult] = useState(defaultValue);

  const _callback = useCallback(async () => {
    const result = await callback();
    if (mounted.current) {
      setResult(result);
    }
  }, dependencies);

  return [result, _callback];
};

export const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => mounted.current = false;
  }, []);

  return mounted;
};

