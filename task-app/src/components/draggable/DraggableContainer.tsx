import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { type Task } from '../../types';
import { Container } from '../styled/container/Container.style';

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

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <Container
        ref={setNodeRef}
        $padding="10px"
        height="90vh"
        $margin="10px"
        $flex="1"
        background="#141d2b"
      >
        {items.map((item: Task) => (
          <SortableItem key={item.id} id={item.id} task={item} />
        ))}
      </Container>
    </SortableContext>
  );
};
