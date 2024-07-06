// copied from https://hackernoon.com/how-to-use-debounce-in-nextjs

import { useState, useEffect } from 'react';

export default function useDebounce<TData>(value: TData, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
