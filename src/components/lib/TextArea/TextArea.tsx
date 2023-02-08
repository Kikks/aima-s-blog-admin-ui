import type { FC } from 'react';

import Text from '../Text';
import type TextAreaProps from './TextArea.props';

const TextArea: FC<TextAreaProps> = ({
  label,
  id,
  error,
  helperText,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName || ''}`}>
      {label && (
        <label className="text-sm font-bold" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="w-full">
        <div
          className={`mx-auto flex w-full items-center overflow-hidden rounded-md border bg-[#fefefe] focus-within:border-primary-main ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <textarea
            id={id}
            className="w-full flex-1 border-none bg-transparent py-3 px-5  font-medium outline-none focus:border-none"
            {...rest}
          />
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

export default TextArea;
