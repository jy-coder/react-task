import { Trash, Pencil } from 'tabler-icons-react';
import FlexItem from '../styled/flex/FlexItem.style';
import FlexWrapper from '../styled/flex/FlexWrapper';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../api/taskApi';
import { showSuccessToast } from '../../utils/toast';
import { queryClient } from '../../utils/queryClient';

import Modal from '../styled/modal/Modal';
import TaskForm from '../../forms/TaskForm';
import { Task, TaskAction } from '../../types';

interface ItemProps {
  id: string;
  task?: Task;
}

export const Item: React.FC<ItemProps> = ({ id, task }) => {
  const { mutate: deleteTaskMutate, isLoading: deleteTaskIsLoading } =
    useMutation(deleteTask, {
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
      <FlexItem alignItems="flex-start">{task?.description}</FlexItem>
      <FlexItem flexDirection="row">
        {/* place both element at the end */}
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            justifyContent: 'flex-end'
          }}
        >
          <Modal
            icon={<Pencil />}
            content={
              <TaskForm taskAction={TaskAction.Update} taskData={task} />
            }
            footerDisplayLabel="Update Task"
          />
          <div
            style={{
              marginTop: '10px'
            }}
          >
            <Trash
              style={{ cursor: 'pointer' }}
              onClick={(e: React.MouseEvent) => {
                deleteTaskMutate(id);
              }}
            />
          </div>
        </div>
      </FlexItem>
    </FlexWrapper>
  );
};
