import { Trash } from 'tabler-icons-react';
import FlexItem from '../styled/flex/FlexItem.style';
import FlexWrapper from '../styled/flex/FlexWrapper';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../api/taskApi';
import { showSuccessToast } from '../../utils/toast';
import { queryClient } from '../../utils/queryClient';

interface ItemProps {
  id: string;
  description?: string;
}

export const Item: React.FC<ItemProps> = ({ id, description }) => {
  const { mutate, isLoading: deleteTaskIsLoading } = useMutation(deleteTask, {
    onSuccess: () => {
      showSuccessToast('Task successfully deleted', 'task-deleted');
      queryClient.invalidateQueries(['user-tasks']);
    }
  });

  return (
    <FlexWrapper
      flexDirection="column"
      height="50px"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
      background="#1C293C"
    >
      <FlexItem alignItems="flex-start">{description}</FlexItem>
      <FlexItem alignItems="flex-end">
        <Trash
          style={{ cursor: 'pointer' }}
          onClick={(e: React.MouseEvent) => {
            mutate(id);
          }}
        />
      </FlexItem>
    </FlexWrapper>
  );
};
