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
import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../api/taskApi';
import { HashMap, Task, TaskAction, TaskResponse } from '../types';
import { showSuccessToast } from '../utils/toast';
import LoadingOverlay from 'react-loading-overlay-ts';
import FlexWrapper from '../components/styled/flex/FlexWrapper';
interface TaskBoardProps {
  tasks: TaskResponse;
  keyMap: HashMap;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, keyMap }) => {
  const [items, setItems] = useState<TaskResponse>({});
  const [activeId, setActiveId] = useState<string | null>();
  const taskTypeValues = Object.values(keyMap);
  const taskKeys = Object.keys(keyMap);

  const { mutate, isLoading: updateTaskIsLoading } = useMutation(updateTask, {
    onSuccess: () => {
      showSuccessToast('Task successfully updated', 'task-updated');
    }
  });

  const updateStatus = (status: string, activeTask: Task) => {
    const { createDate, taskId, ...taskInput } = activeTask;
    const data = {
      ...taskInput,
      status
    };
    mutate({ taskData: data, taskId });
  };

  useEffect(() => {
    const updatedItems = { ...tasks };
    taskKeys.forEach((keyName) => {
      if (!(keyName in updatedItems)) {
        updatedItems[keyName] = [];
      }
    });
    setItems(updatedItems);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
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
    if (!activeTask) {
      return;
    }
    updateStatus(overContainer, activeTask);

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

  return (
    <LoadingOverlay active={updateTaskIsLoading} spinner>
      <FlexWrapper>
        <Modal
          icon={<Plus />}
          content={<TaskForm taskAction={TaskAction.Create} />}
          footerDisplayLabel="Create Task"
        />
        <FlexWrapper flexDirection="row">
          {taskTypeValues.map((type, index) => (
            <FlexWrapper
              key={index}
              padding="10px"
              height="1vh"
              margin="10px"
              flexDirection="row"
            >
              <FlexItem flex="50%"> {type}</FlexItem>
              <FlexItem flex="50%" alignItems="flex-end"></FlexItem>
            </FlexWrapper>
          ))}
        </FlexWrapper>
        <FlexWrapper flexDirection="row">
          <DndContext
            id="dnd"
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <DraggableContainer id="pending" items={items?.pending ?? []} />
            <DraggableContainer
              id="inProgress"
              items={items?.inProgress ?? []}
            />
            <DraggableContainer id="completed" items={items?.completed ?? []} />
            <DragOverlay>
              {activeId ? <Item id={activeId} /> : null}
            </DragOverlay>
          </DndContext>
        </FlexWrapper>
      </FlexWrapper>
    </LoadingOverlay>
  );
};
