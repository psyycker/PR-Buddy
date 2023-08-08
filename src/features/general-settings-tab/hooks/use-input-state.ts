import { useInputState as useInputStateMantine } from '@mantine/hooks';
import { useDebounce } from 'usehooks-ts';
import { useEffect } from 'react';

const useInputState = <T>(
  initialState: T,
  setConfigValue: (newValue: T) => void,
  debounce: boolean = false,
): {
  value: T,
  setValue: (newValue: T) => void
} => {
  const [value, setValue] = useInputStateMantine<T>(initialState);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debounce) return;
    setConfigValue(value);
  }, [value, debounce]);

  useEffect(() => {
    if (!debounce) return;
    setConfigValue(debouncedValue);
  }, [debouncedValue, debounce]);

  return {
    value,
    setValue,
  };
};

export default useInputState;
