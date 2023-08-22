import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type RegisterInput, signUpUserFn } from '../api/authApi';
import { Stack } from '../components/styled/stack/Stack.style';
import Input from '../components/styled/input/Input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DevTool } from '@hookform/devtools';
import { TaskInput } from '../types';

interface ITaskFormProps {}

const TaskForm: React.FC<ITaskFormProps> = (props) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<TaskInput>({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const { mutate } = useMutation(signUpUserFn, {
    onSuccess: () => {
      toast.success('Task created successfully');
    }
  });

  const onSubmit = (taskInput: TaskInput) => {
    // call add task API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '70%' }}>
      <Stack>
        <Input
          label="Task"
          data-testid="task"
          type="text"
          placeholder="Task"
          {...register('name', { required: 'Task name is required' })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' ? handleSubmit(onSubmit) : ''
          }
          error={errors.name?.message}
        />
        <Input
          lineHeight="6"
          type="text"
          data-testid="desciption"
          label="Desciption"
          placeholder="Enter Your Desciption"
          {...register('description', {
            required: 'Task description is required'
          })}
          error={errors.description?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' ? handleSubmit(onSubmit) : ''
          }
        />
      </Stack>
      <DevTool control={control} />
    </form>
  );
};

export default TaskForm;
