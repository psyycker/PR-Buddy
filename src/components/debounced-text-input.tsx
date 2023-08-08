import { useInputState } from '@mantine/hooks';
import { useDebounce } from 'usehooks-ts';
import { type FC, useEffect } from 'react';
import { TextInput } from '@mantine/core';

interface IProps {
  initialState: string | number,
  onChange: (newValue: string | number) => void,
  placeholder: string
}

const DebouncedTextInput: FC<IProps> = ({
  initialState,
  onChange,
  placeholder,
}) => {
  const [state, setState] = useInputState<string | number>(initialState);
  const debouncedValue = useDebounce(state, 500);
  console.log(initialState);

  useEffect(() => {
    if (debouncedValue !== initialState) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <TextInput
      value={state}
      onChange={(e) => { setState(e.target.value); }}
      placeholder={placeholder}
    />
  );
};

export default DebouncedTextInput;
