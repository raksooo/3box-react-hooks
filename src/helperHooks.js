import { useState, useEffect, useCallback, useRef } from 'react';

export const useAsync = (fn, dependencies) => {
  const [result, callback] = useAsyncCallback(fn, dependencies);
  useEffect(() => { callback(); }, []);
  return result;
};

export const useAsyncCallback = (callback, dependencies) => {
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

export const useMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => mounted.current = false;
  }, []);

  return mounted;
};

