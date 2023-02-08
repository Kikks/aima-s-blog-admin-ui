import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Heading from '@/components/lib/Heading';
import Input from '@/components/lib/Input';
import { UserContext } from '@/contexts/user';
import { LOGIN } from '@/graphql/mutations/user.mutations';
import { useToggle } from '@/hooks';
import { validateLoginPayload } from '@/utils/validators/auth.validator';
import { isEmpty } from '@/utils/validators/helpers';

const initialState = { email: '', password: '' };

const Login = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { login } = useContext(UserContext);
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showPassword, toggleShowPassword] = useToggle(false);

  const [mutate, { loading }] = useMutation(LOGIN, {
    onCompleted(response) {
      if (response?.adminLogin) {
        localStorage.setItem('token', response.adminLogin?.token || '');
        login(response.adminLogin?.user);
      }

      router.push('/dashboard');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setErrors(initialState);

    const { valid, errors: validationErrors } = validateLoginPayload(payload);

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    mutate({
      variables: {
        input: payload,
      },
    });
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-primary-lighter">
      <div className="flex h-full w-full max-w-[900px] items-center shadow-lg shadow-primary-main/20 lg:h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="grid h-full w-full place-items-center content-center gap-10 bg-white p-5 md:p-10 lg:w-1/2"
        >
          <Heading className="font-bold">Welcome!</Heading>

          <div className="grid w-full gap-3">
            <Input
              label="Email"
              required
              placeholder="Enter your email address"
              name="email"
              value={payload.email}
              onChange={handleChange}
              error={!isEmpty(errors.email)}
              helperText={errors.email}
              type="email"
            />

            <Input
              label="Password"
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              endIcon={
                <Icon
                  icon={
                    showPassword
                      ? 'material-symbols:visibility-off-outline'
                      : 'material-symbols:visibility-outline'
                  }
                  className="cursor-pointer text-xl text-black/20"
                  onClick={toggleShowPassword}
                />
              }
              name="password"
              value={payload.password}
              onChange={handleChange}
              error={!isEmpty(errors.password)}
              helperText={errors.password}
            />
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            Login
          </Button>
        </form>
        <div className="hidden h-full w-full place-items-center bg-primary-lighter lg:grid lg:w-1/2">
          <figure className="relative h-20 w-64 duration-200">
            <Image src="/assets/images/logo.png" layout="fill" alt="Logo" />
          </figure>
        </div>
      </div>
    </main>
  );
};

export default Login;
