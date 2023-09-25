import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { getTasks } from '../api/taskApi';

export interface Task {
  id: string;
  taskId: string;
  description: string;
}

interface UseTasksDataOptions extends UseQueryOptions<TaskResponse, Error> {
  onSuccess?: (data: TaskResponse) => void;
}

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface TaskResponse {
  [taskId: string]: Task[];
}

export const useTasksData = (userId: string, options?: UseTasksDataOptions) => {
  return useQuery<TaskResponse, Error>(
    ['user-tasks', userId],
    () => getTasks(userId) as Promise<TaskResponse>,
    options
  );
};
