import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useMutation } from '@tanstack/react-query';
import { type LoginInput, loginUserFn } from '../api/authApi';
import { useContext } from 'react';
import { type User } from '../types';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Center from '../components/flex/Center.style';
import Paper from '../components/styled/paper/Paper.style';
import Input from '../components/styled/input/Input';
import { Button } from '../components/styled/button/button.style';
import { Stack } from '../components/styled/stack/Stack.style';
import { toast } from 'react-toastify';

// let renderCount = 0;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext<User>(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<LoginInput>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const { mutate } = useMutation(loginUserFn, {
    onSuccess: () => {
      setIsAuth(true);
      toast.success('Login successfully');
      navigate('/tasks');
    }
  });

  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };

  // renderCount++;

  return (
    <Center>
      {/* <h1>Login ({renderCount / 2})</h1> */}
      <Paper width={300} height={250}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack>
            <Input
              label="Email"
              data-testid="email"
              type="email"
              placeholder="Email"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' ? handleSubmit(onSubmit) : ''
              }
              {...register('username', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format'
                }
              })}
              error={errors.username?.message}
            />
            <Input
              type="password"
              data-testid="password"
              label="Password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' ? handleSubmit(onSubmit) : ''
              }
            />
            <Stack>
              <Button type="submit" data-testid="login">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
      <DevTool control={control} />
    </Center>
  );
};
