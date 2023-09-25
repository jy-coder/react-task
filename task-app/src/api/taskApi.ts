import { AxiosRequest } from '../interceptor/http';
import { Task } from '../hooks/useTaskData';
import { TaskInput } from '../types';

const taskApi = new AxiosRequest(process.env.REACT_APP_LAMBDDA_URL ?? '');

interface TaskResponse {
  todo?: Task[];
  pending?: Task[];
  inProgress?: Task[];
}

export const getTasks = async (userId: string): Promise<TaskResponse> => {
  const response = await taskApi.get<TaskResponse>(
    `api/v1/task/user/${userId}`
  );
  return response;
};

export const createTask = async (
  taskData: TaskInput
): Promise<TaskResponse> => {
  const response = await taskApi.post<TaskResponse>('api/v1/task', taskData);

  return response;
};
