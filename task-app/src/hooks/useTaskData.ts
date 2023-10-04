import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { getTasks } from '../api/taskApi';
import { TaskResponse } from '../types';

interface UseTasksDataOptions extends UseQueryOptions<TaskResponse, Error> {
  onSuccess?: (data: TaskResponse) => void;
}

export const useTasksData = (userId: string, options?: UseTasksDataOptions) => {
  return useQuery<TaskResponse, Error>(
    ['user-tasks', userId],
    () => getTasks(userId) as Promise<TaskResponse>,
    options
  );
};
