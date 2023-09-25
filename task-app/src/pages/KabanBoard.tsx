import { TaskResponse, useTasksData } from '../hooks/useTaskData';
import { TaskBoard } from './TaskBoard';

interface KanbanProps {}

export const KanbanBoard: React.FC<KanbanProps> = () => {
  // TODO: Integrate with incognito
  const userId = '20ee7579-ded7-4940-9cfc-896dea4f9548';
  const defaultValue = {
    pending: [],
    todo: [],
    inProgress: []
  };

  const { isLoading, data, isError, error, refetch } = useTasksData(userId, {
    refetchOnWindowFocus: false
  });

  return <TaskBoard tasks={data ?? defaultValue} />;
};
