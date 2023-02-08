import type { FC } from 'react';

import Text from '../Text';
import type InputProps from './Input.props';

const Input: FC<InputProps> = ({
  label,
  id,
  error,
  helperText,
  startIcon,
  endIcon,
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
          className={`mx-auto flex w-full items-center overflow-hidden rounded-md border bg-[#fefefe] focus-within:border-primary-main ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${startIcon ? 'pl-4' : ''} ${endIcon ? 'pr-4' : ''} `}
        >
          {startIcon && startIcon}

          <input
            id={id}
            className={`flex-1 border-none bg-transparent py-3 px-5  font-medium outline-none focus:border-none ${
              startIcon ? 'ml-2 pl-0' : ''
            } ${endIcon ? 'mr-2 pr-0' : ''} `}
            {...rest}
          />

          {endIcon && endIcon}
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
