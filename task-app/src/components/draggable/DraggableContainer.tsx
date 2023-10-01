import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import Container from '../styled/container/Container';
import { Task } from '../../types';

interface DraggableContainerProps {
  id: string;
  items: Task[];
}

export const DraggableContainer: React.FC<DraggableContainerProps> = (
  props
) => {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({
    id
  });

  if (!items) {
    return null;
  }
  return (
    <SortableContext
      id={id}
      items={items ?? []}
      strategy={verticalListSortingStrategy}
    >
      <Container
        ref={setNodeRef}
        padding="10px"
        height="90vh"
        margin="10px"
        flex="1"
        background="#141d2b"
      >
        {items?.map((item: Task) => (
          <SortableItem key={item.taskId} id={item.taskId} task={item} />
        ))}
      </Container>
    </SortableContext>
  );
};
