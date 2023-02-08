import type { FC } from 'react';

import Text from '../Text';
import type InputProps from './Select.props';

const Input: FC<InputProps> = ({
  label,
  id,
  error,
  helperText,
  options,
  className,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-bold" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="w-full">
        <div
          className={`mx-auto flex w-full max-w-[700px] items-center overflow-hidden rounded-md border bg-[#fefefe] focus-within:border-primary-main ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <select
            id={id}
            className={`flex-1 border-none bg-transparent py-3 px-5 font-medium outline-none focus:border-none ${
              className || ''
            }`}
            {...rest}
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {helperText && (
        <Text variant="caption" className={error ? 'text-red-500' : ''}>
          {helperText}
        </Text>
      )}
    </div>
  );
};

export default Input;
