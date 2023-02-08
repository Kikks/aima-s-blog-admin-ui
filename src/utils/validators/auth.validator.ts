import { isEmail, isEmpty, isValid } from './helpers';

export const validateLoginPayload = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors = {
    email: '',
    password: '',
  };

  if (isEmpty(email)) errors.email = 'Email cannot be empty';
  else if (!isEmail(email)) errors.email = 'Invalid email address';

  if (isEmpty(password)) errors.password = 'Password cannot be empty';

  return {
    valid: isValid(errors),
    errors,
  };
};
