import * as React from 'react';
import { useForm, Controller, Control, FieldValues } from 'react-hook-form';
import Input from '../components/styled/input/Input';
import { useMutation } from '@tanstack/react-query';
import { DevTool } from '@hookform/devtools';
import { TaskInput } from '../types';
import { createTask } from '../api/taskApi';
import { Button } from '../components/styled/button/Button';
import Stack from '../components/styled/stack/Stack';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { showSuccessToast } from '../utils/toast';
import { queryClient } from '../utils/queryClient';
import { SelectBox } from '../components/select/SelectBox';

interface ITaskFormProps {}
interface IStatus {
  value: string;
  label: string;
}

const options: IStatus[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

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
      description: '',
      status: ''
    }
  });

  const { mutate } = useMutation(createTask, {
    onSuccess: () => {
      showSuccessToast('Task created successfully', 'task-created');
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
        <Controller
          name="status"
          control={control}
          render={({ field: { value, onChange, ref } }) => {
            return (
              <>
                <label style={{ marginBottom: '-10px' }}>Status</label>
                <SelectBox
                  classNamePrefix="react-select"
                  onChange={(selected) => onChange(selected?.value)}
                  value={options.find((c) => c.value === value)}
                  options={options}
                  placeholder="Select status"
                />
              </>
            );
          }}
          rules={{ required: true }}
        />
      </Stack>
      <Stack margin="30px 10px">
        <Button data-testid="login" displayLabel="Create Task" />
      </Stack>
      <DevTool control={control} />
    </form>
  );
};

export default TaskForm;
