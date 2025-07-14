

import { TextFieldProps as MuiTextFieldProps, TextField as MuiTextField } from '@mui/material';
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

type TextFieldProps = Omit<MuiTextFieldProps, 'onChange'> & { debounceMs?: number; onChange?: (value: string) => void };

export const TextField = forwardRef(function (
  { debounceMs = 250, value, onChange, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [currentValue, setCurrentValue] = useState(value);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setCurrentValue(event.target.value);
    debounceFn(event.target.value);
  }

  const handleDebounceFn = useCallback(
    (inputValue: string) => {
      onChange?.(inputValue);
    },
    [onChange]
  );

  const debounceFn = useMemo(() => debounce(handleDebounceFn, debounceMs), [debounceMs, handleDebounceFn]);

  return <MuiTextField ref={ref} value={currentValue} onChange={handleChange} {...props} />;
});
TextField.displayName = 'TextField';
