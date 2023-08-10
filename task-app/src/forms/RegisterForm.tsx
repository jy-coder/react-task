import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type RegisterInput, signUpUserFn } from '../api/authApi';
import Center from '../components/styled/Center.style';
import { Stack } from '../components/styled/stack/Stack.style';
import Paper from '../components/styled/paper/Paper.style';
import Input from '../components/styled/input/Input';
import { Button } from '../components/styled/button/button.style';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DevTool } from '@hookform/devtools';

interface IRegisterFormProps {}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch
  } = useForm<RegisterInput>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate } = useMutation(signUpUserFn, {
    onSuccess: () => {
      toast.success('Register successfully');
      navigate('/login');
    }
  });

  const onSubmit = (registerInput: RegisterInput) => {
    const data = { ...registerInput, confirmPassword: undefined };

    mutate(data);
  };

  return (
    <Center>
      <Paper width={300} height={300}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack>
            <Input
              label="Email"
              data-testid="email"
              type="email"
              placeholder="Email"
              onKeyDown={(e: any) =>
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
              onKeyDown={(e) =>
                e.key === 'Enter' ? handleSubmit(onSubmit) : ''
              }
            />
            <Input
              type="password"
              data-testid="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match';
                  }
                }
              })}
              error={errors.confirmPassword?.message}
              onKeyDown={(e) =>
                e.key === 'Enter' ? handleSubmit(onSubmit) : ''
              }
            />
            <Stack>
              <Button type="submit" data-testid="register">
                Register
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
      <DevTool control={control} />
    </Center>
  );
};

export default RegisterForm;
