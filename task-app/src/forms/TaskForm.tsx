import * as React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/styled/input/Input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DevTool } from '@hookform/devtools';
import { TaskInput } from '../types';
import { createTask } from '../api/taskApi';
import { Button } from '../components/styled/button/Button';
import Stack from '../components/styled/stack/Stack';
import { queryClient } from '../App';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

interface ITaskFormProps {}

const TaskForm: React.FC<ITaskFormProps> = () => {
  const { setModalOpen } = useContext(AppContext);

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

  const { mutate } = useMutation(createTask, {
    onSuccess: () => {
      toast.success('Task created successfully');
      setModalOpen(false);
      queryClient.invalidateQueries(['user-tasks']);
    }
  });

  const onSubmit = (taskInput: TaskInput) => {
    const data = {
      ...taskInput,
      userId: '20ee7579-ded7-4940-9cfc-896dea4f9548'
    };
    mutate(data);
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
        <Input
          type="text"
          label="Status"
          placeholder="Status"
          {...register('status', {
            required: 'Task status is required'
          })}
          error={errors.status?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' ? handleSubmit(onSubmit) : ''
          }
        />
      </Stack>
      <Stack margin="30px 10px">
        <Button type="submit" data-testid="login" displayLabel="Create Task" />
      </Stack>
      <DevTool control={control} />
    </form>
  );
};

export default TaskForm;
