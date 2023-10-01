import React, { useEffect, useState } from 'react';

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DraggableContainer } from '../components/draggable/DraggableContainer';
import { Item } from '../components/draggable/Item';
import Modal from '../components/styled/modal/Modal';
import TaskForm from '../forms/TaskForm';
import FlexItem from '../components/styled/flex/FlexItem.style';
import { Plus } from 'tabler-icons-react';
import Wrapper from '../components/styled/flex/Wrapper';
import { TaskResponse } from '../hooks/useTaskData';
import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../api/taskApi';
import { Task } from '../types';
import { showSuccessToast } from '../utils/toast';

interface TaskBoardProps {
  tasks: TaskResponse;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const [items, setItems] = useState<TaskResponse>({});
  const [activeId, setActiveId] = useState<string | null>();
  const [activeTask, setActiveTask] = useState<Task>();

  const taskType = ['Pending', 'To Do', 'In Progress'];
  const keyNames = ['pending', 'todo', 'inProgress'];
  const { mutate } = useMutation(updateTask, {
    onSuccess: () => {
      showSuccessToast('Task updated', 'task-updated');
    }
  });

  const updateStatus = (status: string) => {
    if (!activeTask) {
      return;
    }

    const { createDate, ...taskInput } = activeTask;
    const data = {
      ...taskInput,
      status
    };
    mutate(data);
  };

  useEffect(() => {
    const updatedItems = { ...tasks };

    keyNames.forEach((keyName) => {
      if (!(keyName in updatedItems)) {
        updatedItems[keyName] = [];
      }
    });
    setItems(updatedItems);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <Wrapper>
      <Modal
        icon={<Plus />}
        content={<TaskForm />}
        footerDisplayLabel="Create Task"
      />
      <Wrapper flexDirection="row">
        {taskType.map((type, index) => (
          <Wrapper
            key={index}
            padding="10px"
            height="1vh"
            margin="10px"
            flexDirection="row"
          >
            <FlexItem flex="50%"> {type}</FlexItem>
            <FlexItem flex="50%" alignItems="flex-end"></FlexItem>
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper flexDirection="row">
        <DndContext
          id="dnd"
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <DraggableContainer id="pending" items={items?.pending ?? []} />
          <DraggableContainer id="todo" items={items?.todo ?? []} />
          <DraggableContainer id="inProgress" items={items?.inProgress ?? []} />
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
      </Wrapper>
    </Wrapper>
  );

  function findContainer(id: string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((task) => task.taskId === id)
    );
  }

  function handleDragStart(event: any) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const overItems = prev[overContainer];
      const activeIndex = items[activeContainer].findIndex(
        (item) => item.taskId === id
      );
      const overIndex = items[overContainer].findIndex(
        (item) => item.taskId === overId
      );

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.taskId !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) {
      return;
    }
    const activeTask = items[activeContainer].find(
      (item) => item.taskId === id
    );
    setActiveTask(activeTask);
    updateStatus(overContainer);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.taskId === active.id
    );
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  }
};
