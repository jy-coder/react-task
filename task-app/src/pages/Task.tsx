'use client'
import React, { useState } from 'react'

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import type { DragStartEvent } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Container } from '../components/draggable/Container'
import { Item } from '../components/draggable/Item'

const wrapperStyle: {
  display: 'flex' | 'block' | 'inline' | 'inline-block'
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
} = {
  display: 'flex',
  flexDirection: 'row'
}

type ItemsObject<T> = Record<string, T[]>

export interface Task {
  id: number
  name: string
}

interface KabanProps {}

export const KabanBoard: React.FC<KabanProps> = () => {
  const [items, setItems] = useState<ItemsObject<Task>>({
    container1: [
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' },
      { id: 3, name: 'Task 3' }
    ],
    container2: [
      { id: 4, name: 'Task 4' },
      { id: 5, name: 'Task 5' },
      { id: 6, name: 'Task 6' }
    ],
    container3: [
      { id: 7, name: 'Task 7' },
      { id: 8, name: 'Task 8' },
      { id: 9, name: 'Task 9' }
    ]
  })
  const [activeId, setActiveId] = useState<number | null>()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div style={wrapperStyle}>
      <DndContext
        id="dnd"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="container1" items={items.container1} />
        <Container id="container2" items={items.container2} />
        <Container id="container3" items={items.container3} />
        <DragOverlay>
          {activeId ? <Item id={Number(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )

  function findContainer(id: number) {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) =>
      items[key].some((task) => task.id === id)
    )
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const { id } = active

    setActiveId(Number(id))
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]
      const activeIndex = items[activeContainer].findIndex(
        (item) => item.id === id
      )
      const overIndex = items[overContainer].findIndex(
        (item) => item.id === overId
      )

      let newIndex
      if (overId in prev) {
        newIndex = overItems.length
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height
        const modifier = isBelowLastItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
    })
  }

  function handleDragEnd(event: any) {
    const { active, over } = event
    const { id } = active
    const { id: overId } = over

    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.id === active.id
    )
    const overIndex = items[overContainer].indexOf(overId)

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }))
    }

    setActiveId(null)
  }
}
