import { useAuth } from '../hooks/useAuth';
import { useTasksData } from '../hooks/useTaskData';
import { HashMap, TaskResponse } from '../types';
import { TaskBoard } from './TaskBoard';

interface KanbanProps {}

export const KanbanBoard: React.FC<KanbanProps> = () => {
  const [userDetails, setUserDetails] = useAuth();
  const keyMap: HashMap = {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed'
  };

  const { isLoading, data, isError, error, refetch } = useTasksData(
    userDetails?.username ?? '',
    {
      refetchOnWindowFocus: false,
      enabled: !!userDetails
    }
  );

  const defaultValue: TaskResponse = {};

  for (const key of Object.keys(keyMap)) {
    defaultValue[key] = [];
  }

  if (!userDetails) {
    return null;
  }

  return <TaskBoard tasks={data ?? defaultValue} keyMap={keyMap} />;
};
