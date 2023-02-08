import type { FC } from 'react';

import type ToggleProps from './Toggle.props';

const Toggle: FC<ToggleProps> = ({ label, ...rest }) => {
  return (
    <label
      htmlFor="checked-toggle"
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        value=""
        id="checked-toggle"
        className="peer sr-only"
        {...rest}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-main peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-light"></div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;
